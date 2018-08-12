<?php

namespace App\Http\Controllers;

use App\Task;
use Illuminate\Http\Request;

class TasksController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function manageTask(){
        $tasks = Task::latest()->get();
        return view('manageTask', compact('tasks'));
    }

    public function index(Request $request)
    {
        $tasks = Task::latest()->get();
        return response()->json($tasks);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $create = Task::create($request->all());
        $tasks = Task::latest()->get();
        return response()->json($tasks);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $edit = Task::find($id)->update($request->all());
        $tasks = Task::latest()->get();
        return response()->json($tasks);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Task::find($id)->delete();
        $tasks = Task::latest()->get();
        return response()->json($tasks);

    }
}
