import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Users, BookOpen, GraduationCap, FileQuestion, Calendar, Activity } from 'lucide-react';

interface Props {
    stats: {
        users: number;
        classrooms: number;
        subjects: number;
        exams: number;
        questions: number;
    };
}

export default function Dashboard({ stats }: Props) {
    const statCards = [
        { name: 'Total Users', value: stats.users, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/20' },
        { name: 'Classrooms', value: stats.classrooms, icon: GraduationCap, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/20' },
        { name: 'Subjects', value: stats.subjects, icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/20' },
        { name: 'Questions', value: stats.questions, icon: FileQuestion, color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900/20' },
        { name: 'Exams', value: stats.exams, icon: Calendar, color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/20' },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {statCards.map((stat) => (
                            <div
                                key={stat.name}
                                className="overflow-hidden rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800"
                            >
                                <div className="flex items-center">
                                    <div className={`rounded-lg p-3 ${stat.bg}`}>
                                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            {stat.name}
                                        </p>
                                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                            {stat.value}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Recent Activity Section */}
                        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                Recent Activity
                            </h3>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                                        <Activity className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            New exam created
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            2 minutes ago
                                        </p>
                                    </div>
                                </div>
                                {/* More activity items can be added here */}
                            </div>
                        </div>

                        {/* System Status Section */}
                        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                System Status
                            </h3>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            Database
                                        </span>
                                    </div>
                                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                                        Operational
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            Realtime Server
                                        </span>
                                    </div>
                                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                                        Operational
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
