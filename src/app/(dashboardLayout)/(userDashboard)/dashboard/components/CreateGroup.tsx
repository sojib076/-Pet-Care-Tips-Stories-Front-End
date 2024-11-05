'use client'

import React, { useState } from 'react'
import { Globe,  } from 'lucide-react'
import { useCreateGroup } from '@/hook/group.hook'


export default function CreateGroup() {
  const [privacy, setPrivacy] = useState('public')
  const [groupName, setGroupName] = useState('')
  const [description, setDescription] = useState('')

  const {mutate:createGroup} = useCreateGroup();
  
  const handleCreateGroup = () => {
    const groupData = {
      name: groupName,
      privacy,
      description,
    }
   
   const result =   createGroup(groupData)
   console.log(result);
 
  
  }



  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create a New Group</h1>
       
        </div>
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-6">
          {/* Group Name */}
          <div>
            <label htmlFor="group-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Group Name
            </label>
            <input
              type="text"
              id="group-name"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          {/* Privacy Setting */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Privacy</label>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <button
                className={`flex items-center justify-center px-4 py-3 border ${
                  privacy === 'public'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                    : 'border-gray-300 dark:border-gray-600'
                } rounded-lg focus:outline-none dark:text-white`}
                onClick={() => setPrivacy('public')}
              >
                <Globe className="w-5 h-5 mr-2" />
                <span>Public</span>
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="What's your group about?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>


          {/* Create Group Button */}
          <div>
            <button 
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800"
              onClick={handleCreateGroup}
            >
              Create Group
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}