"use client";

import useDebounce from "@/hook/debounce.hook";
import { useGetPost } from "@/hook/post.hook";
import { useGetProfile } from "@/hook/user.Hook";
import { addCommentToPost, deleteComment, downvotePost, editcomment, followUser, getcategory, getFollowedUsersPosts, getPost, getsearch, handelpayment, upvotePost } from "@/Services/Post";
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";
import { ArrowBigDown, ArrowBigUp, Award, ChevronDown, ChevronUp, MessageCircle, MoreHorizontal, SearchIcon, Share2 } from "lucide-react";

import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import CardLoading from "./cardLoading";
import Link from "next/link";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Separator } from "@radix-ui/react-separator";


const PostCard = () => {
    const { register, handleSubmit, watch } = useForm();
    const [cateLoading, setCategoryLoading] = useState(false);
    const [searchCategory, setSearchCategory] = useState<string>('Tip');
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [posts, setPosts] = useState<any>();
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

    console.log(posts);
    return (
        // <div className="grid gap-6 min-h-screen ">
        //     <div className="flex flex-col  mb-4">
        //         <div className=" mt-10">
        //             <div className="flex gap-5 lg:ml-[38%]">
        //                 <form onSubmit={handleSubmit(onSubmit)}>
        //                     <div className="w-[90%] lg:w-[100%]">
        //                         <Input
        //                             {...register("search")}
        //                             aria-label="Search"
        //                             classNames={{ inputWrapper: "bg-default-200", input: "text-sm" }}
        //                             placeholder="Search..."
        //                             size="lg"
        //                             startContent={<SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-400" />}
        //                             type="text"
        //                         />
        //                     </div>
        //                 </form>


        //                 <select
        //                     name="searchType"
        //                     className="border border-gray-300 rounded-md p-2"
        //                     onChange={(e) => setSearchCategory(e.target.value)}
        //                 >
        //                     <option value="Tip">Tip</option>
        //                     <option value="Story">Story</option>
        //                 </select>
        //             </div>

        //             <div className="">
        //                 <h1 className="text-center lg:text-5xl text-3xl my-5 font-bold">Category</h1>
        //                 <div className="flex justify-center gap-4">
        //                     <button className="px-4 py-2 bg-gray-200 dark:text-black" onClick={() => handelbysort('upvotes')} > Sort by Upvotes </button>
        //                     <button className="px-4 py-2 bg-gray-200 dark:text-black" onClick={() => handelbysort('downvotes')} > Sort by Downvotes </button>
        //                 </div>

        //                 <div className="flex justify-between my-5 bg-gray-300 p-4 rounded-2xl w-full  ">
        //                     <button className={`px-4 py-2 rounded ${activeCategory === 'Tip' ? 'bg-blue-900 text-white' : 'bg-gray-200  text-black'}`}



        //                         onClick={() => handelCategory('Tip')}

        //                     >Tip</button>
        //                     <button className={`px-4 py-2 rounded ${activeCategory === 'Story' ? 'bg-blue-900 text-white' : 'bg-gray-200 text-black '}`}
        //                         onClick={() => handelCategory('Story')}


        //                     >Story</button>
        //                     <button className={`px-4 py-2 rounded  ${activeCategory === 'All' ? 'bg-blue-900 text-white' : ' bg-gray-200 text-black'}`}

        //                         onClick={handelall}>All</button>
        //                     <button className={`px-4 py-2 rounded ${activeCategory === 'Following' ? 'bg-blue-900 text-white' : 'bg-gray-200 text-black '}`}
        //                         onClick={() => handleFollowing()}
        //                     >Following</button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>

        //     {
        //         cateLoading || isLoading ?
        //             Array.from({ length: 4 }).map((_, i) => <CardLoading key={i} />)
        //             : null
        //     }

        //     {

        //         post?.map((post: any) => (
        //             <div key={post._id} className="w-[90%] mx-auto bg-white border border-gray-800 rounded-lg mb-6 shadow-md p-8 ">
        //                 <div className='flex justify-end gap-5 items-end'>
        //                     {post.premiumContent && (
        //                         <div className="mb-2 flex justify-end">
        //                             <span className="bg-yellow-500 text-white text-xs font-semibold py-1 px-3 rounded-full">
        //                                 Premium Content
        //                             </span>
        //                         </div>
        //                     )}
        //                     {post.category && (
        //                         <div className="mb-2 flex justify-end">
        //                             <span className="bg-blue-500 text-white text-xs font-semibold py-1 px-3 rounded-full">
        //                                 {post.category}
        //                             </span>
        //                         </div>
        //                     )}
        //                 </div>

        //                     <div className="flex items-start space-x-3 mb-3">
        //                     <Link href={`/profile/${post.author._id}`}>
        //                         <img
        //                             src={post.author.img || "/default-profile.png"}
        //                             alt={post.author.name || "Anonymous"}
        //                             className="w-10 h-10 rounded-full"
        //                         />
        //                         </Link>


        //                         <div className="flex-grow">
        //                             <div className="flex justify-between items-center">
        //                             <Link href={`/profile/${post.author._id}`}>
        //                                 <div>
        //                                     <h3 className="text-base font-semibold text-pink-800 ">{post.author.name || "Anonymous"}</h3>

        //                                 </div>
        //                                 </Link>
        //                                 { post.author._id !== user?._id ? (
        //                                     <button
        //                                         disabled={!user}
        //                                         className="text-blue-500 font-semibold text-xs hover:underline group "
        //                                         onClick={() => handleFollow(post.author._id)}
        //                                     >
        //                                         {userFollowing && user && userFollowing.includes(post.author._id) ? 'Unfollow' : 'Follow'}

        //                                         {
        //                                             !user && <>
        //                                                 <h1>
        //                                                     Please login to follow
        //                                                 </h1>
        //                                             </>
        //                                         }

        //                                     </button>





        //                                 ) : (
        //                                     <span className="text-gray-500 text-xs font-semibold ">YOUR POST </span> // Change this to whatever you'd like to show
        //                                 )}

        //                             </div>

        //                             <span className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</span>
        //                         </div>

        //                     </div>



        //                 <div className="text-sm text-gray-700 mb-2">

        //                     <h1 className="text-2xl text-black my-3">
        //                         {post.title}
        //                     </h1>


        //                     {(!post.premiumContent || userPaidPosts?.includes(post._id)) || post?.author?._id == user?._id ? (
        //                         <p className='' dangerouslySetInnerHTML={{ __html: post.content }} />
        //                     ) : (
        //                         <>
        //                             <p dangerouslySetInnerHTML={{ __html: post.content.slice(0, 150) }} />
        //                             <div className="relative group">
        //                                 <button
        //                                     disabled={!user}
        //                                     className="bg-blue-900 text-white px-3 py-1 rounded text-xs mt-2 hover:bg-blue-900/90 disabled:bg-gray-400"
        //                                     onClick={() => handlePayment(post._id)}
        //                                 >
        //                                     Pay 100 TK to Unlock Full Content
        //                                 </button>
        //                                 {!user && (
        //                                     <span className="absolute left-1/4 w-[250px] transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
        //                                         Please login to proceed with payment
        //                                     </span>
        //                                 )}
        //                             </div>
        //                         </>
        //                     )}


        //                 </div>

        //                 <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
        //                     <div className="flex space-x-4">
        //                         <button
        //                             disabled={!user}
        //                             className={`flex items-center space-x-1 ${(post.voters ?? []).some((voter: { userId: string | undefined; voteType: string; }) => voter.userId === user?._id && voter.voteType === 'up')
        //                                 ? 'text-blue-900'
        //                                 : 'text-gray-600'
        //                                 }`}
        //                             onClick={() => handleUpvote(post._id)} >
        //                             <ArrowBigUp size={40}

        //                                 className="hover:translate-y-[-10px]

        //                               transition-all

        //                               "
        //                             />

        //                             <span>{post.upvotes}</span>
        //                         </button>
        //                         <button
        //                             disabled={!user}
        //                             className={`flex items-center space-x-1 ${(post.voters ?? []).some((voter: { userId: string | undefined; voteType: string; }) => voter.userId === user?._id && voter.voteType === 'down')
        //                                 ? 'text-red-500'
        //                                 : 'text-gray-600'
        //                                 }`}
        //                             onClick={() => handeldownvote(post._id)}

        //                         >
        //                             <ArrowBigDown size={40} className="hover:translate-y-[10px]

        //                             transition-all 
        //                             " />
        //                             <span>{post.downvotes}</span>
        //                         </button>
        //                     </div>
        //                     <div className="text-xs">{post.comments.length} Comments</div>
        //                 </div>



        //                 <div className="border-t border-gray-300 pt-3">
        //                     {post.comments.length > 0 ? (
        //                         <div className="text-xs text-gray-500">
        //                             {post.comments
        //                                 .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        //                                 .slice(0, 4)
        //                                 .map((comment: any) => (
        //                                     <div key={comment._id} className="mb-2">
        //                                         <strong>{comment.userId.name || 'Anonymous'}:</strong> {comment.content}
        //                                         <div className="text-gray-400">{new Date(comment.createdAt).toLocaleString()}</div>

        //                                         {user?._id === comment.userId._id && (
        //                                             <div className="flex space-x-2 text-xs mt-1">
        //                                                 <button className="text-blue-500 hover:underline" onClick={() => handleEditClick(comment)}>
        //                                                     Edit
        //                                                 </button>
        //                                                 <button className="text-blue-500 hover:underline"
        //                                                     onClick={() => handleDeleteComment(post._id, comment._id)}
        //                                                 >
        //                                                     Delete
        //                                                 </button>
        //                                             </div>
        //                                         )}

        //                                         {editCommentId === comment._id && (
        //                                             <div className="mt-2">
        //                                                 <textarea
        //                                                     className="w-full p-2 border border-gray-300 rounded text-sm"
        //                                                     value={editCommentValue}
        //                                                     onChange={(e) => setEditCommentValue(e.target.value)}
        //                                                 />
        //                                                 <div>
        //                                                     <button
        //                                                         className="bg-blue-900 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 mt-2"
        //                                                         onClick={() => handleEditSubmit(post._id, comment._id)}
        //                                                     >
        //                                                         Submit Edit
        //                                                     </button>
        //                                                 </div>
        //                                             </div>
        //                                         )}

        //                                     </div>
        //                                 ))}
        //                             {post.comments.length > 10 && (
        //                                 <button className="text-blue-500 font-semibold text-xs hover:underline" >
        //                                     View all comments
        //                                 </button>
        //                             )}
        //                         </div>
        //                     ) : (
        //                         <div className="text-xs text-gray-500">No comments yet</div>
        //                     )}
        //                 </div>

        //                 {user ? (
        //                     <div className="mt-3">
        //                         <textarea
        //                             className="w-full p-2 border border-gray-300 rounded mb-2 text-sm"
        //                             placeholder="Write a comment..."
        //                             value={commentInput[post._id] || ''}
        //                             onChange={(e) => handleCommentChange(post._id, e.target.value)}
        //                         />
        //                         <Button
        //                             className="bg-blue-900 w-full text-white px-3 py-1 rounded text-xs hover:scale-95  hover:text-xl 
        //                             transition-all
        //                             "
        //                             onClick={() => handleCommentSubmit(post._id)}>
        //                             Submit Comment
        //                         </Button>


        //                     </div>
        //                 ) : <>
        //                     <div className="lg:text-2xl text-sm text-center text-gray-500 mt-2 font-bold  ">Please login to vote follow and comment</div>
        //                 </>

        //                 }
        //             </div>
        //         ))


        //     }
        //     {
        //         post?.length === 0 && (
        //             <div className="text-center text-gray-500 text-xl mt-10">
        //                 No posts found
        //             </div>
        //         )
        //     }





        // </div>

        <main className="w-full  mx-auto ">
            {
                cateLoading || isLoading ?
                    Array.from({ length: 4 }).map((_, i) => <CardLoading key={i} />)
                    : null
            }
            <ScrollArea className="h-[calc(100vh-4rem)] md:h-screen">
                <div className="space-y-4">

                    {posts?.map((post: any) => (
                        <Card key={post._id} className="w-full max-w-4xl mx-auto">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div className="flex items-center space-x-4">
                                    <Link href={`/profile/${post?.author?._id}`}>
                                        <Avatar
                                            name='User'
                                        >

                                        </Avatar>
                                    </Link>
                                    <div>
                                        <p className="font-semibold">User </p>
                                        <div className="flex items-center">
                                            <p className="text-sm text-muted-foreground"><span className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</span> </p>
                                            <span className="mx-1 text-muted-foreground">·</span>
                                            {
                                                post?.premiumContent && (

                                                    <span className="bg-yellow-400 text-yellow-900 text-xs font-medium px-2 py-0.5 rounded-full flex items-center">
                                                        <Award className="w-3 h-3 mr-1" />
                                                        Premium
                                                    </span>
                                                )
                                            }

                                            {post?.category && (
                                                <div className="mb-2 flex justify-end">
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
                                <div>
                                    {post?.author?._id !== user?._id ? (
                                        <Button
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

                                        </Button>

                                    ) : (
                                        <span className="text-gray-500 text-xs font-semibold ">YOUR POST </span>
                                    )}
                                </div>
                            </CardHeader>
                            <CardBody>
                                <h2 className="text-xl font-bold mb-2"> {post.title} || </h2>

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
                                <div className="flex justify-between w-full text-muted-foreground text-sm mb-2">
                                    <div className="flex gap-5 font-extrabold text-xs">
                                        <span
                                        className="
                                        
                                        "
                                        >{post?.upvotes} Upvotes</span> |
                                        <span>{post?.downvotes}  Downvotes</span>
                                    </div>

                                </div>
                                <Separator className="my-2" />
                                <div className="flex justify-between w-full">
                                    <div className="flex items-center gap-2">
                                        <Button
                                            disabled={!user}
                                            className={`${(post.voters ?? []).some((voter: { userId: string | undefined; voteType: string; }) => voter.userId === user?._id && voter.voteType === 'up')
                                                ? 'text-blue-900'
                                                : 'text-gray-600'
                                                }`}
                                            onClick={() => handleUpvote(post._id)}
                                            variant="solid" >
                                            <ChevronUp className="h-6 w-6 text-gray-500 hover:text-blue-500" />
                                        </Button>
                                        <span className="font-semibold">{post.upvotes}</span>
                                        <Button

                                            disabled={!user}
                                            className={`flex items-center space-x-1 ${(post.voters ?? []).some((voter: { userId: string | undefined; voteType: string; }) => voter.userId === user?._id && voter.voteType === 'down')
                                                ? 'text-red-500'
                                                : 'text-gray-600'
                                                }`}
                                            onClick={() => handeldownvote(post._id)}

                                            variant="solid" >
                                            <ChevronDown className="h-6 w-6 text-gray-500 hover:text-red-500" />
                                        </Button>
                                    </div>
                                    <Button variant="solid">
                                        <MessageCircle className="mr-2 h-4 w-4" />
                                        Comment
                                    </Button>
                                    <Button variant="solid">
                                        <Share2 className="mr-2 h-4 w-4" />
                                        Share
                                    </Button>
                                </div>
                                <Separator className="my-2" />

                            
                                <div className="border-t border-gray-300 pt-3">
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

                                                                <p className=" lg:min-w-[800px] text-sm">{
                                                                    comment.content
                                                                }</p>
                                                            </div>
                                                            <div className="flex items-center mt-1 space-x-2 text-xs text-gray-500">
                                                                <button className="hover:text-gray-700">Like</button>
                                                                <button className="hover:text-gray-700">Reply</button>

                                                            </div>
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
                                                            <div className="mt-2">
                                                                <Input
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

                                        <div className="flex  space-x-2">
                                            <Avatar
                                                name='User'
                                                className="h-8 w-8">

                                            </Avatar>
                                            <Input
                                                value={commentInput[post._id] || ''}
                                                onChange={(e) => handleCommentChange(post._id, e.target.value)}
                                                placeholder="Write a comment..." className="flex-1" />
                                            <Button
                                                onClick={() => handleCommentSubmit(post._id)}
                                                size="sm">Post</Button>
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
            </ScrollArea>
        </main>
    );
};

export default PostCard;