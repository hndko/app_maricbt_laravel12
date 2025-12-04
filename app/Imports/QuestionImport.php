<?php

namespace App\Imports;

use App\Models\Question;
use App\Models\Subject;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class QuestionImport implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        $subject = Subject::where('code', $row['subject_code'])->first();

        if (!$subject) {
            return null;
        }

        return new Question([
            'subject_id' => $subject->id,
            'content' => $row['content'],
            'option_a' => $row['option_a'],
            'option_b' => $row['option_b'],
            'option_c' => $row['option_c'],
            'option_d' => $row['option_d'],
            'option_e' => $row['option_e'],
            'correct_answer' => $row['correct_answer'],
        ]);
    }
}
