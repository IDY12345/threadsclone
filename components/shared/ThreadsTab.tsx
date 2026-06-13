import { fetchUserPosts } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import React from 'react'
import ThreadCard from '../cards/ThreadCard'
import { fetchCommunityPosts } from '@/lib/actions/community.actions'
interface Props{
    currentUserId:string,
    accountId:string,
    accountType:string
}

interface ThreadAuthor {
  id?: string;
  name?: string;
  image?: string;
}

interface ThreadCommunity {
  id?: string;
  name?: string;
  image?: string;
}

interface ThreadItem {
  _id: string;
  parentId?: string;
  text: string;
  author?: ThreadAuthor;
  community?: ThreadCommunity | null;
  createdAt?: Date | string;
  children?: unknown[];
}

interface ThreadsResult {
  id?: string;
  name?: string;
  image?: string;
  threads: ThreadItem[];
}

const ThreadsTab =async ({currentUserId,accountId,accountType}:Props) => {

    let result: ThreadsResult | null;

    if(accountType === "Community"){
      result=await fetchCommunityPosts(accountId)
    }
    else{
      result=await fetchUserPosts(accountId)
    }

    if(!result) redirect('/')

    const threadsResult = result;

  return (
    <section className='mt-9 flex flex-col gap-10'>
        {threadsResult.threads.map((thread)=>(
          <ThreadCard 
          key={thread._id}
          id={String(thread._id)}
          currentUserId={currentUserId}
          parentId={thread.parentId ? String(thread.parentId) : null}
          content={thread.text}
          author={accountType==='User' ? {
            name: threadsResult.name ?? 'Unknown user',
            image: threadsResult.image ?? '/user.svg',
            id: threadsResult.id ?? '',
          } : {
            name: thread.author?.name ?? 'Unknown user',
            image: thread.author?.image ?? '/user.svg',
            id: thread.author?.id ?? '',
          }}
          community={thread.community && thread.community.name ? {
            id: String(thread.community.id ?? ''),
            name: thread.community.name,
            image: thread.community.image ?? '/community.svg',
          } : null}
          createdAt={thread.createdAt?.toString() ?? new Date().toISOString()}
          commentCount={thread.children?.length ?? 0}
          />
        ))}
    </section>
  )
}

export default ThreadsTab
