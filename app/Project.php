<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $guarded = ['id'];

	public function component()
	{
		return $this->belongsTo('App\Component');
	}

	public function activity()
	{
		return $this->belongsTo('App\Activity');
	}

	public function requirements()
	{
		return $this->belongsToMany('App\Requirement');
	}

	public function members()
	{
		return $this->belongsToMany('App\Member')->withPivot('representative');
	}

	public function docs_received()
	{
		return $this->hasMany('App\ProjectRequirementReceived');
	}
}
