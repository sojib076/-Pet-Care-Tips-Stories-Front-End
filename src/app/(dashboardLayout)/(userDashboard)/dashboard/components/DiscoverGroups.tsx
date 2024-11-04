'use client'

import React, { useState } from 'react'
import { Search, Users, Globe, Lock, ChevronDown, Moon, Sun } from 'lucide-react'
import { useGetUserCreateGroup } from '@/hook/group.hook'
import { useUser } from '@/context/uAuthContext'

// Mock data for groups


const JoinGroups = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [privacyFilter, setPrivacyFilter] = useState('all')

  const { user, isLoading: userLoding } = useUser()







  const { data, isLoading, isError } = useGetUserCreateGroup()

  const groups = data?.data


  const filteredGroups = groups?.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (privacyFilter === 'all' || group.privacy === privacyFilter)
  )

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Discover Groups</h1>

        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search groups..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="relative">
            <select
              className="appearance-none w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white py-2 px-4 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={privacyFilter}
              onChange={(e) => setPrivacyFilter(e.target.value)}
            >
              <option value="all">All Groups</option>
              <option value="public">Public Groups</option>
              <option value="private">Private Groups</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {
          isLoading && <div>Loading...</div>
        }

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredGroups?.map((group) => (
            <div key={group.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">


                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{group.name}</h2>
                  {group.privacy === 'public' ? (
                    <Globe className="h-5 w-5 text-green-500" />
                  ) : (
                    <Lock className="h-5 w-5 text-yellow-500" />
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{group.description}</p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{group?.members?.length} members</span>
                </div>
                <button
                  disabled={user?._id === group.admin}
                  className={`w-full ${user?._id === group.admin
                    ? 'bg-gray-400 text-gray-800 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                    } font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out`}
                >
                  {user?._id === group.admin ? 'You are the admin' : 'Join Group'}
                </button>



              </div>
            </div>
          ))}
        </div>


      </div>
    </div>
  )
}

export default JoinGroups