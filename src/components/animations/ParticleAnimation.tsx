import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface ParticleAnimationProps {
  content: string;
  onComplete: () => void;
}

const ParticleAnimation: React.FC<ParticleAnimationProps> = ({ content, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Generate grid of particles
  const rows = 10;
  const cols = 20;
  const particles = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      particles.push({
        id: `${i}-${j}`,
        x: j,
        y: i,
        // Random destination
        destX: (Math.random() - 0.5) * 500,
        destY: (Math.random() - 0.5) * 500,
        rotate: Math.random() * 720,
        scale: Math.random() * 0.5,
        delay: Math.random() * 0.5
      });
    }
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto h-80 flex items-center justify-center">
      <div className="relative w-full h-full">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ 
              opacity: 1, 
              left: `${(p.x / cols) * 100}%`, 
              top: `${(p.y / rows) * 100}%`,
              scale: 1
            }}
            animate={{ 
              opacity: 0,
              x: p.destX,
              y: p.destY,
              rotate: p.rotate,
              scale: p.scale
            }}
            transition={{ 
              duration: 1.5, 
              ease: "easeOut",
              delay: p.delay
            }}
            className="absolute bg-white border border-gray-100 shadow-sm overflow-hidden"
            style={{ 
              width: `${100 / cols}%`, 
              height: `${100 / rows}%`,
            }}
          >
             {/* 
               Trying to map content to particles is hard without canvas.
               We'll just use the paper color to simulate the paper breaking apart.
             */}
             <div className="w-full h-full bg-blue-50/50" />
          </motion.div>
        ))}
        
        {/* Original content fading out quickly to reveal particles */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 p-8 bg-white rounded-2xl shadow-md paper-lines"
        >
          <p className="text-lg text-gray-800 break-words">{content}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default ParticleAnimation;