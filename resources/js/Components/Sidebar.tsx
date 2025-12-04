import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, BookOpen, GraduationCap, Users, LogOut, MonitorPlay } from 'lucide-react';
import { clsx } from 'clsx';

export default function Sidebar() {
    const { url } = usePage();

    const links = [
        { name: 'Dashboard', href: route('dashboard'), icon: LayoutDashboard, active: url.startsWith('/dashboard') },
        { name: 'Classrooms', href: route('classrooms.index'), icon: Users, active: url.startsWith('/classrooms') },
        { name: 'Subjects', href: route('subjects.index'), icon: BookOpen, active: url.startsWith('/subjects') },
    ];

    return (
        <div className="flex h-screen w-64 flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            <div className="flex h-16 items-center justify-center border-b border-gray-200 dark:border-gray-700">
                <Link href="/" className="flex items-center gap-2">
                    <MonitorPlay className="h-8 w-8 text-primary-500" />
                    <span className="text-xl font-bold text-gray-900 dark:text-white">MariCBT</span>
                </Link>
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1 px-2">
                    {links.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className={clsx(
                                    'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                    link.active
                                        ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200'
                                )}
                            >
                                <link.icon className={clsx('h-5 w-5', link.active ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300')} />
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                >
                    <LogOut className="h-5 w-5" />
                    Log Out
                </Link>
            </div>
        </div>
    );
}
