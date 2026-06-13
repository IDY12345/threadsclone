import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { fetchUser } from '@/lib/actions/user.actions'
import PostThread from '@/components/forms/PostThread'

export const dynamic = 'force-dynamic'
const page = async() => {

    const user=await currentUser()

    if (!user) return null;

    const userInfo=await fetchUser(user.id);

    if(!userInfo?.onboarded) redirect('/onboarding');

    return (
    <section className='flex flex-col gap-8'>
      <div>
        <h1 className='head-text'>
          New <span className='gradient-text'>Post</span>
        </h1>
        <p className='mt-2 text-base-regular text-light-4'>Share an update with your team. Keep it clear and useful.</p>
      </div>

      <div className='glass-panel rounded-3xl border border-dark-4/60 p-6'>
        <div className='flex flex-col gap-2'>
          <h3 className='text-base-semibold text-light-1'>Tips for a great post</h3>
          <p className='text-subtle-medium text-light-4'>Lead with the point, not the preamble. Add context and a clear next step.</p>
        </div>
        <div className='mt-4 grid gap-3 text-subtle-medium text-light-3 sm:grid-cols-2'>
          <div className='rounded-2xl border border-dark-4/60 bg-dark-3/60 px-4 py-3'>
            Share what you are working on.
          </div>
          <div className='rounded-2xl border border-dark-4/60 bg-dark-3/60 px-4 py-3'>
            Ask a specific question.
          </div>
          <div className='rounded-2xl border border-dark-4/60 bg-dark-3/60 px-4 py-3'>
            Keep it under 280 characters.
          </div>
          <div className='rounded-2xl border border-dark-4/60 bg-dark-3/60 px-4 py-3'>
            Tag the right space or people.
          </div>
        </div>
      </div>

      <PostThread userId={String(userInfo._id)}/>
    </section>
    )
}

export default page