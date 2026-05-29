'use client'
import { SignOutButton, OrganizationSwitcher, useAuth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { dark } from '@clerk/themes'

const Topbar = () => {
    const { userId, isLoaded } = useAuth()

  return (
    <nav className='topbar'>
        <Link href={'/'} className='flex items-center gap-4'>
            <Image src={'/logo.svg'} alt='logo' width={28} height={28}/>
            <p className='text-heading3-bold text-light-1 max-xs:hidden'>Threads</p>
        </Link>
                <div className='flex items-center gap-1'>
                        <div className='block md:hidden'>
                            {isLoaded && userId && (
                                <SignOutButton redirectUrl='/sign-in'>
                                    <div className='flex cursor-pointer'>
                                        <Image src={'/logout.svg'} alt='logout' width={24} height={24} />
                                    </div>
                                </SignOutButton>
                            )}
                        </div>
                        {isLoaded && userId && (
                            <OrganizationSwitcher
                                appearance={{
                                    baseTheme: dark,
                                    elements: { organizationSwitcherTrigger: 'py-2 px-4' },
                                }}
                            />
                        )}
                </div>
    </nav>
  )
}

export default Topbar