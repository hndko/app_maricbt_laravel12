import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ShieldCheck, Zap, BarChart3, MonitorPlay } from 'lucide-react';

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    return (
        <>
            <Head title="Welcome to MariCBT" />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans selection:bg-primary-500 selection:text-white">

                {/* Navbar */}
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <MonitorPlay className="w-8 h-8 text-primary-500" />
                        <span className="text-xl font-bold tracking-tight">MariCBT</span>
                    </div>
                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-primary-500/30"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* Hero Section */}
                <main className="container mx-auto px-6 pt-16 pb-24 text-center lg:text-left lg:flex lg:items-center lg:gap-16">
                    <div className="lg:w-1/2">
                        <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight mb-6">
                            The Modern <span className="text-primary-500">Computer Based Test</span> Platform
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                            Experience a secure, realtime, and analytics-driven examination system designed for the future of education.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link
                                href={route('register')}
                                className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white text-lg font-semibold rounded-xl transition-all shadow-xl shadow-primary-500/20 hover:shadow-primary-500/40"
                            >
                                Get Started
                            </Link>
                            <a
                                href="#features"
                                className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 text-lg font-semibold rounded-xl transition-all"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                    <div className="hidden lg:block lg:w-1/2 relative">
                        <div className="absolute inset-0 bg-primary-500/10 blur-3xl rounded-full"></div>
                        <img
                            src="https://illustrations.popsy.co/amber/student-going-to-school.svg"
                            alt="CBT Illustration"
                            className="relative z-10 w-full h-auto drop-shadow-2xl"
                        />
                    </div>
                </main>

                {/* Features Section */}
                <section id="features" className="bg-white dark:bg-gray-800 py-20">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold mb-4">Why Choose MariCBT?</h2>
                            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                Built with the latest technology to ensure reliability, security, and ease of use.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-primary-500/50 transition-colors">
                                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-6">
                                    <ShieldCheck className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Secure Exams</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Advanced anti-cheating mechanisms including browser focus tracking and randomized questions.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-primary-500/50 transition-colors">
                                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-6">
                                    <Zap className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Realtime Sync</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Live monitoring of student progress and instant submission handling via WebSockets.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-primary-500/50 transition-colors">
                                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-6">
                                    <BarChart3 className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Deep Analytics</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Comprehensive reports on student performance, item analysis, and difficulty levels.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-8 text-center text-gray-500 dark:text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} MariCBT. Built with Laravel 12 & React.</p>
                </footer>
            </div>
        </>
    );
}
