/* eslint-disable @typescript-eslint/no-explicit-any */
import { createPost } from "@/Services/Post";
import {  useMutation } from "@tanstack/react-query";
import {  FieldValues } from "react-hook-form";
import { toast } from "sonner";

export  const useCreatpost = () => {
    return useMutation<any, Error,FieldValues>({
      mutationKey: ["USER_FORGOT_PASSWORD"],
      mutationFn: async (userData) => await createPost(userData),
      onSuccess: (data) => {
        if (data?.success) {
          toast.success('Post created successfully');
        }
        else{
          toast.error('Post creation failed');
        }
      },
      onError: (error) => {
        console.log(error.message);
      },
    });

  };
  