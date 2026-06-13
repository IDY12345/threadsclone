'use client'
import Link from 'next/link'
import { sidebarLinks } from '@/constants/index'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { SignOutButton, useAuth } from '@clerk/nextjs'

const LeftSidebar = () => {

  const pathname = usePathname()

  const { userId, isLoaded } = useAuth()
  return (
    <section className='custom-scrollbar leftsidebar'>
      <span className='pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-dark-2/90 to-transparent' />
      <span className='pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-dark-2/90 to-transparent' />
      <div className='flex w-full flex-1 flex-col gap-6 px-6'>
        {
          sidebarLinks.map((link) => {
            const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
            const linkRoute =
              link.route === '/profile' && userId
                ? `${link.route}/${userId}`
                : link.route;

            return (
              <Link
                href={linkRoute}
                key={link.label}
                className={`leftsidebar_link group ${isActive ? 'bg-primary-500/15 border border-primary-500/30 shadow-[0_0_18px_rgba(45,212,191,0.12)]' : ''}`}
              >
                {isActive && (
                  <span className='absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-primary-500/80 shadow-[0_0_12px_rgba(45,212,191,0.6)]' />
                )}
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={24}
                  height={24}
                  className='transition-all duration-200 group-hover:scale-105 group-hover:drop-shadow-[0_0_8px_rgba(45,212,191,0.35)]'
                />
                <p className='text-light-1 max-lg:hidden'>{link.label}</p>
                <span className='pointer-events-none absolute left-full top-1/2 ml-3 hidden -translate-y-1/2 whitespace-nowrap rounded-lg border border-dark-4/80 bg-dark-3/90 px-3 py-1 text-subtle-medium text-light-2 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 max-lg:flex'>
                  {link.label}
                </span>
              </Link>
            )
          })
        }
      </div>
      <div className='mt-10 px-6'>
        {isLoaded && userId && (
          <SignOutButton redirectUrl='/sign-in'>
            <div className='flex cursor-pointer items-center gap-4 rounded-lg border border-transparent p-4 transition-all duration-200 hover:border-dark-4/70 hover:bg-dark-4/40'>
              <Image src='/logout.svg' alt='logout' width={24} height={24} />
              <p className='text-light-2 max-lg:hidden'>Logout</p>
            </div>
          </SignOutButton>
        )}
      </div>
    </section>
  )
}

export default LeftSidebar