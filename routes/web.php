<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'HomeController@index')->name('home');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::resource('windows', 'WindowsController');
Route::post('windows/{id}/activate', 'WindowsController@activate');
Route::post('windows/{id}/deactivate', 'WindowsController@deactivate');

Route::resource('components', 'ComponentsController');
Route::post('components/{id}/activate', 'ComponentsController@activate');
Route::post('components/{id}/deactivate', 'ComponentsController@deactivate');

Route::resource('sectors', 'SectorsController');
Route::post('sectors/{id}/activate', 'SectorsController@activate');
Route::post('sectors/{id}/deactivate', 'SectorsController@deactivate');

Route::resource('activities', 'ActivitiesController');
Route::post('activities/{id}/activate', 'ActivitiesController@activate');
Route::post('activities/{id}/deactivate', 'ActivitiesController@deactivate');

Route::resource('members', 'MembersController');
Route::post('members/{id}/activate', 'MembersController@activate');
Route::post('members/{id}/deactivate', 'MembersController@deactivate');
Route::post('members/search_name', 'MembersController@search_name');

Route::resource('requirements', 'RequirementsController');
Route::post('requirements/{id}/activate', 'RequirementsController@activate');
Route::post('requirements/{id}/deactivate', 'RequirementsController@deactivate');

Route::resource('projects', 'ProjectsController');
Route::post('projects/{id}/activate', 'ProjectsController@activate');
Route::post('projects/{id}/deactivate', 'ProjectsController@deactivate');
Route::post('projects/{id}/doc_received', 'ProjectsController@doc_received');
