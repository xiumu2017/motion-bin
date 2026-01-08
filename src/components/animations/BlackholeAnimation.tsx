import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface BlackholeAnimationProps {
  content: string;
  onComplete: () => void;
}

const BlackholeAnimation: React.FC<BlackholeAnimationProps> = ({ content, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="relative w-full max-w-2xl mx-auto h-80 flex items-center justify-center overflow-hidden">
      {/* Black Hole */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 2], opacity: [0, 1, 1], rotate: 360 }}
        transition={{ duration: 3, ease: "easeInOut" }}
        className="absolute z-10 w-32 h-32 rounded-full bg-black shadow-[0_0_50px_20px_rgba(0,0,0,0.8)] flex items-center justify-center"
      >
        <div className="w-full h-full rounded-full border-4 border-purple-500/30 animate-spin" />
      </motion.div>

      {/* Content being sucked in */}
      <motion.div
        initial={{ scale: 1, rotate: 0, opacity: 1 }}
        animate={{ 
          scale: 0, 
          rotate: 720, 
          opacity: 0,
          x: [0, 10, -10, 0], // Shake effect
        }}
        transition={{ duration: 2.5, ease: "easeIn" }}
        className="relative z-0 p-6 bg-white rounded-2xl shadow-sm border border-gray-200 max-w-md"
      >
        <p className="text-lg text-gray-800 break-words">{content}</p>
      </motion.div>

      {/* Stars/Particles background effect */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: (Math.random() - 0.5) * 400, y: (Math.random() - 0.5) * 400, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1, scale: 0 }}
          transition={{ duration: 1 + Math.random(), delay: Math.random(), repeat: Infinity }}
          className="absolute z-20 w-1 h-1 bg-white rounded-full"
        />
      ))}
    </div>
  );
};

export default BlackholeAnimation;
