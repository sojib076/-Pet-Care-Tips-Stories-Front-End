"use client";



import { motion } from "framer-motion";

const stepsData = [
  {
    number: "1",
    title: "Register and Create Your Profile",
    description: "Sign up and create your user profile to get started.",
    bgColor: "bg-pink-300",
    position: "left",
  },
  {
    number: "2",
    title: "Login to Access Your Dashboard",
    description: "Login to access your profile and begin sharing content.",
    bgColor: "bg-blue-300",
    position: "right",
  },
  {
    number: "3",
    title: "Post and Share Your Content",
    description: "Post and share your content with others on the platform.",
    bgColor: "bg-yellow-500",
    position: "left",
  },
  {
    number: "4",
    title: "Earn Through Premium Content",
    description: "Offer premium content to your audience and earn from it.",
    bgColor: "bg-pink-300",
    position: "right",
  },
];

const TutorSteps = () => {
  return (
    <div className=" p-6 md:p-10 relative my-16  overflow-x-hidden ">
      <h2 className="text-center font-bold text-5xl">
        How It Works
      </h2>
      <div className="relative flex flex-col space-y-10  md:mt-0  ">
        {stepsData.map((step, index) => {
          const isLeft = step.position === "left";

          return (
            <motion.div
              key={index}
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              transition={{ duration: 0.6 }}
              className="lg:w-[80%] mx-auto lg:mt-10 mt-5 pb-2

             
              "
            >
              <div className={`relative flex items-center bg-[white]
                dark:bg-[#1A202C]
                rounded-lg 

                ${isLeft ? "flex-row" : "flex-row-reverse"} lg:p-4 p-3 shadow-xl shadow-[#E5EEFF]
                  dark:shadow
                `}>
                <div className={`flex items-center justify-center w-12 h-12 rounded-full text-white
                     dark:text-black
                  ${step.bgColor} z-10`}>
                  <span className="text-lg font-bold">{step.number}</span>
                </div>
                <div className={`flex-1 ${isLeft ? "lg:pl-8 pl-6" : "lg:pr-8 pr-6"} py-2`}>
                  <h3 className="lg:text-lg font-semibold
                    dark:text-white
                  
                  ">{step.title}</h3>
                  <p className="text-gray-600 text-justify
                    dark:text-gray-400
                  
                  ">{step.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TutorSteps;
