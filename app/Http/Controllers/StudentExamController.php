<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Models\ExamSession;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class StudentExamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $exams = Exam::with(['subject', 'classroom'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Student/Exams/Index', [
            'exams' => $exams,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Exam $exam)
    {
        $user = Auth::user();

        // Find or create exam session
        $session = ExamSession::firstOrCreate(
            [
                'exam_id' => $exam->id,
                'user_id' => $user->id,
            ],
            [
                'start_time' => now(),
                'status' => 'ongoing',
            ]
        );

        // Check if exam is already completed
        if ($session->status === 'completed') {
            return redirect()->route('student.exams.index')->with('error', 'You have already completed this exam.');
        }

        // Calculate remaining time
        $startTime = $session->start_time;
        $durationInMinutes = $exam->duration;
        $endTime = $startTime->copy()->addMinutes($durationInMinutes);
        $remainingSeconds = max(0, now()->diffInSeconds($endTime, false));

        $exam->load(['subject', 'questions']);

        return Inertia::render('Student/Exams/Show', [
            'exam' => $exam,
            'session' => $session,
            'remaining_time' => $remainingSeconds,
        ]);
    }

    /**
     * Store the exam results (Finish Exam).
     */
    public function store(Request $request, Exam $exam)
    {
        $user = Auth::user();
        $session = ExamSession::where('exam_id', $exam->id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        if ($session->status === 'completed') {
            return redirect()->route('student.exams.index');
        }

        $answers = $request->input('answers', []);

        // Calculate score (simple version)
        $score = 0;
        $totalQuestions = $exam->questions()->count();

        foreach ($exam->questions as $question) {
            if (isset($answers[$question->id]) && $answers[$question->id] === $question->correct_answer) {
                $score++;
            }
        }

        $finalScore = $totalQuestions > 0 ? ($score / $totalQuestions) * 100 : 0;

        $session->update([
            'end_time' => now(),
            'status' => 'completed',
            'answers' => $answers,
            'score' => $finalScore,
        ]);

        return redirect()->route('student.exams.index')->with('success', 'Exam completed successfully. Your score: ' . number_format($finalScore, 2));
    }
}
