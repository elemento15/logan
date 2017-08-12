<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
}
