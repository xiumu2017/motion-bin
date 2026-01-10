import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface ShredAnimationProps {
  content: string;
  onComplete: () => void;
}

const ShredAnimation: React.FC<ShredAnimationProps> = ({ content, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Create 10 strips
  const strips = Array.from({ length: 10 }).map((_, i) => i);

  return (
    <div className="relative w-full max-w-2xl mx-auto h-80 flex flex-col items-center overflow-hidden">
      {/* Shredder Header */}
      <div className="w-full h-4 bg-gray-800 rounded-t-lg z-20 mb-[-1px] shadow-md" />
      <div className="w-full h-2 bg-black z-20" />
      
      {/* Paper being shredded */}
      <div className="relative w-full flex-1 flex">
        {strips.map((i) => (
          <motion.div
            key={i}
            initial={{ y: -300 }}
            animate={{ y: 300, opacity: 0 }}
            transition={{ 
              duration: 2.5, 
              ease: "linear",
              delay: i * 0.05 // Stagger slightly for realism
            }}
            className="flex-1 bg-white border-x border-gray-100 overflow-hidden relative"
            style={{ 
              height: '100%',
              // Offset content to make it look like one piece
              // Each strip shows a part of the text
            }}
          >
             <div 
               className="absolute top-0 w-[672px] p-6 text-lg text-gray-800 break-words paper-lines"
               style={{ 
                 left: `${-i * (100 / strips.length)}%`,
                 width: '672px' // max-w-2xl is roughly 672px
               }}
             >
               {content}
             </div>
          </motion.div>
        ))}
      </div>
      
      {/* Shredder Body/Bin top */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-gray-100 to-transparent z-10 pointer-events-none" />
    </div>
  );
};

export default ShredAnimation;