import { deletePost } from "@/Services/Post";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import Link from "next/link";
import React from 'react';
import { toast } from "sonner";

interface PostProps {
  posts: Array<{
    _id: string;
    title: string;
    category: string;
    content: string;
    premiumContent: boolean;
  }>;
}

const Post: React.FC<PostProps> = ({ posts }) => {
  const [posttate, setPosts] = React.useState(posts);


  const getSnippet = (htmlContent: string) => {
    const text = htmlContent.replace(/<[^>]*>?/gm, ''); // Remove HTML tags
    return text.length > 20 ? text.substring(0, 20) + '...' : text;
  };

  
  const handleDelete = async (id: any) => {
    const res = await deletePost(id);
    if(res?.success) {
      toast.success('Post deleted successfully');
      const updatedPosts = posts.filter((post: { _id: any; }) => post._id !== id);
      setPosts(updatedPosts);
      

    }else{
      toast.error('Failed to delete post');
      console.log(res);
    }
  };

  return (
    <div className='mt-10'>
      <h1 className='text-xl font-bold mb-5'>POST HISTORY</h1>
      <Table aria-label="Post history table">
        <TableHeader>
          <TableColumn>CATEGORY</TableColumn>
          <TableColumn>CONTENT </TableColumn>
          <TableColumn>TYPE</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {posttate.map((post: { _id: React.Key | null | undefined; title: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; category: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; content: string; premiumContent: any; }) => (
            <TableRow key={post._id}>

              <TableCell>{post.category}</TableCell>
              <TableCell>{getSnippet(post.content)}</TableCell>
              <TableCell>{post.premiumContent ? 'Premium' : 'Free'}</TableCell>
              <TableCell>
                <Link href={`/dashboard/creation/${post._id}`}>
                <button  className="mr-2 bg-blue-500 text-white px-3 py-1 rounded">Update</button>
                </Link>
                <button onClick={() => handleDelete(post._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Post;
