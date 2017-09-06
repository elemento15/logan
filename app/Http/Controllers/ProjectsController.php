<?php

namespace App\Http\Controllers;

use Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProjectsController extends BaseController
{
    protected $mainModel = 'App\Project';

    // params needen for index
    protected $searchFields = ['name','code'];
    protected $indexPaginate = 8;
    protected $indexJoins = ['component.window', 'activity.sector'];
    protected $orderBy = ['field' => 'project_date', 'type' => 'ASC'];
    
    // params needer for show
    protected $showJoins = ['component.window', 'activity.sector', 'requirements'];

    // params needed for store/update
    protected $saveFields = ['name','code','location','has_act','has_evaluation','amount','comments',
                             'component_id','activity_id','project_date'];
    // - protected $storeFields = [];
    // - protected $updateFields = [];
    protected $defaultNulls = ['location','comments'];
    protected $formRules = [
        'name' => 'required',
        'code' => 'required'
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

        $rules = $this->formRules;
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return Response::json(array('msg' => 'Revise las validaciones'), 501);
        } else {
            $data = $this->getSavingFields($request->all(), 'store');
            $data['project_date'] = date('Y-m-d');

            try {
                $project = $mainModel::create($data);

                // add requirements
                foreach ($request->requirements as $requirement) {
                    $project->requirements()->attach($requirement['id']);
                }

                return $project;
            } catch (Exception $e) {
                return Response::json(array('msg' => 'Error al guardar'), 500);
            }
        }
    }
    
}