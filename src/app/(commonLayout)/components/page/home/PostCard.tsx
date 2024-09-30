"use client";

import { useGetPost, useUpvotePost,  } from '@/hook/post.hook';
import { addCommentToPost, downvotePost } from '@/Services/Post';

import { useState } from 'react';
 // Import `useQuery` instead of `useInfiniteQuery`

const PostCard = () => {
  // Using `useQuery` to fetch posts normally
  const { data, isLoading, isError } = useGetPost();
  const { mutate: upvotePost } = useUpvotePost();
  const [commentInput, setCommentInput] = useState<Record<string, string>>({});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading posts.</div>;
  }

  const posts = data?.data?.posts || []; // Extract posts from response

  const handleUpvote = (postId: string) => {
    upvotePost(postId);
  };

  const handleDownvote = (postId: string) => {
    downvotePost(postId);
  };

  const handleCommentChange = (postId: string, value: string) => {
    setCommentInput((prevState) => ({
      ...prevState,
      [postId]: value,
    }));
  };

  const handleCommentSubmit = async (postId: string) => {
    const comment = commentInput[postId];
    if (comment) {
      await addCommentToPost(postId, comment);
      setCommentInput((prevState) => ({ ...prevState, [postId]: '' }));
    }
  };

  return (
    <div className="grid gap-6">
      {/* Rendering each post inside a grid */}
      {posts.map((post: any) => (
        <div
          key={post._id}
          className="max-w-xl mx-auto bg-white border border-gray-300 shadow-lg rounded-lg p-6 mb-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">{post.title}</h3>
            {post.premiumContent && (
              <span className="text-sm text-gray-500 font-semibold">Premium</span>
            )}
            <span className="text-sm text-gray-500 font-semibold">{post.category}</span>
          </div>

          {post.premiumContent && (
            <span className="bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded mb-2 inline-block">
              Premium
            </span>
          )}

          <div dangerouslySetInnerHTML={{ __html: post.content }} className="text-gray-700 mb-4" />

          <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
            <div>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                onClick={() => handleUpvote(post._id)}
              >
                👍 {post.upvotes}
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                onClick={() => handleDownvote(post._id)}
              >
                👎 {post.downvotes}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
            <span>Paid by: {post?.paidby?.length || 0} users</span>
            <span>{post.comments.length} Comments</span>
          </div>

          <div className="border-t pt-4">
            {post.comments.length > 0 ? (
              post.comments.map((comment: any) => (
                <div key={comment._id} className="mb-2">
                  <strong>{comment.userId.name || 'Anonymous'}:</strong>
                  <span> {comment.content}</span>
                  <div className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</div>
                </div>
              ))
            ) : (
              <div>No comments yet</div>
            )}
          </div>

          <div className="mt-4">
            <textarea
              className="w-full p-2 border border-gray-300 rounded mb-2"
              placeholder="Write a comment..."
              value={commentInput[post._id] || ''}
              onChange={(e) => handleCommentChange(post._id, e.target.value)}
            />
            <button
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              onClick={() => handleCommentSubmit(post._id)}
            >
              Submit Comment
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostCard;
