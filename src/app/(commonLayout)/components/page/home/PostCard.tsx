/* eslint-disable @next/next/no-img-element */
"use client";

import { useUser } from '@/context/uAuthContext';
import { useGetPost, useUpvotePost } from '@/hook/post.hook';
import { addCommentToPost, downvotePost, followUser, getFollowedUsers, } from '@/Services/Post';
import { useEffect, useState } from 'react';

interface Post {
  _id: string;
  author: {
    _id: string;
    name: string;
    username: string;
    img: string;
  };
  content: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  comments: {
    _id: string;
    userId: {
      name: string;
    };
    content: string;
    createdAt: string;
  }[];
}

const PostCard = () => {
  const { mutate: upvotePost } = useUpvotePost();
  const [commentInput, setCommentInput] = useState<Record<string, string>>({});
  const { data, refetch } = useGetPost();
  const { user }: { user: any } = useUser(); 
  const [userFollowing, setUserFollowing] = useState<string[]>([]);

  const posts = data?.data?.posts || [];



  // Fetch the followed users when the component loads or the user changes
  useEffect(() => {
    const fetchFollowedUsers = async () => {
   
      if (user) {
        const data = await getFollowedUsers();
        
        setUserFollowing(data?.data[0].following);

      }

    };
    fetchFollowedUsers();
  }, [user]);


  const handleUpvote =  async(postId: string) => {
    await upvotePost(postId);
    refetch();
  };

  const handleDownvote = async (postId: string) => {
    await  downvotePost(postId);
    refetch();
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
      refetch();
    }
  };

  // Follow/Unfollow logic
  const handleFollow = async (authorId: string) => {
    const userList = await followUser(authorId);
   
    setUserFollowing(userList?.data?.following);
   
  };

  return (
    <div className="grid gap-6">
      {posts.map((post: Post) => (
        <div
          key={post._id}
          className="max-w-xl mx-auto bg-white border border-gray-300 rounded-lg p-4 mb-6 shadow-sm"
        >
          {/* Header with Author Info */}
          <div className="flex items-start space-x-3 mb-3">
            <img
              src={post.author.img || "/default-profile.png"}
              alt={post.author.name || "Anonymous"}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-grow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-base font-semibold">{post.author.name || "Anonymous"}</h3>
                  <span className="text-xs text-gray-500">@{post.author.username || "user123"}</span>
                </div>
                <button
                  className="text-blue-500 font-semibold text-xs hover:underline"
                  onClick={() => handleFollow(post.author._id)}
                >
                  {
                    userFollowing && userFollowing?.includes(post.author._id) ? 'Unfollow' : 'Follow' 
                  }
                 
                </button>
              </div>
              <span className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</span>
            </div>
          </div>

          {/* Post Content */}
          <div className="text-sm text-gray-700 mb-2">
            <p dangerouslySetInnerHTML={{ __html: post.content.slice(0, 150) }} />
            {post.content.length > 150 && (
              <button
                className="text-blue-500 font-semibold text-xs hover:underline"
                onClick={() => console.log(`Read more of post: ${post._id}`)}
              >
                Read more
              </button>
            )}
          </div>

          {/* Post Engagement */}
          <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
            <div className="flex space-x-4">
              <button
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-500"
                onClick={() => handleUpvote(post._id)}
              >
                👍 <span>{post.upvotes}</span>
              </button>
              <button
                className="flex items-center space-x-1 text-gray-600 hover:text-red-500"
                onClick={() => handleDownvote(post._id)}
              >
                👎 <span>{post.downvotes}</span>
              </button>
            </div>
            <div className="text-xs">{post.comments.length} Comments</div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-300 pt-3">
            {post.comments.length > 0 ? (
              <div className="text-xs text-gray-500">
                {post.comments
                  .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .slice(0, 4) // Only take the most recent comments
                  .map((comment: any) => (
                    <div key={comment._id} className="mb-2">
                      <strong>{comment.userId.name || 'Anonymous'}:</strong> {comment.content}
                      <div className="text-gray-400">
                        {new Date(comment.createdAt).toLocaleString()}
                      </div>
                    </div>
                  ))}

                {post.comments.length > 2 && (
                  <button
                    className="text-blue-500 font-semibold text-xs hover:underline"
                    onClick={() => console.log(`View all comments for post: ${post._id}`)}
                  >
                    View all comments
                  </button>
                )}
              </div>
            ) : (
              <div className="text-xs text-gray-500">No comments yet</div>
            )}
          </div>

          <div className="mt-3">
            <textarea
              className="w-full p-2 border border-gray-300 rounded mb-2 text-sm"
              placeholder="Write a comment..."
              value={commentInput[post._id] || ''}
              onChange={(e) => handleCommentChange(post._id, e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
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
