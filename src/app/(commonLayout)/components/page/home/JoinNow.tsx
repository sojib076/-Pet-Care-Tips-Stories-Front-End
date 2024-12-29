"use client";

import { Avatar, Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import React from 'react';
import { motion, } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import { toast } from 'sonner';

const JoinNow = () => {
    const recentJoins = [
        { id: 1, name: 'Alice', avatar: '/placeholder.svg' },
        { id: 2, name: 'Bob', avatar: '/placeholder.svg' },
        { id: 3, name: 'Charlie', avatar: '/placeholder.svg' },
      ]

      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission
        toast.success('Subscribed successfully!');
      }
      
    return (


       <div
      className='   bg-gradient-to-bl from-sky-50 to-sky-300 dark:from-gray-900 dark:to-sky-800
        md:py-20

        py-20

      '
       >
        <div className="max-w-6xl mx-auto space-y-16">
        <h1 className="text-4xl
          text-center
        md:text-5xl font-bold mb-12 text-gray-800 dark:text-gray-100">
          Welcome to Our Community
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <Card 
            className="py-16
            bg-gray-100 dark:bg-gray-800
            "
          >
            <CardHeader>
           
                <h2 className="text-2xl text-center 
                  mx-auto
                font-semibold text-gray-800 dark:text-gray-100">
                    Join Our Community
                </h2>
            </CardHeader>
            <CardBody>
              <form 
                onSubmit={handleSubmit}
              className="space-y-4">
                <Input
                
                  type="email"
                  placeholder="Enter your email"
            
                 
                  className="w-full 
                    
                    
                  "
                  required
                />
                <Button type="submit" className="w-full
                  bg-blue-900 text-white
                  hover:bg-blue-800

                ">
                  Subscribe Now
                </Button>
              </form>
            </CardBody>
          </Card>

       
          <div className="flex flex-col items-center space-y-4">
            <div className="flex -space-x-2">
              {recentJoins.map((user) => (
                <motion.div
                  key={user.id}
                  whileInView={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.5 }}
                 
                  transition={{ duration: 0.5 }}
                >
                  <Avatar 
                   name={
                    user.name ? user.name.slice(0, 1).toUpperCase() : ''
                   }
                  className="w-8 h-8 border-2 border-white dark:border-gray-800">
               
                  </Avatar>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-white font-bold"
              >
                <UserPlus size={16} />
              </motion.div>
            </div>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Join 10,000+ pet lovers today!
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Share your pet stories and connect with other pet enthusiasts.
            </p>
          </div>
        </div>

        </div>
        </div>
    );
};

export default JoinNow;