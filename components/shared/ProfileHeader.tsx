'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

interface Props {
    accountId: string,
    authUserId: string,
    name: string,
    username: string,
    imgUrl: string,
    bio: string,
    stats?: { label: string; value: number }[],
    type?:'User' | 'Community'
}

const ProfileHeader = ({
    accountId,
    authUserId,
    name,
    username,
    imgUrl,
    bio,
    stats = [],
    type = 'User'
}: Props) => {
    const isOwnProfile = type === 'User' && accountId === authUserId;
    const normalizedStats = useMemo(() => stats, [stats]);
    const [animatedStats, setAnimatedStats] = useState<number[]>(
        normalizedStats.map(() => 0)
    );

    useEffect(() => {
        if (normalizedStats.length === 0) return;
        const duration = 700;
        let start: number | null = null;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setAnimatedStats(
                normalizedStats.map((stat) => Math.round(stat.value * progress))
            );

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [normalizedStats]);

    const formattedStats = normalizedStats.map((stat, index) => ({
        ...stat,
        displayValue: new Intl.NumberFormat().format(animatedStats[index] ?? stat.value),
    }));

    return (
        <div className='flex w-full flex-col gap-8'>
            <div className='glass-panel relative overflow-hidden rounded-3xl border border-dark-4/60 p-4 sm:p-6'>
                <div className='pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-primary-500/25 via-transparent to-accent-cool/25' />
                <div className='pointer-events-none absolute -left-10 -top-16 h-32 w-32 rounded-full bg-primary-500/20 blur-3xl' />
                <div className='pointer-events-none absolute -right-16 top-8 h-36 w-36 rounded-full bg-accent-cool/20 blur-3xl' />

                <div className='relative z-10 flex flex-col gap-6'>
                    <div className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
                        <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
                            <div className='relative h-20 w-20'>
                                <span className='absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/70 to-accent-cool/40' />
                                <span className='absolute inset-[3px] rounded-full bg-dark-2' />
                                <Image
                                    src={imgUrl}
                                    alt='Profile Image'
                                    fill
                                    sizes='80px'
                                    className='relative z-10 rounded-full object-cover'
                                />
                            </div>
                            <div className='flex-1'>
                                <div className='flex flex-wrap items-center gap-2'>
                                    <h2 className='text-left text-heading3-bold text-light-1'>{name}</h2>
                                    <span className='inline-flex items-center gap-1 rounded-full border border-primary-500/30 bg-primary-500/10 px-2 py-0.5 text-subtle-medium text-light-1'>
                                        <svg
                                            viewBox='0 0 24 24'
                                            className='h-3.5 w-3.5'
                                            fill='none'
                                            stroke='currentColor'
                                            strokeWidth='1.8'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            aria-hidden='true'
                                        >
                                            <path d='m6 12 4 4 8-8' />
                                        </svg>
                                        Verified
                                    </span>
                                </div>
                                <p className='text-base-medium text-gray-1'>@{username}</p>
                                <div className='mt-2 flex flex-wrap items-center gap-2 text-subtle-medium text-light-4'>
                                    <span className='rounded-full border border-dark-4/60 bg-dark-3/70 px-3 py-1'>
                                        {type === 'Community' ? 'Space' : 'Member'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {isOwnProfile && (
                            <Link
                                href='/profile/edit'
                                className='btn-primary w-full rounded-full px-5 py-2 text-center text-subtle-medium text-light-1 shadow-[0_8px_24px_rgba(45,212,191,0.25)] sm:w-auto'
                            >
                                Edit profile
                            </Link>
                        )}
                    </div>

                    {formattedStats.length > 0 && (
                        <div className='flex flex-wrap gap-3'>
                            {formattedStats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className='flex min-w-[120px] flex-1 flex-col gap-1 rounded-2xl border border-dark-4/60 bg-dark-3/70 px-4 py-3 sm:flex-none'
                                >
                                    <span className='text-heading4-medium text-light-1'>{stat.displayValue}</span>
                                    <span className='text-subtle-medium text-light-4'>{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <p className='max-w-2xl text-base-regular text-light-2'>{bio}</p>

            <div className='h-0.5 w-full bg-dark-3' />
        </div>
    )
}

export default ProfileHeader