/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetProfile, useUpdateProfile } from "@/hook/user.Hook";
import { Button } from "@nextui-org/react";
import Image from "next/image";

const ProfileUpdates = () => {
  const { data: userData, isLoading, isError } = useGetProfile();
  const {mutate} = useUpdateProfile();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading profile.</div>;
  }
  const user = userData?.data;



  const handleSubmit = (event:any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedProfile = {
      name: formData.get('name'),
      img: formData.get('img'),
    };

    mutate(updatedProfile);
  };

  return (
    <div>
      <h1>Profile Updates</h1>
      <div className="container mx-auto lg:p-4 ">
        <div className="bg-white shadow-md rounded-lg pb-20 dark:bg-black">
          <div className="relative ">

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


            </div>


          </div>
          <div className="px-5">
            <form onSubmit={handleSubmit} >
             <div className="flex justify-between "> 
             <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={user?.name}
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm"
                />
              </div>
             <div className="mb-4">
                <label htmlFor="img" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="img"
                  id="img"
                  name="img"
                  defaultValue={user?.img}
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm"
                />
              </div>

             </div>

              <Button type="submit"

              >Update Profile</Button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProfileUpdates;
