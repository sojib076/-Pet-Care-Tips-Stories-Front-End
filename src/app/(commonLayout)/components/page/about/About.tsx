import { Button } from '@nextui-org/react';
import { PhoneCall } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Aboutus = () => {
    return (
        <div>
              <div>
            <div className="grid lg:grid-cols-2 grid-cols-1   lg:gap-10 ">
                <div className="grid grid-cols-2 lg:gap-5 relative lg:p-10 p-5 z-20  md:mt-0 " >
                    <div className="lg:w-[75%] w-[100%] h-56" >
                        <Image
                            src="https://i0.wp.com/demo.themedraft.net/wp/doctio/wp-content/uploads/2022/06/three-image-3.jpg"
                            alt="about"

                            width={1000}
                            height={500}
                            className="relative inset-0 lg:top-[200px] top-[80px] 
                      lg:left-32
                      z-20
                        
                      "
                        />

                    </div>
                    <div className=" grid grid-cols-1 gap-4">
                        <Image
                            src="https://i0.wp.com/demo.themedraft.net/wp/doctio/wp-content/uploads/2022/06/three-image-1.jpg "
                            alt="about"

                            width={1000}
                            height={500}
                            className="  relative lg:left-8"
                        />
                        <Image
                            src="https://i0.wp.com/demo.themedraft.net/wp/doctio/wp-content/uploads/2022/06/three-image-2.jpg"
                            alt="about"

                            width={1000}
                            height={500}
                            className="z-10 "
                        />

                    </div>


                </div>
                <div>
                    <h1 className="lg:text-[150px] 
                    text-[100px] 
                        
                    font-bold text-black/30 opacity-20  
                   


                    lg:relative 
                    text-center
                    lg:text-left
                    
                    ">
                        About
                    </h1>

                    <div />
                    <div className="relative lg:mt-[-90px] mt-[-50px] bg-[#ffffffcb] lg:text-left text-center ">
                        <h1 className="text-primary font-semibold ">
                            About Us
                        </h1>
                        <h1 className=" lg:text-[48px] text-3xl font-semibold  lg:leading-[58px] lg:w-[90%]  ">
                            Read Something About Doctio Health Care
                        </h1>

                        <Image
                            src="https://demo.themedraft.net/wp/doctio/wp-content/uploads/2022/06/line-1.png"
                            alt="line"
                            width={1000}
                            height={500}

                            className="lg:w-[25%] w-[40%] lg:mt-5 mt-2 mx-auto"
                        />

                        <p className="lg:w-[80%] text-justify  text-[16px] p-2 font-light"> Sed ut pers piciatis unde omnis iste natus error sit volu ptatem accus antium one dolor emque laudan tium, totam rem aperiam, eaque ipsa quae ab illo invetore off veritatis et quasi and visit our service page architecto beatae vitae dicta suntpli. Nemoe ipsam volup and tate quia voluptas sit aspernatur aut odit aut fugit, sedon quia cquuntur magni dolores eos qui ratione.</p>
                        <div className="flex gap-5 p-2">
                            <Button

                                className="w-[200px] rounded-full bg-gray-500 text-whtie hover:bg-secondary-100 lg:mt-5 mt-2"
                            > Read More</Button>
                            {/* call with icons */}
                            <Button
                                className="w-[200px] rounded-full bg-transparent  text-black  text-[20px]
                                hover:bg-transparent hover:text-secondary-100
                            lg:mt-5 mt-2"
                            > <PhoneCall size={30} />
                                +123 456 7890

                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        </div>
    );
};

export default Aboutus;