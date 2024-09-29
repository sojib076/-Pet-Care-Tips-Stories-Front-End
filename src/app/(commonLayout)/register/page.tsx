/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, ChangeEvent } from "react";
import { Button } from "@nextui-org/react";
import HookForm from "@/app/components/Form/HookForm";
import FXInput from "@/app/components/Form/HookInput";
import { FieldValues } from "react-hook-form";
import { useUserRegister } from "@/hook/auth.hook"; // Your custom hook
import Image from "next/image";
import { motion } from 'framer-motion';
import { Loader } from "lucide-react";
import GoogleLoginBtn from "../components/page/shared/GoogleLoginBtn";
import Link from "next/link";
import { useRouter } from "next/navigation";


const RegisterPage = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([]); 
  const [imagePreview, setImagePreview] = useState<string | null>(null); 
  const { mutate: userRegister, isPending ,isSuccess} = useUserRegister();
  const router = useRouter();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; 

    if (file) {
      setImageFiles([file]); 


      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); 
      };
      reader.readAsDataURL(file); 
    }
  };


  const onSubmit = (data: FieldValues) => {
   
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    if (imageFiles.length > 0) {
      formData.append('profileImage', imageFiles[0]); 
    }

  
    userRegister(formData);
  };

  if(isSuccess){
    return router.push('/login');
  }

  return (
    <>
      <div className="pb-20 lg:grid grid-cols-2 items-center justify-center lg:w-[90%] px-10 pt-10 mx-auto shadow-inner shadow-gray-400 mt-20 rounded-lg">
        {/* Left side: Image */}
        <motion.div
          className="lg:block hidden"
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="https://sierra.keydesign.xyz/helpdesk/wp-content/uploads/sites/11/2023/10/sierra-helpdesk-hero.jpg"
            alt="register"
            width={500}
            height={500}
          />
        </motion.div>

        {/* Right side: Form */}
        <motion.div
          className="flex h-[calc(100vh-200px)] lg:w-full flex-col lg:items-center justify-center lg:px-0 px-5 lg:py-0 mt-20 lg:mt-0"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h3
            className="my-2 text-2xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: [0, -10, 10, -10, 10, 0] }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Register
          </motion.h3>

          <motion.p
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Create your account and get started!
          </motion.p>

          {/* Form */}
          <div className="lg:w-[100%]">
            <HookForm onSubmit={onSubmit}>
              {/* Name Field */}
              <motion.div className="py-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <FXInput label="Name" name="name" type="text" />
              </motion.div>

              {/* Email Field */}
              <motion.div className="py-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
                <FXInput label="Email" name="email" type="email" />
              </motion.div>

              {/* Password Field */}
              <motion.div className="py-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
                <FXInput label="Password" name="password" type="password" />
              </motion.div>

              {/* Image Upload */}
              <div className="min-w-fit flex-1">
                <label className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400" htmlFor="image">
                  Upload image
                </label>
                <input className="hidden" id="image" type="file" onChange={handleImageChange} accept="image/*" />
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-4">
                  <img src={imagePreview} alt="Image Preview" className="w-20 h-auto rounded-md" />
                </div>
              )}

              {/* Submit Button */}
              <Button className="my-3 w-full rounded-md bg-lime-900 font-semibold text-white button" size="lg" type="submit">
                {!isPending && (
                  <motion.span initial={{ x: 0, opacity: 1 }} animate={{ x: isPending ? -100 : 0, opacity: isPending ? 0 : 1 }} transition={{ duration: 0.2 }} style={{ position: 'absolute' }}>
                    Register
                  </motion.span>
                )}
                {isPending && (
                  <motion.span initial={{ x: -80, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }} style={{ position: 'absolute' }}>
                    <Loader size={40} className="animate-spin" />
                  </motion.span>
                )}
              </Button>
            </HookForm>

            {/* Google Login */}
            <motion.div className="my-3 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}>
              <span className="ml-2">
                <GoogleLoginBtn />
              </span>
            </motion.div>

            {/* Login Link */}
            <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}>
              Already have an account? <Link href="/login">Login</Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default RegisterPage;
