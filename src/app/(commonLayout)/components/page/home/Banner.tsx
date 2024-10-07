"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const Banner = () => {
  return (
    <>
      <div className="bg-blue-900 lg:w-[100%] lg:h-[500px] lg:flex flex-row lg:justify-center lg:items-end relative lg:px-10  ">
        <motion.div
          className="lg:w-[50%] p-5 lg:top-[-30%] relative"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="lg:text-[80px] lg:leading-[88px] font-bold   text-5xl capitalize text-white/80">
            Share Tips or <br />
            Story with Us
          </h1>


          <div className=" flex flex-col lg:flex-row lg:justify-start lg:gap-5 justify-between">
            <Link href={'/newsfeed'}>
            <motion.button
              className=" px-4 py-2 bg-yellow-600 text-white mt-5 rounded-full font-medium text-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              View News Feed
            </motion.button>
            </Link>
            <Link href={'/newsfeed'}>
            <motion.button
              className=" px-4 py-2 bg-yellow-600 text-white mt-5 rounded-full font-medium text-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              View News Feed
            </motion.button>
            </Link>
       
     
          </div>
        </motion.div>

        <div className="lg:w-[50%] flex items-end lg:mt-0">
          <motion.img
            src="https://i.ibb.co.com/VQ8J8LW/cat.webp"
            className="mb-[-6%] w-[40%]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.img
            src="https://i.ibb.co.com/j3xPSzM/dog.webp"
            className="w-[40%]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
        </div>
      </div>
      <motion.div
        className="h-[54px] flex-col items-start section-text p-10 my-10 lg:mt-0 font-bold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div>
         Your tips Can  <br />
          help other to learn 
        </div>
        
      </motion.div>
    </>
  );
};

export default Banner;