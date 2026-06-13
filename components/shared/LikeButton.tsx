"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  threadId: string;
  userId: string;
}

function LikeButton({ threadId, userId }: Props) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  const handleLike = () => {
    setLiked(!liked);
    setCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <button
      onClick={handleLike}
      type='button'
      className='flex items-center gap-1 group'
      aria-label={liked ? "Unlike" : "Like"}
      aria-pressed={liked}
      title={liked ? "Unlike" : "Like"}
    >
      <Image
        src={liked ? "/heart-filled.svg" : "/heart-gray.svg"}
        alt='like'
        width={24}
        height={24}
        className={`cursor-pointer object-contain transition-all duration-200 ${
          liked
            ? "scale-110 drop-shadow-[0_0_6px_rgba(239,68,68,0.5)] animate-heart-bounce"
            : "hover:scale-110 group-hover:brightness-125"
        }`}
      />
      {count > 0 && (
        <span className='text-subtle-medium text-gray-1'>{count}</span>
      )}
    </button>
  );
}

export default LikeButton;
