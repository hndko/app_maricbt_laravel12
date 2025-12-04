import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, BookOpen, GraduationCap, Users, LogOut, MonitorPlay, FileQuestion, Calendar, Monitor } from 'lucide-react';
import { clsx } from 'clsx';

export default function Sidebar() {
    const { url, props } = usePage();
    const { auth } = props as any;
    const user = auth.user;
    const roles = user.roles.map((role: any) => role.name);

    const hasRole = (roleNames: string[]) => {
        return roles.some((role: string) => roleNames.includes(role));
    };

    const allLinks = [
        {
            name: 'Dashboard',
            href: route('dashboard'),
            icon: LayoutDashboard,
            active: url.startsWith('/dashboard'),
            roles: ['Superadmin', 'Admin', 'Teacher', 'Proctor', 'Student']
        },
        {
            name: 'Classrooms',
            href: route('classrooms.index'),
            icon: Users,
            active: url.startsWith('/classrooms'),
            roles: ['Superadmin', 'Admin']
        },
        {
            name: 'Subjects',
            href: route('subjects.index'),
            icon: BookOpen,
            active: url.startsWith('/subjects'),
            roles: ['Superadmin', 'Admin']
        },
        {
            name: 'Questions',
            href: route('questions.index'),
            icon: FileQuestion,
            active: url.startsWith('/questions'),
            roles: ['Superadmin', 'Admin', 'Teacher']
        },
        {
            name: 'Exams',
            href: route('exams.index'),
            icon: Calendar,
            active: url.startsWith('/exams'),
            roles: ['Superadmin', 'Admin', 'Teacher']
        },
        {
            name: 'My Exams',
            href: route('student.exams.index'),
            icon: FileQuestion,
            active: url.startsWith('/student/exams'),
            roles: ['Student']
        },
        {
            name: 'Monitoring',
            href: route('proctor.exams.index'),
            icon: Monitor,
            active: url.startsWith('/proctor/exams'),
            roles: ['Proctor', 'Superadmin', 'Admin']
        },
    ];

    const links = allLinks.filter(link => hasRole(link.roles));

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
                <div className="mb-4 px-3">
                    <div className="text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">
                        Logged in as
                    </div>
                    <div className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        {user.name}
                    </div>
                    <div className="truncate text-xs text-gray-500 dark:text-gray-400">
                        {roles.join(', ')}
                    </div>
                </div>
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
