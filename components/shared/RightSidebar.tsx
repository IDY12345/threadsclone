import Image from 'next/image'
import Link from 'next/link'
import { currentUser } from '@clerk/nextjs/server'

import { fetchCommunities } from '@/lib/actions/community.actions'
import { fetchUsers } from '@/lib/actions/user.actions'

interface SpaceSuggestion {
  id: string
  name: string
  username: string
  image: string
  members: number
}

interface PersonSuggestion {
  id: string
  name: string
  username: string
  image: string
}

async function getSuggestions(userId: string): Promise<{
  spaces: SpaceSuggestion[]
  people: PersonSuggestion[]
}> {
  try {
    const [communityResult, userResult] = await Promise.all([
      fetchCommunities({ pageNumber: 1, pageSize: 4 }),
      fetchUsers({ userId, pageNumber: 1, pageSize: 5 }),
    ])

    const spaces: SpaceSuggestion[] = communityResult.communities.map((community) => ({
      id: String(community.id ?? ''),
      name: community.name ?? 'Space',
      username: community.username ?? '',
      image: community.image || '/community.svg',
      members: community.members?.length ?? 0,
    }))

    const people: PersonSuggestion[] = userResult.users.map((person) => ({
      id: String(person.id ?? ''),
      name: person.name ?? 'Member',
      username: person.username ?? '',
      image: person.image || '/user.svg',
    }))

    return { spaces, people }
  } catch (error) {
    console.error('Error loading sidebar suggestions:', error)
    return { spaces: [], people: [] }
  }
}

const RightSidebar = async () => {
  const user = await currentUser()
  const { spaces, people } = user
    ? await getSuggestions(user.id)
    : { spaces: [], people: [] }

  return (
    <section className='custom-scrollbar rightsidebar'>
      <div className='flex flex-1 flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-heading4-medium text-light-1'>
            Suggested <span className='gradient-text'>Spaces</span>
          </h3>
          <Link
            href='/communities'
            className='text-subtle-medium text-light-3 transition-colors duration-200 hover:text-light-2'
          >
            Explore
          </Link>
        </div>
        <p className='text-subtle-medium text-light-4'>Spaces where your teams collaborate.</p>
        {spaces.length === 0 ? (
          <p className='rounded-xl border border-dark-4/50 bg-dark-3/40 px-4 py-3 text-subtle-medium text-light-4'>
            No spaces yet.
          </p>
        ) : (
          <div className='flex flex-col gap-3'>
            {spaces.map((space) => (
              <Link
                key={space.id}
                href={`/communities/${space.id}`}
                className='glass-panel hover-lift flex items-center justify-between rounded-xl px-4 py-3'
              >
                <div className='flex min-w-0 items-center gap-3'>
                  <div className='relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-dark-4/70 bg-dark-3/80'>
                    <Image src={space.image} alt={space.name} fill sizes='40px' className='object-cover' />
                  </div>
                  <div className='min-w-0'>
                    <p className='truncate text-base-semibold text-light-1'>{space.name}</p>
                    <p className='truncate text-subtle-medium text-light-4'>
                      {space.members} {space.members === 1 ? 'member' : 'members'}
                    </p>
                  </div>
                </div>
                <span className='shrink-0 rounded-full border border-primary-500/40 px-3 py-1 text-subtle-semibold text-light-1'>
                  View
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className='flex flex-1 flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-heading4-medium text-light-1'>
            People you may <span className='gradient-text'>know</span>
          </h3>
          <Link
            href='/search'
            className='text-subtle-medium text-light-3 transition-colors duration-200 hover:text-light-2'
          >
            Find more
          </Link>
        </div>
        <p className='text-subtle-medium text-light-4'>Teammates you might want to follow.</p>
        {people.length === 0 ? (
          <p className='rounded-xl border border-dark-4/50 bg-dark-3/40 px-4 py-3 text-subtle-medium text-light-4'>
            No teammates yet.
          </p>
        ) : (
          <div className='flex flex-col gap-3'>
            {people.map((person) => (
              <Link
                key={person.id}
                href={`/profile/${person.id}`}
                className='glass-panel hover-lift flex items-center justify-between rounded-xl px-4 py-3'
              >
                <div className='flex min-w-0 items-center gap-3'>
                  <div className='relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-dark-4/70 bg-dark-3/80'>
                    <Image src={person.image} alt={person.name} fill sizes='40px' className='object-cover' />
                  </div>
                  <div className='min-w-0'>
                    <p className='truncate text-base-semibold text-light-1'>{person.name}</p>
                    {person.username && (
                      <p className='truncate text-subtle-medium text-light-4'>@{person.username}</p>
                    )}
                  </div>
                </div>
                <span className='shrink-0 rounded-full border border-dark-4/70 px-3 py-1 text-subtle-semibold text-light-1'>
                  View
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default RightSidebar
