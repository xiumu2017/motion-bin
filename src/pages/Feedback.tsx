import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { BurnAnimation, CrumpleAnimation, DeleteAnimation } from '../components/animations';
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
          <p className="text-center text-gray-500 mt-8 animate-pulse">
            正在销毁你的坏情绪...
          </p>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-2xl bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-primary mb-2">情绪已清空</h2>
            <p className="text-gray-500">所有的烦恼都已随风而去</p>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl mb-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-secondary" />
            <h3 className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">
              来自AI的温暖寄语
            </h3>
            <p className="text-lg text-gray-800 leading-relaxed min-h-[100px] whitespace-pre-wrap">
              {aiFeedback}
              {isGenerating && <span className="inline-block w-2 h-4 ml-1 bg-secondary animate-pulse"/>}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors"
            >
              <RefreshCcw size={20} />
              <span>再次释放</span>
            </button>
            <button
              onClick={() => navigate('/')} // Just go home, reset handled by store or useEffect if needed? Actually handleRestart resets.
              // If we just go home without reset, the state persists. 
              // We should probably allow going home to see history later (if implemented), but for now "Home" is "New Entry".
              // So both buttons do similar things, maybe just one button?
              // PRD says "Restart or Close". Close means leave page.
              // Let's keep Restart.
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-blue-800 transition-colors"
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
