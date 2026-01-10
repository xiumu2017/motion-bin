import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import EmotionInput from '../components/EmotionInput';
import DestructionSelector from '../components/DestructionSelector';
import { ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { currentEmotion, destructionMethod, setEmotion, setDestructionMethod } = useAppStore();

  const handleStart = () => {
    if (!currentEmotion.trim() || !destructionMethod) return;
    navigate('/feedback');
  };

  const isReady = currentEmotion.trim().length > 0 && destructionMethod !== null;

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto py-16 px-4">
      <header className="text-center mb-16 animate-fade-in-down">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 mb-6 tracking-tight">
          情绪垃圾桶
        </h1>
        <p className="text-gray-600 text-xl font-light max-w-2xl mx-auto leading-relaxed">
          把烦恼写下来，选择一种方式销毁它。
          <br />
          让负面情绪随风而去，找回内心的平静。
        </p>
      </header>

      <EmotionInput value={currentEmotion} onChange={setEmotion} />
      
      <DestructionSelector selected={destructionMethod} onSelect={setDestructionMethod} />

      <button
        onClick={handleStart}
        disabled={!isReady}
        className={`
          group flex items-center justify-center gap-3 px-16 py-5 rounded-full text-xl font-bold transition-all duration-300 shadow-xl
          ${isReady 
            ? 'bg-gradient-to-r from-secondary to-orange-600 text-white shadow-orange-200 hover:shadow-orange-300 hover:scale-105 hover:-translate-y-1' 
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
        `}
      >
        <span>开始销毁</span>
        <ArrowRight size={24} className={`transition-transform duration-300 ${isReady ? 'group-hover:translate-x-1' : ''}`} />
      </button>
      
      <footer className="mt-20 text-gray-400 text-sm">
        <p>© 2024 Motion Bin - 你的情绪回收站</p>
      </footer>
    </div>
  );
};

export default Home;
