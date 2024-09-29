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
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
  
    return error?.response?.data;
  }
};
  


export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    console.log(decodedToken, "decodedToken");
    return {
      _id: decodedToken._id,
      name: decodedToken.name,
      email: decodedToken.email,
      role: decodedToken.role,
    };
  }

  return decodedToken;
};