<?php

namespace Database\Seeders;

use App\Models\Subject;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $subjects = [
            ['code' => 'MTK', 'name' => 'Matematika'],
            ['code' => 'BIN', 'name' => 'Bahasa Indonesia'],
            ['code' => 'BIG', 'name' => 'Bahasa Inggris'],
            ['code' => 'FIS', 'name' => 'Fisika'],
            ['code' => 'KIM', 'name' => 'Kimia'],
            ['code' => 'BIO', 'name' => 'Biologi'],
            ['code' => 'EKO', 'name' => 'Ekonomi'],
        ];

        foreach ($subjects as $subject) {
            Subject::create($subject);
        }
    }
}
