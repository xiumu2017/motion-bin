import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { BurnAnimation, CrumpleAnimation, DeleteAnimation, ShredAnimation, ParticleAnimation } from '../components/animations';
import { generateFeedback } from '../services/aiService';
import { RefreshCcw, Home as HomeIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const Feedback: React.FC = () => {
  const navigate = useNavigate();
  const { currentEmotion, destructionMethod, reset, addToHistory } = useAppStore();
  const [animationComplete, setAnimationComplete] = useState(false);
  const [aiFeedback, setAiFeedback] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const feedbackRequested = useRef(false);

  useEffect(() => {
    if (!currentEmotion || !destructionMethod) {
      navigate('/');
    }
  }, [currentEmotion, destructionMethod, navigate]);

  const handleAnimationComplete = () => {
    setAnimationComplete(true);
    if (!feedbackRequested.current) {
      feedbackRequested.current = true;
      setIsGenerating(true);
      
      // Save to history
      addToHistory({
        id: Date.now().toString(),
        content: currentEmotion,
        method: destructionMethod!,
        timestamp: Date.now(),
        quote: '' // Will be populated if we stored the feedback, but for now we stream it
      });

      generateFeedback(currentEmotion, (chunk) => {
        setAiFeedback(prev => prev + chunk);
      }).finally(() => {
        setIsGenerating(false);
      });
    }
  };

  const handleRestart = () => {
    reset();
    navigate('/');
  };

  if (!currentEmotion || !destructionMethod) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-4xl mx-auto">
      {!animationComplete ? (
        <div className="w-full">
          {destructionMethod === 'burn' && (
            <BurnAnimation content={currentEmotion} onComplete={handleAnimationComplete} />
          )}
          {destructionMethod === 'crumple' && (
            <CrumpleAnimation content={currentEmotion} onComplete={handleAnimationComplete} />
          )}
          {destructionMethod === 'delete' && (
            <DeleteAnimation content={currentEmotion} onComplete={handleAnimationComplete} />
          )}
          {destructionMethod === 'shred' && (
            <ShredAnimation content={currentEmotion} onComplete={handleAnimationComplete} />
          )}
          {destructionMethod === 'particle' && (
            <ParticleAnimation content={currentEmotion} onComplete={handleAnimationComplete} />
          )}
          <p className="text-center text-gray-500 mt-8 animate-pulse text-lg font-medium">
            正在销毁你的坏情绪...
          </p>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-2xl bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/50"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary mb-3">情绪已清空</h2>
            <p className="text-gray-500 text-lg">所有的烦恼都已随风而去</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl mb-10 relative overflow-hidden shadow-inner">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary" />
            <h3 className="text-sm font-bold text-secondary uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              来自AI的温暖寄语
            </h3>
            <p className="text-lg text-gray-800 leading-relaxed min-h-[100px] whitespace-pre-wrap font-medium">
              {aiFeedback}
              {isGenerating && <span className="inline-block w-2 h-5 ml-1 bg-secondary animate-pulse"/>}
            </p>
          </div>

          <div className="flex justify-center gap-6">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-8 py-4 bg-gray-100 text-gray-700 rounded-full font-bold hover:bg-gray-200 transition-all hover:scale-105 active:scale-95"
            >
              <RefreshCcw size={20} />
              <span>再次释放</span>
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-blue-800 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 hover:scale-105 active:scale-95"
            >
              <HomeIcon size={20} />
              <span>返回首页</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Feedback;
