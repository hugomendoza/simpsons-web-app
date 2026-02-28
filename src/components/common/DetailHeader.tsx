import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface DetailHeaderProps {
  title: string;
  emoji?: string;
  showBackButton?: boolean;
  backUrl?: string;
  onBack?: () => void;
}

export function DetailHeader({
  title,
  emoji,
  showBackButton = true,
  backUrl,
  onBack,
}: DetailHeaderProps) {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backUrl) {
      window.location.href = backUrl;
    } else {
      window.history.back();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      {showBackButton && (
        <motion.button
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBack}
          className="mb-6 flex items-center gap-2 rounded-full bg-white border-[3px] border-black px-6 py-3 font-['Bangers'] text-lg text-black shadow-[4px_4px_0_#1a1a2e]"
        >
          <ArrowLeft className="h-5 w-5" />
          Volver
        </motion.button>
      )}

      <div className="flex items-center gap-4">
        {emoji && (
          <motion.span
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="text-6xl md:text-7xl"
          >
            {emoji}
          </motion.span>
        )}
        <h1 className="font-['Fredoka_One'] text-4xl text-black md:text-5xl lg:text-6xl">
          {title}
        </h1>
      </div>
    </motion.div>
  );
}

interface PageHeaderProps {
  emoji?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  emoji,
  title,
  subtitle,
  children,
}: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {emoji && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="mb-4 text-center text-7xl"
        >
          {emoji}
        </motion.div>
      )}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-3 text-center font-['Fredoka_One'] text-5xl text-black md:text-6xl"
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center font-['Nunito'] text-base font-medium text-black/70"
        >
          {subtitle}
        </motion.p>
      )}
      {children}
    </motion.div>
  );
}
