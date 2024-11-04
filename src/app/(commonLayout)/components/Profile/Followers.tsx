import { User } from 'lucide-react'
import Link from 'next/link'

export type UserData = {
  _id: string
  name: string
  img:string
}



export function UserItem({ user }: { user: UserData }) {

    console.log(user,'from admin');
  





  return (


    
    <div className="flex items-center p-3 hover:bg-gray-50 dark:bg-gray-800    ">
    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3  ">
      {user.img ? (
        <img src={user.img} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
      ) : (
        <User className="w-6 h-6 text-gray-400" />
      )}
    </div>
    <div className="flex-1">
      <h3 className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</h3>
    </div>
    <Link href={`/profile/${user._id}`}>
      <button className="px-3 py-1 text-sm text-blue-600 hover:underline">
        View
      </button>
    </Link>
  </div>
  )
}



