import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface CrumpleAnimationProps {
  content: string;
  onComplete: () => void;
}

const CrumpleAnimation: React.FC<CrumpleAnimationProps> = ({ content, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="relative w-full max-w-2xl mx-auto h-64 flex items-center justify-center">
      <motion.div
        initial={{ scale: 1, rotate: 0, borderRadius: "1rem" }}
        animate={{ 
          scale: [1, 0.8, 0.4, 0.2], 
          rotate: [0, -10, 10, -180, 360],
          borderRadius: ["1rem", "2rem", "50%", "50%"],
          y: [0, 0, 0, 300], // Drop down at the end
          backgroundColor: ["#ffffff", "#e5e7eb", "#9ca3af"]
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="w-full h-full p-6 bg-white shadow-sm border border-gray-200 overflow-hidden"
      >
        <motion.p 
          animate={{ opacity: [1, 0.5, 0] }}
          transition={{ duration: 1 }}
          className="text-lg text-gray-800 break-words"
        >
          {content}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default CrumpleAnimation;
