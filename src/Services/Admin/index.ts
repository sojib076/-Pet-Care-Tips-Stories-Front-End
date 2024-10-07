"use server";


import axiosInstance from "@/app/lib/AxiosInstance/axiosInstance";


export const getAllUser = async ( page:number ) => {
    console.log(page, 'page');

        try {
            const { data } = await axiosInstance.get(`/admin/getalluser?page=${page}`,);
            return data;
            
        } catch (error) {
            
            return error?.response?.data;
        }

}

export const updateUserRole = async (userId: string) => {
    console.log(userId, 'userId');
    try {
        const { data } = await axiosInstance.put(`/admin/roleamdin?id=${userId}` );
      console.log(userId, 'data');
        return data;
    } catch (error) {
        console.log(error, 'error');
        return error?.response?.data;
    }
}

export const updateUser = async (userId: string) => {
   
    try {
        const { data } = await axiosInstance.put(`/admin/roleuser?id=${userId}` );
      console.log(userId, 'data');
        return data;
    } catch (error) {
        console.log(error, 'error');
        return error?.response?.data;
    }
}


export const userBlock = async (userId: string) => {

    try {
        const { data } = await axiosInstance.put(`/admin/userblock?id=${userId}` );
      console.log(userId, 'data');
        return data;
    } catch (error) {
        console.log(error, 'error');
        return error?.response?.data;
    }
}


