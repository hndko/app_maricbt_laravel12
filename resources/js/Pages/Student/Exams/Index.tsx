import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Calendar, Clock, BookOpen, ArrowRight } from 'lucide-react';
import Pagination from '@/Components/Pagination';

interface Subject {
    id: number;
    code: string;
    name: string;
}

interface Classroom {
    id: number;
    name: string;
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
    const isExamAvailable = (startTime: string, endTime: string) => {
        const now = new Date();
        const start = new Date(startTime);
        const end = new Date(endTime);
        return now >= start && now <= end;
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    My Exams
                </h2>
            }
        >
            <Head title="My Exams" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {exams.data.length > 0 ? (
                            exams.data.map((exam) => {
                                const available = isExamAvailable(exam.start_time, exam.end_time);
                                return (
                                    <div
                                        key={exam.id}
                                        className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md dark:bg-gray-800"
                                    >
                                        <div className="border-b border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700/50">
                                            <div className="flex items-center justify-between">
                                                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/20 dark:text-blue-400 dark:ring-blue-400/20">
                                                    {exam.subject.code}
                                                </span>
                                                <span className={`text-xs font-medium ${available ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                                    {available ? 'Available Now' : 'Upcoming / Closed'}
                                                </span>
                                            </div>
                                            <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                                                {exam.title}
                                            </h3>
                                        </div>
                                        <div className="flex flex-1 flex-col p-4">
                                            <div className="mb-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                                <div className="flex items-center gap-2">
                                                    <BookOpen className="h-4 w-4" />
                                                    <span>{exam.subject.name}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>{new Date(exam.start_time).toLocaleString()}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4" />
                                                    <span>{exam.duration} minutes</span>
                                                </div>
                                            </div>
                                            <div className="mt-auto">
                                                {available ? (
                                                    <Link
                                                        href={route('student.exams.show', exam.id)}
                                                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                                    >
                                                        Start Exam
                                                        <ArrowRight className="h-4 w-4" />
                                                    </Link>
                                                ) : (
                                                    <button
                                                        disabled
                                                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
                                                    >
                                                        Not Available
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-span-full rounded-xl bg-white p-6 text-center shadow-sm dark:bg-gray-800">
                                <p className="text-gray-500 dark:text-gray-400">
                                    No exams assigned to you yet.
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="mt-6">
                        <Pagination links={exams.links} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
