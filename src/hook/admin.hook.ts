import { getAllUser } from "@/Services/Admin";
import { useQuery } from "@tanstack/react-query";

export const useGetallUsers = (page:number) => {
    return useQuery<any, Error>({
        queryKey: ["getAllUsers"],
        queryFn: async () =>  getAllUser(page),
        refetchInterval: 30000,
    });

  
};