import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { FormEventHandler } from 'react';
import { BookOpen, HelpCircle, List } from 'lucide-react';

interface Subject {
    id: number;
    code: string;
    name: string;
}

interface Props {
    subjects: Subject[];
}

export default function Create({ subjects }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        subject_id: '',
        content: '',
        option_a: '',
        option_b: '',
        option_c: '',
        option_d: '',
        option_e: '',
        correct_answer: 'A',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('questions.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Create Question
                </h2>
            }
        >
            <Head title="Create Question" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit}>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="col-span-2">
                                        <InputLabel htmlFor="subject_id" value="Subject" />
                                        <div className="relative mt-1">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <BookOpen className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <select
                                                id="subject_id"
                                                name="subject_id"
                                                value={data.subject_id}
                                                className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 pl-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                                onChange={(e) => setData('subject_id', e.target.value)}
                                                required
                                            >
                                                <option value="">Select Subject</option>
                                                {subjects.map((subject) => (
                                                    <option key={subject.id} value={subject.id}>
                                                        {subject.name} ({subject.code})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <InputError message={errors.subject_id} className="mt-2" />
                                    </div>

                                    <div className="col-span-2">
                                        <InputLabel htmlFor="content" value="Question Content" />
                                        <div className="relative mt-1">
                                            <div className="pointer-events-none absolute top-3 left-0 flex items-start pl-3">
                                                <HelpCircle className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <textarea
                                                id="content"
                                                name="content"
                                                value={data.content}
                                                className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 pl-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                                rows={4}
                                                onChange={(e) => setData('content', e.target.value)}
                                                placeholder="Enter the question here..."
                                                required
                                            />
                                        </div>
                                        <InputError message={errors.content} className="mt-2" />
                                    </div>

                                    {['a', 'b', 'c', 'd', 'e'].map((option) => (
                                        <div key={option}>
                                            <InputLabel htmlFor={`option_${option}`} value={`Option ${option.toUpperCase()}`} />
                                            <div className="relative mt-1">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <List className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <TextInput
                                                    id={`option_${option}`}
                                                    name={`option_${option}`}
                                                    value={(data as any)[`option_${option}`]}
                                                    className="block w-full pl-10"
                                                    onChange={(e) => setData(`option_${option}` as any, e.target.value)}
                                                    placeholder={`Enter option ${option.toUpperCase()}`}
                                                    required
                                                />
                                            </div>
                                            <InputError message={(errors as any)[`option_${option}`]} className="mt-2" />
                                        </div>
                                    ))}

                                    <div>
                                        <InputLabel htmlFor="correct_answer" value="Correct Answer" />
                                        <select
                                            id="correct_answer"
                                            name="correct_answer"
                                            value={data.correct_answer}
                                            className="mt-1 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                            onChange={(e) => setData('correct_answer', e.target.value)}
                                            required
                                        >
                                            {['A', 'B', 'C', 'D', 'E'].map((opt) => (
                                                <option key={opt} value={opt}>
                                                    Option {opt}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError message={errors.correct_answer} className="mt-2" />
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-end">
                                    <PrimaryButton className="ms-4 bg-primary-600 hover:bg-primary-700 focus:ring-primary-500" disabled={processing}>
                                        Create Question
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
