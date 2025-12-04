<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Question::query()->with('subject');

        if ($request->has('search')) {
            $query->where('content', 'like', '%' . $request->search . '%');
        }

        if ($request->has('subject_id')) {
            $query->where('subject_id', $request->subject_id);
        }

        $questions = $query->latest()->paginate(10)->withQueryString();
        $subjects = Subject::all();

        return Inertia::render('Questions/Index', [
            'questions' => $questions,
            'subjects' => $subjects,
            'filters' => $request->only(['search', 'subject_id']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $subjects = Subject::all();
        return Inertia::render('Questions/Create', [
            'subjects' => $subjects
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'subject_id' => 'required|exists:subjects,id',
            'content' => 'required|string',
            'option_a' => 'required|string',
            'option_b' => 'required|string',
            'option_c' => 'required|string',
            'option_d' => 'required|string',
            'option_e' => 'required|string',
            'correct_answer' => 'required|in:A,B,C,D,E',
        ]);

        Question::create($request->all());

        return redirect()->route('questions.index')->with('success', 'Question created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Question $question)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Question $question)
    {
        $subjects = Subject::all();
        return Inertia::render('Questions/Edit', [
            'question' => $question,
            'subjects' => $subjects
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Question $question)
    {
        $request->validate([
            'subject_id' => 'required|exists:subjects,id',
            'content' => 'required|string',
            'option_a' => 'required|string',
            'option_b' => 'required|string',
            'option_c' => 'required|string',
            'option_d' => 'required|string',
            'option_e' => 'required|string',
            'correct_answer' => 'required|in:A,B,C,D,E',
        ]);

        $question->update($request->all());

        return redirect()->route('questions.index')->with('success', 'Question updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Question $question)
    {
        $question->delete();

        return redirect()->route('questions.index')->with('success', 'Question deleted successfully.');
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls',
        ]);

        \Maatwebsite\Excel\Facades\Excel::import(new \App\Imports\QuestionImport, $request->file('file'));

        return redirect()->route('questions.index')->with('success', 'Questions imported successfully.');
    }

    public function export()
    {
        return \Maatwebsite\Excel\Facades\Excel::download(new \App\Exports\QuestionExport, 'questions.xlsx');
    }
}
