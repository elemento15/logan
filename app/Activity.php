<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $guarded = ['id'];

    public function sector()
	{
		return $this->belongsTo('App\Sector');
	}
}
