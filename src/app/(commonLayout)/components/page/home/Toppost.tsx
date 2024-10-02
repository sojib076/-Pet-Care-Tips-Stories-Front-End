"use client"

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useForm, FormProvider } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';
import { useCreatpost } from '@/hook/post.hook';
import axios from 'axios';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const quillModules = {
  toolbar: {
    container: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline'],
      ['image'],  
      ['clean']  
    ],
    handlers: {
      image: function() {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
          const file = input.files ? input.files[0] : null;
          if (file) {
            const formData = new FormData();
            formData.append('image', file);

            try {
              const res = await axios.post('https://api.imgbb.com/1/upload?key=c5f5e32f7744e81176cd5899a97c4257', formData);
              const imageUrl = res.data.data.url;

              const range = this?.quill?.getSelection();
              this?.quill?.insertEmbed(range.index, 'image', imageUrl);
            } catch (error) {
              console.error('Image upload failed:', error);
            }
          }
        };
      }
    }
  }
};

export default function CreateContent() {
  const methods = useForm();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { handleSubmit, register, setValue } = methods;
  const { mutate: createPost } = useCreatpost();

  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append('content', data.content);
    formData.append('category', data.category);
    formData.append('premiumContent', data.isPremium);

    createPost(data); 
  };

  return (
<FormProvider {...methods}>
  {/* Button to toggle form visibility */}
  <div className="max-w-4xl mx-auto p-4">
    <button
      onClick={() => setIsFormVisible(!isFormVisible)}
      className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg shadow-sm hover:bg-gray-200 focus:outline-none text-left"
    >
      {isFormVisible ? "Hide Post Creation" : "What's on your mind?"}
    </button>
  </div>

  {/* Conditionally render the form based on visibility */}
  {isFormVisible && (
    <div className="max-w-4xl mx-auto mt-4 bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Heading */}
        <h1 className="text-xl font-semibold mb-4 text-gray-800">Create Pet Care Content</h1>

        {/* Content Editor */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">Content</label>
          <ReactQuill
            theme="snow"
            modules={quillModules}
            onChange={(value) => setValue('content', value)}
            placeholder="Write your pet care tips or stories..."
            className="bg-gray-50 border border-gray-300 rounded-lg shadow-sm p-2"
          />
        </div>

        {/* Category Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">Category</label>
          <select
            {...register("category")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Tip">Tip</option>
            <option value="Story">Story</option>
          </select>
        </div>

        {/* Monetization Checkbox */}
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            {...register("premiumContent")}
            className="mr-2"
          />
          <label className="text-gray-700">Make this content premium</label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  )}
</FormProvider>
  );
}
