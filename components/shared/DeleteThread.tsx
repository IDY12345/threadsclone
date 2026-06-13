"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { deleteThread } from "@/lib/actions/thread.actions";
import { useState } from "react";

interface Props {
  threadId: string;
  currentUserId: string;
  authorId: string;
  parentId: string | null;
  isComment?: boolean;
}

function DeleteThread({
  threadId,
  currentUserId,
  authorId,
  parentId,
  isComment,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (currentUserId !== authorId) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteThread(threadId, pathname);
    } finally {
      setIsDeleting(false);
      setIsOpen(false);
    }

    if (!parentId || !isComment) {
      router.push("/");
    } else {
      router.refresh();
    }
  };

  return (
    <>
      <button
        type='button'
        aria-label='Delete thread'
        title='Delete'
        className='cursor-pointer rounded-full border border-transparent p-2 opacity-60 transition-all duration-200 hover:border-dark-4/70 hover:bg-dark-4/40 hover:opacity-100'
        onClick={() => setIsOpen(true)}
      >
        <Image
          src='/delete.svg'
          alt='delete'
          width={18}
          height={18}
          className='object-contain'
        />
      </button>
      {isOpen && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6'
          onClick={() => setIsOpen(false)}
        >
          <div
            role='dialog'
            aria-modal='true'
            aria-label='Delete thread confirmation'
            className='glass-panel w-full max-w-md rounded-2xl border border-dark-4/70 p-6'
            onClick={(event) => event.stopPropagation()}
          >
            <div className='flex flex-col gap-3'>
              <h3 className='text-heading4-medium text-light-1'>Delete this thread?</h3>
              <p className='text-base-regular text-light-3'>This will permanently remove the thread and its replies.</p>
            </div>
            <div className='mt-6 flex items-center justify-end gap-3'>
              <button
                type='button'
                className='rounded-full border border-dark-4/70 bg-dark-3/60 px-4 py-2 text-small-semibold text-light-2 transition-all duration-200 hover:border-primary-500/40 hover:bg-dark-3/80'
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                type='button'
                className='rounded-full bg-logout-btn/90 px-4 py-2 text-small-semibold text-light-1 transition-all duration-200 hover:bg-logout-btn hover:shadow-[0_8px_20px_rgba(255,90,90,0.25)] disabled:opacity-60'
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteThread;
