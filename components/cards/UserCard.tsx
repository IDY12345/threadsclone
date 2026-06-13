'use client'
import Image from 'next/image'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

interface Props{
    id:string,
    name:string,
    username:string,
    imgUrl:string,
    personType:string
}

const UserCard = ({ id,name,username,imgUrl,personType }:Props) => {

    const router=useRouter()

  return (
    <article className='user-card glass-panel hover-lift group rounded-2xl border border-dark-4/50 px-4 py-4'>
        <div className='user-card_avatar'>
            <div className='relative h-12 w-12'>
                <span className='absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/70 to-accent-cool/40' />
                <span className='absolute inset-[2px] rounded-full bg-dark-2' />
                <Image 
                    src={imgUrl}
                    alt='Profile Image'
                    fill
                    sizes='48px'
                    className='relative z-10 rounded-full object-cover'
                />
            </div>
            <div className='flex-1 text-ellipsis'>
                <h4 className='text-base-semibold text-light-1'>{name}</h4>
                <p className='text-small-medium text-gray-1'>@{username}</p>
            </div>
        </div>
        <Button
            className='user-card_btn rounded-full px-5 py-2 text-subtle-medium'
            onClick={()=>router.push(`/profile/${id}`)}
        >
            View
        </Button>
    </article>
  )
}

export default UserCard