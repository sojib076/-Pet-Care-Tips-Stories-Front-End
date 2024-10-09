import { getAllUser, userAllPayment } from "@/Services/Admin";
import { useQuery } from "@tanstack/react-query";

export const useGetallUsers = (page:number) => {
    return useQuery<any, Error>({
        queryKey: ["getAllUsers"],
        queryFn: async () =>  getAllUser(page),
        refetchInterval: 30000,
    });

  
};


export const useGetallPayment = (page:number) => {
    return useQuery<any, Error>({
        queryKey: ["getAllPayment"],
        queryFn: async () =>  userAllPayment(page),
        refetchInterval: 30000,
    });
};