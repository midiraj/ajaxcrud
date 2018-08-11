<?php

use App\Task;

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
/*Route::get('tasks', 'TasksController@index');
Route::post('tasks/post','TasksController@store');

*/
Route::get('manage/tasks', 'TasksController@manageTask');
Route::resource('tasks', 'TasksController');