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
