import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Users, BookOpen, GraduationCap, Activity } from 'lucide-react';

export default function Dashboard() {
    const stats = [
        { name: 'Total Students', value: '1,234', icon: Users, color: 'bg-blue-500' },
        { name: 'Active Exams', value: '12', icon: Activity, color: 'bg-green-500' },
        { name: 'Total Subjects', value: '45', icon: BookOpen, color: 'bg-purple-500' },
        { name: 'Total Classes', value: '24', icon: GraduationCap, color: 'bg-orange-500' },
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

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div key={stat.name} className="overflow-hidden rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
                        <div className="flex items-center">
                            <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.color} text-white`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h3>
                    <div className="mt-4 space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0 dark:border-gray-700">
                                <div className="h-2 w-2 rounded-full bg-primary-500"></div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">Exam "Matematika X IPA" started</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">2 minutes ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">System Status</h3>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                            <p className="text-sm text-gray-500 dark:text-gray-400">CPU Usage</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">12%</p>
                        </div>
                        <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                            <p className="text-sm text-gray-500 dark:text-gray-400">RAM Usage</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">45%</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
