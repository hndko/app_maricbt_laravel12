import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { FormEventHandler } from 'react';

interface Classroom {
    id: number;
    name: string;
    level: string;
}

interface Props {
    classroom: Classroom;
}

export default function Edit({ classroom }: Props) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: classroom.name,
        level: classroom.level || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('classrooms.update', classroom.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit Classroom
                </h2>
            }
        >
            <Head title="Edit Classroom" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="name" value="Name" />

                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="level" value="Level" />

                                    <TextInput
                                        id="level"
                                        name="level"
                                        value={data.level}
                                        className="mt-1 block w-full"
                                        autoComplete="level"
                                        onChange={(e) => setData('level', e.target.value)}
                                    />

                                    <InputError message={errors.level} className="mt-2" />
                                </div>

                                <div className="mt-4 flex items-center justify-end">
                                    <PrimaryButton className="ms-4" disabled={processing}>
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
