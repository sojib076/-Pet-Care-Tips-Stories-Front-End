
"use client";

import { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useForm, FormProvider } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';
import { useCreatpost } from '@/hook/post.hook';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
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
            try {

              const options = {
                maxSizeMB: 0.5,
                maxWidthOrHeight: 800,
                useWebWorker: true,
              };

              const compressedFile = await imageCompression(file, options);


              const formData = new FormData();
              formData.append('file', compressedFile);
              formData.append('upload_preset', 'jcukyhbk');

              const res = await axios.post(
                'https://api.cloudinary.com/v1_1/dg8ppqvbb/image/upload', // Replace with your Cloudinary cloud name
                formData
              );

              const imageUrl = res.data.secure_url;

              const range = editor.getSelection();
              editor.insertEmbed(range.index, 'image', imageUrl);
            } catch (error) {
              console.log(error);

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
    formData.append('title', data.title);

    createPost(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="lg:max-w-4xl mx-auto lg:p-8">
        <h1 className="lg:text-2xl font-bold mb-6 dark:text-white">Create Pet Care Content</h1>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">Title</label>
          <input
            type="text"
            {...register('title')}
            className="w-full px-3 py-2 border dark:text-white border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Content Editor */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">
            Content
          </label>
          <ReactQuill
            theme="snow"
            modules={quillModules}
            onChange={(value) => setValue('content', value)}
            placeholder="Write your pet care tips or stories..."
            className="bg-gray-50 border border-gray-300 rounded-lg shadow-sm lg:p-2"
          />
        </div>

        {/* Category Selection */}
        <div className="mb-4 dark:text-white">
          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">
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
        <div className="mb-4 relative group dark:text-white">
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register("premiumContent")}
              className="mr-2"
            />
            <span className="text-gray-700 dark:text-white ">Make this content premium</span>
          </label>
          <span className="absolute left-1/3 transform -translate-x-1/2 -translate-y-6 bg-gray-700 dark:text-white text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
           Premium content earns 80 tk per payment 20tk for admin 
          </span>
        </div>


        {/* Submit Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-900 text-white rounded-lg shadow-md hover:bg-blue-900/80 focus:outline-none w-full hover:scale-95 transition-transform duration-200"
        >
          Submit
        </button>
      </form>
    </FormProvider>
  );
}
