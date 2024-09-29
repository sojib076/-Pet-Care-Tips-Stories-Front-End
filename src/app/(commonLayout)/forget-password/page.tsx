"use client";

import HookForm from "@/app/components/Form/HookForm";
import Hookinput from "@/app/components/Form/HookInput";
import { useForgotPassword } from "@/hook/auth.hook";
import { Button } from "@nextui-org/react";

const page = () => {


    const {mutate:forgetPassword}=useForgotPassword();

    const onSubmit = async (data: any) => {

        forgetPassword(data);
    };


    return (
        <div className="w-[50%] mx-auto mt-[10%]">
            <h1>Forget Password</h1>
            <HookForm onSubmit={onSubmit}>
                <Hookinput name="email" label="Email" type="email" required />
                <Button type="submit" className='mt-5 w-full bg-black text-white dark:bg-gray-500' >Send Email</Button>
            </HookForm>
        </div>
    );
};

export default page;