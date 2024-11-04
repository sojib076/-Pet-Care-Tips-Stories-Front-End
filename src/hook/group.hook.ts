import { createGroup, discoverGroups, getUserCreateGroup } from "@/Services/Group";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export  const useCreateGroup = () => {
    return useMutation<any, Error>({
      mutationKey: ["createGroup"],
      mutationFn: async (groupData) => await createGroup(groupData),
        onSuccess: (data) => {
            console.log(data);
            if (data?.success) {
            toast.success('Group created successfully');
          
            }
            else{
            toast.error('Group creation failed');
            }
        },
    });

  };

//   getUserCreateGroup
   export const useGetUserCreateGroup = () => {
    return useQuery<any, Error>({
      queryKey: ["getUserCreateGroup"],
      queryFn: async () => await getUserCreateGroup(),
    });
   };


   export const useDiscoverGroups = () => {
    return useQuery<any, Error>({
      queryKey: ["discoverGroups"],
      queryFn: async () => await discoverGroups(),
    });
   };