import React from 'react';

const CardLoading = () => {
    return (

        <div key="skeleton" className="w-[90%] mx-auto bg-white border border-gray-300 rounded-lg mb-6 shadow-md p-8 animate-pulse">

            <div className='flex justify-end gap-5 items-end'>
                <div className="mb-2 h-5 w-24 bg-gray-300 rounded-full"></div>
                <div className="mb-2 h-5 w-20 bg-gray-300 rounded-full"></div>
            </div>


            <div className="flex items-start space-x-3 mb-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className="flex-grow">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="h-4 w-32 bg-gray-300 rounded"></div>
                        </div>
                        <div className="h-4 w-16 bg-gray-300 rounded"></div>
                    </div>
                    <div className="h-4 w-24 bg-gray-300 mt-2 rounded"></div>
                </div>
            </div>


            <div className="text-sm text-gray-700 mb-2">
                <div className="h-6 w-full bg-gray-300 mb-3 rounded"></div>
                <div className="h-4 w-full bg-gray-300 mb-2 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
            </div>


            <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                <div className="flex space-x-4">
                    <div className="h-10 w-10 bg-gray-300 rounded"></div>
                    <div className="h-10 w-10 bg-gray-300 rounded"></div>
                </div>
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
            </div>


            <div className="border-t border-gray-300 pt-3">
                <div className="h-4 w-40 bg-gray-300 rounded"></div>
            </div>


            <div className="mt-3">
                <div className="h-20 w-full bg-gray-300 rounded mb-2"></div>
                <div className="h-10 w-full bg-gray-300 rounded"></div>
            </div>
        </div>


    );
};

export default CardLoading;