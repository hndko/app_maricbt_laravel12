<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = [
        'subject_id',
        'content',
        'option_a',
        'option_b',
        'option_c',
        'option_d',
        'option_e',
        'correct_answer',
    ];

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
}
