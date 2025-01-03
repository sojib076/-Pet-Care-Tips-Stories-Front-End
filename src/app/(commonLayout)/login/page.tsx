"use client";

import { Button, Input } from "@nextui-org/react";
import GoogleLoginBtn from "../components/page/shared/GoogleLoginBtn";

import Link from "next/link";

import { useUserLogin } from "@/hook/auth.hook";

import Image from "next/image";
import { motion } from 'framer-motion';

import { useUser } from "@/context/uAuthContext";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const { mutate: userLogin, isPending, isSuccess } = useUserLogin();
  const { setIsLoading: isloading, user } = useUser()
  const [email, setEmail] = useState('');

  



  const [password, setPassword] = useState('');
  const onSubmit = () => {

    userLogin({ email, password });
    isloading(true);

  };
  const setDefaultCredentials = (role: 'user' | 'admin') => {
    if (role === 'user') {
      setEmail('user_1@gmail.com');
      setPassword('123456');

    } else {
      setEmail('admin@gmail.com');
      setPassword('123456');

    }


  };

  useEffect(() => {
    if (!isPending && isSuccess &&user ) {
      router.push('/newsfeed');

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
            src="https://i.ibb.co.com/5LjWxyX/Untitled-design.png"
            alt="login"
            width={1000}
            height={80}
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
                <div className="  mb-8 lg:ml-[5%] mt-5 ">
                  Default Credentials
                  <div className="space-x-5 mt-5"> 
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

                </div>
              </span>
            </motion.div>


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
