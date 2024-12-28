import React from 'react';
import { Skeleton, Avatar, Card } from "@nextui-org/react";

const PageLoading = () => {
    return (
        <div className="lg:p-20 p-10 min-h-screen dark:bg-black">
            <div
                style={{
                    backgroundImage: 'url(https://www.radiustheme.com/demo/wordpress/themes/cirkle/wp-content/uploads/buddypress/members/1/cover-image/60b0724fc9a1a-bp-cover-image.jpg)',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
                className="bg-pink-500 lg:h-80 rounded-2xl grid lg:grid-cols-2 p-5 gap-10 items-center"
            >
                {/* Profile Section Loading Skeleton */}
                <Card className="flex lg:flex-row flex-col items-center gap-20 p-8 bg-opacity-10 border border-default-100 backdrop-blur-md">
                    <Skeleton className="rounded-full">
                        <Avatar className="h-24 w-24" />
                    </Skeleton>
                    <div>
                        <Skeleton className="rounded w-32 mb-4">
                            <div className="h-6 w-32 bg-default-200 rounded"></div>
                        </Skeleton>
                        <div className="flex mt-4 space-x-4">
                            {[...Array(3)].map((_, index) => (
                                <Skeleton key={index} className="rounded-full">
                                    <div className="h-8 w-8 bg-default-300 rounded-full"></div>
                                </Skeleton>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Stats Section Loading Skeleton */}
                <Card className="bg-blue-900 mt-6 p-4 rounded-lg w-full flex justify-around items-center text-white">
                    {[...Array(2)].map((_, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <Skeleton className="rounded-full">
                                <div className="w-5 h-5 bg-default-200 rounded-full"></div>
                            </Skeleton>
                            <Skeleton className="rounded">
                                <div className="h-4 w-16 bg-default-200 rounded"></div>
                            </Skeleton>
                        </div>
                    ))}
                </Card>
            </div>

            <div className="mt-6 space-y-4 flex lg:flex-row flex-col-reverse gap-10">
                {/* Posts Section Loading Skeleton */}
                <div className="lg:w-[75%] gap-5">
                    {[...Array(3)].map((_, index) => (
                        <Card key={index} className="bg-default-100 p-4 rounded-lg shadow-md my-10">
                            <Skeleton className="w-2/3 rounded mb-4">
                                <div className="h-6 w-2/3 bg-default-200 rounded"></div>
                            </Skeleton>
                            <Skeleton className="w-full rounded mb-4">
                                <div className="h-4 w-full bg-default-200 rounded"></div>
                            </Skeleton>
                            <Skeleton className="w-1/2 rounded">
                                <div className="h-4 w-1/2 bg-default-200 rounded"></div>
                            </Skeleton>
                        </Card>
                    ))}
                </div>

                {/* Followers Section Loading Skeleton */}
                <Card className="lg:w-[20%] lg:min-w-[300px] h-96 rounded-lg shadow-md overflow-hidden mt-10">
                    <Skeleton className="p-4 border-b rounded">
                        <div className="h-6 w-32 bg-default-200 rounded"></div>
                    </Skeleton>
                    <div className="overflow-y-auto max-h-[300px] space-y-2 p-4">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="flex items-center space-x-4">
                                <Skeleton className="rounded-full">
                                    <div className="w-10 h-10 bg-default-300 rounded-full"></div>
                                </Skeleton>
                                <Skeleton className="rounded">
                                    <div className="h-4 w-3/4 bg-default-200 rounded"></div>
                                </Skeleton>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default PageLoading;
