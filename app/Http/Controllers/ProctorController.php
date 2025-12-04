<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProctorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch exams that are currently active or upcoming
        $exams = Exam::with(['subject', 'classroom'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Proctor/Index', [
            'exams' => $exams,
        ]);
    }
}
