"use server";


import axiosInstance from "@/app/lib/AxiosInstance/axiosInstance";


export const getAllUser = async ( page:number ) => {
  

        try {
            const { data } = await axiosInstance.get(`/admin/getalluser?page=${page}`,);
            return data;
            
        } catch (error) {
            
            return error?.response?.data;
        }

}

export const updateUserRole = async (userId: string) => {
   
    try {
        const { data } = await axiosInstance.put(`/admin/roleamdin?id=${userId}` );
   
        return data;
    } catch (error) {
       
        return error?.response?.data;
    }
}

export const updateUser = async (userId: string) => {
   
    try {
        const { data } = await axiosInstance.put(`/admin/roleuser?id=${userId}` );
     
        return data;
    } catch (error) {
      
        return error?.response?.data;
    }
}


export const userBlock = async (userId: string) => {

    try {
        const { data } = await axiosInstance.put(`/admin/userblock?id=${userId}` );
   
        return data;
    } catch (error) {
       
        return error?.response?.data;
    }
}


export const userAllPayment = async (page:number) => {
    try {
        const { data } = await axiosInstance.get(`/admin/payment?page=${page}`);
        return data;
    } catch (error) {
        return error?.response?.data;
    }
}


