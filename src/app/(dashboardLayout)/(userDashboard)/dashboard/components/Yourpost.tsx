"use client"
import { useUser } from "@/context/uAuthContext";
import { getuserposts } from "@/Services/Post";
import { useEffect, useState } from "react";
import { deletePost } from "@/Services/Post";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import Link from "next/link";
import { toast } from "sonner";
import PostHistoryTableSkeleton from "./PostHistoryTableSkeleton";



const YourpostAllpost = ({path}) => {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {

    const fetchPosts = async () => {
      const posts = await getuserposts();
    
      if (posts) {
        setPosts(posts.data);
        setIsLoading(false);
      }

    };
    fetchPosts()


  }
    , [user]);


  const getSnippet = (htmlContent: string) => {
    const text = htmlContent.replace(/<[^>]*>?/gm, '');
    return text.length > 20 ? text.substring(0, 20) + '...' : text;
  };
  const handleDelete = async (id: any) => {
    const res = await deletePost(id);
    if (res?.success) {
      toast.success('Post deleted successfully');
      const updatedPosts = posts.filter((post: { _id: any; }) => post._id !== id);
      setPosts(updatedPosts);
    } else {
      toast.error('Failed to delete post');
      
    }
  };


  return (
    <div>

      {

        isLoading && <PostHistoryTableSkeleton />
      }

      {
        posts?.length  > 0 ? (
          <div className='mt-10'>
            <h1 className='text-xl font-bold mb-5'>POST HISTORY</h1>
            <Table aria-label="Post history table">
              <TableHeader>

                <TableColumn>Title</TableColumn>
                <TableColumn>CATEGORY</TableColumn>
                <TableColumn>CONTENT </TableColumn>
                <TableColumn>TYPE</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody>
                {posts?.map((post: { _id: React.Key | null | undefined; title: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; category: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; content: string; premiumContent: any; }) => (
                  <TableRow key={post._id}>
                    <TableCell className="border-b">{post?.title}</TableCell>
                    <TableCell className="border-b ">{post?.category}</TableCell>
                    <TableCell className="border-b">{getSnippet(post.content)}</TableCell>
                    <TableCell className="border-b">{post.premiumContent ? 'Premium' : 'Free'}</TableCell>
                    <TableCell>
                      <Link href={`/${path}/creation/${post._id}`}>
                        <button className="mr-2 bg-blue-900 text-white px-3 py-1 rounded">Update</button>
                      </Link>
                      <button onClick={() => handleDelete(post._id)} className="bg-red-800 text-white px-3 py-1 rounded">Delete</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : <>  
            {
              !isLoading && <h1 className='text-xl font-bold  text-center mt-36'>No post found</h1>
            }
        
         </>


      }


    </div>
  );
};

export default YourpostAllpost;