import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import { MonitorPlay } from 'lucide-react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 pt-6 sm:pt-0 dark:bg-gray-900">
            <div className="mb-6 flex flex-col items-center">
                <Link href="/" className="flex items-center gap-2 mb-4">
                    <MonitorPlay className="h-12 w-12 text-primary-500" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">MariCBT</h1>
                <p className="text-gray-500 dark:text-gray-400">Secure & Realtime Examination Platform</p>
            </div>

            <div className="w-full overflow-hidden bg-white px-6 py-8 shadow-xl sm:max-w-md sm:rounded-2xl dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                {children}
            </div>
        </div>
    );
}
