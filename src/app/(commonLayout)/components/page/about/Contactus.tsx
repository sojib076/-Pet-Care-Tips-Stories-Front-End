import { Play } from "lucide-react";

export default function Contactus() {
    return (
      <div
        className="relative bg-cover bg-center  py-10 bg-blue-900 pb-10"       style={{
          backgroundImage: `url('')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div> 
  
        <div className="relative z-10 text-center text-white px-4 md:px-8 grid lg:grid-cols-2 items-center py-20  ">
         <div>   
          <h2 className="text-lg md:text-xl font-semibold uppercase mb-2">
            Get In Touch
          </h2>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white/90 ">
            Best Website TO find Animal Tips and Story
          </h1>
          <p className="mt-4 text-base md:text-lg">
            We are here to help you with all your queries. Feel free to reach out to us.
          </p>
  
        
  
         </div>
    
          <div className="flex justify-center mt-8">
          <button className="relative w-16 h-16 rounded-full bg-[#E12354] text-white flex items-center justify-center shadow-lg hover:bg-pink-600 transition-all duration-300 ease-in-out transform hover:scale-105">
            <Play size={32} />
            <span className="absolute w-full h-full rounded-full bg-[#E12354] opacity-90 animate-ping"></span>
          </button>
          </div>
        </div>
      </div>
    );
  }
  