import React from 'react';
import { Card, Skeleton } from "@nextui-org/react";

const CardLoading = () => {
    return (
        <Card 
            key="skeleton" 
            className="max-w-5xl mx-auto bg-white dark:bg-[#18181B]  mt-5
            border border-gray-300 rounded-lg mb-6 shadow-md p-8 animate-pulse"
        >
            {/* Top Right Buttons */}
            <div className="flex justify-end gap-5 items-end">
                <Skeleton className="rounded-full">
                    <div className="mb-2 h-5 w-24 bg-default-300"></div>
                </Skeleton>
                <Skeleton className="rounded-full">
                    <div className="mb-2 h-5 w-20 bg-default-300"></div>
                </Skeleton>
            </div>

            {/* User Info */}
            <div className="flex items-start space-x-3 mb-3">
                <Skeleton className="rounded-full">
                    <div className="w-10 h-10 bg-default-300"></div>
                </Skeleton>
                <div className="flex-grow">
                    <div className="flex justify-between items-center">
                        <Skeleton className="rounded">
                            <div className="h-4 w-32 bg-default-300"></div>
                        </Skeleton>
                        <Skeleton className="rounded">
                            <div className="h-4 w-16 bg-default-300"></div>
                        </Skeleton>
                    </div>
                    <Skeleton className="rounded mt-2">
                        <div className="h-4 w-24 bg-default-300"></div>
                    </Skeleton>
                </div>
            </div>

            {/* Content */}
            <div className="text-sm text-gray-700 mb-2 space-y-2">
                <Skeleton className="rounded">
                    <div className="h-6 w-full bg-default-300 mb-3"></div>
                </Skeleton>
                <Skeleton className="rounded">
                    <div className="h-4 w-full bg-default-300"></div>
                </Skeleton>
                <Skeleton className="rounded">
                    <div className="h-4 w-3/4 bg-default-300"></div>
                </Skeleton>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                <div className="flex space-x-4">
                    <Skeleton className="rounded">
                        <div className="h-10 w-10 bg-default-300"></div>
                    </Skeleton>
                    <Skeleton className="rounded">
                        <div className="h-10 w-10 bg-default-300"></div>
                    </Skeleton>
                </div>
                <Skeleton className="rounded">
                    <div className="h-4 w-20 bg-default-300"></div>
                </Skeleton>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-300 pt-3">
                <Skeleton className="rounded">
                    <div className="h-4 w-40 bg-default-300"></div>
                </Skeleton>
            </div>

            {/* Image/Content Placeholder */}
            <div className="mt-3 space-y-2">
                <Skeleton className="rounded">
                    <div className="h-20 w-full bg-default-300"></div>
                </Skeleton>
                <Skeleton className="rounded">
                    <div className="h-10 w-full bg-default-300"></div>
                </Skeleton>
            </div>
        </Card>
    );
};

export default CardLoading;
