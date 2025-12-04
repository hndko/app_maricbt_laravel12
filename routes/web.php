<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', \App\Http\Controllers\DashboardController::class)->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('classrooms/search/{search}', [\App\Http\Controllers\ClassroomController::class, 'index'])->name('classrooms.search');
    Route::resource('classrooms', \App\Http\Controllers\ClassroomController::class);

    Route::get('subjects/search/{search}', [\App\Http\Controllers\SubjectController::class, 'index'])->name('subjects.search');
    Route::resource('subjects', \App\Http\Controllers\SubjectController::class);

    Route::resource('questions', \App\Http\Controllers\QuestionController::class);
    Route::post('questions/import', [\App\Http\Controllers\QuestionController::class, 'import'])->name('questions.import');
    Route::get('questions/export', [\App\Http\Controllers\QuestionController::class, 'export'])->name('questions.export');

    Route::resource('exams', \App\Http\Controllers\ExamController::class);

    Route::prefix('student')->name('student.')->group(function () {
        Route::get('exams', [\App\Http\Controllers\StudentExamController::class, 'index'])->name('exams.index');
        Route::get('exams/{exam}', [\App\Http\Controllers\StudentExamController::class, 'show'])->name('exams.show');
        Route::post('exams/{exam}/finish', [\App\Http\Controllers\StudentExamController::class, 'store'])->name('exams.finish');
    });

    Route::prefix('proctor')->name('proctor.')->group(function () {
        Route::get('exams', [\App\Http\Controllers\ProctorController::class, 'index'])->name('exams.index');
    });
});

require __DIR__.'/auth.php';
