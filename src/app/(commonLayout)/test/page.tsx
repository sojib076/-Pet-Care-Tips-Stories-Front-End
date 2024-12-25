import React from 'react'

import { MessageCircle, ChevronUp , Share2, MoreHorizontal, Users, Calendar, ChevronDown, Award, Bookmark, ChevronDownIcon, Menu } from 'lucide-react'
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Input } from '@nextui-org/react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'


export default function FacebookClone() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10 md:hidden">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">f</span>
          <div className="flex items-center space-x-2">
            <Button variant="solid"  className="bg-gray-200 rounded-full">
              <Menu size={20} />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row">
        {/* Left Sidebar */}
        <aside className="w-full md:w-1/4 pr-4 md:fixed h-auto md:h-screen overflow-y-auto mb-4 md:mb-0 hidden md:block">
          <div className="space-y-2">
            <Button variant="solid" className="w-full justify-start">
              <Avatar 
                name='John Doe'
              className="h-8 w-8 mr-2">
            
              </Avatar>
              John Doe
            </Button>
            <Button variant="solid" className="w-full justify-start">
              <Users className="mr-2 h-5 w-5" />
              Friends
            </Button>
            <Button variant="solid" className="w-full justify-start">
              <Bookmark className="mr-2 h-5 w-5" />
              Saved
            </Button>
        
       
   
            <Button variant="solid" className="w-full justify-start">
              <ChevronDownIcon className="mr-2 h-5 w-5" />
              See More
            </Button>
          </div>
          <Separator className="my-4" />
          <h3 className="font-semibold mb-2">Your Shortcuts</h3>
          <div className="space-y-2">
            <Button variant="solid" className="w-full justify-start">
              <Users className="mr-2 h-5 w-5" />
              Group 1
            </Button>
            <Button variant="solid" className="w-full justify-start">
              <Users className="mr-2 h-5 w-5" />
              Group 2
            </Button>
            <Button variant="solid" className="w-full justify-start">
              <ChevronDownIcon className="mr-2 h-5 w-5" />
              See More
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-full md:w-1/2 mx-auto md:ml-[25%]">
          <ScrollArea className="h-[calc(100vh-4rem)] md:h-screen">
            <div className="space-y-4">
              {/* Posts */}
              {[1, 2, 3, 4, 5].map((postId) => (
                <Card key={postId} className="w-full max-w-xl mx-auto">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center space-x-4">
                      <Avatar
                        name='User'
                      >
                       
                      </Avatar>
                      <div>
                        <p className="font-semibold">User {postId}</p>
                        <div className="flex items-center">
                          <p className="text-sm text-muted-foreground">{postId} hour{postId !== 1 ? 's' : ''} ago</p>
                          <span className="mx-1 text-muted-foreground">·</span>
                          <span className="bg-yellow-400 text-yellow-900 text-xs font-medium px-2 py-0.5 rounded-full flex items-center">
                            <Award className="w-3 h-3 mr-1" />
                            Premium
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="solid" >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardBody>
                    <h2 className="text-xl font-bold mb-2">The Importance of Regular Exercise</h2>
                    <p className="text-gray-700 mb-4">
                      Regular exercise is crucial for maintaining both physical and mental health. It helps in weight management, improves cardiovascular health, and boosts mood and energy levels. Even small amounts of daily activity can make a significant difference in overall well-being.
                    </p>
                    <p className="text-gray-700 mb-2">
                      Some benefits of regular exercise include:
                    </p>
                    <ul className="list-disc pl-5 text-gray-700 mb-4">
                      <li>Reduced risk of chronic diseases</li>
                      <li>Improved sleep quality</li>
                      <li>Enhanced cognitive function</li>
                      <li>Increased strength and flexibility</li>
                      <li>Better stress management</li>
                    </ul>
                    <p className="text-gray-700">
                      Remember, it's important to find activities you enjoy to make exercise a sustainable part of your routine. What are your favorite ways to stay active?
                    </p>
                  </CardBody>
                  <CardFooter className="flex flex-col">
                    <div className="flex justify-between w-full text-muted-foreground text-sm mb-2">
                      <span>{postId * 10} Points</span>
                      <span>{postId * 2} Comments</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between w-full">
                      <div className="flex items-center gap-2">
                        <Button variant="solid"  className="p-2">
                          <ChevronUp className="h-6 w-6 text-gray-500 hover:text-blue-500" />
                        </Button>
                        <span className="font-semibold">{postId * 10}</span>
                        <Button variant="solid"  className="p-2">
                          <ChevronDown className="h-6 w-6 text-gray-500 hover:text-red-500" />
                        </Button>
                      </div>
                      <Button variant="solid">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Comment
                      </Button>
                      <Button variant="solid">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                    </div>
                    <Separator className="my-2" />
                    
                    <div className="w-full space-y-4">
                      {/* Demo Comments */}
                      {[1, 2].map((commentId) => (
                        <div key={commentId} className="flex space-x-2">
                          <Avatar 
                            name='User'
                          className="h-8 w-8">
                            
                          </Avatar>
                          <div className="flex-1">
                            <div className="bg-gray-100
                              dark:bg-gray-800
                            rounded-lg p-2">
                              <p className="font-semibold text-sm">Commenter {commentId}</p>
                              <p className="text-sm">This is a great post! I totally agree that regular exercise is crucial for overall health and well-being.</p>
                            </div>
                            <div className="flex items-center mt-1 space-x-2 text-xs text-gray-500">
                              <button className="hover:text-gray-700">Like</button>
                              <button className="hover:text-gray-700">Reply</button>
                              <span>{commentId * 5}m</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      {/* Comment Input */}
                      <div className="flex items-center space-x-2">
                        <Avatar
                          name='User'
                        className="h-8 w-8">
                         
                        </Avatar>
                        <Input placeholder="Write a comment..." className="flex-1" />
                        <Button size="sm">Post</Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </main>

        {/* Right Sidebar */}
        <aside className="w-full md:w-1/4 pl-4 md:fixed right-0 top-0 h-auto md:h-screen overflow-y-auto mt-4 md:mt-0 hidden md:block">
          <Card className="mb-4">
            <CardHeader>
              <h3 className="text-lg font-semibold">Sponsored</h3>
            </CardHeader>
            <CardBody>
              <img src="/placeholder.svg?height=150&width=300" alt="Advertisement" className="w-full rounded-md mb-2" />
              <h4 className="font-semibold">Amazing Product</h4>
              <p className="text-sm text-muted-foreground">Check out this incredible offer!</p>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Contacts</h3>
            </CardHeader>
            <CardBody className="space-y-2">
              {['Alice Johnson', 'Bob Williams', 'Charlie Brown', 'David Lee', 'Eva Martinez'].map((friend, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Avatar
                    name={friend}
                  className="h-8 w-8">
                    
                  </Avatar>
                  <span className="text-sm">{friend}</span>
                </div>
              ))}
            </CardBody>
          </Card>
        </aside>
      </div>
    </div>
  )
}

