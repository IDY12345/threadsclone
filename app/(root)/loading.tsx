import { ThreadCardSkeleton } from "@/components/shared/Skeleton";

export default function Loading() {
  return (
    <section className='flex flex-col gap-6'>
      <div>
        <h1 className='head-text text-left'>Home</h1>
        <p className='mt-2 text-subtle-medium text-light-4'>Warming up your feed...</p>
      </div>
      <div className='mt-4 flex flex-col gap-10'>
        {[...Array(5)].map((_, i) => (
          <ThreadCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
