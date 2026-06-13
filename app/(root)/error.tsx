"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex min-h-[60vh] items-center justify-center px-4'>
      <div className='glass-panel relative w-full max-w-xl overflow-hidden rounded-3xl border border-dark-4/60 p-8'>
        <div className='pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-primary-500/20 blur-3xl' />
        <div className='pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-accent-cool/10 blur-3xl' />
        <div className='relative flex flex-col gap-6'>
          <div className='flex items-center gap-4'>
            <div className='flex h-14 w-14 items-center justify-center rounded-2xl border border-primary-500/30 bg-dark-3/80'>
              <svg
                viewBox='0 0 24 24'
                className='h-6 w-6 text-primary-500'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.6'
                strokeLinecap='round'
                strokeLinejoin='round'
                aria-hidden='true'
              >
                <path d='M12 9v4' />
                <path d='M12 17h.01' />
                <path d='M10.3 3.7 2.4 17a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3l-7.9-13.3a2 2 0 0 0-3.4 0Z' />
              </svg>
            </div>
            <div>
              <h2 className='text-heading3-bold text-light-1'>Something went wrong</h2>
              <p className='text-base-regular text-light-3'>An unexpected error occurred. Please try again.</p>
            </div>
          </div>
          <div className='flex flex-wrap items-center gap-3'>
            <button
              onClick={() => reset()}
              className='rounded-full bg-primary-500 px-6 py-2 text-base-semibold text-light-1 transition-all duration-200 hover:bg-primary-500/80 hover:shadow-lg hover:shadow-primary-500/25 active:scale-95'
            >
              Try Again
            </button>
            <span className='text-subtle-medium text-light-4'>If this keeps happening, refresh the page.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
