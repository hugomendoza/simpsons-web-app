import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface InfiniteScrollTriggerProps {
  hasMore: boolean | undefined;
  isLoading: boolean;
  onLoadMore: () => void;
  loadingMessage?: string;
  endMessage?: string;
  endEmoji?: string;
}

export function InfiniteScrollTrigger({
  hasMore,
  isLoading,
  onLoadMore,
  loadingMessage = 'Cargando más...',
  endMessage = '¡Has visto todo el contenido!',
  endEmoji = '🎉',
}: InfiniteScrollTriggerProps) {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      { threshold: 0.1 },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) observer.observe(currentTarget);

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [hasMore, isLoading, onLoadMore]);

  return (
    <div ref={observerTarget} className="mt-12 flex justify-center">
      {isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 rounded-full bg-white border-[2.5px] border-black px-6 py-3 shadow-[3px_3px_0_#1a1a2e]"
        >
          <Loader2 className="h-5 w-5 animate-spin text-black" />
          <span className="font-['Bangers'] text-base text-black">
            {loadingMessage}
          </span>
        </motion.div>
      )}
      {!hasMore && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-full bg-[#88d498] border-[2.5px] border-black px-6 py-3 font-['Bangers'] text-base text-black shadow-[3px_3px_0_#1a1a2e]"
        >
          {endEmoji} {endMessage}
        </motion.div>
      )}
    </div>
  );
}
