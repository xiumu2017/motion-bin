import React from 'react';

interface EmotionInputProps {
  value: string;
  onChange: (value: string) => void;
}

const EmotionInput: React.FC<EmotionInputProps> = ({ value, onChange }) => {
  return (
    <div className="w-full max-w-2xl mx-auto mb-10 relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
      <label 
        htmlFor="emotion-input" 
        className="block text-xl font-medium text-gray-700 mb-4 ml-1"
      >
        写下你的烦恼...
      </label>
      <div className="relative">
        <textarea
          id="emotion-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="在这里倾诉你的情绪，不管是工作压力还是生活琐事..."
          className="w-full h-80 p-8 rounded-2xl border border-gray-200 shadow-xl focus:border-primary/30 focus:ring-4 focus:ring-primary/10 resize-none transition-all duration-300 text-lg leading-8 bg-white/80 backdrop-blur-sm paper-lines text-gray-700 placeholder:text-gray-400"
        />
        <div className="absolute bottom-4 right-4 text-xs text-gray-400 font-medium">
          {value.length} 字
        </div>
      </div>
    </div>
  );
};

export default EmotionInput;
