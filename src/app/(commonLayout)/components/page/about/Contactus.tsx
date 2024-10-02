import { Play } from "lucide-react";

export default function Contactus() {
    return (
      <div
        className="relative bg-cover bg-center  py-10"       style={{
          backgroundImage: `url('https://i0.wp.com/demo.themedraft.net/wp/doctio/wp-content/uploads/2022/06/section-bg2.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div> 
  
        <div className="relative z-10 text-center text-white px-4 md:px-8 grid lg:grid-cols-2 items-center py-20  ">
         <div>   
          <h2 className="text-lg md:text-xl font-semibold uppercase mb-2">
            Get In Touch
          </h2>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Best Medical & Health Care Near Your City
          </h1>
          <p className="mt-4 text-base md:text-lg">
            We’ve 25 Years of experience in Medical Services.
          </p>
  
          <div className="flex justify-center space-x-4 mt-8">
         
            <button className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-bold flex items-center space-x-2 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg text-xs">
              <span>Contact Us</span>
              <span className="ml-2">+</span>
            </button>
  
          
            <button className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-bold flex items-center space-x-2 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg text-sm ">
              <span>Doctors List</span>
              <span className="ml-2">+</span>
            </button>
            
          </div>
  
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
  