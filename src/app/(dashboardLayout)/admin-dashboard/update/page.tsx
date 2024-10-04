/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetProfile, useUpdateProfile } from "@/hook/user.Hook";
import { Button } from "@nextui-org/react";
import { LoaderPinwheel } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const imgbbAPIKey = "c5f5e32f7744e81176cd5899a97c4257"; 

const ProfileUpdates = () => {
  const { data: userData, isLoading, isError } = useGetProfile();
  const { mutate } = useUpdateProfile();

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);


  if (isError) {
    return <div>Error loading profile.</div>;
  }
  const user = userData?.data;

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Generate a preview URL
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
        return result.data.url; 
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
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderPinwheel className="animate-spin text-4xl text-green-500" />
        <span className="ml-2 text-xl">Loading profile...</span>
      </div>
    );
  }
  return (
    <div>
      <h1> Update Your Profile </h1>

      <div className="container mx-auto lg:p-4 ">
        <div className="bg-white shadow-md rounded-lg pb-20 dark:bg-black">
          <div className="relative ">
            <div className="w-full h-48 bg-gray-300 rounded-t-lg"></div>
            <div className="absolute top-32 left-5">
              <Image
                src={previewImage || user?.img || '/path/to/default-profile-picture.jpg'}
                alt="Profile Picture"
                width={120}
                height={120}
                className="rounded-full border-4 border-white w-[110px] h-[110px]"
              />
            </div>
          </div>

          <div className="lg:flex justify-between items-center">
            <div className="pt-16 pb-4 px-5">
              <h1 className="text-2xl font-bold">{user?.name || 'User Name'}</h1>
              <p className="text-gray-600">
                {user?.email || 'Bio or a brief description of the user.'}
              </p>
            </div>
          </div>

          <div className="px-5">
            <form onSubmit={handleSubmit}>
              <div className="lg:flex justify-between ">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={user?.name}
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="img"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Upload Image
                  </label>
                  <input
                    type="file"
                    id="img"
                    name="img"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm"
                  />
                </div>
              </div>

              <Button type="submit" disabled={isUploading}>
                {isUploading ? "Updating..." : "Update Profile"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdates;
