"use client";

import Image from 'next/image';
import Post from './components/Post';
import { useGetProfile } from '@/hook/user.Hook';
import Followers from './components/Followers';
import { useEffect, useState } from 'react';
import { getuserposts } from '@/Services/Post';
import { LoaderPinwheel } from 'lucide-react';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
 // Icon for loading spinner


const Profile = () => {
  const { data: userData, isLoading, isError } = useGetProfile();
  const [posts, setPosts] = useState([]);
     
  const user = userData?.data;
  const userId = user?._id;

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getuserposts();
      if (posts) {
        setPosts(posts.data);
      }
    };
    if (userId) {
      fetchPosts();
    }
  }, [userId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderPinwheel className="animate-spin text-4xl text-green-500" />
        <span className="ml-2 text-xl">Loading profile...</span>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600">Failed to load profile data. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto lg:p-4">
      <div className="bg-white shadow-md rounded-lg pb-20 dark:bg-gray-800">
        <div className="relative">
          <div className="w-full h-48 bg-gray-300 rounded-t-lg dark:bg-gray-700"></div>
          <div className="absolute top-32 left-5">
            <Image
              src={user?.img || '/path/to/default-profile-picture.jpg'}
              alt="Profile Picture"
              width={120}
              height={120}
              className="rounded-full border-4 border-white w-[110px] h-[100px]"
              placeholder="blur" // Added for better UX when loading image
              blurDataURL="/path/to/blur-image.jpg"
            />
            
          </div>
        </div>

        <div className="lg:flex justify-between items-center">
          <div className="pt-16 pb-4 px-5">
            <h1 className="text-2xl font-bold dark:text-white">{user?.name || 'User Name'}</h1>
            <p className="text-gray-600 dark:text-gray-400">{user?.email || 'No email provided'}</p>
          </div>

          <div className="lg:pt-16 pb-4 px-5">
            <h1 className="text-2xl font-bold dark:text-white">User Details</h1>
            <p className="text-gray-600 dark:text-gray-400">Email: {user?.email || 'N/A'}</p>
            <p className="text-gray-600 dark:text-gray-400">Role: {user?.role || 'N/A'}</p>
            <p className="text-gray-600 dark:text-gray-400">Social Login: {user?.social ? 'Yes' : 'No'}</p>

            {/* Update Profile Button */}

            <Link href="/admin-dashboard/update">
              
                <Button className="mt-4" >
                  Update Profile
                </Button>
             
            </Link>
        
          </div>
        
        </div>
      </div>

      <Followers followers={user?.followers || []} following={user?.following || []} />

      {/* Posts Section */}
      <div className="mt-8">
        {posts.length > 0 ? (
          <Post posts={posts} />
        ) : (
          <div className="text-center text-gray-600 dark:text-gray-400">No posts available.</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
