/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import HookForm from '@/app/components/Form/HookForm';
import Hookinput from '@/app/components/Form/HookInput';
import { resetPassword } from '@/Services/AuthServices';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { FieldValues } from 'react-hook-form';

const ResetPassword = ({ searchParams }: { searchParams: any }) => {
    const router = useRouter();
    const params = new URLSearchParams(searchParams);
    const token = params.get('token');
    const userId = params.get('id');

    const onSubmit = async (data: FieldValues) => {
        const userData = {
            password: data.password,
            userId,
            token,
        }
        resetPassword(userData);
        router.push('/login');
    };

    return (
        <div className="w-[50%] mx-auto mt-[10%]">
            <h1>Change Your Password</h1>
            <HookForm onSubmit={onSubmit}>
                <Hookinput name="password" label="password" type="password" required />
                <Button type="submit" className='mt-5 w-full bg-black text-white dark:bg-gray-500' >Change</Button>
            </HookForm>
        </div>
    );
};

export default ResetPassword;
