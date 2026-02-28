import { motion } from 'framer-motion';

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  emoji?: string;
  onRetry?: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
}

export function ErrorDisplay({
  title = '¡D\'oh! Algo salió mal',
  message = 'Ha ocurrido un error inesperado',
  emoji = '🍩',
  onRetry,
  showBackButton = false,
  onBack,
}: ErrorDisplayProps) {
  const defaultMessage = typeof message === 'string' ? message : 'Ha ocurrido un error inesperado';

  return (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      className="rounded-2xl border-[3px] border-black bg-white p-8 text-center shadow-[5px_5px_0_#1a1a2e]"
    >
      <p className="font-['Bangers'] text-xl text-[#ff6b6b] mb-3">
        {emoji} {title}
      </p>
      <p className="font-['Nunito'] text-sm text-black/70 mb-4">
        {defaultMessage}
      </p>
      <div className="flex gap-3 justify-center">
        {showBackButton && (
          <button
            onClick={onBack}
            className="px-4 py-2 rounded-lg bg-gray-200 border-2 border-black font-['Bangers'] text-sm hover:bg-gray-300 transition-colors"
          >
            ← Volver
          </button>
        )}
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 rounded-lg bg-[#f58ea8] border-2 border-black font-['Bangers'] text-sm shadow-[2px_2px_0_#1a1a2e] hover:shadow-[3px_3px_0_#1a1a2e] hover:translate-y-[-1px] transition-all"
          >
            Reintentar
          </button>
        )}
      </div>
    </motion.div>
  );
}
