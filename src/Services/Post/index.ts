/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/app/lib/AxiosInstance/axiosInstance";
import { FieldValues } from "react-hook-form";

    
   export const createPost = async (userData: FieldValues) => {
    
      try {
        const { data } = await axiosInstance.post("/post/createpost", userData);
        return data;
      } catch (error: any) {
        return error?.response?.data;
      }
    };


export const getPost = async ( ) => {


  try {
    const { data } = await axiosInstance.get(`/post/get`,);

    return data;
  } catch (error: any) { 
    
    return error?.response?.data;
   
  }
};


export const upvotePost = async (postId: string) => {

  try {
    const { data } = await axiosInstance.post(`/post/upvotepost/`, { postId }); 
    
    return data;
  } catch (error: any) {
   
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

export const getFollowedUsersPosts = async () => {
  try {
    const { data } = await axiosInstance.get("/post/getfollwingposts");
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};


export  const getsearch =  async (searchTerm: string, searchCategory: string) => {
  
  try {
    const { data } = await axiosInstance.get(`/post/search?searchTerm=${searchTerm}&searchCategory=${searchCategory}`);
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};




export const getPostById = async (postId: string) => {
 
  try {
    const { data } = await axiosInstance.get(`/post/${postId}`);
    
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};


export const updatePost = async (postData: { postId: any; title: any; content: any; category: any; premiumContent: any; }) => {
  try {
    const { data } = await axiosInstance.put(`/post/editpost`, postData);
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
}


export const deletePost = async (postId: string) => {
  try {
    const { data } = await axiosInstance.delete(`/post/deletepost`, { data: { postId } });
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const getuserposts = async () => {
  try {
    const { data } = await axiosInstance.get(`/user/getuserposts`);
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};


export const getcategory = async (category:string) => {
  
  try {
      const { data } = await axiosInstance.get(`post/category?category=${category}`);
   
      return data;
  } catch (error) {
    return error?.response?.data;
    
  }
} 

export const handelpayment = async (postId: string,userId: string) => {
  try {
    const { data } = await axiosInstance.post(`/payment/initiate?postId=${postId}&userId=${userId}`, );
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
} 


export const getallpostadmin = async (page: number) => {

  try {
    const { data } = await axiosInstance.get(`/admin/getallpost?page=${page}`);

    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const postpublish = async (postId: string) => {
  try {
    const { data } = await axiosInstance.post(`/admin/postpublish`, { postId });
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
}