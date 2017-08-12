<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ActivitiesController  extends BaseController
{
    protected $mainModel = 'App\Activity';

    // params needen for index
    protected $searchFields = ['name'];
    protected $indexPaginate = 10;
    protected $indexJoins = ['sector'];
    protected $orderBy = ['field' => 'name', 'type' => 'ASC'];
    
    // params needer for show
    protected $showJoins = [];

    // params needed for store/update
    protected $saveFields = ['name','sector_id'];
    // - protected $storeFields = [];
    // - protected $updateFields = [];
    protected $defaultNulls = [];
    protected $formRules = [
        'name' => 'required'
    ];

    protected $allowDelete = true;
    protected $allowUpdate = true;
    protected $allowStore  = true;
    protected $except = [];
}
