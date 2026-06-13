import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions"
import { currentUser } from "@clerk/nextjs/server";

export const dynamic = 'force-dynamic'
 
export default async function Home() {
  const result=await fetchPosts(1,30);
  const user=await currentUser();
  return (  
    <>
      <h1 className="head-text text-left">Home</h1>
      <p className="mt-2 text-subtle-medium text-light-4">The latest from your team and the spaces you follow.</p>

      <section className="mt-9  flex flex-col gap-10">
        {result.posts.length === 0 ?(
          <div className="glass-panel rounded-2xl border border-dark-4/60 p-6">
            <h3 className="text-base-semibold text-light-1">No posts yet</h3>
            <p className="mt-1 text-subtle-medium text-light-4">Be the first to share an update with your team.</p>
          </div>
        ):(
          <>
            {result.posts.map((post)=>(
              <ThreadCard 
              key={post._id} 
              id={String(post._id)} 
              currentUserId={user?.id || ""} 
              parentId={post.parentId} 
              content={post.text} 
              author={{
                name: post.author?.name,
                image: post.author?.image,
                id: post.author?.id,
              }} 
              community={post.community ? {
                id: post.community?.id,
                name: post.community?.name,
                image: post.community?.image,
              } : null} 
              createdAt={post.createdAt?.toString()} 
              commentCount={post.children?.length ?? 0} />
            ))}
          </>
        )}
      </section>
    </>
  )
}