"use client"

import { AlignEndVerticalIcon,   } from "lucide-react";


import CreateContent from "../components/page/home/Toppost";
import { useGetProfile } from "@/hook/user.Hook";
import Link from "next/link";




const Profile = () => {

  
 

  const { data } = useGetProfile();

const user = data?.data

 

    return (
      <div className="flex flex-col lg:grid lg:grid-cols-7 gap-4">
        
 
      <div className="   dark:bg-gray-800   lg:col-span-1 ">

        
          
      {
         user && (
     
       <div className=" bg-gray-900  dark:bg-gray-800  p-4 text-white lg:fixed ">
         
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
           <div className="flex items-center space-x-4 p-3 hover:bg-gray-700 rounded-lg cursor-pointer">
             <AlignEndVerticalIcon className="text-xl" />
             <span>Messages</span>
           </div>
           <div className="flex items-center space-x-4 p-3 hover:bg-gray-700 rounded-lg cursor-pointer">
             <AlignEndVerticalIcon className="text-xl" />
             <span>Notifications</span>
           </div>
           <div className="flex items-center space-x-4 p-3 hover:bg-gray-700 rounded-lg cursor-pointer">
             <AlignEndVerticalIcon className="text-xl" />
             <span>Friends</span>
           </div>
           <div className="flex items-center space-x-4 p-3 hover:bg-gray-700 rounded-lg cursor-pointer">
             <AlignEndVerticalIcon className="text-xl" />
             <span>Settings</span>
           </div>
         </div>

       </div>
        
        ) 
      }

      </div>

    
      <div className="bg-blue-700 text-white justify-center lg:col-span-1 lg:order-3 p-4 ">
        <div className=" lg:fixed text-white text-xl"> 
          other content
        </div>
      </div>

      {/* Main Content (Center) */}
      <div className="col-span-5 bg-white p-6 lg:p-10">
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 dark:bg-gray-700 px-5 rounded-lg 
        flex  ">
          {/* Notification Icon and Text */}
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
         {
          
         }
        </div>
      </div>
    </div>
    );
};

export default Profile;