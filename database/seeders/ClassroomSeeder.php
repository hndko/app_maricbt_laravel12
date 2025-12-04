<?php

namespace Database\Seeders;

use App\Models\Classroom;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClassroomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $classrooms = [
            ['name' => 'X IPA 1', 'level' => '10'],
            ['name' => 'X IPA 2', 'level' => '10'],
            ['name' => 'X IPS 1', 'level' => '10'],
            ['name' => 'XI IPA 1', 'level' => '11'],
            ['name' => 'XI IPS 1', 'level' => '11'],
            ['name' => 'XII IPA 1', 'level' => '12'],
            ['name' => 'XII IPS 1', 'level' => '12'],
        ];

        foreach ($classrooms as $classroom) {
            Classroom::create($classroom);
        }
    }
}
