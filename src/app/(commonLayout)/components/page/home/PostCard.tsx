/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useUpvotePost } from '@/hook/post.hook';
import { downvotePost, getPost } from '@/Services/Post';
import { useEffect, useState } from 'react';

const PostCard = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPost();
        setPosts(response?.data);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    };
    fetchPost();
  }, []);

  


  const { mutate: upvotePost, data: upvoteData } = useUpvotePost();
  const lastPost = upvoteData?.data;
  
  console.log(lastPost, 'lastPost');


  const handleUpvote = async (postId: string) => {
    try {
      await upvotePost(postId); 
      
      if (lastPost) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId ? { ...post, upvotes: lastPost.upvotes } : post
          )
        );
      }
    } catch (error) {
      console.error('Error upvoting post:', error);
    }
  };

 
  const handleDownvote = async (postId: string) => {
    try {
      const updatedPost = await downvotePost(postId);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, downvotes: updatedPost.downvotes } : post
        )
      );
    } catch (error) {
      console.error('Error downvoting post:', error);
    }
  };

  if (!posts || posts.length === 0) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="grid gap-6">
      {posts.map((post: any) => (
        <div key={post._id} className="max-w-xl mx-auto bg-white border border-gray-300 shadow-lg rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">{post.title}</h3>
            <span className="text-sm text-gray-500 font-semibold">{post.category}</span>
          </div>

          {post.premiumContent && (
            <span className="bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded mb-2 inline-block">
              Premium
            </span>
          )}

          <img src={post.image} alt={post.title} className="w-full rounded-md mb-4" />

          <div dangerouslySetInnerHTML={{ __html: post.content }} className="text-gray-700 mb-4"></div>

          <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
            <span>By: {post.author}</span>
            <div>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                onClick={() => handleUpvote(post._id)}
              >
                👍 {post.upvotes}
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                onClick={() => handleDownvote(post._id)} // Trigger downvote
              >
                👎 {post.downvotes}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
            <span>Paid by: {post.paidby.length} users</span>
            <span>{post.comments.length} Comments</span>
          </div>

          <div className="border-t pt-4">
            {post.comments.length > 0 ? (
              post.comments.map((comment: any, index: number) => (
                <div key={index} className="mb-2">
                  <strong>{comment.user}:</strong> <span>{comment.message}</span>
                </div>
              ))
            ) : (
              <div>No comments yet</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostCard;
