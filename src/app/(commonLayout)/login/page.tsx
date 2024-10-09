"use client";

import { Button } from "@nextui-org/react";
import GoogleLoginBtn from "../components/page/shared/GoogleLoginBtn";
import HookForm from "@/app/components/Form/HookForm";
import FXInput from "@/app/components/Form/HookInput";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import loginValidationSchema from "@/schema/loginValidationSchema";
import { useUserLogin } from "@/hook/auth.hook";
import { FieldValues } from "react-hook-form";
import Image from "next/image";
import { motion } from 'framer-motion';
import { Loader,  } from "lucide-react";
import { useUser } from "@/context/uAuthContext";
import { useEffect } from "react";

import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const {user} = useUser();
  const {mutate:userLogin,isPending,isSuccess}=useUserLogin();
  const {setIsLoading:isloading,}=useUser()

  const onSubmit = (data: FieldValues) => {
    userLogin(data);
    isloading(true);

  }; 
  
 useEffect(() => {
      if (!isPending && isSuccess && user) {
      
          if (user?.role ==="admin") {
            router.push("/admin-dashboard");
          } else  {
            router.push("/dashboard");
          }
        
      }
    }, );

   
  return (
    <>


<div 

className="lg:grid grid-cols-2 items-center justify-center lg:w-[90%] px-10 pt-10 mx-auto  shadow-inner shadow-gray-400 mt-20 rounded-lg "> 
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
     animate={{ opacity: 1 ,
      x: [0, -10, 10, -10, 10, 0],
      }}  transition={{ 
        duration: 1, 
        delay: 0.2,
   
      }} >
      Login
    </motion.h3>
    
    <motion.p className="mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
      Welcome Back! Let&rsquo;s Get Started
    </motion.p>
    
    <div className="lg:w-[100%]">
      <HookForm onSubmit={onSubmit} resolver={zodResolver(loginValidationSchema)}>
        <motion.div className="py-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <FXInput label="Email" name="email" type="email" />
        </motion.div>
        
        <motion.div className="py-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <FXInput label="Password" name="password" type="password" />
        </motion.div>

        <Button
          className="my-3 w-full rounded-md bg-blue-900 font-semibold text-white button"
          size="lg"
          type="submit"
        >
          {!isPending && (
            <motion.span
              initial={{ x: 0, opacity: 1 }}
              animate={{ x: isPending ? -100 : 0, opacity: isPending ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              style={{ position: 'absolute' }}
            >
              Login
            </motion.span>
          )}
          {isPending && (
            <motion.span
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              style={{ position: 'absolute' }}
            >
              <Loader size={40} className="animate-spin" />
            </motion.span>
          )}
        </Button>
      </HookForm>

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

      <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}>
        Don&rsquo;t have an account? <Link href={"/register"}>Register</Link>
      </motion.div>
      <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}>
        <Link href={"/forget-password"} className="text-blue-900" >Forget Password?</Link>
      </motion.div>
    </div>
  </motion.div>
</div>

    </>
  );
};

export default LoginPage;
