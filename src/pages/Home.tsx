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
    <div className="flex flex-col items-center max-w-4xl mx-auto py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">情绪垃圾桶</h1>
        <p className="text-gray-600 text-lg">
          写下你的烦恼，让我们帮你销毁坏情绪
        </p>
      </header>

      <EmotionInput value={currentEmotion} onChange={setEmotion} />
      
      <DestructionSelector selected={destructionMethod} onSelect={setDestructionMethod} />

      <button
        onClick={handleStart}
        disabled={!isReady}
        className={`
          flex items-center justify-center gap-2 px-12 py-4 rounded-full text-lg font-bold transition-all duration-300
          ${isReady 
            ? 'bg-secondary text-white shadow-lg hover:bg-orange-600 hover:shadow-xl transform hover:-translate-y-1' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
        `}
      >
        <span>开始销毁</span>
        <ArrowRight size={24} />
      </button>
    </div>
  );
};

export default Home;
