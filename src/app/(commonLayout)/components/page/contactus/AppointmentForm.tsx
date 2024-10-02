/* eslint-disable @next/next/no-img-element */
import React from 'react';

const AppointmentForm = () => {
  return (
    <div className="  py-16 px-4 lg:w-[80%] mx-auto">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        
        {/* Left Image Section */}
        <div className="lg:w-[70%] md:w-1/2">
          <img
            src="https://i0.wp.com/demo.themedraft.net/wp/doctio/wp-content/uploads/2022/06/form-left-image.jpg"
            alt="Doctors"
            className="h-full lg:w-[80%] object-cover"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-8">
          {/* Form Heading */}
          <div className="text-left mb-6">
            <p className="text-red-500 text-sm uppercase font-bold">Book Now</p>
            <h2 className="lg:text-3xl font-bold text-gray-800">
              Make An Appointment To Book Your Seat
            </h2>
            <div className="w-16 h-1 bg-green-500 mt-2"></div>
          </div>

          {/* Form */}
          <form className="space-y-4">
            {/* Name and Email */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-full">
                <label className="block text-sm font-semibold text-gray-700">Name*</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-semibold text-gray-700">Email*</label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
            </div>

            {/* Service and Doctors Selection */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-full">
                <label className="block text-sm font-semibold text-gray-700">Choose A Service</label>
                <select className="mt-1 block w-full border border-gray-300 rounded-lg p-2">
                  <option>Select a Service</option>
                  <option>Service 1</option>
                  <option>Service 2</option>
                </select>
              </div>
              <div className="w-full">
                <label className="block text-sm font-semibold text-gray-700">Select Doctors</label>
                <select className="mt-1 block w-full border border-gray-300 rounded-lg p-2">
                  <option>Select a Doctor</option>
                  <option>Doctor 1</option>
                  <option>Doctor 2</option>
                </select>
              </div>
            </div>

            {/* Date and Branch Selection */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-full">
                <label className="block text-sm font-semibold text-gray-700">Select Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-semibold text-gray-700">Select Branch</label>
                <select className="mt-1 block w-full border border-gray-300 rounded-lg p-2">
                  <option>Select a Branch</option>
                  <option>Branch 1</option>
                  <option>Branch 2</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full md:w-auto bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                SEND NOW
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
