<?php

namespace Database\Seeders;

use App\Models\Classroom;
use App\Models\Exam;
use App\Models\Question;
use App\Models\Subject;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $subjects = Subject::all();
        $classrooms = Classroom::all();

        if ($subjects->isEmpty() || $classrooms->isEmpty()) {
            return;
        }

        foreach ($subjects as $subject) {
            // Get questions for this subject
            $questions = Question::where('subject_id', $subject->id)->inRandomOrder()->limit(5)->get();

            if ($questions->isEmpty()) {
                continue;
            }

            foreach ($classrooms as $classroom) {
                $exam = Exam::create([
                    'title' => "Midterm Exam - {$subject->name}",
                    'subject_id' => $subject->id,
                    'classroom_id' => $classroom->id,
                    'start_time' => now()->addDays(1)->setHour(8)->setMinute(0),
                    'end_time' => now()->addDays(1)->setHour(10)->setMinute(0),
                    'duration' => 120,
                ]);

                // Attach questions to exam
                $exam->questions()->attach($questions->pluck('id'));
            }
        }
    }
}
