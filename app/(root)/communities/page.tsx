import React from 'react'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import {fetchUser, fetchUsers } from '@/lib/actions/user.actions'
import Image from 'next/image'
import UserCard from '@/components/cards/UserCard'
import { fetchCommunities } from '@/lib/actions/community.actions'
import CommunityCard from '@/components/cards/CommunityCard'

const page = async () => {

    const user = await currentUser()

    if (!user) return null;

    const userInfo = await fetchUser(user.id);

    if (!userInfo?.onboarded) redirect('/onboarding');

    const result=await fetchCommunities({searchString:'',pageNumber:1,pageSize:25})

  return (
    <section>
        <h1 className='head-text mb-10'>
            Search
        </h1>

        {/* Search Bar */}

        <div className='mt-14 flex flex-col gap-9'>
            {result.communities.length === 0 ?(
                <p className='no-result'>No Communitites</p>
            ):(<>
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
            </>)}
        </div>
    </section>
  )
}

export default page