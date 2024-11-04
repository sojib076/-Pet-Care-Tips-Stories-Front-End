"use client"

import { useUser } from "@/context/uAuthContext";
import { getuserposts } from "@/Services/Post";

import React, { useEffect, useState } from 'react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';









const PostsTableWithChart = () => {

const [posts, setPosts] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const { user } = useUser();



useEffect(() => {

    const fetchPosts = async () => {
      const posts = await getuserposts();
      console.log(posts);

      if (posts) {
        setPosts(posts.data);
        setIsLoading(false);
      }

    };
    fetchPosts()


  }
    , [user]);
    const chartData = posts.map((post, index) => ({
        name: `Post ${index + 1}`,
       
        PostTime :  new Date(post.createdAt).toLocaleTimeString(),
    }));
  
    
    return (
        <div>
       
       <h1 className='text-2xl text-black dark:text-white font-bold text-center'> 
          Your Recent Post 
        </h1>

        {
          isLoading && <h1> Loading</h1>
          
        }
            
          {
            posts.length > 0 && !isLoading ? (
              <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="PostTime" stroke="#8884d8"  />
              </LineChart>
          </ResponsiveContainer>
            ) : (
              posts.length > 0 && !isLoading && <h1> No Post Found</h1>
            )
          }

        </div>
    );
};

export default PostsTableWithChart;
