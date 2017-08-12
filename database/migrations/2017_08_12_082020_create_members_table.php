<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMembersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('members', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('curp', 20)->unique()->nullable();
            $table->string('gender', 1)->default('H');
            $table->string('phone', 10)->nullable();
            $table->string('mobile', 10)->nullable();
            $table->string('email')->unique()->nullable();
            $table->string('address')->nullable();
            $table->text('comments')->nullable();
            $table->boolean('active')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('members');
    }
}
