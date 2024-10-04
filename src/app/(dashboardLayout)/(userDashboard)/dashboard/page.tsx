"use client";

import Image from 'next/image';
import Post from './components/Post';

import { useGetProfile } from '@/hook/user.Hook';
import Followers from './components/Follwers';
import { useEffect, useState } from 'react';
import { getuserposts } from '@/Services/Post';



const Profile = () => {
  const { data: userData, isLoading } = useGetProfile();
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
    fetchPosts()
      
    } 
    , [userId]);
    
  if (isLoading) {
    return <div>Loading...</div>;

  }

  
 

 
  
  



  return (
    <div className="container mx-auto lg:p-4">
      <div className="bg-white shadow-md rounded-lg pb-20 dark:bg-black">
        <div className="relative">
          <div className="w-full h-48 bg-gray-300 rounded-t-lg"></div>
          <div className="absolute top-32 left-5">
            <Image
              src={user?.img || '/path/to/default-profile-picture.jpg'}
              alt="Profile Picture"
              width={120}
              height={120}
              className="rounded-full border-4 border-white w-[110px] h-[100px]"
            />
          </div>
        </div>

        <div className="lg:flex justify-between items-center">
          <div className="pt-16 pb-4 px-5">
            <h1 className="text-2xl font-bold">{user?.name || 'User Name'}</h1>
            <p className="text-gray-600">{user?.email || 'No email provided'}</p>
          </div>

          <div className="lg:pt-16 pb-4 px-5">
            <h1 className="text-2xl font-bold">User Details</h1>
            <p className="text-gray-600">Email: {user?.email || ''}</p>
            <p className="text-gray-600">Role: {user?.role || 'N/A'}</p>
            <p className="text-gray-600">Social Login: {user?.social ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>

     

      <Followers followers={user?.followers || []} following={user?.following || []} />

    {
      posts.length > 0 ? <Post posts={posts} /> : <div>No Posts</div>
    }
    </div>
  );
};

export default Profile;
