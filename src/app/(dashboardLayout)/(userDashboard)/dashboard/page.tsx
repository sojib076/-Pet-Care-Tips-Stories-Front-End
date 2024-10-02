"use client";

import Image from 'next/image';
import Post from './components/Post';

import { useGetProfile } from '@/hook/user.Hook';
import Followers from './components/Follwers';


const Profile = () => {
  const { data: userData, isLoading } = useGetProfile();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const user = userData?.data;



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
              className="rounded-full border-4 border-white"
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

      {/* Followers and Following Table */}
      <Followers followers={user?.followers || []} following={user?.following || []} />

      <Post />
    </div>
  );
};

export default Profile;
