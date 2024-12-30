/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { addCommentToPost, deleteComment, downvotePost, editcomment, followUser, getPost, handelpayment, upvotePost } from "@/Services/Post";
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";
import { Award, ChevronDown, ChevronUp, MessageCircle, } from "lucide-react";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import Link from "next/link";
import { Separator } from "@radix-ui/react-separator";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetProfile } from "@/hook/user.Hook";
import CardLoading from "./cardLoading";



const PostCard = () => {

    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const [userFollowing, setUserFollowing] = useState<string[]>([]);
    const [commentInput, setCommentInput] = useState<Record<string, string>>({});


    const [editCommentId, setEditCommentId] = useState() as any;
    const [userPaidPosts, setUserPaidPosts] = useState<string[]>([]);
    const [editCommentValue, setEditCommentValue] = useState<string>('');


    const { data, } = useGetProfile();

    const user = data?.data





    useEffect(() => {
        if (user?._id) {
            console.log(user);
            setUserFollowing(user?.following?.map((user: any) => user._id));
            setUserPaidPosts(user?.paidfor);

        }
    }, [user]);

    const fetchPosts = async (page: number) => {

        try {

            const res = getPost(page);
            const data = await res;
            console.log(data, 'data from postcard line 63');
            return data;
        } catch (error) {
            return error;
        }
    };

    useEffect(() => {


        const loadInitialPosts = async () => {
            const data = await fetchPosts(currentPage);


            if (data?.success) {
                setPosts(data?.data?.posts);
                console.log(data?.data?.posts);




            }
        };

        loadInitialPosts();
    }, []);

    console.log(posts, 'posts from postcard line 82');

    const fetchMorePosts = async () => {
        const nextPage = currentPage + 1;
        const data = await fetchPosts(nextPage);

        if (data) {
            setPosts((prevPosts) => [...prevPosts, ...data?.data?.posts]);
            setCurrentPage(nextPage);
            if (nextPage >= data?.data?.totalPages) setHasMore(false);
        }
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


        <main className=" px-4 ">


            {
                (
                    <InfiniteScroll
                        dataLength={posts?.length}
                        next={fetchMorePosts}
                        hasMore={hasMore}
                        loader={

                            <CardLoading />
                        }
                        endMessage={<p>No more posts available.</p>}
                    >
                        <div className="space-y-4 ">

                            {posts?.map((post: any) => (
                                <Card key={post._id} className="w-full max-w-5xl mx-auto 
                        
                        p-2
                        ">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <div className="flex items-center  space-x-4">
                                            <Link href={`/profile/${post?.author?._id}`}>
                                                <Avatar
                                                    src={post?.author?.img}
                                                >

                                                </Avatar>
                                            </Link>
                                            <div>
                                                <p className="font-semibold">{post.author.name || "Anonymous"} </p>
                                                <div className="flex items-center space-x-1">
                                                    <p className=" md:block hidden text-sm text-muted-foreground"><span className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</span> </p>
                                                    
                                                        
                                                


                                                    {
                                                        post?.premiumContent && (

                                                            <span className="bg-yellow-400 text-yellow-900 text-xs font-medium px-2 py-0.5 rounded-full flex items-center">
                                                                <Award className="w-3 h-3 mr-1" />
                                                                Premium
                                                            </span>
                                                        )
                                                    }

                                                    {post?.category && (
                                                        <div className=" flex justify-end ml-2">
                                                            <span className="bg-blue-500 text-white text-xs font-semibold py-1 px-3 rounded-full">
                                                                {post?.category}
                                                            </span>
                                                        </div>
                                                    )}

                                                </div>
                                            </div>
                                            <div>

                                            </div>
                                        </div>

                                        {post?.author?._id !== user?._id ? (
                                            <Button
                                                disabled={!user}
                                                className="   bg-gradient-to-bl from-sky-500 to-sky-300 text-white px-3 py-1 
                                                dark:from-gray-900 dark:to-sky-800
                                            font-semibold text-xs"
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

                                            </Button>

                                        ) : (
                                            <Link href={`/${user?.role === 'admin' ? 'admin-dashboard' : 'dashboard'}/creation/${post._id}`}>

                                                <Button
                                                    className="   bg-gradient-to-bl from-sky-500 to-sky-300 text-white px-3 py-1 
                                                dark:from-gray-900 dark:to-sky-800
                                            font-semibold text-xs"
                                                >
                                                    Edit  Post
                                                </Button>
                                            </Link>
                                        )}

                                    </CardHeader>
                                    <CardBody>
                                        <h2 className="text-xl font-bold mb-2"> {post.title}  </h2>

                                        {(!post?.premiumContent || userPaidPosts?.includes(post._id)) || post?.author?._id == user?._id ? (
                                            <p className='' dangerouslySetInnerHTML={{ __html: post.content }} />
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
                                    </CardBody>
                                    <CardFooter className="flex flex-col">
                                        <div className="flex justify-between w-[98%] text-muted-foreground text-sm  ">
                                            <div className="flex gap-2 font-extrabold text-xs">
                                                <span
                                                    className="
                                            text-green-600
                                            text-[15px]

                                        "
                                                >{post?.upvotes} Upvotes</span> |
                                                <span

                                                    className="
                                        text-red-400/90
                                        text-[15px] "

                                                >{post?.downvotes}  Downvotes</span>
                                            </div>

                                        </div>
                                        <Separator className="my-2" />

                                        <div className="flex justify-between w-full p-2 rounded-2xl
                                dark:bg-gray-800
                                ">
                                            <div className="flex items-center gap-2 ">
                                                <Button
                                                    size="md"
                                                    disabled={!user}
                                                    className={`  bg-green-400  ${(post.voters ?? []).some((voter: { userId: string | undefined; voteType: string; }) => voter.userId === user?._id && voter.voteType === 'up')
                                                        ? 'text-blue-900'
                                                        : 'text-gray-600'
                                                        }`}
                                                    onClick={() => handleUpvote(post._id)}
                                                    variant="solid" >
                                                    <ChevronUp className="h-6 w-6 text-gray-500 hover:text-blue-500" />
                                                </Button>


                                                <span className="font-semibold
                                        text-2xl
                                        text-green-600
                                        ">{post.upvotes}</span>
                                                <Button

                                                    disabled={!user}
                                                    className={` group flex items-center
                                                    bg-red-400
                                                    
                                                
                                                space-x-1 ${(post.voters ?? []).some((voter: { userId: string | undefined; voteType: string; }) => voter.userId === user?._id && voter.voteType === 'down')
                                                            ? 'text-red-500'
                                                            : 'text-gray-600'
                                                        }`}
                                                    onClick={() => handeldownvote(post._id)}

                                                    variant="solid" >
                                                    <ChevronDown className="h-6 w-6 text-gray-500 hover:text-red-500 
                                                group-hover:scale-125
                                            " />
                                                </Button>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Button
                                                    size="md"
                                                    className="text-gray-500
                                                    bg-gray-100 

                                                    dark:bg-gray-800
                                                    hover:text-blue-900"
                                                >
                                                    <MessageCircle className="h-6 w-6" /> <span className="text-gray-500">{post?.comments?.length || 0}</span>
                                                </Button>
                                                

                                            </div>
                                        </div>


                                        <div className=" w-[98%] border-t border-gray-300 pt-3">
                                            <h3 className="text-sm font-semibold mb-2">Comments</h3>
                                            {post?.comments?.length > 0 ? (
                                                <div className="text-xs text-gray-500">

                                                    {post?.comments
                                                        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                                                        .slice(0, 4)
                                                        .map((comment: any) => (
                                                            <div key={comment._id} className="mb-2">
                                                                <strong>{comment.userId.name || 'Anonymous'}:</strong> {<div className="flex-1">
                                                                    <div className="bg-gray-100
                            dark:bg-gray-800
                          rounded-lg p-2">
                                                                        <p className="  w-full text-sm">{
                                                                            comment.content
                                                                        }</p>
                                                                    </div>
                                                                    {/* <div className="flex items-center mt-1 space-x-2 text-xs text-gray-500">
                                                                <button className="hover:text-gray-700">Like</button>
                                                                <button className="hover:text-gray-700">Reply</button>

                                                            </div> */}
                                                                </div>}
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
                                                                    <div className="mt-2 w-full">
                                                                        <Input
                                                                            className="w-full p-2 border border-gray-300 rounded text-sm"
                                                                            value={editCommentValue}
                                                                            onChange={(e) => setEditCommentValue(e.target.value)}
                                                                        />

                                                                        <div>
                                                                            <Button
                                                                                className="bg-blue-900 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 mt-2"
                                                                                onClick={() => handleEditSubmit(post._id, comment._id)}
                                                                            >
                                                                                Submit Edit
                                                                            </Button>
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
                                                <div className="text-xs text-gray-500 text-center">No comments yet</div>
                                            )}
                                        </div>

                                        {user ? (
                                            <div className="mt-3 lg:w-[97.5%] w-full">

                                                <div className="flex  space-x-2">
                                                    <Avatar
                                                        src={user?.img}
                                                        className="h-10 w-10">

                                                    </Avatar>
                                                    <Input

                                                        value={commentInput[post._id] || ''}
                                                        onChange={(e) => handleCommentChange(post._id, e.target.value)}
                                                        placeholder="Write a comment..." className="flex-1" />
                                                    <Button
                                                    className="bg-gray-200 
                                                        dark:bg-gray-800
                                                    "
                                                        onClick={() => handleCommentSubmit(post._id)}
                                                        size="md">Post</Button>
                                                </div>



                                            </div>
                                        ) : <>
                                            <div className="lg:text-2xl text-sm text-center text-gray-500 mt-2 font-bold  ">Please login to vote follow and comment</div>
                                        </>

                                        }

                                    </CardFooter>
                                </Card>
                            ))}

                        </div>
                    </InfiniteScroll>
                )
            }

        </main>
    );
};

export default PostCard;