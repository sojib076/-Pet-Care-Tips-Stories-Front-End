"use client";

import { Avatar, Badge, Button, Card, CardBody } from '@nextui-org/react';
import { useState } from 'react'



import { motion } from "framer-motion"

import Link from 'next/link';





export function UserItem({ followers }) {



  
    const [hoveredId, setHoveredId] = useState<number | null>(null)
   
    const peoples = followers?.length as string

    return (
      <section className="py-12 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Followers</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">People who follow you</p>
          </div>
          
   
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {followers?.map((follower) => (
            <motion.div
              key={follower.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              onHoverStart={() => setHoveredId(follower.id)}
              onHoverEnd={() => setHoveredId(null)}
            >
              <Card className="overflow-hidden transition-colors duration-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                <CardBody className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Avatar 
                          src={follower?.img}
                          
                        className="h-12 w-12 border-2 border-white shadow-md">
                          
                        </Avatar>
                        {!follower.isOnline && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{follower.name}</h3>
                        
                      </div>
                    </div>
                    <Link href={`/profile/${follower._id}`}>
                    <Button
                      variant={hoveredId === follower._id ? "bordered" : "bordered"}
                  
                      size="sm"
                      className="transition-all duration-300"
                    >
                      View Profile
                    </Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}



