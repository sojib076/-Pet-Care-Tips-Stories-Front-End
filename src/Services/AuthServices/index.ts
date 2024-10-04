/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";


import axiosInstance from "@/app/lib/AxiosInstance/axiosInstance";
import { jwtDecode } from "jwt-decode";
import { cookies, } from "next/headers";

import { FieldValues } from "react-hook-form";


export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
    }

    return data;
  } catch (error: any) {
  
    return error?.response?.data;
  }
};

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/register", userData);
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
}
  
export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return {
      _id: decodedToken._id,
      name: decodedToken.name,
      email: decodedToken.email,
      role: decodedToken.role,
      img: decodedToken.img,
    };
  }
  return decodedToken;
};

export const logout = () => {
  cookies().delete("accessToken");
  

  return true;
  
};


export const resetPassword = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/reset-password", userData);
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};


export const forgetuserPassword = async (email:FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/forget-password", email);
    console.log(data);
    return data;
  } catch (error: any) { 
    console.log(error);
    return error?.response?.data;
   
  }
};