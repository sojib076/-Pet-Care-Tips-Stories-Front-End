"use client";

import { useEffect, useState } from "react";
import { useGetPostforadmin } from "@/hook/post.hook"; // Modify this to accept page and limit as arguments
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import PostHistoryTableSkeleton from "../../(userDashboard)/dashboard/components/PostHistoryTableSkeleton";
import { postpublish } from "@/Services/Post";
import { toast } from "sonner";
import { Postadimin } from "@/types";

const Usersposts = () => {
    const [page, setPage] = useState(1);                     
    const { data, isLoading, isError, refetch } = useGetPostforadmin(page); 

    useEffect(() => {
        refetch();
    }, [page]);




    if (isError) return <div>Error</div>;

    const posts = data?.data?.posts;                  
    const totalPages = data?.data?.totalPages || 1;   


    const handleUnpublish = async (postId: string) => {
        const result = await postpublish(postId);
        if (result?.success) {
            toast.success('Post Status updated successfully');
            refetch();
        } else {
            toast.error('Failed to update post status');
        }
    };

    if (isLoading) return <PostHistoryTableSkeleton />;

    return (
        <div>
            <div className='mt-10'>
                <h1 className='text-xl font-bold mb-5'>POST HISTORY</h1>
                <Table aria-label="Post history table">
                    <TableHeader>
                        <TableColumn>TITLE</TableColumn>
                        <TableColumn>AUTHOR</TableColumn>
                        <TableColumn>CATEGORY</TableColumn>
                        <TableColumn>Email</TableColumn>
                        <TableColumn>TYPE</TableColumn>
                        <TableColumn>STATUS</TableColumn>
                        <TableColumn>ACTIONS</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {posts.map((post: Postadimin) => (
                            <TableRow key={post._id} className={post.ispublished ? '' : '  line-through font-bold'} >
                                <TableCell>{post.title}</TableCell>
                                <TableCell>{post.author.name}</TableCell>
                                <TableCell>{post.category}</TableCell>
                                <TableCell>{post.author.email}</TableCell>
                                <TableCell>{post.premiumContent ? 'Premium' : 'Free'}</TableCell>
                                <TableCell>
                                    {post.ispublished ? (
                                        <span className='text-green-500'>Published</span>
                                    ) : (
                                        <span className='text-red-500'>Unpublished</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <button
                                        onClick={() => handleUnpublish(post._id)}
                                        className={`mr-2 ${post.ispublished ? 'bg-red-500' : 'bg-green-500'} text-white px-3 py-1 rounded`}
                                    >
                                        {post.ispublished ? 'Unpublish' : 'Publish'}
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

             
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
                       
                        onClick={() => setPage(prev => prev + 1)}
                        className="bg-blue-900 text-white px-4 py-2 rounded disabled:bg-gray-400"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Usersposts;
