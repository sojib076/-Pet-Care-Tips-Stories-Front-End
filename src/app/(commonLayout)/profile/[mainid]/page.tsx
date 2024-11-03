"use client"

import { Calendar, Facebook, FileText, Linkedin, Twitter, } from 'lucide-react';
import React from 'react';
import { UserItem } from '../../components/Profile/Followers';
import { useParams } from 'next/navigation';
import { useGetProfile, useGetUserById } from '@/hook/user.Hook';
import { useGetPostsbyUserId } from '@/hook/post.hook';
import { useUser } from '@/context/uAuthContext';
import { handelpayment } from '@/Services/Post';
import { toast } from 'sonner';

const Profile = () => {



    const { mainid } = useParams();
    const userId = mainid as string;
    const { data, isLoading, isError } = useGetUserById(userId);

    const { data: postData, isLoading: postLoading, isError: postErorr } = useGetPostsbyUserId(userId);
    const { data: currentuserdata, } = useGetProfile();

    const {user}=useUser()

    const currentuser = user?._id



    const userData = data?.data;
    const userPaidPosts = currentuserdata?.data?.paidfor
    console.log(userPaidPosts);

    const posts = postData?.data.posts






    if (isLoading || postLoading) return <div>Loading...</div>;

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


        <div className='lg:p-20 p-10 min-h-screen dark:bg-black'>
            <div
                style={{
                    backgroundImage: 'url(https://www.radiustheme.com/demo/wordpress/themes/cirkle/wp-content/uploads/buddypress/members/1/cover-image/60b0724fc9a1a-bp-cover-image.jpg)',

                    backgroundSize: 'cover',

                    backgroundRepeat: 'no-repeat'

                }}
                className='bg-pink-500 lg:h-80 rounded-2xl grid lg:grid-cols-2 p-5 gap-10 items-center'>


                <div className="flex lg:flex-row  flex-col  items-center  gap-20 p-8  bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100
">

                    <div
                        className="relative w-32 h-32 flex items-center justify-center"
                        style={{
                            backgroundImage: 'url(https://www.radiustheme.com/demo/wordpress/themes/cirkle/wp-content/themes/cirkle/assets/img/round_shape1.png)',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        <img
                            src={userData?.img}
                            alt="profile"
                            className="w-24 h-24 rounded-full"
                        />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">{
                            userData?.name
                        }</h2>
                        <div className="flex mt-4 space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                                <Facebook size={24} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                                <Twitter size={24} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
                                <Linkedin size={24} />
                            </a>
                        </div>
                    </div>


                </div>

                <div className="bg-blue-900 mt-6 p-4 rounded-lg w-full flex justify-around items-center text-white">
                    <div className="flex items-center space-x-2">
                        <FileText size={20} />
                        <span className="font-semibold">Posts: 34</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Calendar size={20} />
                        <span className="font-semibold">Joined: Jan 2021</span>
                    </div>
                </div>

            </div>

            <div className="mt-6 space-y-4 flex lg:flex-row flex-col-reverse gap-10">
                <div className='lg:w-[75%] grid grid-cols-1 gap-5 '>


                    {
                         posts?.map((post: any) => (
                            <div key={post.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{post.title}</h3>
                               {
                                  (!post.premiumContent || userPaidPosts?.includes(post._id)  ) || post?.author?._id == currentuser ? (
                                    <p dangerouslySetInnerHTML={{ __html: post.content }} />
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
                            </div>
                         ))
                    
                    }


                </div>

                <div>

                    <div className="lg:w-[20%] lg:min-w-[300px] h-96 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mt-10">
                        <div className="p-4 border-b">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Follwers</h2>
                        </div>
                        
                        <div className="overflow-y-auto max-h-[300px]">
                            {
                                // check the lenght of it 
                                userData?.followers.length >0 ? (
                                    userData?.followers.map(user => (

                                        <UserItem key={user.id} user={user} />
                                    ))
                                ): 
                                <h1>
                                    No Followers
                                </h1>
                            }
                        </div>
                    </div>

                </div>


            </div>



        </div>
    );
};

export default Profile;