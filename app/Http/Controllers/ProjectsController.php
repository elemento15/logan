<?php

namespace App\Http\Controllers;

use App\ProjectRequirementReceived;

use Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class ProjectsController extends BaseController
{
    protected $mainModel = 'App\Project';

    // params needen for index
    protected $searchFields = ['name','code'];
    protected $indexPaginate = 8;
    protected $indexJoins = ['component.window', 'activity.sector'];
    protected $orderBy = ['field' => 'project_date', 'type' => 'DESC'];
    
    // params needer for show
    protected $showJoins = ['component.window', 'activity.sector', 'requirements', 'members', 'docs_received.member',
                            'docs_received.requirement'];

    // params needed for store/update
    // protected $saveFields = ['name','code','location','has_act','has_evaluation','amount','comments',
    //                          'component_id','activity_id','project_date'];
    protected $storeFields  = ['name','code','location','has_act','has_evaluation','amount','comments',
                               'component_id','activity_id','project_date'];
    protected $updateFields = ['name','code','location','amount','comments'];

    protected $defaultNulls = ['location','comments'];
    protected $formRules = [
        'name' => 'required|string|min:10',
        'code' => 'required|unique:projects,code,{{id}}|string|min:5',
        'component_id' => 'required',
        'activity_id' => 'required',
        'amount' => 'required|numeric|min:1',
        'members' => 'array|min:1',
        'requirements' => 'array|min:1'
    ];

    protected $allowDelete = false;
    protected $allowUpdate = true;
    protected $allowStore  = true;
    protected $except = [];

    
    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request)
    {
        $mainModel = $this->mainModel;

        foreach ($this->defaultNulls as $item) {
            $request[$item] = ($request[$item] == '') ? null : $request[$item];
        }

        $rules = $this->parseFormRules(0);
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return Response::json(array('errors' => $validator->errors()->all()), 422);
        } else {
            DB::beginTransaction();

            $data = $this->getSavingFields($request->all(), 'store');
            $data['project_date'] = date('Y-m-d');

            try {
                $project = $mainModel::create($data);

                // add requirements
                foreach ($request->requirements as $requirement) {
                    $project->requirements()->attach($requirement['id']);
                }

                // add members
                foreach ($request->members as $member) {
                    $representative = (isset($member['pivot']['representative'])) ? $member['pivot']['representative'] : 0;
                    $project->members()->attach($member['id'], array('representative' => $representative));
                }

                // creates project_requirement_received for each member and requirement
                foreach ($request->members as $member) {
                    foreach ($request->requirements as $requirement) {
                        $project->docs_received()->create([
                            'member_id' => $member['id'],
                            'requirement_id' => $requirement['id']
                        ]);
                    }
                }

                DB::commit();

                return $project;
            } catch (Exception $e) {
                return Response::json(array('msg' => 'Error al guardar'), 500);
            }
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id, Request $request)
    {
        $mainModel = $this->mainModel;

        if (method_exists($this, 'beforeUpdate')) {
            if (! $this->beforeStore($request)) {
                return Response::json(array('msg' => $this->msgError), 500);
            }
        }
        
        foreach ($this->defaultNulls as $item) {
            $request[$item] = ($request[$item] == '') ? null : $request[$item];
        }

        $rules = $this->parseFormRules($id);
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return Response::json(array('errors' => $validator->errors()->all()), 422);
        } else {
            $record = $mainModel::find($id);

            if (! $record) {
                return Response::json(array('msg' => 'Registro no encontrado'), 500);
            }

            $data = $this->getSavingFields($request->all(), 'update');

            try {
                DB::beginTransaction();

                $record->fill($data)->save();

                DB::commit();

            } catch (Exception $e) {
                return Response::json(array('msg' => 'Error al guardar'), 500);
            }
        
            return $record;
        }
    }

    public function doc_received($id, Request $request)
    {
        $record = ProjectRequirementReceived::find($request->doc_received_id);

        if (!$record || $record->project_id != $id) {
            return Response::json(array('msg' => 'Error al leer documento recibido'), 500);
        }

        $record->received = $request->value;
        if ($record->save()) {
            return $record;
        } else {
            return Response::json(array('msg' => 'No se pudo actualizar el documento'), 500);
        }
    }
    
}