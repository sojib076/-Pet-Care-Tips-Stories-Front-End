"use server";
import axiosInstance from "@/app/lib/AxiosInstance/axiosInstance";
export const createGroup = async (groupdata) => {
  
    
    try {
      const { data } = await axiosInstance.post("/group/creategroup", groupdata);
      console.log(data);
      return data;
    } catch (error: any) {
        console.log(error.response.data);
      return error?.response?.data;
    }
  };

export const getUserCreateGroup = async () => {
    try {
      const { data } = await axiosInstance.get("/group/getusercreategroup");
      return data;
    } catch (error: any) {
      return error?.response?.data;
    }
  }

export const discoverGroups = async () => {
    try {
      const { data } = await axiosInstance.get("/group/discovergroup");
      return data;
    } catch (error: any) {
      return error?.response?.data;
    }
};


export const  deletegroup = async (id) => {
    try {
      const { data } = await axiosInstance.delete(`/group/deletegroup/${id}`);
      return data;
    } catch (error: any) {
      return error?.response?.data;
    }
}

export const getSingeGroup = async (id) => {
    try {
      const { data } = await axiosInstance.get(`/group/getsinglegroup/${id}`);
      return data;
    } catch (error: any) {
      return error?.response?.data;
    }
};