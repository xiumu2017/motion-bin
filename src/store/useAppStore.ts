import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DestructionMethod, EmotionRecord } from '../types';

interface AppState {
  currentEmotion: string;
  destructionMethod: DestructionMethod | null;
  isProcessing: boolean;
  feedback: string;
  history: EmotionRecord[];
  
  // Actions
  setEmotion: (emotion: string) => void;
  setDestructionMethod: (method: DestructionMethod) => void;
  setIsProcessing: (isProcessing: boolean) => void;
  setFeedback: (feedback: string) => void;
  addToHistory: (record: EmotionRecord) => void;
  reset: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentEmotion: '',
      destructionMethod: null,
      isProcessing: false,
      feedback: '',
      history: [],

      setEmotion: (emotion) => set({ currentEmotion: emotion }),
      setDestructionMethod: (method) => set({ destructionMethod: method }),
      setIsProcessing: (isProcessing) => set({ isProcessing }),
      setFeedback: (feedback) => set({ feedback }),
      addToHistory: (record) => set((state) => ({ 
        history: [record, ...state.history].slice(0, 5) // Keep last 5 records
      })),
      reset: () => set({ 
        currentEmotion: '', 
        destructionMethod: null, 
        isProcessing: false, 
        feedback: '' 
      }),
    }),
    {
      name: 'emotion-trash-storage',
      partialize: (state) => ({ history: state.history }), // Only persist history
    }
  )
);
