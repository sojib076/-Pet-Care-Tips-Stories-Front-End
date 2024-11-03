
import React from 'react';

const TeamMember = () => {
    const team = [
        {
            name: "John Doe",
            role: "CEO",
            image: "https://via.placeholder.com/100",
            social: [
                { platform: "Facebook", url: "#" },
                { platform: "LinkedIn", url: "#" },
            ],
        },
        {
            name: "Jane Smith",
            role: "CTO",
            image: "https://via.placeholder.com/100",
            social: [
                { platform: "Facebook", url: "#" },
                { platform: "LinkedIn", url: "#" },
            ],
        },
        {
            name: "Mark Johnson",
            role: "Lead Developer",
            image: "https://via.placeholder.com/100",
            social: [
                { platform: "Facebook", url: "#" },
                { platform: "LinkedIn", url: "#" },
            ],
        },
     
    ];

    return (
        <div>
            <div className=" lg:py-32  py-10 lg:w-[90%] mx-auto mt-20 ">

                <header className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-800  dark:text-white">Meet Our Team</h1>
                    <p className="text-lg text-gray-600 mt-3  dark:text-white">We care about your pets and your store!</p>
                </header>


                <section className="container mx-auto px-5 mt-10 ">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
                        {team.map((member, index) => (
                            <div
                                key={index}
                                className="relative z-10 p-5 bg-gray-200 border border-gray-200 shadow-md rounded-lg overflow-hidden group lg:w-[400px] w-[100%] mx-auto"
                            >
                                <div className="absolute inset-0 h-[10em] top-[400px] left-[50%] bg-blue-900 group-hover:bg-blue-900 group-hover:scale-[800%] transition-transform duration-1000 z-[-10] transform rotate-[45deg] w-[80%] mx-auto"></div>
                                <div className="relative z-10 text-center">
                                    <img
                                        className="w-24 h-24 mx-auto rounded-full border-4 border-white shadow-lg"
                                        src={member.image}
                                        alt={member.name}
                                    />
                                    <h3 className="mt-4 text-xl font-semibold text-black/90 group-hover:text-white ">{member.name}</h3>
                                    <p className="text-xl font-bold">{member.role}</p>
                                    <div className="mt-4 lg:w-[90%] mx-auto flex justify-between items-center gap-2">
                                        {member.social.map((social, idx) => (
                                            <a
                                                key={idx}
                                                href={social.url}
                                                className="text-xl bg-blue-800/80 border border-blue-600 text-white p-2 px-5 rounded-md"
                                            >
                                                {social.platform}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TeamMember;