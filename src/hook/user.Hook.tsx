/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserbyProfile, userProfile, userUpdate } from "@/Services/User";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; 
import { FieldValues } from "react-hook-form";

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["USER_PROFILE"],
    queryFn: async () => await userProfile(),
 
    
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient(); 

  return useMutation<any, Error,FieldValues>({
    mutationKey: ["USER_UPDATE"],
    mutationFn: async (userData) => await userUpdate(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["USER_PROFILE"] }); 
    },
   
  });
};



export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: ["USER_BY_ID", userId],
    queryFn: async () => await getUserbyProfile(userId),
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    
  });
};


