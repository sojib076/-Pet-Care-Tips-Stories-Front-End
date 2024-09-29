import { userProfile, userUpdate } from "@/Services/User";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; 

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["USER_PROFILE"],
    queryFn: async () => await userProfile(),
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient(); 

  return useMutation({
    mutationKey: ["USER_UPDATE"],
    mutationFn: async (userData: any) => await userUpdate(userData),
    onSuccess: () => {
    
      queryClient.invalidateQueries({ queryKey: ["USER_PROFILE"] }); 
    },
    onError: (error) => {
      // Optionally handle errors here
      console.error("Error updating profile:", error);
    },
  });
};
