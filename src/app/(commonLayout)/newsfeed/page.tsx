"use client"

import { AlignEndVerticalIcon, Users, } from "lucide-react";


import CreateContent from "../components/page/home/Toppost";

import Link from "next/link";
import PostCard from "../components/page/home/PostCard";
import { Avatar, Button, Card, CardBody, CardHeader, Skeleton } from "@nextui-org/react";
import { Separator } from "@/components/ui/separator"
import { useUser } from "@/context/uAuthContext";
import { useGetProfile } from "@/hook/user.Hook";
import Sidebar from "../components/page/home/Sidebar";

const Profile = () => {


  const { data, isLoading } = useGetProfile();

  const Following = data?.data?.following;


  const { user } = useUser();




  return (
    <div className=" 
    

    rounded-lg
     flex flex-col lg:grid lg:grid-cols-7 gap-4 lg:px-5">

      <div className="    p-2  lg:col-span-1 ">

        
          <aside className="pr-4 md:fixed h-auto md:h-screen 
          overflow-y-auto mb-4 md:mb-0 border-r
           border-gray-200 dark:border-gray-700 hidden md:block">
          
          { user?.email? 

          
            <div className="space-y-2">
              <Link href={`/profile/${user?._id}`}>
                <div  className=" flex items-center justify-start
                  border  border-gray-200 dark:border-gray-700 p-2

                  rounded-lg
                ">
                  <Avatar
                    src={user?.img }
                    alt={user?.name || 'John Doe'}

                    className="h-8 w-8 mr-1"

                  >

                  </Avatar>
                  <span 
                  className="text-sm font-semibold
                    hover:underline
                  "
                  >{user?.name || 'John Doe'}</span>
                </div>
              </Link>

             
              <h3 className="font-semibold mb-2">Groups </h3>
              <div className="space-y-2
          grid grid-cols-1
          ">

                <Link href="/dashboard/creategroup">
                  <Button variant="ghost" className=" justify-start">
                    <Users className="mr-2 h-5 w-5" />
                    Create Group
                  </Button>
                </Link>

                <Link href="/groups">
                  <Button variant="ghost" className=" justify-start">
                    <Users className="mr-2 h-5 w-5" />
                    Discover Groups
                  </Button>
                </Link>


              </div>
              
              <Separator  className="mt-4 
                
              " />
              <h3 className="font-semibold mb-2">Your Shortcuts</h3>
              <div className="space-y-2
          grid grid-cols-1
          ">

                <Link href="/">
                  <Button variant="ghost" className=" justify-start">
                    <Users className="mr-2 h-5 w-5" />
                    Home
                  </Button>
                </Link>

                <Link href={`/profile/${user?._id}`}>
                  <Button variant="ghost" className=" justify-start">
                    <Users className="mr-2 h-5 w-5" />
                    Profile
                  </Button>
                </Link>



              </div>

            </div> : <Sidebar />
}
          </aside>

        

      </div>


      <div className="    text-white justify-center lg:col-span-1 lg:order-3 py-10  ">
        <div className="flex h-full flex-col lg:fixed">
          <div className=" border-gray-200 dark:border-gray-700 p-4">

            {
              <aside className="  pl-4 md:fixed right-0 top-20 h-auto md:h-screen overflow-y-auto  md:mt-0 hidden md:block">
                <Card className="mb-4">
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Sponsored</h3>
                  </CardHeader>
                  <CardBody>

                    <h4 className="font-semibold">Amazing Product</h4>
                    <p className="text-sm text-muted-foreground">Check out this incredible offer!</p>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Following</h3>
                  </CardHeader>
                  <CardBody className="space-y-2">

                    {
                      isLoading && [...Array(3)].map((_, index) => (
                        <div className="flex items-center space-x-2 animate-pulse" key={index}>
                       
                        <Skeleton className="rounded-full">
                            <Avatar className="h-8 w-8" />
                        </Skeleton>
                       
                        <Skeleton className="rounded">
                            <div className="h-4 w-24 bg-default-300 rounded"></div>
                        </Skeleton>

                        <Skeleton className="rounded">
                            <div className="h-4 w-10 bg-default-300 rounded"></div>
                        </Skeleton>
                    </div>
                      ))
                    }


                    {Following?.map((friend, index) => (
                      <div key={index} className="grid grid-cols-2 items-center space-x-2 border-b
                       border-gray-200 dark:border-gray-700 pb-2">
                        <div className="flex items-center space-x-2 ">
                          <Avatar src={friend?.img}

                            className="h-8 w-8">

                          </Avatar>
                          <span className="text-sm">{
                            friend.name
                          }</span>
                        </div>

                        <Link href={`/profile/${friend?._id}`}>
                          <Button variant="faded" size="sm" className="text-sm">View </Button>
                        </Link>


                      </div>

                    ))}


                  </CardBody>
                </Card>
              </aside>
            }
          </div>
        </div>
      </div>


      <div className="col-span-5   lg:p-10 ">
        <div className="bg-gradient-to-r from-blue-800 to-blue-900
        lg:w-[90%]
        mx-auto
      dark:from-gray-900 dark:to-gray-800
      px-2
      rounded-lg 
        flex  ">

          <div className="flex items-center space-x-4">
            <AlignEndVerticalIcon className="text-white lg:text-4xl" />
            <div>
              <h2 className="text-white font-bold text-sm lg:text-xl">Members Newsfeed</h2>
              <p className="text-white text-sm lg:text-base text-[10px] leading-3
                lg:block hidden
              ">Check what your friends have been up to!</p>
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


      
        <div className="mt-6 space-y-4">
          <PostCard user={data}  />
        </div>
      </div>
    </div>
  );
};

export default Profile;