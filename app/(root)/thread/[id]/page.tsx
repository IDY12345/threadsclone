import ThreadCard from '@/components/cards/ThreadCard'
import Comment from '@/components/forms/Comment';
import { fetchThreadById } from '@/lib/actions/thread.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

export const dynamic = 'force-dynamic'

interface ThreadChild {
    _id: string;
    parentId?: string;
    text: string;
    author?: {
        id?: string;
        name?: string;
        image?: string;
    };
    community?: {
        id?: string;
        name?: string;
        image?: string;
    } | null;
    createdAt?: Date | string;
    children?: unknown[];
}

const page = async({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = await params;

    if(!id) return null;

    const user=await currentUser();

    if(!user) return null;

    const userInfo=await fetchUser(user.id);

    if(!userInfo?.onboarded) redirect('/onboarding')

    const thread=await fetchThreadById(id)

    return (
        <section className='relative'>
            <div >
                <ThreadCard
                    key={thread._id}
                    id={String(thread._id)}
                    currentUserId={user?.id || ""}
                    parentId={thread.parentId ? String(thread.parentId) : null}
                    content={thread.text}
                    author={{
                        name: thread.author?.name,
                        image: thread.author?.image,
                        id: thread.author?.id,
                    }}
                    community={thread.community && thread.community.name ? {
                        id: String(thread.community.id ?? ''),
                        name: thread.community.name,
                        image: thread.community.image,
                    } : null}
                    createdAt={thread.createdAt?.toString()}
                    commentCount={thread.children?.length ?? 0} />
            </div>
            <div className='mt-7'>
                <Comment 
                threadId={thread.id}
                currentUserImg={userInfo.image}
                currentUserId={JSON.stringify(userInfo._id)}
                />
            </div>

            <div className='mt-10'>
                {thread.children.map((childItem: ThreadChild)=>
                (
                    <ThreadCard
                    key={childItem._id}
                    id={String(childItem._id)}
                    currentUserId={user?.id || ""}
                    parentId={childItem.parentId ? String(childItem.parentId) : null}
                    content={childItem.text}
                    author={{
                        name: childItem.author?.name ?? 'Unknown user',
                        image: childItem.author?.image ?? '/user.svg',
                        id: childItem.author?.id ?? '',
                    }}
                    community={childItem.community && childItem.community.name ? {
                        id: String(childItem.community.id ?? ''),
                        name: childItem.community.name,
                        image: childItem.community.image ?? '/community.svg',
                    } : null}
                    createdAt={childItem.createdAt?.toString() ?? new Date().toISOString()}
                    commentCount={childItem.children?.length ?? 0} 
                    isComment
                    />
                    
                ))}
            </div>
        </section>
    )
}

export default page
