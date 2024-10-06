"use server";


import axiosInstance from "@/app/lib/AxiosInstance/axiosInstance";


export const getAllUser = async ( ) => {

        try {
            const { data } = await axiosInstance.get(`/admin/getalluser`,);
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
