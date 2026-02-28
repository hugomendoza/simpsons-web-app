import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'comic';
}

export function LoadingSpinner({
  message = 'Cargando...',
  size = 'md',
  variant = 'default',
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  if (variant === 'comic') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 rounded-full bg-white border-[2.5px] border-black px-6 py-3 shadow-[3px_3px_0_#1a1a2e]"
      >
        <Loader2 className={`${sizeClasses[size]} animate-spin text-black`} />
        <span className={`font-['Bangers'] ${textSizes[size]} text-black`}>
          {message}
        </span>
      </motion.div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-current`} />
      {message && <span>{message}</span>}
    </div>
  );
}
