<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $guarded = ['id'];

    public function window()
	{
		return $this->belongsTo('App\Window');
	}

	public function component()
	{
		return $this->belongsTo('App\Component');
	}

	public function sector()
	{
		return $this->belongsTo('App\Sector');
	}

	public function activity()
	{
		return $this->belongsTo('App\Activity');
	}
}
