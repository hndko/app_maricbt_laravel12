import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search, Pencil, Trash2, Calendar, Clock } from 'lucide-react';
import Pagination from '@/Components/Pagination';
import { useState } from 'react';

interface Subject {
    id: number;
    code: string;
    name: string;
}

interface Classroom {
    id: number;
    name: string;
    level: string;
}

interface Exam {
    id: number;
    title: string;
    subject: Subject;
    classroom: Classroom;
    start_time: string;
    end_time: string;
    duration: number;
}

interface Props {
    exams: {
        data: Exam[];
        links: any[];
        current_page: number;
        per_page: number;
    };
}

export default function Index({ exams }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this exam?')) {
            router.delete(route('exams.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Exams
                </h2>
            }
        >
            <Head title="Exams" />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-1 gap-4">
                    {/* Placeholder for search if needed later */}
                </div>
                <div className="flex gap-2">
                    <Link
                        href={route('exams.create')}
                        className="flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                        <Plus className="h-4 w-4" />
                        Create Exam
                    </Link>
                </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 w-16">No</th>
                                <th scope="col" className="px-6 py-3">Title</th>
                                <th scope="col" className="px-6 py-3">Subject</th>
                                <th scope="col" className="px-6 py-3">Classroom</th>
                                <th scope="col" className="px-6 py-3">Schedule</th>
                                <th scope="col" className="px-6 py-3">Duration</th>
                                <th scope="col" className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exams.data.length > 0 ? (
                                exams.data.map((exam, index) => (
                                    <tr key={exam.id} className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                            {(exams.current_page - 1) * exams.per_page + index + 1}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                            {exam.title}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/20 dark:text-blue-400 dark:ring-blue-400/20">
                                                {exam.subject.code}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {exam.classroom.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col text-xs">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {new Date(exam.start_time).toLocaleString()}
                                                </span>
                                                <span className="flex items-center gap-1 text-gray-400">
                                                    to
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {new Date(exam.end_time).toLocaleString()}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {exam.duration} mins
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={route('exams.edit', exam.id)}
                                                    className="rounded-lg p-2 text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/20"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(exam.id)}
                                                    className="rounded-lg p-2 text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/20"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-4 text-center">
                                        No exams found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Pagination links={exams.links} />
            </div>
        </AuthenticatedLayout>
    );
}
