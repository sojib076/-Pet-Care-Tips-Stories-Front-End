
"use client"
import { useUser } from '@/context/uAuthContext';
import { useGetSingleGroup } from '@/hook/group.hook';
import { useGetPostsbyUserId } from '@/hook/post.hook';
import { useGetProfile } from '@/hook/user.Hook';
import { handelpayment } from '@/Services/Post';

import { Bell, ThumbsUp,  } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

const GroupDetails = () => {
    const { groupid } = useParams();
    const { user } = useUser();
    const { data: groupData, isLoading: groupLoading, } = useGetSingleGroup(groupid);
    const adminid = groupData?.data?.admin;

    const { data: currentuserdata, } = useGetProfile();
    const userPaidPosts = currentuserdata?.data?.paidfor
    const userData = currentuserdata?.data




    const { data: postData, isLoading: postLoading, } = useGetPostsbyUserId(adminid);

    const maindatapost = postData?.data.posts


    if (groupLoading || postLoading) {
        return <div>Loading...</div>;
    }
    const currentuser = user?._id


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
        <div>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
                <h1 className='text-2xl  font-bold mb-5 '>
                    {groupData?.data?.name}
                </h1>
                <div className="flex flex-col lg:flex-row gap-8">

                    <div className="lg:w-2/3">


                        <div className="space-y-6">
                            {

                                !postLoading && maindatapost?.map((post) => (
                                    <div key={post} className="bg-white dark:bg-gray-800 rounded-lg shadow">
                                        <div className="p-4">
                                            <div className="flex items-center mb-4">
                                                <img
                                                    src={post.author.img || "/default-profile.png"}
                                                    alt={post.author.name || "Anonymous"}
                                                    className="w-10 h-10 rounded-full"
                                                />
                                                <div>
                                                    <h3 className="text-base font-semibold text-pink-800 ">{post.author.name || "Anonymous"}</h3>
                                                    <p className="text-gray-500 text-sm">

                                                        {post.createdAt}
                                                    </p>
                                                </div>
                                            </div>

                                            {
                                                (!post.premiumContent || userPaidPosts?.includes(post._id)) || post?.author?._id == currentuser ? (
                                                    <p className='dark:text-gray-50' dangerouslySetInnerHTML={{ __html: post.content }} />
                                                ) : (
                                                    <>
                                                        <p dangerouslySetInnerHTML={{ __html: post.content.slice(0, 150) }} />
                                                        <div className="relative group">
                                                            <button
                                                                disabled={!userData}
                                                                className="bg-blue-900 text-white px-3 py-1 rounded text-xs mt-2 hover:bg-blue-900/90 disabled:bg-gray-400"
                                                                onClick={() => handlePayment(post._id)}

                                                            >
                                                                Pay 100 TK to Unlock Full Content
                                                            </button>
                                                            {!userData && (
                                                                <span className="absolute left-1/4 w-[250px] transform -translate-x-1/2 -translate-y-8 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    Please login to proceed with payment
                                                                </span>
                                                            )}
                                                        </div>
                                                    </>
                                                )
                                            }

                                            <div className="flex items-center justify-between text-gray-500">
                                                <div className="flex items-center">
                                                    <ThumbsUp className="w-5 h-5 mr-1" />
                                                    <span>
                                                        {post.upvotes.length} Likes
                                                    </span>
                                                </div>
                                                <div>12 Comments</div>
                                            </div>
                                        </div>

                                    </div>
                                ))



                           

                                
                                

                         }
                         {
                            !postLoading && maindatapost?.length == 0 && (
                                <div className="bg-white rounded-lg shadow p-4">
                                    <h2 className="text-xl font-semibold mb-4 dark:text-black">No Post Found</h2>
                                </div>

                            ) 
                         }

                                
                        </div>
                    </div>


                    <div className="lg:w-1/3 space-y-6">

                        <div className="bg-white rounded-lg shadow p-4">
                            <h2 className="text-xl font-semibold mb-4 dark:text-black">About This Group</h2>
                            <p className="text-gray-600 mb-4">{
                                groupData?.data?.description
                            }</p>
                         
                            <div className="flex items-center text-gray-600">
                                <Bell className="w-5 h-5 mr-2" />
                                <span>Very active</span>
                            </div>
                        </div>




                        <div className="bg-white rounded-lg shadow p-4 dark:text-black">
                            <h2 className="text-xl font-semibold mb-4">Members</h2>
                            <div className="space-y-4">
                              
                            </div>
                            <button className="mt-4 text-blue-600 hover:text-blue-800 font-semibold">See All Members</button>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default GroupDetails;