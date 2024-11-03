"use client"

import React, { useRef, useState } from "react";

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
//    this website is about animal tips and story
     
    {
        question: "What is the purpose of this website?",
        answer: "This website is about animal tips and story",
    },
    {
        question: "How do I get in touch with the website owner?",
        answer: "You can get in touch with the website owner by visiting the contact page.",
    },
     {
        question: "How can I contribute to the website?",
        answer: "You can contribute to the website by submitting your own animal tips and stories.",
     }
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
        <section className=" lg:py-40 md:pt-0  px-6 dark:bg-black bg-gray-50 grid lg:grid-cols-2 grid-cols-1   lg:gap-2 gap-10 items-center py-20 ">
            <div className=" lg:w-[80%]  mx-auto text-center md:mt-0 ">
                <h2 className="text-xl text-blue-900 font-bold"> Why this website ?</h2>
               

                <h3 className="text-4xl font-extrabold text-gray-900 my-4   dark:text-white ">
                    Have Any Questions? Feel Free To Ask.
                </h3>
                <p className="text-gray-600 lg:mb-8 m-0 text-left  dark:text-white">
                    YOur story and tips are important to us. Your tips and stories can help others to take care of their pets.
                    it can also help others to learn about the different types of animals and their care and needs.
                    Most new pet owners are not aware of the needs of their pets. Your tips can help them to take care of their pets.
                </p>
            </div>

        



            <div className="">
                {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200  dark:text-white">
                        <button
                            className="w-full text-left p-4 font-semibold text-gray-800 flex justify-between items-center  dark:text-gray-200"
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
                            className="overflow-hidden transition-all duration-300  dark:text-white"
                            style={{ height: openIndex === index ? "auto" : "0px" }}
                        >
                            <div className="p-4 text-gray-600  dark:text-white">
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
