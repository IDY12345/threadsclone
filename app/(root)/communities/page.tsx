import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import {fetchUser } from '@/lib/actions/user.actions'
import { fetchCommunities } from '@/lib/actions/community.actions'
import CommunityCard from '@/components/cards/CommunityCard'
import Searchbar from '@/components/shared/Searchbar'

export const dynamic = 'force-dynamic'
const page = async ({ searchParams }: { searchParams: Promise<{ q?: string }> }) => {

    const user = await currentUser()

    if (!user) return null;

    const userInfo = await fetchUser(user.id);

    if (!userInfo?.onboarded) redirect('/onboarding');

    const searchString = (await searchParams)?.q ?? '';
    const result=await fetchCommunities({searchString,pageNumber:1,pageSize:25})

  return (
    <section>
        <div className='flex flex-col gap-6'>
            <div>
                <h1 className='head-text text-left'>Spaces</h1>
                <p className='mt-2 text-subtle-medium text-light-4'>Browse the spaces where your teams collaborate.</p>
            </div>
            <Searchbar routeType='communities' />
        </div>

        {searchString && (
            <p className='mt-6 text-subtle-medium text-light-3'>
                Results for <span className='text-light-1'>&quot;{searchString}&quot;</span>
            </p>
        )}

        <div className='mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
            {result.communities.length === 0 ?(
                <div className='glass-panel rounded-2xl border border-dark-4/60 p-6 md:col-span-2 xl:col-span-3'>
                    <h3 className='text-base-semibold text-light-1'>No spaces found</h3>
                    <p className='mt-1 text-subtle-medium text-light-4'>Try a different keyword or browse all.</p>
                </div>
            ):(
                <>
                    {result.communities.map((person)=>(
                        <CommunityCard 
                            key={person.id}
                            id={person.id}
                            name={person.name}
                            username={person.username}
                            imgUrl={person.image}
                            bio={person.bio}
                            members={person.members}
                        />
                    ))}
                </>
            )}
        </div>
    </section>
  )
}

export default page
