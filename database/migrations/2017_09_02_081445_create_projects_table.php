<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('code', 50)->unique();
            $table->integer('component_id')->unsigned();
            $table->integer('activity_id')->unsigned();
            $table->date('project_date');
            $table->string('location')->nullable();
            $table->text('comments')->nullable();
            $table->boolean('active')->default(1);
            $table->boolean('has_act')->default(0);
            $table->boolean('has_evaluation')->default(0);
            $table->double('amount');
            $table->enum('status', ['P','A','R'])->default('P');
            $table->timestamps();

            $table->foreign('component_id')->references('id')->on('components')->onDelete('restrict');
            $table->foreign('activity_id')->references('id')->on('activities')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
}
