"use client";

import { Button, Input } from "@nextui-org/react";
import GoogleLoginBtn from "../components/page/shared/GoogleLoginBtn";

import Link from "next/link";

import { useUserLogin } from "@/hook/auth.hook";
import { FieldValues } from "react-hook-form";
import Image from "next/image";
import { motion } from 'framer-motion';

import { useUser } from "@/context/uAuthContext";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const { mutate: userLogin, isPending, isSuccess } = useUserLogin();
  const { setIsLoading: isloading, } = useUser()
  const [email, setEmail] = useState('');
  const [passwords, setPasswords] = useState('123456');





  const [password, setPassword] = useState('');
  const onSubmit = (data: FieldValues) => {

    userLogin({ email, password });
    isloading(true);

  };
  const setDefaultCredentials = (role: 'user' | 'admin') => {
    if (role === 'user') {
      setEmail('user_1@gmail.com');
      setPassword('123456');

    } else {
      setEmail('admin@gmail.com');
      setPasswords('123456');

    }


  };

  useEffect(() => {
    if (!isPending && isSuccess && user) {

      if (user?.role === "admin") {
        router.push("/admin-dashboard");
      } else {
        router.push("/dashboard");
      }

    }
  },);


  return (
    <div className="dark:bg-black p-10">


      <div

        className="lg:grid grid-cols-2 min-h-screen bg-gray-300 dark:bg-gray-500 items-center justify-center lg:w-[90%] px-10 pt-20 mx-auto  shadow-inner shadow-gray-400  rounded-lg ">
        <motion.div
          className="lg:block hidden"
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="https://sierra.keydesign.xyz/helpdesk/wp-content/uploads/sites/11/2023/10/sierra-helpdesk-hero.jpg"
            alt="login"
            width={500}
            height={500}
          />
        </motion.div>

        <motion.div
          className="flex h-[calc(100vh-200px)] lg:w-full flex-col lg:items-center justify-center lg:px-0 px-5 lg:py-0 mt-20 lg:mt-0"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h3 className="my-2 text-2xl font-bold" initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              x: [0, -10, 10, -10, 10, 0],
            }} transition={{
              duration: 1,
              delay: 0.2,

            }} >
            Login
          </motion.h3>

          <motion.p className="mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            Welcome Back! Let&rsquo;s Get Started
          </motion.p>

          <div className="lg:w-[100%]">
            <div className="space-y-4">
              <div className="space-y-2">

                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2 relative ">

                <Input

                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required

                />

              </div>
              <Button
                type="submit"
                onClick={onSubmit}
                className="bg-gray-800 text-white w-full"
              >
                {isPending ? 'Loading...' : 'Login'}
              </Button>
            </div>

            <motion.div
              className="my-3 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <span className="ml-2">
                <GoogleLoginBtn />
              </span>
            </motion.div>
            <div className="flex space-x-4 mb-8 ">
              <Button onClick={() => setDefaultCredentials('user')} className=" text-white
                bg-blue-900 ">
                User
              </Button>
              <Button onClick={() => setDefaultCredentials('admin')} className="
                  text-white
                bg-blue-900 
                
                
                
                ">
                Admin
              </Button>
            </div>

            <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}>
              Don&rsquo;t have an account? <Link href={"/register"}>Register</Link>
            </motion.div>
            <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}>
              <Link href={"/forget-password"} className="text-blue-900" >Forget Password?</Link>
            </motion.div>
          </div>
        </motion.div>



      </div>

    </div>
  );
};

export default LoginPage;
