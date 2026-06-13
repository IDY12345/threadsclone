import AccountProfile from '@/components/forms/AccountProfile'
import { fetchUser } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

const page = async () => {
  const user = await currentUser()

  if (!user) return null

  const userInfo = await fetchUser(user.id)

  if (!userInfo?.onboarded) redirect('/onboarding')

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo?.username,
    name: userInfo?.name,
    bio: userInfo?.bio,
    image: userInfo?.image,
  }

  return (
    <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
      <div className='mb-6'>
        <h1 className='head-text'>Edit profile</h1>
        <p className='mt-2 text-base-regular text-light-2'>Update your profile details and save changes.</p>
      </div>
      <section className='glass-panel rounded-3xl border border-dark-4/60 p-8'>
        <AccountProfile user={userData} btnTitle='Save changes' />
      </section>
    </main>
  )
}

export default page
