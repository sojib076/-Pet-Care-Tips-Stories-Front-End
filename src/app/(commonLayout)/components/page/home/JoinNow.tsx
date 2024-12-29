import { Avatar, Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';

const JoinNow = () => {
    const recentJoins = [
        { id: 1, name: 'Alice', avatar: '/placeholder.svg' },
        { id: 2, name: 'Bob', avatar: '/placeholder.svg' },
        { id: 3, name: 'Charlie', avatar: '/placeholder.svg' },
      ]
    return (
       <div>
        <div className="max-w-6xl mx-auto space-y-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
          Welcome to PetShare
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardHeader>
           
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                    Join Our Community
                </h2>
            </CardHeader>
            <CardBody>
              <form className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
            
                 
                  className="w-full"
                  required
                />
                <Button type="submit" className="w-full">
                  Subscribe Now
                </Button>
              </form>
            </CardBody>
          </Card>

          {/* Joining Users Display */}
          <div className="flex flex-col items-center space-y-4">
            <div className="flex -space-x-2">
              {recentJoins.map((user) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Avatar 
                    src={user.avatar}
                    alt={user.name}
                  className="w-8 h-8 border-2 border-white dark:border-gray-800">
               
                  </Avatar>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
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