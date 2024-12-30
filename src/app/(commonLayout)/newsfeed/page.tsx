"use client"

import { AlignEndVerticalIcon, Gamepad, Users, } from "lucide-react";


import CreateContent from "../components/page/home/Toppost";

import Link from "next/link";
import PostCard from "../components/page/home/PostCard";
import { Avatar, Button, Card, CardBody, CardHeader, Skeleton } from "@nextui-org/react";
import { Separator } from "@/components/ui/separator"
import { useUser } from "@/context/uAuthContext";
import { useGetProfile } from "@/hook/user.Hook";
import Sidebar from "../components/page/home/Sidebar";
import {
  Modal,
  ModalContent,

  ModalBody,
  ModalFooter,
  useDisclosure
} from "@nextui-org/modal";
import PetQuiz from "../components/page/home/PetQuizPage";
import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
  const [itemsToShow, setItemsToShow] = useState(3);


  const { data, isLoading } = useGetProfile();

  const Following = data?.data?.following;

  const { user } = useUser();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();



  const adminQuickNav = [
    {
      path: "/",
      pathName: "Home",
    },
    {
      path: `/profile/${user?._id}`,
      pathName: "Profile",
    },
    {
      path: "/admin-dashboard/usersposts",
      pathName: "Users Posts",
    },
    {
      path: "/admin-dashboard/users",
      pathName: "All Users",
    },
    {
      path: "/admin-dashboard/allpost",
      pathName: "My Posts",
    },
    {
      path: '/admin-dashboard/createpdf',
      pathName: " Create PDF",
    },
  ]
  const userQuickNav = [
    {
      path: "/",
      pathName: "Home",
    },
    {
      path: `/profile/${user?._id}`,
      pathName: "Profile",
    },
    {
      path: "/dashboard/mycreatedgroup",
      pathName: "My Groups",
    },
    {
      path: "/dashboard/allpost",
      pathName: "My Posts",
    },
    {
      path: "/forget-password",
      pathName: "Change Password",
    },

  ]
  const isAdmin = user?.role === 'admin';
  const navItems = isAdmin ? adminQuickNav : userQuickNav;
  const handleSeeMore = () => {
    setItemsToShow((prev) => prev + 3); 
  };

  return (
    <div className=" 
    

    rounded-lg
     flex flex-col lg:grid lg:grid-cols-7 gap-4 lg:px-5">

      <div className="    p-2  lg:col-span-1 ">


        <aside className="pr-4 md:fixed h-auto md:h-screen 
          overflow-y-auto mb-4 md:mb-0 border-r
           border-gray-200 dark:border-gray-700 hidden md:block">

          {user?.email ?


            <div className="space-y-2">
              <Link href={`/profile/${user?._id}`}>
                <div className=" flex items-center justify-start
                  border  border-gray-200 dark:border-gray-700 p-2

                  rounded-lg
                ">
                  <Avatar
                    src={user?.img}
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







              <Separator className="mt-4 " />
              <h3 className="font-semibold mb-2">Quick Navigation </h3>
              <div className="space-y-2
          grid grid-cols-1
          ">



<AnimatePresence>
        {navItems.slice(0, itemsToShow).map((nav, index) => (
          <motion.div
            key={nav.path}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} // Trigger once when 20% is visible
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link href={nav.path}>
              <Button variant="ghost" className="justify-start">
                <Users className="mr-2 h-5 w-5" />
                {nav.pathName}
              </Button>
            </Link>
          </motion.div>
        ))}
      </AnimatePresence>
      {itemsToShow < navItems.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }} // Trigger when 20% is visible
          transition={{ duration: 0.3 }}
          className="mt-2"
        >
          <Button onClick={handleSeeMore}>See More</Button>
        </motion.div>
      )}
    



              </div>



            </div> : <Sidebar />
          }
        </aside>



      </div>
      <Modal size='5xl' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>

              <ModalBody>

                <PetQuiz />



              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="solid" onPress={onClose}>
                  Close
                </Button>

              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>


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
                <div className="space-y-2 grid grid-cols-1 mt-5">

                  <Separator className="mt-4 " />
                  <h3 className="font-semibold mb-2

                  text-black

                  dark:text-gray-200
                
                ">Games </h3>
                  <Button

                    onPress={onOpen}
                    className=" justify-start">
                    <Gamepad className="mr-2 h-5 w-5" />
                    Pet Breed
                  </Button>








                </div>
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
          <PostCard />
        </div>
      </div>
    </div>
  );
};

export default Profile;