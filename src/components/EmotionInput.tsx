import React from 'react';

interface EmotionInputProps {
  value: string;
  onChange: (value: string) => void;
}

const EmotionInput: React.FC<EmotionInputProps> = ({ value, onChange }) => {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <label 
        htmlFor="emotion-input" 
        className="block text-lg font-medium text-gray-700 mb-2"
      >
        写下你的烦恼...
      </label>
      <textarea
        id="emotion-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="在这里倾诉你的情绪，不管是工作压力还是生活琐事..."
        className="w-full h-64 p-6 rounded-2xl border-2 border-gray-200 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none transition-all duration-200 text-lg bg-white"
      />
    </div>
  );
};

export default EmotionInput;
