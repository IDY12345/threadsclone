import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import {fetchUser, getActivity } from '@/lib/actions/user.actions'
import Image from 'next/image'
import Link from 'next/link'
import { timeAgo } from '@/lib/utils'

export const dynamic = 'force-dynamic'

const page = async () => {

    const user = await currentUser()

    if (!user) return null;

    const userInfo = await fetchUser(user.id);

    if (!userInfo?.onboarded) redirect('/onboarding');

    //Get Activity

    const activity= await getActivity(userInfo._id)

  return (
    <section>
        <div>
          <h1 className='head-text text-left'>Activity</h1>
          <p className='mt-2 text-subtle-medium text-light-4'>Replies and mentions from your team you might have missed.</p>
        </div>
        <section className='mt-10 flex flex-col gap-5'>
          {activity.length>0 ? (
            <>
              {activity.map((activity)=>(
                <Link key={activity._id} href={`/thread/${activity.parentId}`} className='group'>
                    <article className='activity-card'>
                      <div className='relative'>
                        <Image 
                          src={activity.author.image}
                          alt='Profile Picture'
                          width={32}
                          height={32}
                          className='rounded-full border border-dark-4/60 object-cover'
                        />
                        <span className='absolute -right-1 -top-1 h-2 w-2 rounded-full bg-primary-500/80' />
                      </div>
                      <div className='flex flex-1 flex-col gap-1'>
                        <p className='!text-small-regular text-light-1'>
                          <span className='mr-1 text-primary-500'>
                            {activity.author.name}
                          </span>
                          replied to your post
                        </p>
                        <div className='flex items-center gap-2 text-subtle-medium text-light-4'>
                          <Image src='/reply.svg' alt='reply' width={14} height={14} />
                          <span>{timeAgo(activity.createdAt)}</span>
                        </div>
                      </div>
                      <span className='h-2 w-2 rounded-full bg-primary-500/60' />
                    </article>
                </Link>
              ))}
            </>
          ):(
            <div className='glass-panel rounded-2xl border border-dark-4/60 p-6'>
              <h3 className='text-base-semibold text-light-1'>No activity yet</h3>
              <p className='mt-1 text-subtle-medium text-light-4'>Share a post or join a space to start the conversation.</p>
            </div>
          )}
        </section>
    </section>
  )
}

export default page