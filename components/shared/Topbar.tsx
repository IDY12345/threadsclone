'use client'
import { SignOutButton, OrganizationSwitcher, useAuth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

const Topbar = () => {
    const { userId, isLoaded } = useAuth()

    return (
        <nav className='topbar relative'>
            <span className='pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-primary-500/60 via-transparent to-transparent' />
            <Link href='/' className='group flex items-center gap-4'>
                <Image
                    src='/logo.svg'
                    alt='logo'
                    width={28}
                    height={28}
                    className='transition-transform duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_10px_rgba(45,212,191,0.4)]'
                />
                <p className='text-heading3-bold text-light-1 max-xs:hidden'>Relay</p>
            </Link>
            <div className='flex items-center gap-2'>
                {isLoaded && userId && (
                    <button
                        type='button'
                        aria-label='Notifications'
                        className='relative hidden items-center justify-center rounded-full border border-dark-4/70 bg-dark-3/60 p-2 text-light-1 transition-all duration-200 hover:border-primary-500/40 hover:bg-dark-3/80 hover:shadow-md hover:shadow-primary-500/10 sm:flex'
                    >
                        <svg
                            viewBox='0 0 24 24'
                            className='h-4 w-4'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='1.6'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            aria-hidden='true'
                        >
                            <path d='M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5' />
                            <path d='M9 17a3 3 0 0 0 6 0' />
                        </svg>
                        <span className='absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-secondary-500' />
                    </button>
                )}
                <div className='block md:hidden'>
                    {isLoaded && userId && (
                        <SignOutButton redirectUrl='/sign-in'>
                            <div className='flex cursor-pointer rounded-full border border-dark-4/60 bg-dark-3/60 p-2 transition-all duration-200 hover:border-primary-500/40 hover:bg-dark-3/80'>
                                <Image src='/logout.svg' alt='logout' width={20} height={20} />
                            </div>
                        </SignOutButton>
                    )}
                </div>
                {isLoaded && userId && (
                    <OrganizationSwitcher
                        appearance={{
                            elements: { organizationSwitcherTrigger: 'py-2 px-4' },
                        }}
                    />
                )}
            </div>
        </nav>
    )
}

export default Topbar
