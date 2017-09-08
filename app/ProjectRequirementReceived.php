<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProjectRequirementReceived extends Model
{
    protected $guarded = ['id'];

    public $timestamps = false;

    public function member()
	{
		return $this->belongsTo('App\Member');
	}

	public function requirement()
	{
		return $this->belongsTo('App\Requirement');
	}
}
