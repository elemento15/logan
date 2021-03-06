<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Window extends Model
{
    protected $guarded = ['id'];

    public function components()
	{
		return $this->hasMany('App\Component');
	}
}
