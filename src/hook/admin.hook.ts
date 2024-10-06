import { getAllUser } from "@/Services/Admin";
import { useQuery } from "@tanstack/react-query";

export const useGetallUsers = () => {
    return useQuery<any, Error>({
        queryKey: ["getAllUsers"],
        queryFn: async () =>  getAllUser(),
        refetchInterval: 30000,
    });

  
};