/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/app/lib/AxiosInstance/axiosInstance";

export const userProfile = async()=>{

    try {
        const {data} = await axiosInstance.get('/user/me');
       
        return data;

        
    } catch (error:any) {
    
        return error?.response?.data;
    }

}


export const userUpdate = async (userdata: any)=>{
    try {
        const {data} = await axiosInstance.put('/user/me',userdata);
        return data;
    } catch (error:any) {
        return error?.response?.data;
    }
}