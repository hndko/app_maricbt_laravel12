<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Models\Classroom;
use App\Models\Subject;
use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $exams = Exam::with(['subject', 'classroom'])->latest()->paginate(10);

        return Inertia::render('Exams/Index', [
            'exams' => $exams,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Exams/Create', [
            'subjects' => Subject::all(),
            'classrooms' => Classroom::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'subject_id' => 'required|exists:subjects,id',
            'classroom_id' => 'required|exists:classrooms,id',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'duration' => 'required|integer|min:1',
        ]);

        Exam::create($request->all());

        return redirect()->route('exams.index')->with('success', 'Exam created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Exam $exam)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Exam $exam)
    {
        return Inertia::render('Exams/Edit', [
            'exam' => $exam,
            'subjects' => Subject::all(),
            'classrooms' => Classroom::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Exam $exam)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'subject_id' => 'required|exists:subjects,id',
            'classroom_id' => 'required|exists:classrooms,id',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'duration' => 'required|integer|min:1',
        ]);

        $exam->update($request->all());

        return redirect()->route('exams.index')->with('success', 'Exam updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Exam $exam)
    {
        $exam->delete();

        return redirect()->route('exams.index')->with('success', 'Exam deleted successfully.');
    }
}
