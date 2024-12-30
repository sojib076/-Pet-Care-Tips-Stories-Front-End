import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

import { Separator } from "@/components/ui/separator"
import { Button, Input } from '@nextui-org/react'

export default function Footer() {
  return (
    <footer className="
      bg-gradient-to-bl from-sky-200 to-sky-300
      
      dark:from-gray-900 dark:to-sky-800
    ">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">PsTips</h3>
            <p className="text-sm">Connect, share, and celebrate your pets with fellow animal lovers.</p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-blue-500 transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="hover:text-pink-500 transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="hover:text-red-500 transition-colors">
                <Youtube size={20} />
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:underline">Home</Link></li>
              <li><Link href="#" className="hover:underline">About Us</Link></li>
              <li><Link href="#" className="hover:underline">Pet Care Tips</Link></li>
              <li><Link href="#" className="hover:underline">Community Guidelines</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:underline">FAQs</Link></li>
              <li><Link href="#" className="hover:underline">Contact Us</Link></li>
              <li><Link href="#" className="hover:underline">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:underline">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">Stay Updated</h4>
            <p className="text-sm mb-4">Subscribe to our newsletter for pet care tips and community updates.</p>
            <form className="space-y-2">
              <Input type="email" placeholder="Enter your email" className="w-full" />
              <Button type="submit" className="w-full
                bg-blue-900 text-white
                hover:bg-blue-900
              ">Subscribe</Button>
            </form>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="text-center text-sm">
          <p>&copy; {new Date().getFullYear()} PsTips. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

