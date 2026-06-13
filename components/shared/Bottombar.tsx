'use client'
import { sidebarLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@clerk/nextjs'

const Bottombar = () => {
  const pathname = usePathname()
  const { userId } = useAuth()
  return (
    <section className='bottombar'>
      <div className='bottombar_container'>
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
                className={`bottombar_link group ${isActive ? 'bg-primary-500/15 border border-primary-500/30' : 'hover:bg-dark-4/40'}`}
              >
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={24}
                  height={24}
                  className='transition-transform duration-200 group-active:scale-90'
                />
                <p className='text-subtle-medium text-light-1 max-sm:hidden'>{link.label.split(/\s+/)[0]}</p>
                <span className={`absolute -bottom-1 h-1 w-1 rounded-full bg-primary-500 transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
              </Link>
            )
          })
        }
      </div>
    </section>
  )
}

export default Bottombar