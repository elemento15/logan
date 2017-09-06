<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    protected $guarded = ['id'];

    public function projects()
	{
		return $this->belongsToMany('App\Project');
	}
}
