import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { FormEventHandler } from 'react';
import { BookOpen, Hash } from 'lucide-react';

interface Subject {
    id: number;
    code: string;
    name: string;
}

interface Props {
    subject: Subject;
}

export default function Edit({ subject }: Props) {
    const { data, setData, put, processing, errors, reset } = useForm({
        code: subject.code,
        name: subject.name,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('subjects.update', subject.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit Subject
                </h2>
            }
        >
            <Head title="Edit Subject" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="code" value="Code" />

                                    <div className="relative mt-1">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <Hash className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <TextInput
                                            id="code"
                                            name="code"
                                            value={data.code}
                                            className="block w-full pl-10"
                                            autoComplete="code"
                                            isFocused={true}
                                            onChange={(e) => setData('code', e.target.value)}
                                            placeholder="e.g. MAT-10"
                                            required
                                        />
                                    </div>

                                    <InputError message={errors.code} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="name" value="Name" />

                                    <div className="relative mt-1">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <BookOpen className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <TextInput
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            className="block w-full pl-10"
                                            autoComplete="name"
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="e.g. Mathematics"
                                            required
                                        />
                                    </div>

                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="mt-4 flex items-center justify-end">
                                    <PrimaryButton className="ms-4 bg-primary-600 hover:bg-primary-700 focus:ring-primary-500" disabled={processing}>
                                        Update
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
