<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create Roles
        $roles = [
            'Superadmin',
            'Admin',
            'Teacher',
            'Proctor',
            'Student',
        ];

        foreach ($roles as $roleName) {
            Role::firstOrCreate(['name' => $roleName]);
        }

        // Create Superadmin User
        $user = User::firstOrCreate(
            ['email' => 'superadmin@example.com'],
            [
                'name' => 'Superadmin',
                'password' => Hash::make('password'),
            ]
        );

        $user->assignRole('Superadmin');

        // Create Admin User
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'),
            ]
        );
        $admin->assignRole('Admin');

        // Create Teacher User
        $teacher = User::firstOrCreate(
            ['email' => 'teacher@example.com'],
            [
                'name' => 'Teacher',
                'password' => Hash::make('password'),
            ]
        );
        $teacher->assignRole('Teacher');

        // Create Proctor User
        $proctor = User::firstOrCreate(
            ['email' => 'proctor@example.com'],
            [
                'name' => 'Proctor',
                'password' => Hash::make('password'),
            ]
        );
        $proctor->assignRole('Proctor');

        // Create Student User
        $student = User::firstOrCreate(
            ['email' => 'student@example.com'],
            [
                'name' => 'Student',
                'password' => Hash::make('password'),
            ]
        );
        $student->assignRole('Student');
    }
}
