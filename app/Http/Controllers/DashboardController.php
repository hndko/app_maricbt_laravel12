<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use App\Models\Exam;
use App\Models\Question;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        return Inertia::render('Dashboard', [
            'stats' => [
                'users' => User::count(),
                'classrooms' => Classroom::count(),
                'subjects' => Subject::count(),
                'exams' => Exam::count(),
                'questions' => Question::count(),
            ]
        ]);
    }
}
