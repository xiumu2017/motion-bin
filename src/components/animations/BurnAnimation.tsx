import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface BurnAnimationProps {
  content: string;
  onComplete: () => void;
}

const BurnAnimation: React.FC<BurnAnimationProps> = ({ content, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Generate some random particles
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100 - 50,
    y: Math.random() * 50,
    delay: Math.random() * 0.5,
    duration: 1 + Math.random(),
  }));

  return (
    <div className="relative w-full max-w-2xl mx-auto h-64 flex items-center justify-center">
      {/* Text Container being burnt */}
      <motion.div
        initial={{ opacity: 1, filter: 'brightness(1) blur(0px)' }}
        animate={{ 
          opacity: 0, 
          filter: ['brightness(1) blur(0px)', 'brightness(0) blur(2px)', 'brightness(0) blur(10px)'],
          y: -20
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="w-full h-full p-6 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative z-10"
      >
        <p className="text-lg text-gray-800 break-words">{content}</p>
        
        {/* Burning overlay */}
        <motion.div 
          initial={{ height: "0%" }}
          animate={{ height: "100%" }}
          transition={{ duration: 2 }}
          className="absolute bottom-0 left-0 w-full bg-orange-500/20 mix-blend-color-burn"
        />
      </motion.div>

      {/* Fire Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 100, x: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0], 
            y: -150, 
            x: p.x, 
            scale: [0.5, 1.5, 0] 
          }}
          transition={{ 
            duration: p.duration, 
            delay: p.delay,
            repeat: Infinity,
            repeatDelay: 0.2
          }}
          className="absolute bottom-0 z-20 w-4 h-4 rounded-full bg-gradient-to-t from-red-600 to-yellow-400 blur-sm"
          style={{ left: `${50 + (Math.random() * 40 - 20)}%` }}
        />
      ))}
    </div>
  );
};

export default BurnAnimation;
