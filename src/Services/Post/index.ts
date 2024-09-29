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

