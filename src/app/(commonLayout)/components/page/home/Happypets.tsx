'use client';

import Image from "next/image";

const Happypets = () => {
  return (
    <div className="my-[10%] lg:my-20 overflow-hidden ">
      <div className="lg:flex gap-2.5 items-center justify-between">
        {/* Contained Image */}
        <div className="lg:h-[601.08px] pl-[40px] max-w-full lg:max-w-[50%] overflow-hidden">
          <Image   src="https://i.ibb.co.com/m4Nykmv/humancarrypet.png" alt="Happy Pets" layout="responsive" width={601.08} height={601.08} className="object-contain w-full h-auto"   />
        </div>

        <div className="flex flex-col items-center">
        
         

          {/* Static Text */}
          <div className="lg:ml-20">
            <h2 className="lg:text-[80px] lg:leading-[88px] font-bold   text-5xl capitalize text-blue-900   lg:text-left text-center">
              Happy pets, <br />
              happy humans
            </h2>
            <p className="section-text lg:w-[70%] lg:mt-[30px] text-[#2E3031]
              dark:text-gray-300 
            lg:p-0 p-5 text-justify">
              <span className="text-blue-900 font-bold
              
                
              " > DO YOU KNOW ? </span> that pets can help you to reduce stress and anxiety? Pets can help you to improve your mood and healthy
              
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Happypets;
