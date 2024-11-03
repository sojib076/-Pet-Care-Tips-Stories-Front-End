"use client";

import useDebounce from "@/hook/debounce.hook";
import { useGetPost } from "@/hook/post.hook";
import { useGetProfile } from "@/hook/user.Hook";
import { addCommentToPost, deleteComment, downvotePost, editcomment, followUser, getcategory, getFollowedUsersPosts, getPost, getsearch, handelpayment, upvotePost } from "@/Services/Post";
import { Button, Input } from "@nextui-org/react";
import { ArrowBigDown, ArrowBigUp, SearchIcon } from "lucide-react";

import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import CardLoading from "./cardLoading";
import Link from "next/link";


const PostCard = () => {
    const { register, handleSubmit, watch } = useForm();
    const [cateLoading, setCategoryLoading] = useState(false);
    const [searchCategory, setSearchCategory] = useState<string>('Tip');
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [post, setPosts] = useState<any>();
    const [userFollowing, setUserFollowing] = useState<string[]>([]);
    const [commentInput, setCommentInput] = useState<Record<string, string>>({});
    const { data, isLoading } = useGetPost();
    const [editCommentId, setEditCommentId] = useState<string | null>(null);
    const [userPaidPosts, setUserPaidPosts] = useState<string[]>([]);
    const [editCommentValue, setEditCommentValue] = useState<string>('');

    const { data: userData, } = useGetProfile();


    const user = userData?.data;


    useEffect(() => {
        if (user) {

            setUserFollowing(user.following.map((user: any) => user._id));
            setUserPaidPosts(user.paidfor);

        }
    }, [user]);



    const maindata = data?.data?.posts

    useEffect(() => {
        setPosts(maindata);
    }, [data, maindata]);



    const searchTerm = useDebounce(watch("search"));
    useEffect(() => {
        const fetchData = async () => {
            if (searchTerm) {

                const result = await getsearch(searchTerm, searchCategory);


                setPosts(result?.data?.posts);
            }
        };

        fetchData();

    }, [searchTerm, searchCategory]);


    const handelCategory = async (category: string) => {
        setCategoryLoading(true);
        setActiveCategory(category);
        setPosts([]);
        const result = await getcategory(category);
        setPosts(result?.data?.posts);
        setCategoryLoading(false);


    }


    const handelall = async () => {
        setCategoryLoading(true);
        setActiveCategory('All');
        setPosts([]);

        const result = await getPost();
        setPosts(result?.data?.posts);
        setCategoryLoading(false);

    }


    const onSubmit: SubmitHandler<FieldValues> = async () => {


    };

    const handleUpvote = async (postId: string) => {

        const result = await upvotePost(postId);


        try {

            if (result?.data?.alreayvoted) {
                toast.error('You already voted');
                return
            } else {
                setPosts((prev) => {
                    return prev?.map((item) => {
                        if (item._id === postId) {
                            return {
                                ...item,
                                upvotes: item.upvotes + 1,
                                downvotes: item.downvotes ? item.downvotes - 1 : 0,
                            };
                        }
                        return item;
                    });
                });

                toast.success('Post upvoted successfully');
            }
        } catch (error) {
            console.log(error);
            toast.error('Post upvote failed');
        }



    };


    const handeldownvote = async (postId: string) => {
        const result = await downvotePost(postId);
        if (result?.data?.alreayvoted) {
            toast.error('You already voted');
            return
        }
        setPosts((prev) => {
            return prev?.map((item) => {
                if (item._id === postId) {
                    return {
                        ...item,
                        downvotes: item.downvotes + 1,
                        upvotes: item.upvotes ? item.upvotes - 1 : 0,

                    };
                }
                return item;
            });
        });
        toast.success('Post downvoted successfully');

    };

    const handleEditSubmit = async (postId: string, commentId: any) => {
        const updatedComment = await editcomment(postId, commentId, editCommentValue);


        if (updatedComment) {
            setPosts((prev) => {
                return prev?.map((item) => {
                    if (item._id === postId) {
                        return {
                            ...item,
                            comments: item.comments.map((comment: any) => {
                                if (comment._id === commentId) {
                                    return {
                                        ...comment,
                                        content: editCommentValue,
                                    };
                                }
                                return comment;
                            }),
                        };
                    }
                    return item;
                });
            });

            toast.success('Comment updated successfully');
            setEditCommentId(null);
        } else {
            toast.error('Comment update failed');
        }


    };

    const handleCommentChange = (postId: string, value: string) => {

        setCommentInput((prevState) => ({
            ...prevState,
            [postId]: value,
        }));
    };
    const handleEditClick = (comment: any) => {
        setEditCommentId(comment._id);
        setEditCommentValue(comment.content);
    };



    const handleCommentSubmit = async (postId: string) => {
        const comment = commentInput[postId];
        if (comment) {
            try {
                await addCommentToPost(postId, comment);

                setPosts((prev) => {
                    return prev?.map((item) => {
                        if (item._id === postId) {
                            return {
                                ...item,
                                comments: [
                                    ...item.comments,
                                    {
                                        content: comment,
                                        createdAt: new Date().toISOString(),
                                        userId: {
                                            _id: user?._id,
                                            name: user?.name,
                                        },
                                    },
                                ],
                            };
                        }
                        return item;
                    });
                });

                toast.success('Comment added successfully');
                setCommentInput((prevState) => ({
                    ...prevState,
                    [postId]: '',
                }));




            } catch (error: any) {
                console.log(error);

                toast.error('Comment failed');
            }

        }

    };
    const handleDeleteComment = async (postId: string, commentId: string) => {
        toast.info('Deleting comment...');
        const data = await deleteComment(postId, commentId);

        if (data) {
            setPosts((prev) => {
                return prev?.map((item) => {
                    if (item._id === postId) {
                        return {
                            ...item,
                            comments: item.comments.filter((comment: any) => comment._id !== commentId),
                        };
                    }
                    return item;
                });
            });

            toast.success('Comment deleted successfully');
        } else {
            toast.error('Comment delete failed');
        }



    };


    const handleFollow = async (authorId: string) => {
        const userList = await followUser(authorId);
        setUserFollowing(userList?.data?.following);
    };

    const handleFollowing = async () => {
        setCategoryLoading(true);
        setPosts([]);
        setActiveCategory('Following');

        try {
            const result = await getFollowedUsersPosts();
            if (result) {
                setPosts(result?.data?.posts);
                setCategoryLoading(false);
            }
        } catch (error: any) {
            console.log(error);
            toast.error('something went wrong');
        }
    }



    const handelbysort = async (sortBy: 'upvotes' | 'downvotes') => {
        console.log('sorting by', sortBy);
        setPosts((prevPosts) => {
            if (sortBy === 'upvotes') {
                return [...prevPosts].sort((a, b) => b.upvotes - a.upvotes); // Most upvotes first
            } else if (sortBy === 'downvotes') {
                return [...prevPosts].sort((a, b) => b.downvotes - a.downvotes); // Most downvotes first
            }
            return prevPosts;
        });
    };
    const handlePayment = async (postId: string) => {
        const userId = user?._id;
        toast.info('payment processing....');
        try {

            const response = await handelpayment(postId, userId);

            if (response?.success) {
                const paymentUrl = response?.data?.payment_url;
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
    return (
        <div className="grid gap-6 min-h-screen ">
            <div className="flex flex-col  mb-4">
                <div className=" mt-10">
                    <div className="flex gap-5">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="w-[90%] lg:w-[100%]">
                                <Input
                                    {...register("search")}
                                    aria-label="Search"
                                    classNames={{ inputWrapper: "bg-default-200", input: "text-sm" }}
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

                    <div className="">
                        <h1 className="text-center lg:text-5xl text-3xl my-5 font-bold">Category</h1>
                        <div className="flex justify-center gap-4">
                            <button className="px-4 py-2 bg-gray-200" onClick={() => handelbysort('upvotes')} > Sort by Upvotes </button>
                            <button className="px-4 py-2 bg-gray-200" onClick={() => handelbysort('downvotes')} > Sort by Downvotes </button>
                        </div>

                        <div className="flex justify-between my-5 bg-gray-300 p-4 rounded-2xl w-full  ">
                            <button className={`px-4 py-2 rounded ${activeCategory === 'Tip' ? 'bg-blue-900 text-white' : 'bg-gray-200 '}`}



                                onClick={() => handelCategory('Tip')}

                            >Tip</button>
                            <button className={`px-4 py-2 rounded ${activeCategory === 'Story' ? 'bg-blue-900 text-white' : 'bg-gray-200 '}`}
                                onClick={() => handelCategory('Story')}


                            >Story</button>
                            <button className={`px-4 py-2 rounded  ${activeCategory === 'All' ? 'bg-blue-900 text-white' : ' bg-gray-200'}`}

                                onClick={handelall}>All</button>
                            <button className={`px-4 py-2 rounded ${activeCategory === 'Following' ? 'bg-blue-900 text-white' : 'bg-gray-200 '}`}
                                onClick={() => handleFollowing()}
                            >Following</button>
                        </div>
                    </div>
                </div>
            </div>

            {
                cateLoading || isLoading ?
                    Array.from({ length: 4 }).map((_, i) => <CardLoading key={i} />)
                    : null
            }

            {

                post?.map((post: any) => (
                    <div key={post._id} className="w-[90%] mx-auto bg-white border border-gray-800 rounded-lg mb-6 shadow-md p-8 ">
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
                        <Link href={`/profile/${post.author._id}`}>
                            <div className="flex items-start space-x-3 mb-3">
                                <img
                                    src={post.author.img || "/default-profile.png"}
                                    alt={post.author.name || "Anonymous"}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="flex-grow">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="text-base font-semibold text-pink-800 ">{post.author.name || "Anonymous"}</h3>

                                        </div>

                                        {post.author._id !== user?._id ? (
                                            <button
                                                disabled={!user}
                                                className="text-blue-500 font-semibold text-xs hover:underline group "
                                                onClick={() => handleFollow(post.author._id)}
                                            >
                                                {userFollowing && user && userFollowing.includes(post.author._id) ? 'Unfollow' : 'Follow'}

                                                {
                                                    !user && <>
                                                        <h1>
                                                            Please login to follow
                                                        </h1>
                                                    </>
                                                }
                                            </button>





                                        ) : (
                                            <span className="text-gray-500 text-xs font-semibold ">YOUR POST </span> // Change this to whatever you'd like to show
                                        )}

                                    </div>

                                    <span className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</span>
                                </div>

                            </div>
                        </Link>


                        <div className="text-sm text-gray-700 mb-2">

                            <h1 className="text-2xl text-black my-3">
                                {post.title}
                            </h1>


                            {(!post.premiumContent || userPaidPosts?.includes(post._id)) || post?.author?._id == user?._id ? (
                                <p dangerouslySetInnerHTML={{ __html: post.content }} />
                            ) : (
                                <>
                                    <p dangerouslySetInnerHTML={{ __html: post.content.slice(0, 150) }} />
                                    <div className="relative group">
                                        <button
                                            disabled={!user}
                                            className="bg-blue-900 text-white px-3 py-1 rounded text-xs mt-2 hover:bg-blue-900/90 disabled:bg-gray-400"
                                            onClick={() => handlePayment(post._id)}
                                        >
                                            Pay 100 TK to Unlock Full Content
                                        </button>
                                        {!user && (
                                            <span className="absolute left-1/4 w-[250px] transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                Please login to proceed with payment
                                            </span>
                                        )}
                                    </div>
                                </>
                            )}


                        </div>

                        <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                            <div className="flex space-x-4">
                                <button
                                    disabled={!user}
                                    className={`flex items-center space-x-1 ${(post.voters ?? []).some((voter: { userId: string | undefined; voteType: string; }) => voter.userId === user?._id && voter.voteType === 'up')
                                        ? 'text-blue-900'
                                        : 'text-gray-600'
                                        }`}
                                    onClick={() => handleUpvote(post._id)} >
                                    <ArrowBigUp size={40}

                                        className="hover:translate-y-[-10px]
                                    
                                      transition-all

                                      "
                                    />

                                    <span>{post.upvotes}</span>
                                </button>
                                <button
                                    disabled={!user}
                                    className={`flex items-center space-x-1 ${(post.voters ?? []).some((voter: { userId: string | undefined; voteType: string; }) => voter.userId === user?._id && voter.voteType === 'down')
                                        ? 'text-red-500'
                                        : 'text-gray-600'
                                        }`}
                                    onClick={() => handeldownvote(post._id)}

                                >
                                    <ArrowBigDown size={40} className="hover:translate-y-[10px]
                                    
                                    transition-all 
                                    " />
                                    <span>{post.downvotes}</span>
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
                                                        <button className="text-blue-500 hover:underline"
                                                            onClick={() => handleDeleteComment(post._id, comment._id)}
                                                        >
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
                                                                className="bg-blue-900 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 mt-2"
                                                                onClick={() => handleEditSubmit(post._id, comment._id)}
                                                            >
                                                                Submit Edit
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}

                                            </div>
                                        ))}
                                    {post.comments.length > 10 && (
                                        <button className="text-blue-500 font-semibold text-xs hover:underline" >
                                            View all comments
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className="text-xs text-gray-500">No comments yet</div>
                            )}
                        </div>

                        {user ? (
                            <div className="mt-3">
                                <textarea
                                    className="w-full p-2 border border-gray-300 rounded mb-2 text-sm"
                                    placeholder="Write a comment..."
                                    value={commentInput[post._id] || ''}
                                    onChange={(e) => handleCommentChange(post._id, e.target.value)}
                                />
                                <Button
                                    className="bg-blue-900 w-full text-white px-3 py-1 rounded text-xs hover:scale-95  hover:text-xl 
                                    transition-all
                                    "
                                    onClick={() => handleCommentSubmit(post._id)}>
                                    Submit Comment
                                </Button>


                            </div>
                        ) : <>
                            <div className="lg:text-2xl text-sm text-center text-gray-500 mt-2 font-bold  ">Please login to vote follow and comment</div>
                        </>

                        }
                    </div>
                ))


            }
            {
                post?.length === 0 && (
                    <div className="text-center text-gray-500 text-xl mt-10">
                        No posts found
                    </div>
                )
            }





        </div>
    );
};

export default PostCard;