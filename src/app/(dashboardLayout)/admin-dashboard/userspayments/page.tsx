"use client";

import { useState } from "react";
import { useGetallPayment } from "@/hook/admin.hook";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import PostHistoryTableSkeleton from "../../(userDashboard)/dashboard/components/PostHistoryTableSkeleton";
import { BarChart2, DollarSign, User } from "lucide-react";

const UsersPayments = () => {
    const [page, setPage] = useState(1);

    const { data, isLoading ,refetch } = useGetallPayment(page); 
    console.log(data);

    if (isLoading) return <PostHistoryTableSkeleton />;


    const payments = data?.data?.payments

    const paymentlength = data?.data?.paymentlength;



    const totalPages = data?.data?.totalPages; 

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1); 
        refetch();
    };
    const handlePreviousPage = () => {
        refetch();
        if (page > 1) setPage(page - 1); 
    };

    return (
        <div >
            <div className="bg-white p-6 rounded-lg shadow-md  mx-auto my-10 dark:bg-black">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
                <DollarSign className="mr-2 text-blue-900  dark:text-white  " />Payment History
            </h2>

            <div className="grid grid-cols-3 gap-5">
            <div className="flex items-center mb-3">
                <BarChart2 className="text-blue-900 mr-3  dark:text-white" />
                <p className="text-lg font-semibold  dark:text-white ">
                    Admin Commission: <span className="font-bold text-gray-700  dark:text-white">{paymentlength * 20}</span>
                </p>
            </div>
            <div className="flex items-center mb-3  dark:text-white">
                <DollarSign className="text-blue-900 mr-3" />
                <p className="text-lg font-semibold">
                    Total Payment: <span className="font-bold text-gray-700  dark:text-white">{paymentlength * 100}</span>
                </p>
            </div>
            <div className="flex items-center  dark:text-white">
                <User className="text-blue-900 mr-3" />
                <p className="text-lg font-semibold  dark:text-white">
                    Author Due: <span className="font-bold text-gray-700  dark:text-white">{paymentlength * 80}</span>
                </p>
            </div>
            </div>
            

        </div>

            <Table aria-label="Payment history table">
                <TableHeader>
                    <TableColumn>TITLE</TableColumn>
                    <TableColumn>AUTHOR</TableColumn>
                    <TableColumn>CATEGORY</TableColumn>
                    <TableColumn>Email</TableColumn>
                    <TableColumn>User ID (Name)</TableColumn>
                    <TableColumn>User Email</TableColumn>
                </TableHeader>
                <TableBody>
                    {payments?.map((payment: any) => (
                        <TableRow key={payment._id}>
                            <TableCell>{payment.postId?.title}</TableCell>
                            <TableCell>{payment.postId?.author?.name}</TableCell>
                            <TableCell>{payment.postId?.category}</TableCell>
                            <TableCell>{payment.postId?.author?.email}</TableCell>
                            <TableCell>{payment.userId?.name}</TableCell>
                            <TableCell>{payment.userId?.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* Pagination Controls */}
            <div className="flex justify-center mt-5">
                <button
                    onClick={handlePreviousPage}
                    className="bg-blue-900 text-white px-4 py-2 rounded-sm mr-2"
                    disabled={page === 1} 
                >
                    Previous
                </button>
                <span className="mx-2">Page {page} of {totalPages}</span>
                <button
                    onClick={handleNextPage}
                    className="bg-blue-900 text-white px-4 py-2 rounded-sm "
                    disabled={page === totalPages} // Disable if on the last page
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default UsersPayments;
