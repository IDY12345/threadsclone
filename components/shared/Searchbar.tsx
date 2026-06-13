"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  routeType: string;
}

function Searchbar({ routeType }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(() => searchParams.get("q") ?? "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const targetRoute = pathname?.startsWith(`/${routeType}`)
        ? pathname
        : `/${routeType}`;
      const query = search ? `?q=${encodeURIComponent(search)}` : "";
      router.replace(`${targetRoute}${query}`);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, routeType, router, pathname]);

  const placeholder = routeType !== "search" ? "Search communities" : "Search creators";

  return (
    <div className='searchbar group relative'>
      <Image
        src='/search-gray.svg'
        alt='search'
        width={24}
        height={24}
        className='object-contain transition-transform duration-200 group-focus-within:scale-110'
      />
      <input
        id='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        autoComplete='off'
        spellCheck={false}
        className='searchbar_input pr-10'
      />
      {search.length > 0 && (
        <button
          type='button'
          aria-label='Clear search'
          className='absolute right-3 flex h-7 w-7 items-center justify-center rounded-full border border-dark-4/70 bg-dark-3/70 text-light-3 transition-all duration-200 hover:border-primary-500/40 hover:text-light-1'
          onClick={() => setSearch("")}
        >
          <svg
            viewBox='0 0 24 24'
            className='h-3.5 w-3.5'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.8'
            strokeLinecap='round'
            strokeLinejoin='round'
            aria-hidden='true'
          >
            <path d='M6 6l12 12' />
            <path d='M18 6l-12 12' />
          </svg>
        </button>
      )}
    </div>
  );
}

export default Searchbar;
