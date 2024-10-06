"use client";

import { useGetallUsers } from "@/hook/admin.hook";

import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table"; 
import PostHistoryTableSkeleton from "../../(userDashboard)/dashboard/components/PostHistoryTableSkeleton";
import { updateUser, updateUserRole } from "@/Services/Admin";
import { toast } from "sonner";

const AllUser = () => {
  const { data, isLoading ,refetch } = useGetallUsers();
 

  if (isLoading) {
    return <PostHistoryTableSkeleton />;
  }

  const handlePromoteToAdmin = async (userId: string) => {
    const result = await updateUserRole(userId);

    if (result?.success) {
        refetch();
        toast.success("User promoted to admin successfully");
      
    } else {
      console.log("Failed to promote user to admin");
    }



  };

  const handleDemoteToUser =  async(userId: string) => {
    const result = await updateUser(userId);
    console.log(result, 'result');

    if (result?.success) {
        refetch();
        toast.success("Admin demoted to user successfully");
      
    } else {
      console.log("Failed to promote user to admin");
    }
  };

  const handleBlockUser = () => {

  };

  return (
    <div className="mt-10">
      <h1 className="text-xl font-bold mb-5">User List</h1>
      <Table aria-label="User list table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {data?.data?.map(
            (user: {
              _id: React.Key | null | undefined;
              name: string;
              email: string;
              role: string;
            }) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {user.role === "user" ? (
                    <button
                      onClick={() => handlePromoteToAdmin(user._id as string)}
                      className="mr-2 bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Promote to Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDemoteToUser(user._id as string)}
                      className="mr-2 bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Demote to User
                    </button>
                  )}
                  <button
                    onClick={() => handleBlockUser(user._id as string)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Block User
                  </button>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllUser;
