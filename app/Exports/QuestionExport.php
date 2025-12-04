<?php

namespace App\Exports;

use App\Models\Question;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class QuestionExport implements FromCollection, WithHeadings, WithMapping
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Question::with('subject')->get();
    }

    public function headings(): array
    {
        return [
            'Subject Code',
            'Content',
            'Option A',
            'Option B',
            'Option C',
            'Option D',
            'Option E',
            'Correct Answer',
        ];
    }

    public function map($question): array
    {
        return [
            $question->subject->code,
            $question->content,
            $question->option_a,
            $question->option_b,
            $question->option_c,
            $question->option_d,
            $question->option_e,
            $question->correct_answer,
        ];
    }
}
