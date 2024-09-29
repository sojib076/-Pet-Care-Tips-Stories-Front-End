/* eslint-disable @typescript-eslint/no-explicit-any */
import { loginUser,  } from "@/Services/AuthServices";
import {  useMutation,  } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useUserLogin = () => {
    return useMutation<any, Error, FieldValues>({
      mutationKey: ["USER_LOGIN"],
      mutationFn: async (userData) => await loginUser(userData),
     

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
  

