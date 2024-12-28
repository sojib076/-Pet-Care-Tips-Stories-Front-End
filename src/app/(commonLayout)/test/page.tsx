
"use client"

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";
import { Award, ChevronDown, ChevronUp, Link, MessageCircle } from "lucide-react";
import { useGetProfile } from "@/hook/user.Hook";
import { Separator } from "@/components/ui/separator";
const page = () => {
  const [posts, setPosts] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true); 
   const [userFollowing, setUserFollowing] = useState<string[]>([]);
   const [userPaidPosts, setUserPaidPosts] = useState<string[]>([]);
   const [isLoading, setIsLoading] = useState(false);




  



      const fetchPosts = async (page) => {

        setIsLoading(true);
        try {
         
          const res = await fetch(`http://localhost:5000/api/v1/post/get?page=${page}`);
          const data = await res.json();
          return data;
        } catch (error) {
          return null;
        } finally{
          setIsLoading(false);
        }
      };
      useEffect(() => {
        const loadInitialPosts = async () => {
          const data = await fetchPosts(currentPage);
          
          if (data.success) {
            setPosts(data?.data?.posts);
            if (currentPage >= data.totalPages) setHasMore(false);
          }
        };
    
        loadInitialPosts();
      }, []);
    
      const fetchMorePosts = async () => {
        const nextPage = currentPage + 1;
        const data = await fetchPosts(nextPage);
    
        if (data) {
          setPosts((prevPosts) => [...prevPosts, ...data?.data?.posts]);
          setCurrentPage(nextPage);
          if (nextPage >= data.totalPages) setHasMore(false);
        }
      };
    
       
      
      
      const { data: userData, } = useGetProfile();
      
      const user = userData?.data;
 
 
  return (
    <div>
      <InfiniteScroll
        dataLength={posts.length} 
        next={fetchMorePosts} 
        hasMore={hasMore} 
        loader={<p>Loading more posts...</p>} 
        endMessage={<p>No more posts available.</p>} 
      >
         {posts?.map((post: any) => (
                        <Card key={post._id} className="w-full max-w-5xl mx-auto bg-gray-50
                        dark:bg-gray-900 p-2">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div className="flex items-center  space-x-4">
                                    <Link href={`/profile/${post?.author?._id}`}>
                                        <Avatar src={user?.img}></Avatar>
                                    </Link>
                                    <div>
                                        <p className="font-semibold">{post.author.name || "Anonymous"} </p>
                                        <div className="flex items-center">
                                            <p className="text-sm text-muted-foreground">
                                                <span className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</span>
                                            </p>
                                            <span className="mx-1 text-muted-foreground">·</span>
                                            {post?.premiumContent && (
                                                <span className="bg-yellow-400 text-yellow-900 text-xs font-medium px-2 py-0.5 rounded-full flex items-center">
                                                    <Award className="w-3 h-3 mr-1" />
                                                    Premium
                                                </span>
                                            )}
                                            {post?.category && (
                                                <div className=" flex justify-end ml-2">
                                                    <span className="bg-blue-500 text-white text-xs font-semibold py-1 px-3 rounded-full">
                                                        {post?.category}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div></div>
                                </div>
                                {post?.author?._id !== user?._id ? (
                                    <Button
                                        disabled={!user}
                                        className="bg-gradient-to-bl from-sky-500 to-sky-300 text-white px-3 py-1 dark:from-gray-900 dark:to-sky-800 font-semibold text-xs">
                                        {userFollowing && user && userFollowing.includes(post.author._id) ? 'Unfollow' : 'Follow'}
                                        {!user && <h1>Please login to follow</h1>}
                                    </Button>
                                ) : (
                                    <span className="text-gray-950 text-xs font-semibold dark:text-gray-300 border border-gray-950 px-2 py-1 rounded-full">
                                        YOUR POST
                                    </span>
                                )}
                            </CardHeader>
                            <CardBody>
                                <h2 className="text-xl font-bold mb-2"> {post.title} </h2>
                                {(!post?.premiumContent || userPaidPosts?.includes(post._id)) || post?.author?._id == user?._id ? (
                                    <p className='' dangerouslySetInnerHTML={{ __html: post.content }} />
                                ) : (
                                    <>
                                        <p dangerouslySetInnerHTML={{ __html: post.content.slice(0, 150) }} />
                                        <div className="relative group">
                                            <button
                                                disabled={!user}
                                                className="bg-blue-900 text-white px-3 py-1 rounded text-xs mt-2 hover:bg-blue-900/90 disabled:bg-gray-400">
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
                                <div className="flex justify-between w-[98%] text-muted-foreground text-sm">
                                    <div className="flex gap-2 font-extrabold text-xs">
                                        <span className="text-green-600 text-[15px]">{post?.upvotes} Upvotes</span> |
                                        <span className="text-red-400/90 text-[15px]">{post?.downvotes} Downvotes</span>
                                    </div>
                                </div>
                                <Separator className="my-2" />
                                <div className="flex justify-between w-full p-2 rounded-2xl dark:bg-gray-800">
                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="md"
                                            disabled={!user}
                                            className={`bg-green-400 ${(post.voters ?? []).some((voter) => voter.userId === user?._id && voter.voteType === 'up') ? 'text-blue-900' : 'text-gray-600'}`}
                                            variant="solid">
                                            <ChevronUp className="h-6 w-6 text-gray-500 hover:text-blue-500" />
                                        </Button>
                                        {post.upvotes >= post.downvotes ? (
                                            <span className="font-semibold text-2xl text-green-600">
                                                {post.upvotes}
                                            </span>
                                        ) : (
                                            <span className="font-semibold text-2xl text-red-400">
                                                {post.downvotes}
                                            </span>
                                        )}
                                        <Button
                                            disabled={!user}
                                            className={`group flex items-center bg-red-400 space-x-1 ${(post.voters ?? []).some((voter) => voter.userId === user?._id && voter.voteType === 'down') ? 'text-red-500' : 'text-gray-600'}`}
                                            variant="solid">
                                            <ChevronDown className="h-6 w-6 text-gray-500 hover:text-red-500" />
                                        </Button>
                                    </div>
                                    <Button size="md" className="">
                                        <MessageCircle className="mr-2 h-4 w-4" />
                                        Comment
                                    </Button>
                                </div>
                                <Separator className="my-2" />
                                <div className="w-[98%] border-t border-gray-300 pt-3">
                                    <h3 className="text-sm font-semibold mb-2">Comments</h3>
                                    {post?.comments?.length > 0 ? (
                                        <div className="text-xs text-gray-500">
                                            {post?.comments
                                                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                                                .slice(0, 4)
                                                .map((comment) => (
                                                    <div key={comment._id} className="mb-2">
                                                        <strong>{comment.userId.name || 'Anonymous'}:</strong>
                                                        <div className="flex-1">
                                                            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
                                                                <p className="w-full text-sm">{comment.content}</p>
                                                            </div>
                                                            <div className="text-gray-400">{new Date(comment.createdAt).toLocaleString()}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            {post.comments.length > 10 && (
                                                <button className="text-blue-500 font-semibold text-xs hover:underline">
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
                                            <Avatar src={user?.img} className="h-10 w-10"></Avatar>
                                            <Input
                                               
                                                placeholder="Write a comment..."
                                                className="flex-1" />
                                            <Button size="md">Post</Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="lg:text-2xl text-sm text-center text-gray-500 mt-2 font-bold">Please login to vote follow and comment</div>
                                )}
                            </CardFooter>
                        </Card>
                        
                    ))}

        </InfiniteScroll>
    </div>
  );
};

export default page;