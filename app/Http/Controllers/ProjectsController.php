<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProjectsController extends BaseController
{
    protected $mainModel = 'App\Project';

    // params needen for index
    protected $searchFields = ['name','code'];
    protected $indexPaginate = 10;
    protected $indexJoins = [];
    protected $orderBy = ['field' => 'project_date', 'type' => 'ASC'];
    
    // params needer for show
    protected $showJoins = [];

    // params needed for store/update
    protected $saveFields = ['name','code','location','has_act','has_evaluation','amount','comments'];
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
}