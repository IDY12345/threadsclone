function ThreadCardSkeleton() {
  return (
    <article className='glass-panel flex w-full flex-col rounded-2xl border border-dark-4/40 p-7'>
      <div className='flex items-start justify-between'>
        <div className='flex w-full flex-1 flex-row gap-4'>
          <div className='flex flex-col items-center'>
            <div className='relative h-11 w-11 rounded-full skeleton' />
            <div className='thread-card_bar' />
          </div>
          <div className='flex w-full flex-col gap-3'>
            <div className='h-4 w-24 rounded skeleton' />
            <div className='h-3 w-full rounded skeleton' />
            <div className='h-3 w-3/4 rounded skeleton' />
            <div className='mt-3 flex gap-3.5'>
              <div className='h-5 w-5 rounded skeleton' />
              <div className='h-5 w-5 rounded skeleton' />
              <div className='h-5 w-5 rounded skeleton' />
              <div className='h-5 w-5 rounded skeleton' />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function UserCardSkeleton() {
  return (
    <article className='glass-panel flex flex-col justify-between gap-4 rounded-xl border border-dark-4/40 p-4 xs:flex-row xs:items-center'>
      <div className='flex flex-1 items-start justify-start gap-3 xs:items-center'>
        <div className='h-12 w-12 rounded-full skeleton' />
        <div className='flex-1'>
          <div className='mb-2 h-4 w-24 rounded skeleton' />
          <div className='h-3 w-16 rounded skeleton' />
        </div>
      </div>
      <div className='h-8 w-16 rounded-lg skeleton' />
    </article>
  );
}

function CommunityCardSkeleton() {
  return (
    <article className='glass-panel w-full rounded-xl border border-dark-4/40 px-4 py-5 sm:w-96'>
      <div className='flex flex-wrap items-center gap-3'>
        <div className='h-12 w-12 rounded-full skeleton' />
        <div>
          <div className='mb-2 h-4 w-24 rounded skeleton' />
          <div className='h-3 w-16 rounded skeleton' />
        </div>
      </div>
      <div className='mt-4 h-3 w-full rounded skeleton' />
      <div className='mt-5 flex items-center justify-between gap-3'>
        <div className='h-8 w-16 rounded-lg skeleton' />
        <div className='flex'>
          <div className='h-7 w-7 rounded-full skeleton' />
          <div className='-ml-2 h-7 w-7 rounded-full skeleton' />
        </div>
      </div>
    </article>
  );
}

export { ThreadCardSkeleton, UserCardSkeleton, CommunityCardSkeleton };
