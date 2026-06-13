import Image from "next/image";
import Link from "next/link";

import { Button } from "../ui/button";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  members: {
    image: string;
  }[];
}

function CommunityCard({ id, name, username, imgUrl, bio, members }: Props) {
  return (
    <article className='community-card glass-panel hover-lift border border-dark-4/50'>
      <div className='flex flex-wrap items-center gap-3'>
        <Link href={`/communities/${id}`} className='relative h-12 w-12'>
          <span className='absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/60 to-accent-cool/40' />
          <span className='absolute inset-[2px] rounded-full bg-dark-2' />
          <Image
            src={imgUrl}
            alt='community_logo'
            fill
            sizes='48px'
            className='relative z-10 rounded-full object-cover'
          />
        </Link>

        <div>
          <Link href={`/communities/${id}`}>
            <h4 className='text-base-semibold text-light-1'>{name}</h4>
          </Link>
          <p className='text-small-medium text-gray-1'>@{username}</p>
        </div>
      </div>

      <p className='mt-4 text-subtle-medium text-gray-1'>{bio}</p>

      <div className='mt-5 flex flex-wrap items-center justify-between gap-3'>
        <Link href={`/communities/${id}`}>
          <Button size='sm' className='community-card_btn rounded-full px-5'>
            View
          </Button>
        </Link>

        {members.length > 0 && (
          <div className='flex items-center'>
            {members.map((member, index) => (
              <Image
                key={index}
                src={member.image}
                alt={`user_${index}`}
                width={28}
                height={28}
                className={`${
                  index !== 0 && "-ml-2"
                } rounded-full border border-dark-3 object-cover`}
              />
            ))}
            {members.length > 3 && (
              <p className='ml-1 text-subtle-medium text-gray-1'>
                {members.length}+ members
              </p>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default CommunityCard;