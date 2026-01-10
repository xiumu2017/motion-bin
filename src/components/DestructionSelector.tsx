import React from 'react';
import { Flame, FileX, Trash2, Scissors, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DestructionMethod } from '../types';

interface DestructionSelectorProps {
  selected: DestructionMethod | null;
  onSelect: (method: DestructionMethod) => void;
}

const DestructionSelector: React.FC<DestructionSelectorProps> = ({ selected, onSelect }) => {
  const methods: { id: DestructionMethod; icon: React.ElementType; label: string; color: string }[] = [
    { id: 'burn', icon: Flame, label: '燃烧', color: 'bg-orange-500' },
    { id: 'crumple', icon: FileX, label: '揉皱', color: 'bg-gray-600' },
    { id: 'shred', icon: Scissors, label: '粉碎', color: 'bg-blue-600' },
    { id: 'particle', icon: Sparkles, label: '消散', color: 'bg-purple-500' },
    { id: 'delete', icon: Trash2, label: '删除', color: 'bg-red-500' },
  ];

  return (
    <div className="flex flex-col items-center mb-12 w-full max-w-3xl mx-auto">
      <h3 className="text-xl font-medium text-gray-700 mb-6">选择销毁方式</h3>
      <div className="flex flex-wrap justify-center gap-6">
        {methods.map(({ id, icon: Icon, label, color }) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={twMerge(
              clsx(
                "group relative flex flex-col items-center justify-center w-28 h-28 rounded-2xl transition-all duration-300 border-2 overflow-hidden",
                selected === id
                  ? `border-transparent shadow-xl scale-110`
                  : "bg-white border-gray-100 text-gray-400 hover:border-gray-200 hover:shadow-lg hover:-translate-y-1"
              )
            )}
          >
            {/* Background fill animation */}
            <div 
              className={clsx(
                "absolute inset-0 transition-transform duration-300 ease-out origin-bottom",
                color,
                selected === id ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100 opacity-10"
              )} 
            />
            
            <div className={clsx(
              "relative z-10 flex flex-col items-center transition-colors duration-300",
              selected === id ? "text-white" : "group-hover:text-gray-600"
            )}>
              <Icon size={32} className="mb-3" />
              <span className="text-sm font-medium">{label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DestructionSelector;
