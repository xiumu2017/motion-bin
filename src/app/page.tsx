'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import EmotionInput from '@/components/EmotionInput';
import DestructionSelector from '@/components/DestructionSelector';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { currentEmotion, destructionMethod, setEmotion, setDestructionMethod } = useAppStore();

  const handleStart = () => {
    if (!currentEmotion.trim() || !destructionMethod) return;
    router.push('/feedback');
  };

  const isReady = currentEmotion.trim().length > 0 && destructionMethod !== null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center max-w-4xl mx-auto w-full">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">情绪垃圾桶</h1>
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
            flex items-center justify-center gap-2 px-12 py-4 rounded-full text-lg font-bold transition-all duration-300 mt-8
            ${isReady 
              ? 'bg-orange-500 text-white shadow-lg hover:bg-orange-600 hover:shadow-xl transform hover:-translate-y-1' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
          `}
        >
          <span>开始销毁</span>
          <ArrowRight size={24} />
        </button>
      </div>
    </main>
  );
}
