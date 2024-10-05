/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetProfile, useUpdateProfile } from "@/hook/user.Hook";
import Image from "next/image";
import { useState } from "react";
import Profilecard from "../components/Profilecard";

const imgbbAPIKey = "c5f5e32f7744e81176cd5899a97c4257"; 

const ProfileUpdates = () => {
  const { data: userData, isLoading, isError } = useGetProfile();
  const { mutate } = useUpdateProfile();

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  if (isLoading) {
    return <Profilecard/>
  }
  if (isError) {
    return <div>Error loading profile.</div>;
  }
  const user = userData?.data;

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const uploadImageToImgbb = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        return result.data.url; // Return the image URL
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsUploading(true);

    try {
      let imageUrl = user?.img; 
      if (selectedFile) {
        imageUrl = await uploadImageToImgbb(selectedFile);
      }

      const formData = new FormData(event.target);
      const updatedProfile = {
        name: formData.get('name'),
        img: imageUrl,
      };

      mutate(updatedProfile);
      console.log(updatedProfile);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">Update Your Profile</h1>

      <div className="container mx-auto lg:p-6">
        <div className="bg-white shadow-lg rounded-2xl dark:bg-gray-900 dark:text-white relative overflow-hidden pb-10">
          {/* Gradient Background */}
          <div className="relative bg-gradient-to-r from-purple-500 to-indigo-500 h-48 rounded-t-lg"></div>

          {/* Profile Image */}
          <div className="absolute top-32 left-5">
            <Image
              src={previewImage || user?.img || '/path/to/default-profile-picture.jpg'}
              alt="Profile Picture"
              width={120}
              height={120}
              className="rounded-full border-4 border-white shadow-md w-[120px] h-[120px] hover:scale-105 transition-transform"
            />
          </div>

          {/* User Information */}
          <div className="lg:flex justify-between items-center px-6 mt-16">
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold">{user?.name || 'User Name'}</h1>
              <p className="text-gray-600 dark:text-gray-300">{user?.email || 'Bio or a brief description of the user.'}</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="px-6 mt-8">
            <form onSubmit={handleSubmit}>
              <div className="lg:flex justify-between gap-6">
                {/* Name Field */}
                <div className="mb-4 w-full">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={user?.name}
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                  />
                </div>

                {/* Upload Image Field */}
                <div className="mb-4 w-full">
                  <label htmlFor="img" className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    id="img"
                    name="img"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isUploading}
                className="inline-flex items-center justify-center px-6 py-3 mt-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isUploading ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdates;
