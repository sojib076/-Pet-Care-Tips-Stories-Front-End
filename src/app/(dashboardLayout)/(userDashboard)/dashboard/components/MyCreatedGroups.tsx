'use client'

import React, { useState } from 'react'
import { Search, Users, Globe, Lock, MoreVertical, Plus, Trash, } from 'lucide-react'
import { useDeleteGroup, useGetUserCreateGroup } from '@/hook/group.hook'
import Link from 'next/link'
import { useUser } from '@/context/uAuthContext'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal'
import { Button } from '@nextui-org/react'
import { toast } from 'sonner'




const MyCreatedGroups = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { data, isLoading,  } = useGetUserCreateGroup()
  // deletegroup
  const {mutate:deleteuserGroup, isSuccess} = useDeleteGroup()
  const { user  } = useUser()

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  if (isLoading) {
    return <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 shimmer h-8 w-48 rounded-md"></div>

        <div className="mb-6 flex justify-between items-center">
          <div className="relative w-64 shimmer h-10 rounded-md"></div>
          <div className="flex items-center px-4 py-2 bg-blue-900 text-white rounded-md shimmer h-10 w-36"></div>
        </div>

        <div className="space-y-6">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow-md shimmer overflow-hidden h-40">
              <div className="p-6 space-y-3">
                <div className="h-6 w-3/4 bg-gray-300 rounded-md"></div>
                <div className="flex items-center space-x-3 mt-1">
                  <div className="h-4 w-4 bg-green-500 rounded-full"></div>
                  <div className="h-4 w-20 bg-gray-300 rounded-md"></div>
                </div>
                <div className="h-6 w-full bg-gray-300 rounded-md"></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
                    <div className="h-4 w-20 bg-gray-300 rounded-md"></div>
                  </div>
                  <div className="h-5 w-24 bg-blue-600 rounded-md"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  }

  const createdGroups = data?.data


  const filteredGroups = createdGroups?.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const deleteGroup = (id) => {
      deleteuserGroup(id)
      if (isSuccess) {
        toast.success('Group deleted successfully');
        
      }
  
    
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Created Groups</h1>

        </div>

        <div className="mb-6 flex justify-between items-center">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search groups..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <Link href={user?.role === 'admin' ? '/admin-dashboard/creategroup' : '/dashboard/creategroup'}>
            <button className="flex items-center px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-900/50 focus:ring-offset-2">
              <Plus className="h-5 w-5 mr-2" />
              Create New Group
            </button>
          </Link>
        </div>

        <div className="space-y-6">
          {filteredGroups?.map((group) => (
            <div key={group._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{group.name}</h2>
                    <div className="flex items-center mt-1">
                      {group.privacy === 'public' ? (
                        <Globe className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <Lock className="h-4 w-4 text-yellow-500 mr-1" />
                      )}
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {group.privacy.charAt(0).toUpperCase() + group.privacy.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <button className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200 focus:outline-none">
                      <MoreVertical className="h-5 w-5" />
                    </button>

                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{group.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Users className="h-5 w-5 mr-2" />
                    <span>{
                      group.members.length
                    } Members</span>
                  </div>
                  <Button
                    onPress={onOpen}
                    className="flex items-center text-red-600 hover:text-red-700 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none">
                    <Trash className="h-5 w-5 mr-1 " />
                    Delete Group
                  </Button>
                </div>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">

                            Are you sure ?
                          </h3>
                      
                        </ModalHeader>
                        <ModalBody>
                        
                          

                  
                            <h1 className=" dark:text-gray-300 text-xl text-center font-bold text-blue-900">Group Name: {group.name}</h1>
                            <p className=" dark:text-gray-300 text-center text-red-500 font-extrabold">This action cannot be undone.</p>
                            
                          

                        </ModalBody>
                        <ModalFooter>
                          <Button color="danger" variant="light" onPress={onClose}>
                            Close
                          </Button>
                          <Button color="danger" variant="solid"

                            onClick={() => deleteGroup(group._id)}

                            onPress={onClose}>
                            Delete Group
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </div>

            </div>

          ))}

        </div>
      </div>
    </div>
  )
}

export default MyCreatedGroups