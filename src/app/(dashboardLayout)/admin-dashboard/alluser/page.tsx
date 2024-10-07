"use client";

import { useEffect, useState } from "react";
import { useGetallUsers } from "@/hook/admin.hook";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import PostHistoryTableSkeleton from "../../(userDashboard)/dashboard/components/PostHistoryTableSkeleton";
import { updateUser, updateUserRole, userBlock } from "@/Services/Admin";
import { toast } from "sonner";

const AllUser = () => {
  const [page, setPage] = useState(1);     
            
  const { data, isLoading, refetch } = useGetallUsers(page); 
  const [acttion, setAction] = useState(false);
  console.log(acttion, 'data');

  useEffect(() => {
  
    refetch();
    setAction(false);

  }, [page]);

  if (isLoading ) {
    return <PostHistoryTableSkeleton />;
  }

  const users = data?.data?.users;                
  const totalPages = data?.data?.totalPages || 1; 

  const handlePromoteToAdmin = async (userId: string) => {
    const result = await updateUserRole(userId);
    if (result?.success) {
        refetch();
        toast.success("User promoted to admin successfully");
    } else {
      console.log("Failed to promote user to admin");
    }
  };

  const handleDemoteToUser = async (userId: string) => {
    const result = await updateUser(userId);
    if (result?.success) {
        refetch();
        toast.success("Admin demoted to user successfully");
    } else {
      console.log("Failed to demote admin to user");
    }
  };

  const handleBlockUser = async (userId: string) => {
    const result = await userBlock(userId);
    if (result?.success) {
        refetch();
        toast.success(result?.message);
    } else {
      console.log("Failed to block user");
    }
  };
  const handelnextPage = () => {
    setAction(true);

    setPage(prev => prev + 1);

  }

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
            
          {users?.map((user: { _id: React.Key; name: string; email: string; role: string; isblocked: boolean }) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                {user.role === "user" ? (
                  <button
                    onClick={() => handlePromoteToAdmin(user._id as string)}
                    className="mr-2 bg-blue-900 text-white px-3 py-1 rounded"
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
                  className={`ml-2 ${user.isblocked ? 'bg-green-500' : 'bg-red-500'} text-white px-3 py-1 rounded`}
                >
                  {user.isblocked ? 'Unblock' : 'Block'}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-5">
        <button 
          disabled={page === 1}
          onClick={() => setPage(prev => prev - 1)}
          className="bg-blue-900 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button 
          disabled={page === totalPages}
          onClick={() => handelnextPage() }
          className="bg-blue-900 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllUser;
