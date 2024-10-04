/* eslint-disable @typescript-eslint/no-explicit-any */
import { forgetuserPassword, loginUser, registerUser,  } from "@/Services/AuthServices";
import {  useMutation,  } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useUserLogin = () => {
    return useMutation<any, Error, FieldValues>({
      mutationKey: ["USER_LOGIN"],
      mutationFn: async (userData) => await loginUser(userData),
     

      onSuccess: (data) => {
        if (data.success) {
          toast.success(data.message);
        }else{
          toast.error(data.message);
        }
      },
      onError: (error) => {
        console.log(error.message);
      },
    });
  };


export const useUserRegister = () => {
    return useMutation<any, Error, FieldValues>({
      mutationKey: ["USER_REGISTER"],
      mutationFn: async (userData) => await registerUser(userData),
      onSuccess: (data) => {
        if (data) {
          toast.success(data.message);
        }
      },
      onError: (error) => {
        console.log(error.message);
      },
    });
  };
  


  export  const useForgotPassword = () => {
    return useMutation<any, Error, FieldValues>({
      mutationKey: ["USER_FORGOT_PASSWORD"],
      mutationFn: async (userData) => await forgetuserPassword(userData),
      onSuccess: (data) => {
        if (data) {
          console.log(data);
          toast.success(data.message);
        }
      },
      onError: (error) => {
        console.log(error.message);
        console.log(error.message);
      },
    });

  };
  

