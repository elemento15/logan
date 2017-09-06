<?php

namespace App\Http\Controllers;

use Response;
use Illuminate\Http\Request;

use App\Member;

class MembersController extends BaseController
{
    protected $mainModel = 'App\Member';

    // params needen for index
    protected $searchFields = ['name','curp','email','phone','mobile'];
    protected $indexPaginate = 10;
    protected $indexJoins = [];
    protected $orderBy = ['field' => 'name', 'type' => 'ASC'];
    
    // params needer for show
    protected $showJoins = [];

    // params needed for store/update
    protected $saveFields = ['name','curp','gender','phone','mobile','email','address','comments'];
    // - protected $storeFields = [];
    // - protected $updateFields = [];
    protected $defaultNulls = ['curp','phone','mobile','email','address','comments'];
    protected $formRules = [
        'name' => 'required',
        'gender' => 'required'
    ];

    protected $allowDelete = true;
    protected $allowUpdate = true;
    protected $allowStore  = true;
    protected $except = [];


    /**
     * Display the specified resource.
     *
     * @param  string  $name
     * @return Response
     */
    public function search_name(Request $request)
    {
        $name = $request->name;
        $member = Member::where('name', 'like', '%'.$name.'%')->where('active', 1)->get();
        
        if ($member && count($member) > 0) {

            if (count($member) == 1) {
                $response = array('success' => true, 'member' => $member[0]);
            } else {
                $response = array('success' => true, 'member' => false);
            }

        } else {
            $response = array('success' => false, 'msg' => 'No se encontro el integrante');
        }

        return Response::json($response);
    }
}
