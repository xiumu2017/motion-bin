import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

interface DeleteAnimationProps {
  content: string;
  onComplete: () => void;
}

const DeleteAnimation: React.FC<DeleteAnimationProps> = ({ content, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="relative w-full max-w-2xl mx-auto h-64 flex items-center justify-center">
      <motion.div
        initial={{ scale: 1, opacity: 1 }}
        animate={{ 
          scale: [1, 1.05, 0], 
          opacity: [1, 1, 0] 
        }}
        transition={{ duration: 0.8, ease: "backIn" }}
        className="w-full h-full p-6 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden z-10"
      >
        <p className="text-lg text-gray-800 break-words">{content}</p>
      </motion.div>

      {/* Trash Icon Background appearing */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1.5, opacity: 0.5 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute z-0 text-gray-300"
      >
        <Trash2 size={120} />
      </motion.div>
    </div>
  );
};

export default DeleteAnimation;
