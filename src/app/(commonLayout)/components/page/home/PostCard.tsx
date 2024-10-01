
"use client";

import { useUser } from '@/context/uAuthContext';
import { useGetPost } from '@/hook/post.hook';
import { addCommentToPost, deleteComment, downvotePost, editcomment, followUser, getFollowedUsers, upvotePost } from '@/Services/Post';
import { Post } from '@/types';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const PostCard = () => {
  const [commentInput, setCommentInput] = useState<Record<string, string>>({});
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [editCommentValue, setEditCommentValue] = useState<string>('');
  
  const { user }: { user: any } = useUser();
  const [userFollowing, setUserFollowing] = useState<string[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [category, setCategory] = useState<string | undefined>('all');

  console.log(category);

const { data, refetch } = useGetPost(category);
 // Refetch posts when the category changes
 useEffect(() => {
  if (category) {
    refetch();
  }
}, [category, refetch]);

useEffect(() => {
  if (data) {
    setPosts(data?.data?.posts);
  }
}, [data]);

useEffect(() => {
  const fetchFollowedUsers = async () => {
    if (user) {
      const data = await getFollowedUsers();
      setUserFollowing(data?.data[0].following);
    }
  };
  fetchFollowedUsers();
}, [user]);

const handleUpvote = async (postId: string) => {
  const currentUserId = user._id;
  try {
    await upvotePost(postId);

    const voters = posts.find((post: { _id: string }) => post._id === postId)?.voters;
    if (voters && Array.isArray(voters)) {
      const currentUserVote = voters.find((voter) => voter.userId === currentUserId && voter.voteType === 'up');
      if (currentUserVote) {
        toast.success('You have already upvoted this post.');
      } else {
        toast.success('Post upvoted successfully.');
      }
    } else {
      console.log('No voters data available or invalid format.');
    }
    refetch();
  } catch (error) {
    console.error('Error handling upvote:', error);
  }
};

const handleDownvote = async (postId: string) => {
  const currentUserId = user._id;
  try {
    await downvotePost(postId);

    const voters = posts.find((post: any) => post._id === postId)?.voters;
    if (voters && Array.isArray(voters)) {
      const currentUserVote = voters.find((voter) => voter.userId === currentUserId && voter.voteType === 'down');
      if (currentUserVote) {
        toast.success('You have already downvoted this post.');
      } else {
        toast.success('Post downvoted successfully.');
      }
    } else {
      console.log('No voters data available or invalid format.');
    }
    refetch();
  } catch (error) {
    console.error('Error handling upvote:', error);
  }
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
    toast.success('Comment added successfully.');
  }
};

const handleEditClick = (comment: any) => {
  setEditCommentId(comment._id);
  setEditCommentValue(comment.content);
};

const handleEditSubmit = async (postId: string, commentId: any) => {
  const updatedComment = await editcomment(postId, commentId, editCommentValue);
  refetch();
  if (updatedComment) {
    toast.success('Comment updated successfully');
    setEditCommentId(null);
    setEditCommentValue('');
  }
};

const handeldelteComment = async (postId: string, commentId: string) => {
  const data = await deleteComment(postId, commentId);
  refetch();
  if (data.success) {
    toast.success('Comment deleted successfully');
  }
};

const handleFollow = async (authorId: string) => {
  const userList = await followUser(authorId);
  setUserFollowing(userList?.data?.following);
};

const handleCategoryChange = (newCategory: string) => {
  if (newCategory === 'All') {
    setCategory('all');
  } else if (newCategory === 'Story') {
    setCategory('Story');
  } else {
    setCategory('Tip');
  }
};


  return (
    <div className="grid gap-6">

           {/* Category selection */}
           <div className="flex justify-center mb-4">
        <button 
          className={`px-4 py-2 rounded ${category === 'Tip' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
          onClick={() => handleCategoryChange('Tip')}
        >
          Tip
        </button>
        <button 
          className={`px-4 py-2 ml-2 rounded ${category === 'Story' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
          onClick={() => handleCategoryChange('Story')}
        >
          Story
        </button>
        <button 
          className={`px-4 py-2 ml-2 rounded ${category === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
          onClick={() => handleCategoryChange('All')}
        >
          All
        </button>
      </div>
      {posts.map((post: Post) => (
        <div key={post._id} className="max-w-xl mx-auto bg-white border border-gray-300 rounded-lg p-4 mb-6 shadow-sm">

         <div className='flex justify-end gap-5 items-end '> 
         {post.premiumContent ? (
            <div className="mb-2 flex justify-end">
              <span className="bg-yellow-500 text-white text-xs font-semibold py-1 px-3 rounded-full">
                Premium Content
              </span>

            </div>
          ) : null
          }
          {
            post.category ? (
              <div className="mb-2 flex justify-end">
                <span className="bg-blue-500 text-white text-xs font-semibold py-1 px-3 rounded-full">
                  {post.category}
                </span>
              </div>
            ) : null
          }
         </div>

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
                <button className="text-blue-500 font-semibold text-xs hover:underline" onClick={() => handleFollow(post.author._id)}>
                  {userFollowing && userFollowing?.includes(post.author._id) ? 'Unfollow' : 'Follow'}
                </button>
                
              </div>
              <span className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</span>
            </div>
          </div>

          {/* Post Content */}
          <div className="text-sm text-gray-700 mb-2">
            <p dangerouslySetInnerHTML={{ __html: post.content.slice(0, 150) }} />
            {post.content.length > 150 && (
              <button className="text-blue-500 font-semibold text-xs hover:underline" onClick={() => console.log(`Read more of post: ${post._id}`)}>
                Read more
              </button>
            )}
          </div>

          {/* Post Engagement */}
          <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
            <div className="flex space-x-4">
              <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500" onClick={() => handleUpvote(post._id)}>
                👍 <span>{post.upvotes}</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500" onClick={() => handleDownvote(post._id)}>
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
                      <div className="text-gray-400">{new Date(comment.createdAt).toLocaleString()}</div>

                      {/* Conditionally show Edit button */}
                      {user?._id === comment.userId._id && (
                        <div className="flex space-x-2 text-xs mt-1">
                          <button className="text-blue-500 hover:underline" onClick={() => handleEditClick(comment)}>
                            Edit
                          </button>
                          <button className="text-blue-500 hover:underline" onClick={() => handeldelteComment(post._id, comment._id)}>
                            Delete
                          </button>
                        </div>
                      )}


                      {editCommentId === comment._id && (
                        <div className="mt-2">
                          <textarea
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                            value={editCommentValue}
                            onChange={(e) => setEditCommentValue(e.target.value)}
                          />
                          <div>
                            <button
                              className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 mt-2"
                              onClick={() => handleEditSubmit(post._id, comment._id)}
                            >
                              Submit Edit
                            </button>
                          </div>



                        </div>
                      )}
                    </div>
                  ))}

                {post.comments.length > 2 && (
                  <button className="text-blue-500 font-semibold text-xs hover:underline" onClick={() => console.log(`View all comments for post: ${post._id}`)}>
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
            <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600" onClick={() => handleCommentSubmit(post._id)}>
              Submit Comment
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostCard;
