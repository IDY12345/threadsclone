'use client'

import { formatDateString, timeAgo } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import LikeButton from '../shared/LikeButton';
import DeleteThread from '../shared/DeleteThread';


interface Props {
    id: string,
    currentUserId: string,
    parentId: string | null,
    content: string,
    author: {
        name: string,
        image: string,
        id: string,
    },
    community: {
        id: string,
        name: string,
        image: string,
    } | null,
    createdAt: string,
    commentCount: number,
    isComment?: boolean;
}

const ThreadCard = ({
    id,
    currentUserId,
    parentId,
    content,
    author,
    community,
    createdAt,
    commentCount,
    isComment
}: Props) => {
    const relativeTime = timeAgo(createdAt);

    return (
        <article className={`group thread-card-hover animate-slide-up relative flex w-full flex-col rounded-2xl ${isComment ? 'px-0 xs:px-7' : 'bg-dark-2/80 p-7 border border-dark-4/40'}`}>
            <span className='pointer-events-none absolute left-0 top-6 h-16 w-1 rounded-full bg-primary-500/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100' />
            <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
                <div className='flex w-full min-w-0 flex-1 flex-row gap-4'>
                    <div className='flex flex-col items-center'>
                        <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>
                            <span className='absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/70 to-accent-cool/40 shadow-[0_0_14px_rgba(45,212,191,0.2)]' />
                            <span className='absolute inset-[2px] rounded-full bg-dark-2' />
                            <Image
                                src={author.image}
                                alt='Profile image'
                                fill
                                sizes='44px'
                                className='relative z-10 cursor-pointer rounded-full object-cover'
                            />
                        </Link>
                        <div className='thread-card_bar' />
                    </div>
                    <div className='flex w-full min-w-0 flex-col'>
                        <div className='flex items-center gap-2'>
                            <Link href={`/profile/${author.id}`} className='w-fit'>
                                <h4 className='cursor-pointer text-base-semibold text-light-1'>{author.name}</h4>
                            </Link>
                            <span
                                className='text-subtle-medium text-light-4'
                                title={formatDateString(createdAt)}
                                suppressHydrationWarning
                            >
                                - {relativeTime}
                            </span>
                        </div>

                        <p className='mt-2 text-small-regular text-light-2'>{content}</p>

                        <div className={`mt-5 flex flex-col gap-3 ${isComment ? 'mb-10' : ''}`}>
                            <div className='flex flex-wrap items-center gap-3.5'>
                                <LikeButton threadId={id} userId={currentUserId} />
                                <Link
                                    href={`/thread/${id}`}
                                    title='Reply'
                                    className='group flex items-center'
                                >
                                    <Image
                                        src='/reply.svg'
                                        alt='reply'
                                        width={24}
                                        height={24}
                                        className='cursor-pointer object-contain transition-all duration-200 group-hover:scale-110 group-hover:brightness-125'
                                    />
                                </Link>
                                <button
                                    type='button'
                                    title='Repost (soon)'
                                    className='group flex items-center'
                                >
                                    <Image
                                        src='/repost.svg'
                                        alt='repost'
                                        width={24}
                                        height={24}
                                        className='cursor-pointer object-contain transition-all duration-200 group-hover:scale-110 group-hover:brightness-125'
                                    />
                                </button>
                                <button
                                    type='button'
                                    title='Share (soon)'
                                    className='group flex items-center'
                                >
                                    <Image
                                        src='/share.svg'
                                        alt='share'
                                        width={24}
                                        height={24}
                                        className='cursor-pointer object-contain transition-all duration-200 group-hover:scale-110 group-hover:brightness-125'
                                    />
                                </button>
                            </div>
                            {commentCount > 0 && (
                                <Link href={`/thread/${id}`} className='w-fit'>
                                    <span className='inline-flex items-center gap-2 rounded-full border border-dark-4/70 bg-dark-3/60 px-3 py-1 text-subtle-medium text-light-2'>
                                        {commentCount} {commentCount === 1 ? 'reply' : 'replies'}
                                    </span>
                                </Link>
                            )}
                        </div>
                        {!isComment && community && (
                            <Link href={`/communities/${community.id}`} className='mt-2 flex flex-wrap items-center gap-2 text-subtle-medium text-gray-1'>
                                <span>{formatDateString(createdAt)}</span>
                                <span className='h-1 w-1 rounded-full bg-dark-5' aria-hidden='true' />
                                <span>{community.name} Space</span>
                                <Image
                                    src={community.image}
                                    alt={community.name}
                                    width={14}
                                    height={14}
                                    className='ml-1 rounded-full object-cover'
                                />
                            </Link>
                        )}
                    </div>
                </div>
                <div className='mt-1 flex items-center self-end sm:self-auto'>
                    <DeleteThread
                        threadId={id}
                        currentUserId={currentUserId}
                        authorId={author.id}
                        parentId={parentId}
                        isComment={isComment}
                    />
                </div>
            </div>
        </article>
    )
}

export default ThreadCard