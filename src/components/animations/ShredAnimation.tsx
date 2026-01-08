import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface ShredAnimationProps {
  content: string;
  onComplete: () => void;
}

const ShredAnimation: React.FC<ShredAnimationProps> = ({ content, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Create 10 strips for shredding effect
  const strips = Array.from({ length: 10 }).map((_, i) => i);

  return (
    <div className="relative w-full max-w-2xl mx-auto h-64 flex flex-col items-center justify-center overflow-hidden">
      {/* Shredder Machine Top */}
      <div className="absolute top-0 w-full h-8 bg-gray-800 rounded-b-lg z-20 shadow-lg" />

      {/* Paper Container */}
      <div className="relative w-full h-full flex justify-center">
        {strips.map((i) => (
          <motion.div
            key={i}
            initial={{ y: -200 }}
            animate={{ y: 200 }}
            transition={{ 
              duration: 2,
              ease: "linear",
              delay: i * 0.05 // Slight stagger for realistic feel
            }}
            className="w-[10%] bg-white border-l border-r border-gray-100 overflow-hidden relative"
          >
            <div className="absolute top-0 left-0 w-[1000%] p-6 text-lg text-gray-800 break-words" style={{ left: `-${i * 100}%` }}>
              {content}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Shredder Machine Bottom */}
       <div className="absolute bottom-0 w-full h-16 bg-gray-900 rounded-t-lg z-20 shadow-2xl flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-2" />
          <span className="text-gray-400 text-xs">SHREDDING...</span>
       </div>
    </div>
  );
};

export default ShredAnimation;
