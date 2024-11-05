"use client"

import { AlignEndVerticalIcon, Compass, UserPlus, } from "lucide-react";


import CreateContent from "../components/page/home/Toppost";
import { useGetProfile } from "@/hook/user.Hook";
import Link from "next/link";
import PostCard from "../components/page/home/PostCard";




const Profile = () => {




  const { data } = useGetProfile();

  const user = data?.data



  return (
    <div className=" dark:bg-black  bg-white flex flex-col lg:grid lg:grid-cols-7 gap-4 lg:px-5">

      <div className="  shadow-inner  shadow-gray-500   lg:col-span-1 ">

        {
          user && (

            <div className="    p-4 dark:text-white text-black lg:fixed ">

              <Link href={`/profile/${user._id}`}>
                <div className="flex items-center space-x-4 p-4 mb-6 border-b cursor-pointer  ">
                  <img
                    src={user?.img}
                    alt="profile"
                    className="rounded-full h-14 w-14"
                  />
                  <div>
                    <h2 className="font-bold text-lg ">{
                      user ? user?.name : "John Doe"
                    }</h2>
                    <p className="text-sm text-gray-400">{user?.followers?.length
                    } Followers
                    </p>
                  </div>
                </div>
              </Link>

              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 hover:bg-gray-700 rounded-lg cursor-pointer">
                  <AlignEndVerticalIcon className="text-xl" />
                  <span>Home</span>
                </div>



                  <Link href={
                  user?.role === "admin" ? "/admin-dashboard" : "/dashboard"
                 }>
                <div className="flex items-center space-x-4 p-3 hover:bg-gray-700 rounded-lg cursor-pointer">
                  <AlignEndVerticalIcon className="text-xl" />
                  <span>Dashboard</span>
                </div>
                
                </Link>
                

              </div>

            </div>

          )
        }

      </div>


      <div className=" shadow-inner  shadow-gray-500  text-white justify-center lg:col-span-1 lg:order-3 py-10 ">
      <div className="flex h-full flex-col lg:fixed">
          <div className="border-b border-gray-200 dark:border-gray-700 p-4">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Groups</h2>
           {
              user ? (
                <nav className="space-y-2">
                <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
  
                 href={
                  user?.role === "admin" ? "/admin-dashboard/creategroup" : "/dashboard/creategroup"
                 }
                 
                 >
                  <UserPlus className="h-4 w-4" />
                  Create Group
                </Link>
                <Link 
                href="/groups"
                
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
                  <Compass className="h-4 w-4" />
                  Discover Groups
                </Link>
              </nav>
              ):(
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-400">Loading...</p>
                </div>
              )
           }
          </div>
          </div>
      </div>

    
      <div className="col-span-5 dark:bg-black bg-white  lg:p-10">
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 dark:bg-gray-700 px-5 rounded-lg 
        flex  ">

          <div className="flex items-center space-x-4">
            <AlignEndVerticalIcon className="text-white lg:text-4xl" />
            <div>
              <h2 className="text-white font-bold text-sm lg:text-xl">Members Newsfeed</h2>
              <p className="text-white text-sm lg:text-base text-[10px] leading-3">Check what your friends have been up to!</p>
            </div>
          </div>




          <div
            className="mt-4 lg:mt-0"
            style={{
              backgroundImage: `url("https://www.radiustheme.com/demo/wordpress/themes/cirkle/wp-content/uploads/2021/04/shape_7.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="https://www.radiustheme.com/demo/wordpress/themes/cirkle/wp-content/uploads/2021/04/people_2.png"
              alt="Group of friends"

            />
          </div>


        </div>
        <CreateContent />


        {/* Fake Data List */}
        <div className="mt-6 space-y-4">
          
        </div>
      </div>
    </div>
  );
};

export default Profile;