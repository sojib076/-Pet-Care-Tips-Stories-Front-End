import { Button } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'


export default function HeroSection() {
  return (
    <section className="pt-10 md:pt-16 
      bg-gradient-to-bl from-sky-50 to-sky-300
      lg:h-[71.9vh]
      dark:from-gray-900 dark:to-sky-800
    

    ">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">

          <div className=" space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900
                dark:text-gray-300
              leading-tight mb-6">
                Connect with <span className="text-indigo-600">Pet Lovers</span> Worldwide
              </h1>
              <p className="text-xl text-gray-600 
                dark:text-gray-200
              mb-8">
                Join our vibrant community of pet enthusiasts. Share adorable moments, discover pet-friendly spots, and make furry friends!
              </p>
            </div>

            <div className='flex gap-3'>
              <Link href="/register">
                <Button variant="shadow" size="lg" className="w-full
                bg-blue-900 text-white
                
                ">Join NoW</Button>
              </Link>
              <Link href="/about">
                <Button  size="lg" className="w-full

                bg-gray-800 text-white
                  
                "> Learn More  </Button>
              </Link>
            </div>

          </div>

          <div className=" relative flex items-center justify-center">
            <Image
              src="https://i.ibb.co.com/j3xPSzM/dog.webp"
              alt="Hero Image"
              width={400}
              height={210}
              className="overflow-hidden rounded-xl object-cover object-center"
            />
            <div
              className='relative lg:bottom-[-118px]
            bottom-[-55px]
          '
            >
              <Image
                src="https://i.ibb.co.com/VQ8J8LW/cat.webp"
                alt="Hero Image"
                width={400}
                height={210}

              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

