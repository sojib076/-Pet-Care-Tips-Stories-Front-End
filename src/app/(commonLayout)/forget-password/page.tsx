"use client";

import HookForm from "@/app/components/Form/HookForm";
import Hookinput from "@/app/components/Form/HookInput";
import { useForgotPassword } from "@/hook/auth.hook";
import { Button } from "@nextui-org/react";
import { FieldValues } from "react-hook-form";

const ForgetPassword = () => {
    const {mutate:forgetPassword}=useForgotPassword();
    const onSubmit = async (data: FieldValues) => {
        forgetPassword(data);
    };
    return (
        <div className="dark:bg-black"> 
            <div className="w-[50%] mx-auto py-20 min-h-screen  ">
            <h1>Please Enter Your Email </h1>
            <HookForm onSubmit={onSubmit}>
                <Hookinput name="email" label="Email" type="email" required />
                <Button type="submit" className='mt-5 w-full bg-blue-900 text-white ' >Send Email</Button>
            </HookForm>
        </div>
        </div>
    );
};

export default ForgetPassword;