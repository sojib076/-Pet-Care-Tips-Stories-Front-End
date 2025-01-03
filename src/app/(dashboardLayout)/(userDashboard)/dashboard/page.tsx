"use client";

import Image from 'next/image';

import { useGetProfile } from '@/hook/user.Hook';

import Profilecard from './components/Profilecard';
import { Facebook, Mail, Shield, User } from 'lucide-react';
import { UserItem } from '@/app/(commonLayout)/components/Profile/Followers';
import PostsTableWithChart from './components/PostsTable';



const Profile = () => {
  const { data: userData, isLoading } = useGetProfile();



  const user = userData?.data;



  if (isLoading) {
    return <Profilecard />;
  }


  return (
    <div className="container mx-auto lg:p-6">

      <div className="grid lg:grid-cols-2 grid-cols-1 justify-center items-center gap-4 mb-10">
        <div className="  py-10   bg-gray-500/50 shadow-inner shadow-white text-center rounded-2xl hover:scale-110 transition-all ">

          <p className=" text-3xl font-[Cantarell]"> Followes </p>
          <h2 className="text-2xl font-semibold">{
            user?.followers?.length
          }</h2>
        </div>
        <div className="  py-10   bg-gray-500/50 shadow-inner shadow-white text-center rounded-2xl ">

          <p className=" text-3xl font-[Cantarell]"> Follwing</p>
          <h2 className="text-2xl font-semibold">
            {
              user?.following?.length
            }
          </h2>
        </div>




      </div>

  

      <div className="bg-[#ffffffa5] shadow-lg rounded-2xl dark:bg-gray-900 dark:text-white relative overflow-hidden">
        {/* Gradient Background */}
        <div className="relative bg-gradient-to-r from-purple-900 to-indigo-900 h-60 rounded-t-lg">
          {/* Profile Image */}
          <div className="absolute -bottom-12 left-6">
            <Image
              src={user?.img || '/path/to/default-profile-picture.jpg'}
              alt="Profile Picture"
              width={120}
              height={120}
              className="rounded-full border-4 border-white shadow-md w-[120px] h-[120px] hover:scale-105 transition-transform"
            />
          </div>
        </div>

        <div className="lg:flex justify-between items-center p-6 mt-12">
          {/* User Information */}
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold flex items-center">
              <User className="mr-2" /> {user?.name || 'User Name'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 flex items-center">
              <Mail className="mr-2" /> {user?.email || 'No email provided'}
            </p>
          </div>

          {/* User Details */}
          <div className="lg:space-y-2 lg:text-right">
            <h1 className="text-xl font-medium">User Details</h1>
            <span className="text-gray-600 dark:text-gray-400 flex items-center">
              <Shield className="mr-2" /> Role: {user?.role || 'N/A'}
            </span>
            <div className="text-gray-600 dark:text-gray-400">
              <div className="flex space-x-2">

                <Facebook className="mr-2" />
                <span>{user?.facebook || 'N/A'}</span>

              </div>


            </div>
          </div>
        </div>
      </div>
      <div className=" grid  grid-cols-1 gap-10 mt-10">



{
  user?.following?.length > 0 ? (


    <UserItem  followers={user?.following} />
  
) : (
  <div className="text-center">
    <h1 className="text-2xl font-semibold">No Following</h1>
  </div>
)
}



</div>

      <div className='mt-10'>
       
        <PostsTableWithChart />
      </div>





    </div>

  );
};

export default Profile;
