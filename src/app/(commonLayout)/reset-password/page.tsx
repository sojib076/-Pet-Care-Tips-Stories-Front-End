"use client";

import HookForm from '@/app/components/Form/HookForm';
import HookInput from '@/app/components/Form/HookInput';
import { resetPassword } from '@/Services/AuthServices';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React from 'react';
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
        <div>
            <h1>Reset Password</h1>
            <HookForm onSubmit={onSubmit}>
                <HookInput name="password" label="Password" type="password" required />
                <Button type="submit">Reset Password</Button>
            </HookForm>
        </div>
    );
};

export default ResetPassword;
