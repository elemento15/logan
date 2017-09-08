<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectRequirementReceivedsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_requirement_receiveds', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('project_id')->unsigned();
            $table->integer('member_id')->unsigned();
            $table->integer('requirement_id')->unsigned();
            $table->boolean('received')->default(0);

            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
            $table->foreign('member_id')->references('id')->on('members')->onDelete('restrict');
            $table->foreign('requirement_id')->references('id')->on('requirements')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('project_requirement_receiveds');
    }
}
