/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/app/lib/AxiosInstance/axiosInstance";
import { FieldValues } from "react-hook-form";

    
   export const createPost = async (userData: FieldValues) => {
      console.log(userData,'userData');
      try {
        const { data } = await axiosInstance.post("/post/createpost", userData);
        return data;
      } catch (error: any) {
        return error?.response?.data;
      }
    };

export const getPost = async () => {
  try {
    const { data } = await axiosInstance.get("/post/get");
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};


export const upvotePost = async (postId: string) => {
  console.log(postId, 'postId');
  try {
    const { data } = await axiosInstance.post(`/post/upvotepost/`, { postId }); // postId wrapped in an object
    console.log(data, 'data');
    return data;
  } catch (error: any) {
    console.log(error, 'error');
    return error?.response?.data;
  }
}

export const downvotePost = async (postId: string) => {
  try {
    const { data } = await axiosInstance.post(`/post/downvotepost/`, {postId} );
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
export const addCommentToPost = async (postId: string, comment: string) => {
  try {
    const { data } = await axiosInstance.post(`/post/addcomment`, { postId, comment });
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};