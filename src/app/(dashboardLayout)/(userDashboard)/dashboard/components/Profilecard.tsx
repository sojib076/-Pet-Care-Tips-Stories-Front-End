import React from 'react';

const Profilecard = () => {
    return (

        <div className="container mx-auto lg:p-4">
            <div className="bg-white shadow-md rounded-lg pb-20 dark:bg-black">
                <div className="relative">
                    {/* Banner Skeleton */}
                    <div className="w-full h-48 bg-gray-300 rounded-t-lg animate-pulse"></div>

                    {/* Profile Picture Skeleton */}
                    <div className="absolute top-32 left-5">
                        <div className="w-[110px] h-[100px] bg-gray-300 rounded-full border-4 border-white animate-pulse"></div>
                    </div>
                </div>

                {/* User Info Skeleton */}
                <div className="lg:flex justify-between items-center">
                    <div className="pt-16 pb-4 px-5">
                        <div className="w-48 h-6 bg-gray-300 rounded-md animate-pulse"></div>
                        <div className="w-32 h-4 mt-2 bg-gray-300 rounded-md animate-pulse"></div>
                    </div>

                    <div className="lg:pt-16 pb-4 px-5">
                        <div className="w-36 h-6 bg-gray-300 rounded-md animate-pulse"></div>
                        <div className="w-48 h-4 mt-2 bg-gray-300 rounded-md animate-pulse"></div>
                        <div className="w-24 h-4 mt-2 bg-gray-300 rounded-md animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Followers/Following Skeleton */}
            <div className="mt-4 px-5">
                <div className="w-full h-8 bg-gray-300 rounded-md animate-pulse"></div>
            </div>
        </div>



    );
};

export default Profilecard;