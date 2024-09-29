/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChangeEvent, useState } from 'react';
import dynamic from 'next/dynamic';
import { useForm, FormProvider } from 'react-hook-form';

import 'react-quill/dist/quill.snow.css';
import Hookinput from '@/app/components/Form/HookInput';

import { useCreatpost } from '@/hook/post.hook';


const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function CreateContent() {
  const methods = useForm();
  const [imageFiles, setImageFiles] = useState<File[]>([]); 
 
  const { handleSubmit, register, setValue } = methods;

  const {mutate: createPost} = useCreatpost();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; 

    if (file) {
      setImageFiles([file]); 


      const reader = new FileReader();
      reader.onloadend = () => {
      
      };
      reader.readAsDataURL(file); 
    }
  };

  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('category', data.category);
    formData.append('isPremium', data.isPremium);
    if (imageFiles.length > 0) {
      formData.append('image', imageFiles[0]); 
    }
    
    createPost(formData);
    
   
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Create Pet Care Content</h1>

        {/* Title Input */}
        <Hookinput label="Title" name="title" required />

        {/* Content Editor */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Content</label>
          <ReactQuill
            theme="snow"
            onChange={(value) => setValue('content', value)} // Set content value directly
            placeholder="Write your pet care tips or stories..."
          />
        </div>

        {/* Category Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
          <select
            {...register("category")} // Register with react-hook-form
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Tip">Tip</option>
            <option value="Story">Story</option>
          </select>
        </div>
        <div className="min-w-fit flex-1">
                <label className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400" htmlFor="image">
                  Upload image
                </label>
                <input className="hidden" id="image" type="file" onChange={handleImageChange} accept="image/*" />
              </div>
        {/* Monetization Checkbox */}
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register("isPremium")} // Register the checkbox
              className="mr-2"
            />
            <span className="text-gray-700">Make this content premium</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </FormProvider>
  );
}
