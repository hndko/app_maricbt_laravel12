import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { FormEventHandler } from 'react';
import { BookOpen, Users, Clock, Calendar, Type } from 'lucide-react';

interface Subject {
    id: number;
    code: string;
    name: string;
}

interface Classroom {
    id: number;
    name: string;
}

interface Props {
    subjects: Subject[];
    classrooms: Classroom[];
}

export default function Create({ subjects, classrooms }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        subject_id: '',
        classroom_id: '',
        start_time: '',
        end_time: '',
        duration: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('exams.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Create Exam
                </h2>
            }
        >
            <Head title="Create Exam" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit}>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="col-span-2">
                                        <InputLabel htmlFor="title" value="Exam Title" />
                                        <div className="relative mt-1">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <Type className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <TextInput
                                                id="title"
                                                name="title"
                                                value={data.title}
                                                className="block w-full pl-10"
                                                autoComplete="title"
                                                isFocused={true}
                                                onChange={(e) => setData('title', e.target.value)}
                                                placeholder="e.g. Midterm Exam"
                                                required
                                            />
                                        </div>
                                        <InputError message={errors.title} className="mt-2" />
                                    </div>

                                    <div>
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

                                    <div>
                                        <InputLabel htmlFor="classroom_id" value="Classroom" />
                                        <div className="relative mt-1">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <Users className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <select
                                                id="classroom_id"
                                                name="classroom_id"
                                                value={data.classroom_id}
                                                className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 pl-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                                onChange={(e) => setData('classroom_id', e.target.value)}
                                                required
                                            >
                                                <option value="">Select Classroom</option>
                                                {classrooms.map((classroom) => (
                                                    <option key={classroom.id} value={classroom.id}>
                                                        {classroom.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <InputError message={errors.classroom_id} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="start_time" value="Start Time" />
                                        <div className="relative mt-1">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <Calendar className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <TextInput
                                                id="start_time"
                                                type="datetime-local"
                                                name="start_time"
                                                value={data.start_time}
                                                className="block w-full pl-10"
                                                onChange={(e) => setData('start_time', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <InputError message={errors.start_time} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="end_time" value="End Time" />
                                        <div className="relative mt-1">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <Calendar className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <TextInput
                                                id="end_time"
                                                type="datetime-local"
                                                name="end_time"
                                                value={data.end_time}
                                                className="block w-full pl-10"
                                                onChange={(e) => setData('end_time', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <InputError message={errors.end_time} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="duration" value="Duration (minutes)" />
                                        <div className="relative mt-1">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <Clock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <TextInput
                                                id="duration"
                                                type="number"
                                                name="duration"
                                                value={data.duration}
                                                className="block w-full pl-10"
                                                onChange={(e) => setData('duration', e.target.value)}
                                                placeholder="e.g. 60"
                                                required
                                            />
                                        </div>
                                        <InputError message={errors.duration} className="mt-2" />
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-end">
                                    <PrimaryButton className="ms-4 bg-primary-600 hover:bg-primary-700 focus:ring-primary-500" disabled={processing}>
                                        Create Exam
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
