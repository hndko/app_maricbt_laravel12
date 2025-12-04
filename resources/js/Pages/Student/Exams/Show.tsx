import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';

interface Question {
    id: number;
    content: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    option_e: string;
}

interface Exam {
    id: number;
    title: string;
    duration: number;
    questions: Question[];
}

interface Props {
    exam: Exam;
    remaining_time: number;
}

export default function Show({ exam, remaining_time }: Props) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [timeLeft, setTimeLeft] = useState(remaining_time);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    finishExam(); // Auto-finish when time is up
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleAnswer = (questionId: number, answer: string) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: answer,
        }));
    };

    const finishExam = () => {
        if (confirm('Are you sure you want to finish the exam?')) {
            router.post(route('student.exams.finish', exam.id), {
                answers: answers,
            });
        }
    };

    const currentQuestion = exam.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === exam.questions.length - 1;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        {exam.title}
                    </h2>
                    <div className={`flex items-center gap-2 rounded-lg px-3 py-1 ${timeLeft < 300 ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400' : 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'}`}>
                        <Clock className="h-5 w-5" />
                        <span className="font-mono text-lg font-bold">{formatTime(timeLeft)}</span>
                    </div>
                </div>
            }
        >
            <Head title={exam.title} />

            <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                        {/* Question Area */}
                        <div className="lg:col-span-3">
                            <div className="overflow-hidden rounded-xl bg-white shadow-sm dark:bg-gray-800">
                                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-700">
                                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Question {currentQuestionIndex + 1} of {exam.questions.length}
                                    </span>
                                </div>
                                <div className="p-6">
                                    <div className="mb-6 text-lg font-medium text-gray-900 dark:text-white">
                                        {currentQuestion.content}
                                    </div>
                                    <div className="space-y-3">
                                        {['A', 'B', 'C', 'D', 'E'].map((option) => {
                                            const optionKey = `option_${option.toLowerCase()}` as keyof Question;
                                            const isSelected = answers[currentQuestion.id] === option;
                                            return (
                                                <button
                                                    key={option}
                                                    onClick={() => handleAnswer(currentQuestion.id, option)}
                                                    className={`flex w-full items-center rounded-lg border p-4 text-left transition-all ${isSelected
                                                            ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500 dark:bg-primary-900/20'
                                                            : 'border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700'
                                                        }`}
                                                >
                                                    <span
                                                        className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm font-medium ${isSelected
                                                                ? 'border-primary-500 bg-primary-500 text-white'
                                                                : 'border-gray-300 bg-white text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400'
                                                            }`}
                                                    >
                                                        {option}
                                                    </span>
                                                    <span className="ml-3 text-gray-700 dark:text-gray-300">
                                                        {currentQuestion[optionKey]}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-700">
                                    <button
                                        onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                                        disabled={currentQuestionIndex === 0}
                                        className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-50 dark:text-gray-300 dark:hover:bg-gray-600"
                                    >
                                        Previous
                                    </button>
                                    {isLastQuestion ? (
                                        <button
                                            onClick={finishExam}
                                            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                        >
                                            Finish Exam
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setCurrentQuestionIndex((prev) => Math.min(exam.questions.length - 1, prev + 1))}
                                            className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                        >
                                            Next
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Navigation Panel */}
                        <div className="lg:col-span-1">
                            <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
                                <h3 className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
                                    Question Navigation
                                </h3>
                                <div className="grid grid-cols-5 gap-2">
                                    {exam.questions.map((q, index) => {
                                        const isAnswered = answers[q.id];
                                        const isCurrent = index === currentQuestionIndex;
                                        return (
                                            <button
                                                key={q.id}
                                                onClick={() => setCurrentQuestionIndex(index)}
                                                className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors ${isCurrent
                                                        ? 'bg-primary-600 text-white ring-2 ring-primary-600 ring-offset-2 dark:ring-offset-gray-800'
                                                        : isAnswered
                                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                                    }`}
                                            >
                                                {index + 1}
                                            </button>
                                        );
                                    })}
                                </div>
                                <div className="mt-6 space-y-2">
                                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                        <div className="h-3 w-3 rounded-full bg-green-100 border border-green-200 dark:bg-green-900/20 dark:border-green-800"></div>
                                        <span>Answered</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                        <div className="h-3 w-3 rounded-full bg-primary-600"></div>
                                        <span>Current</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                        <div className="h-3 w-3 rounded-full bg-gray-100 border border-gray-200 dark:bg-gray-700 dark:border-gray-600"></div>
                                        <span>Not Answered</span>
                                    </div>
                                </div>
                                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                    <button
                                        onClick={finishExam}
                                        className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                    >
                                        Finish Exam
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
