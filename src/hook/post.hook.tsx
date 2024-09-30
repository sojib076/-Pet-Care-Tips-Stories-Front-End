/* eslint-disable @typescript-eslint/no-explicit-any */
import { createPost, upvotePost } from "@/Services/Post";
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
  

  export const useUpvotePost = () => {
    return useMutation<any, Error,string>({
      mutationKey: ["USER_FORGOT_PASSWORD"],
      mutationFn: async (postId) => await upvotePost(postId),
      onSuccess: (data) => {
        if (data?.success) {
          toast.success('Post upvoted successfully');
        }
        else{
          toast.error('Post upvote failed');
        }
      },
      onError: (error) => {
        console.log(error.message);
      },
    });
  };