/* eslint-disable @typescript-eslint/no-explicit-any */
import { createPost, getPost, getPostById, upvotePost } from "@/Services/Post";
import {  QueryClient, useMutation, useQuery } from "@tanstack/react-query";

const queryClient = new QueryClient();
import {  FieldValues } from "react-hook-form";
import { toast } from "sonner";

export  const useCreatpost = () => {
    return useMutation<any, Error,FieldValues>({
      mutationKey: ["createPost"],
      mutationFn: async (userData) => await createPost(userData),
      onSuccess: (data) => {
        if (data?.success) {
          toast.success('Post created successfully');
          queryClient.invalidateQueries({ queryKey: ["getPost"] });
        }
        else{
          console.log(data);
          toast.error('Post creation failed');
        }
      },
      onError: (error) => {
        console.log(error.message);
      },
    });

  };
  


  
  export const useGetPost = (category: string = '',  ) => {
    return useQuery<any, Error>({
      queryKey: ["getPost", 'category'], 
      queryFn: async () => await getPost(category), 
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      
    });
  };



  export const useUpvotePost = () => {
    return useMutation<any, Error,string>({
      mutationKey: ["upvotePost"],
      mutationFn: async (postId) => await upvotePost(postId),
      onSuccess: (data) => {
        if (data?.success) {
          queryClient.invalidateQueries({ queryKey: ["getPost"] });    
            console.log(data);
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

  export const usePostbyId = (postId: string) => {
    return useQuery<any, Error>({
      queryKey: ["getPost", postId],
      queryFn: async () => await getPostById(postId),
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
  }
  )
  }



