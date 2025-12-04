<?php

namespace Database\Seeders;

use App\Models\Question;
use App\Models\Subject;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $subjects = Subject::all();

        foreach ($subjects as $subject) {
            for ($i = 1; $i <= 10; $i++) {
                Question::create([
                    'subject_id' => $subject->id,
                    'content' => "Question $i for {$subject->name}. What is the correct answer?",
                    'option_a' => 'Option A',
                    'option_b' => 'Option B',
                    'option_c' => 'Option C',
                    'option_d' => 'Option D',
                    'option_e' => 'Option E',
                    'correct_answer' => 'A',
                ]);
            }
        }
    }
}
