import React from 'react';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import Image from 'next/image';
import { User } from 'lucide-react';

const Followers = ({ followers }:{
   
} ) => {
  return (
    <div className="flex items-center p-3 hover:bg-gray-50  dark:bg-gray-800 ">
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
        {followers.img ? (
          <img src={followers.img} alt={followers.name} className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <User className="w-6 h-6 text-gray-400" />
        )}
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white ">{followers.name}</h3>
      </div>
    </div>
  );
};

export default Followers;
