/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import {useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useForm, FormProvider } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';
import { useCreatpost } from '@/hook/post.hook';
import axios from 'axios';

const ReactQuill = dynamic(() => import('react-quill').then(mod => mod.default), { ssr: false, loading: () => <p>Loading...</p> });

export default function CreateContent() {
  const methods = useForm();

  const { handleSubmit, register, setValue } = methods;
  const { mutate: createPost } = useCreatpost();
  const quillRef = useRef<any>(null); 

  const quillModules = {
    toolbar: {
      container: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['bold', 'italic', 'underline'],
        ['image'],
        ['clean'],
      ],
    },
  };

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();

      
      editor.getModule('toolbar').addHandler('image', () => {
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
              const res = await axios.post(
                'https://api.imgbb.com/1/upload?key=c5f5e32f7744e81176cd5899a97c4257',
                formData
              );
              const imageUrl = res.data.data.url;

              const range = editor.getSelection();
              editor.insertEmbed(range.index, 'image', imageUrl);
            } catch (error) {
              console.error('Image upload failed:', error);
            }
          }
        };
      });
    }
  }, [quillRef]);



  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append('content', data.content);
    formData.append('category', data.category);
    formData.append('premiumContent', data.isPremium);

    createPost(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="lg:max-w-4xl mx-auto lg:p-8">
        <h1 className="lg:text-2xl font-bold mb-6">Create Pet Care Content</h1>

        {/* Title Input */}
      

        {/* Content Editor */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Content
          </label>
        
          <ReactQuill
           
            theme="snow"
            modules={quillModules}
            onChange={(value) => setValue('content', value)}
            placeholder="Write your pet care tips or stories..."
            className="bg-gray-50 border border-gray-300 rounded-lg shadow-sm lg:p-2  "
          />
        </div>

        {/* Category Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category
          </label>
          <select
            {...register("category")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Tip">Tip</option>
            <option value="Story">Story</option>
          </select>
        </div>

   
        {/* Monetization Checkbox */}
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register("premiumContent")}
              className="mr-2"
            />
            <span className="text-gray-700">Make this content premium</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none w-full hover:scale-80 transition-transform duration-200"
        >
          Submit
        </button>
      </form>
    </FormProvider>
  );
}
