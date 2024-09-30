// pages/profile.js
"use client";

import Image from 'next/image';
import Post from './components/Post';
import { useGetProfile } from '@/hook/user.Hook';

const Profile = () => {
  const { data: userData, isLoading } = useGetProfile();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const user = userData?.data;

  return (
    <div className="container mx-auto lg:p-4 ">
      <div className="bg-white shadow-md rounded-lg pb-20 dark:bg-black">
        <div className="relative">
         
          <div className="w-full h-48 bg-gray-300 rounded-t-lg">
          
          </div>
          <div className="absolute top-32 left-5">
            <Image
              src={user?.img || '/path/to/default-profile-picture.jpg'} 
              alt="Profile Picture"
              width={120}
              height={120}
              className="rounded-full border-4 border-white"
            />
          </div>
        </div>  
        <div className='lg:flex justify-between items-center'>

        <div className="pt-16 pb-4 px-5">
          <h1 className="text-2xl font-bold">{user?.name || 'User Name'}</h1>
          <p className="text-gray-600">{user?.email || 'Bio or a brief description of the user.'}</p>

          <div className='flex justify-between'>
           <div> 
           <h1> 
              Followers
              
            </h1>
            <p> 
              {
                user?.followers.length || 0
              }
            </p>
           </div>
            <div>
              <h1> 
              Following
              </h1>
              <p> 
                {
                  user?.following.length || 0
                }</p>
          </div>
          </div>
        
        </div>

        <div className="lg:pt-16 pb-4 px-5">
          <h1 className="text-2xl font-bold">User Details</h1>
          <p className="text-gray-600">Email: {user?.email || ''} </p>
        </div>
      </div>
      

    </div>
    
    <Post />
    </div>
  );
};

export default Profile;
