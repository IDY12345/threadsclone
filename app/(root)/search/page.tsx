import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import {fetchUser, fetchUsers } from '@/lib/actions/user.actions'
import UserCard from '@/components/cards/UserCard'
import Searchbar from '@/components/shared/Searchbar'

export const dynamic = 'force-dynamic'
const page = async ({ searchParams }: { searchParams: Promise<{ q?: string }> }) => {

    const user = await currentUser()

    if (!user) return null;

    const userInfo = await fetchUser(user.id);

    if (!userInfo?.onboarded) redirect('/onboarding');

    const searchString = (await searchParams)?.q ?? '';
    const result=await fetchUsers({userId:user.id,searchString,pageNumber:1,pageSize:25})

  return (
    <section>
        <div className='flex flex-col gap-6'>
            <div>
                <h1 className='head-text text-left'>Search</h1>
                <p className='mt-2 text-subtle-medium text-light-4'>Find teammates by name, handle, or role.</p>
            </div>
            <Searchbar routeType='search' />
        </div>

        {searchString && (
            <p className='mt-6 text-subtle-medium text-light-3'>
                Results for <span className='text-light-1'>&quot;{searchString}&quot;</span>
            </p>
        )}

        <div className='mt-8 flex flex-col gap-5'>
            {result.users.length === 0 ?(
                <div className='glass-panel rounded-2xl border border-dark-4/60 p-6'>
                    <h3 className='text-base-semibold text-light-1'>No people found</h3>
                    <p className='mt-1 text-subtle-medium text-light-4'>Try a different name or handle.</p>
                </div>
            ):(
                <>
                    {result.users.map((person)=>(
                        <UserCard 
                            key={person.id}
                            id={person.id}
                            name={person.name}
                            username={person.username}
                            imgUrl={person.image}
                            personType='User'
                        />
                    ))}
                </>
            )}
        </div>
    </section>
  )
}

export default page
