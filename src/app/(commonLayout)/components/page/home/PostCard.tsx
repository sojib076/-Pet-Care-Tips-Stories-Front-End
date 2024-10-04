"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useUser } from '@/context/uAuthContext';
import { useGetPost } from '@/hook/post.hook';
import { addCommentToPost, deleteComment, downvotePost, editcomment, followUser, getFollowedUsers, getFollowedUsersPosts, getsearch, upvotePost } from '@/Services/Post';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Input } from "@nextui-org/react";
import { LoaderIcon, SearchIcon } from "lucide-react";
import useDebounce from "@/hook/debounce.hook";
import { useGetProfile } from "@/hook/user.Hook";
import axios from "axios";


const PostCard = () => {
  const [commentInput, setCommentInput] = useState<Record<string, string>>({});
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [editCommentValue, setEditCommentValue] = useState<string>('');
  const { user } = useUser();
  const [userFollowing, setUserFollowing] = useState<string[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [category, setCategory] = useState<string | undefined>('all');
  const [followedPosts, setFollowedPosts] = useState(false);
  const [searchCategory, setSearchCategory] = useState<string>('Tip');
  const [userPaidPosts, setUserPaidPosts] = useState<string[]>([]);
  const [sortType, setSortType] = useState<string>('');

  const { data, refetch, isLoading } = useGetPost(category);
  const { register, handleSubmit, watch } = useForm();
  const { data: paidPosts } = useGetProfile();
  console.log(data);

  useEffect(() => {
    if (paidPosts) {
      setUserPaidPosts(paidPosts?.data?.paidfor);
    }
  }, [paidPosts]);

  useEffect(() => {
    if (category && !followedPosts) {
      refetch();
    }
  }, );





  
  useEffect(() => {
    if (data) {
      let sortedPosts = [...data?.data?.posts];
      if (category === 'Tip' || category === 'Story' || sortType==='up'  ) {
        sortedPosts = sortedPosts?.sort((a: any, b: any) => b.upvotes - a.upvotes);
      }else if(sortType==='down'){
        sortedPosts = sortedPosts?.sort((a: any, b: any) => b.downvotes - a.downvotes);
      }else {
        sortedPosts = sortedPosts?.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }

      setPosts(sortedPosts);
    }
  }, [data, category,sortType]);

  useEffect(() => {
    const fetchFollowedUsers = async () => {
      if (user) {
        const data = await getFollowedUsers();
        setUserFollowing(data?.data[0].following);
      }
    };
    fetchFollowedUsers();
  }, [user]);

  // Upvote function
  const handleUpvote = async (postId: string) => {
    const currentUserId = user?._id;
    const post = posts.find((post) => post._id === postId);

    const alreadyUpvoted = post?.voters?.some((voter: { userId: string | undefined; voteType: string; }) => voter.userId === currentUserId && voter.voteType === 'up');
    if (alreadyUpvoted) {
      toast.error("You have already upvoted this post.");
      return;
    }
    try {
      await upvotePost(postId);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                upvotes: post.upvotes + 1,
                voters: [...(post?.voters ?? []), { userId: currentUserId, voteType: 'up' }],
              }
            : post
        )
      );
      toast.success("Post upvoted successfully.");
    } catch (error) {
      console.error("Error handling upvote:", error);
      toast.error("Failed to upvote the post.");
    }
  };


  const handleDownvote = async (postId: string) => {
    const currentUserId = user?._id;
    const post = posts.find((post) => post._id === postId);

    const alreadyDownvoted = post?.voters?.some((voter: { userId: string | undefined; voteType: string; }) => voter.userId === currentUserId && voter.voteType === 'down');
    if (alreadyDownvoted) {
      toast.error("You have already downvoted this post.");
      return;
    }

    try {
      await downvotePost(postId);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                downvotes: post.downvotes + 1,
                voters: [...post.voters, { userId: currentUserId, voteType: 'down' }],
              }
            : post
        )
      );
      toast.success("Post downvoted successfully.");
    } catch (error) {
      console.error("Error handling downvote:", error);
      toast.error("Failed to downvote the post.");
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

  const handleDeleteComment = async (postId: string, commentId: string) => {
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
    if (newCategory === 'all') {
      setCategory('all');
      setFollowedPosts(false);
      refetch();
    } else if (newCategory === 'Story') {
      setCategory('Story');
      setFollowedPosts(false);
    } else {
      setCategory('Tip');
      setFollowedPosts(false);
    }
  };

  const handleFollowing = async () => {
    try {
      const result = await getFollowedUsersPosts();
      if (result?.data?.posts) {
        setPosts(result.data.posts);
        setFollowedPosts(true);
      } else {
        toast.error("No followed users' posts found.");
      }
    } catch (error) {
      console.error("Error fetching followed posts:", error);
      toast.error("Failed to fetch followed users' posts.");
    }
  };

  const searchTerm = useDebounce(watch("search"));

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm) {
        console.log(searchTerm, searchCategory);
        const result = await getsearch(searchTerm, searchCategory);
       
        setPosts(result?.data?.posts);
      }
    };

    fetchData();
  }, [searchCategory, searchTerm]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data, searchCategory);
  };



  const handlePayment = async (postId: string) => {
    const userId = user?._id;
    try {
      // Call payment API
      const response = await axios.post(`http://localhost:5000/api/v1/payment/initiate?postId=${postId}&userId=${userId}`)
      console.log(response);
  
      if (response.data?.success) {
        const paymentUrl = response.data?.data?.payment_url;
        // Redirect to the payment URL
        if (paymentUrl) {
          window.location.href = paymentUrl;
        } else {
          toast.error('Payment URL not found.');
        }
      } else {
        toast.error(response.data?.message || 'Payment initiation failed.');
      }
    } catch (error) {
      console.error('Error handling payment:', error);
      toast.error('Payment failed. Please try again.');
    }
  };
  const handleSortChange = (sort: string) => {
    setSortType(sort)
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-col items-center mb-4">
        <div className="grid grid-cols-1 gap-10 mt-10">
          <div className="flex gap-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="w-[90%] lg:w-[95%]">
                <Input
                  {...register("search")}
                  aria-label="Search"
                  classNames={{ inputWrapper: "bg-default-100", input: "text-sm" }}
                  placeholder="Search..."
                  size="lg"
                  startContent={<SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-400" />}
                  type="text"
                />
              </div>
            </form>

            <select
              name="searchType"
              className="border border-gray-300 rounded-md p-2"
              onChange={(e) => setSearchCategory(e.target.value)}
            >
              <option value="Tip">Tip</option>
              <option value="Story">Story</option>
            </select>
          </div>

          <div>
            <h1 className="text-center lg:text-5xl text-3xl my-5 font-bold">Category</h1>
            <div className="flex justify-center gap-4">
        <button onClick={() => handleSortChange('up')} className={`px-4 py-2 ${sortType === 'up' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Sort by Upvotes</button>
        <button onClick={() => handleSortChange('down')} className={`px-4 py-2 ${sortType === 'down' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Sort by Downvotes</button>
      </div>
            <div className="flex justify-between">
              <button
                className={`px-4 py-2 rounded ${category === 'Tip' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => handleCategoryChange('Tip')}
              >
                Tip
              </button>
              <button
                className={`px-4 py-2 rounded ${category === 'Story' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => handleCategoryChange('Story')}
              >
                Story
              </button>
              <button
                className={`px-4 py-2 ml-2 rounded ${category === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => handleCategoryChange('all')}
              >
                All
              </button>
              <button
                className={`px-4 py-2 rounded ${followedPosts ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={handleFollowing}
              >
                Following
              </button>
            </div>
          </div>
        </div>
      </div>
        {
          isLoading ?  
          
          <>
            <LoaderIcon className="w-10 h-10 text-blue-500 animate-spin mx-auto" />
          </>
          :<>
          
          {
      posts.length >1 ?  posts?.map((post: any) => (
        <div key={post._id} className="w-[80%] mx-auto bg-white border border-gray-300 rounded-lg p-4 mb-6 shadow-sm">
          <div className='flex justify-end gap-5 items-end'>
            {post.premiumContent && (
              <div className="mb-2 flex justify-end">
                <span className="bg-yellow-500 text-white text-xs font-semibold py-1 px-3 rounded-full">
                  Premium Content
                </span>
              </div>
            )}
            {post.category && (
              <div className="mb-2 flex justify-end">
                <span className="bg-blue-500 text-white text-xs font-semibold py-1 px-3 rounded-full">
                  {post.category}
                </span>
              </div>
            )}
          </div>

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
                  {userFollowing && userFollowing?.includes(post.author._id) ? 'Unfollow' : 'Follow'}
                </button>
              </div>
              <span className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</span>
            </div>
          </div>

          <div className="text-sm text-gray-700 mb-2">
            {(!post.premiumContent || userPaidPosts?.includes(post._id)) ? (
              <p dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <>
                <p dangerouslySetInnerHTML={{ __html: post.content.slice(0, 150) }} />
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded text-xs mt-2 hover:bg-blue-600"
                  onClick={() => handlePayment(post._id)}
                >
                  Pay 100 TK to Unlock Full Content
                </button>
              </>
            )}
          </div>

          <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
            <div className="flex space-x-4">
              <button
                className={`flex items-center space-x-1 ${
                  (post.voters ?? []).some((voter: { userId: string | undefined; voteType: string; }) => voter.userId === user?._id && voter.voteType === 'up')
                    ? 'text-blue-500'
                    : 'text-gray-600'
                }`}
                onClick={() => handleUpvote(post._id)}
                disabled={post.voters?.some((voter: { userId: string | undefined; voteType: string; }) => voter.userId === user?._id && voter.voteType === 'up')}
              >
                👍 <span>{post.upvotes}</span>
              </button>
              <button
                className={`flex items-center space-x-1 ${
                  (post.voters ?? []).some((voter: { userId: string | undefined; voteType: string; }) => voter.userId === user?._id && voter.voteType === 'down')
                    ? 'text-red-500'
                    : 'text-gray-600'
                }`}
                onClick={() => handleDownvote(post._id)}
                disabled={post.voters?.some((voter: { userId: string | undefined; voteType: string; }) => voter.userId === user?._id && voter.voteType === 'down')}
              >
                👎 <span>{post.downvotes}</span>
              </button>
            </div>
            <div className="text-xs">{post.comments.length} Comments</div>
          </div>

          <div className="border-t border-gray-300 pt-3">
            {post.comments.length > 0 ? (
              <div className="text-xs text-gray-500">
                {post.comments
                  .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .slice(0, 4)
                  .map((comment: any) => (
                    <div key={comment._id} className="mb-2">
                      <strong>{comment.userId.name || 'Anonymous'}:</strong> {comment.content}
                      <div className="text-gray-400">{new Date(comment.createdAt).toLocaleString()}</div>

                      {user?._id === comment.userId._id && (
                        <div className="flex space-x-2 text-xs mt-1">
                          <button className="text-blue-500 hover:underline" onClick={() => handleEditClick(comment)}>
                            Edit
                          </button>
                          <button className="text-blue-500 hover:underline" onClick={() => handleDeleteComment(post._id, comment._id)}>
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
      )) : 
       <h1 className="text-center font-bold text-2xl "> NO POST AVAIBLE

      </h1>
      
      }
          </>
          
        }

    </div>
  );
};

export default PostCard;
