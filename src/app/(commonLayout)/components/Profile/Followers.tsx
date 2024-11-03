import { User } from 'lucide-react'

export type UserData = {
  id: number
  name: string
  img :string
}



export function UserItem({ user }: { user: UserData }) {

console.log();

  return (
    <div className="flex items-center p-3 hover:bg-gray-50  dark:bg-gray-800 ">
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
        {user.img ? (
          <img src={user.img} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <User className="w-6 h-6 text-gray-400" />
        )}
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white ">{user.name}</h3>
      </div>
    </div>
  )
}



