import Sidebar from '@/Components/Sidebar';
import { usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState, useEffect } from 'react';
import { Menu, Bell } from 'lucide-react';
import Dropdown from '@/Components/Dropdown';
import toast, { Toaster } from 'react-hot-toast';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const { auth, flash } = usePage().props as any;
    const user = auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
            <Toaster position="top-right" />
            {/* Sidebar for Desktop */}
            <div className="hidden md:block">
                <Sidebar />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="flex items-center justify-end w-full gap-4">
                        <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                            <Bell className="h-5 w-5" />
                        </button>

                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                                    <span>{user.name}</span>
                                    <img
                                        className="h-8 w-8 rounded-full bg-gray-200"
                                        src={`https://ui-avatars.com/api/?name=${user.name}&background=80E6D3&color=fff`}
                                        alt={user.name}
                                    />
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </header>

                {/* Mobile Sidebar Overlay */}
                {showingNavigationDropdown && (
                    <div className="fixed inset-0 z-50 flex md:hidden">
                        <div className="fixed inset-0 bg-black/50" onClick={() => setShowingNavigationDropdown(false)}></div>
                        <div className="relative w-64 bg-white dark:bg-gray-800">
                            <Sidebar />
                        </div>
                    </div>
                )}

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-gray-100 p-6 dark:bg-gray-900">
                    {header && (
                        <div className="mb-6">
                            {header}
                        </div>
                    )}
                    {children}
                </main>
            </div>
        </div>
    );
}
