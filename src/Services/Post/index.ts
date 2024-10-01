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


export const getPost = async (category: string ) => {

  try {
    const { data } = await axiosInstance.get(`/post/get?category=${category}`,);

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
  console.log(postId, 'postId');
  try {
    const { data } = await axiosInstance.post(`/post/addcomment`, { postId, comment });
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const getFollowedUsers = async () => {
  try {
    const { data } = await axiosInstance.get("/user/getfollowedUsers");
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const followUser = async (authorId: string) => {
  try {
    const { data } = await axiosInstance.post(`/user/followuser`, { authorId });
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const  unfollowUser = async (authorId: string) => {
  try {
    const { data } = await axiosInstance.post(`/user/unfollowuser`, { authorId });
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }

};


export const editcomment = async (postId: string, commentId: string, editCommentValue: string) => {
  try {
    const { data } = await axiosInstance.put(`/post/editcomment`, { postId, commentId, editCommentValue });
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};


export const deleteComment = async (postId: string, commentId: string) => {
  try {
    const { data } = await axiosInstance.delete(`/post/deletecomment`, { data: { postId, commentId } });
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};