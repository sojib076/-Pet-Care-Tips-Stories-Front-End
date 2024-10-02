"use client"
import Image from "next/image";
import React, { useRef, useState } from "react";

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "01. Signals For Customising Website?",
        answer:
            "We will give you a complete account of the system and expound the teachings of the great explorer.",
    },
    {
        question: "02. Information Architecture Easy?",
        answer:
            "Understanding how to structure your website’s content and improve its architecture for ease of navigation.",
    },
    {
        question: "03. Guide To Attracting Clients?",
        answer:
            "We provide expert guidance on effective strategies to help attract clients and grow your business.",
    },
];

const FAQSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const answerRefs = useRef<Array<HTMLDivElement | null>>([]);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
        if (answerRefs.current[index]) {
            const answerElement = answerRefs.current[index]!;
            answerElement.style.height = openIndex === index ? "0px" : `${answerElement.scrollHeight}px`;
        }
    };

    return (
        <section className=" lg:py-40 md:pt-0  px-6 bg-gray-50 grid lg:grid-cols-2 grid-cols-1   lg:gap-2 gap-10 items-center py-20 ">
            <div className=" lg:w-[80%]  mx-auto text-center md:mt-0 ">
                <h2 className="text-xl text-red-500 font-bold">Why Choose Us</h2>
                <Image
                    src="https://demo.themedraft.net/wp/doctio/wp-content/uploads/2022/06/line-1.png"
                    alt="line"
                    width={1000}
                    height={500}

                    className="lg:w-[25%] w-[40%] lg:mt-5 mt-2 mx-auto"
                />

                <h3 className="text-4xl font-extrabold text-gray-900 my-4  ">
                    Have Any Questions? Feel Free To Ask.
                </h3>
                <p className="text-gray-600 lg:mb-8 m-0 text-left">
                    Sed ut pers piciatis unde omnis iste natus error sit volu ptatem accus antium one dolor emque laudan tium, totam rem aperiam, eaque ipsa quae ab illo invetore off veritatis et quasi <span className="text-primaryown underline"> and visit our service page</span> architecto beatae vitae dicta suntpli. Nemoe ipsam volup and tate quia voluptas sit aspernatur aut odit aut fugit, sedon quia cquuntur magni dolores eos qui ratione.
                </p>
            </div>

        



            <div className="">
                {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200">
                        <button
                            className="w-full text-left p-4 font-semibold text-gray-800 flex justify-between items-center"
                            onClick={() => toggleFAQ(index)}
                        >
                            {faq.question}
                            <span
                                className={`ml-4 transform transition-transform ${openIndex === index ? "rotate-180" : ""
                                    }`}
                            >
                                ▼
                            </span>
                        </button>
                        <div
                            ref={(el) => {
                                answerRefs.current[index] = el;
                            }}
                            className="overflow-hidden transition-all duration-300"
                            style={{ height: openIndex === index ? "auto" : "0px" }}
                        >
                            <div className="p-4 text-gray-600">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default FAQSection;
