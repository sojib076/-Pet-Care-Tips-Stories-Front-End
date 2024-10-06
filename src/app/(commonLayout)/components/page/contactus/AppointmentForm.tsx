/* eslint-disable @next/next/no-img-element */
import React from 'react';

const StoryShareForm = () => {
  return (
    <div className="  py-16 px-4 lg:w-[80%] mx-auto">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        
        {/* Left Image Section */}
        <div className="lg:w-[70%] md:w-1/2">
          <img
            src="https://plus.unsplash.com/premium_photo-1679429320974-ab1de58bcad9?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Pets"
            className="h-full lg:w-[80%] object-cover"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-8">
          {/* Form Heading */}
          <div className="text-left mb-6">
            <p className="text-red-500 text-sm uppercase font-bold">Share Your Issue</p>
            <h2 className="lg:text-3xl font-bold text-gray-800">
              Submit Your Issue
            </h2>
            <div className="w-16 h-1 bg-green-500 mt-2"></div>
          </div>

          {/* Form */}
          <form className="space-y-4">
            {/* Name and Email */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-full">
                <label className="block text-sm font-semibold text-gray-700">Your Name*</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-semibold text-gray-700">Your Email*</label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
            </div>

            {/* Story or Tip */}
            <div className="w-full">
              <label className="block text-sm font-semibold text-gray-700">Your Issue or inquiry*</label>
              <textarea
                placeholder="Write your pet story or tip here"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 h-40"
              ></textarea>
            </div>

            {/* Pet Category */}
            <div className="w-full">
              <label className="block text-sm font-semibold text-gray-700">Select Pet Type</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-lg p-2">
                <option>Select a Pet Type</option>
                <option>Dog</option>
                <option>Cat</option>
                <option>Bird</option>
                <option>Other</option>
              </select>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full md:w-auto bg-blue-900/90 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-900 transition-colors"
              >
               SUBMIT NOW
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StoryShareForm;
