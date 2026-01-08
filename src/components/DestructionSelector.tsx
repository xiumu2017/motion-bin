import React from 'react';
import { Flame, FileX, Trash2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DestructionMethod } from '../types';

interface DestructionSelectorProps {
  selected: DestructionMethod | null;
  onSelect: (method: DestructionMethod) => void;
}

const DestructionSelector: React.FC<DestructionSelectorProps> = ({ selected, onSelect }) => {
  const methods: { id: DestructionMethod; icon: React.ElementType; label: string }[] = [
    { id: 'burn', icon: Flame, label: '燃烧' },
    { id: 'crumple', icon: FileX, label: '揉皱' },
    { id: 'delete', icon: Trash2, label: '删除' },
  ];

  return (
    <div className="flex flex-col items-center mb-8">
      <h3 className="text-lg font-medium text-gray-700 mb-4">选择销毁方式</h3>
      <div className="flex gap-6">
        {methods.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={twMerge(
              clsx(
                "flex flex-col items-center justify-center w-24 h-24 rounded-full transition-all duration-300 border-2",
                selected === id
                  ? "bg-primary text-white border-primary shadow-lg scale-110"
                  : "bg-white text-gray-500 border-gray-200 hover:border-primary/50 hover:text-primary hover:bg-gray-50"
              )
            )}
          >
            <Icon size={32} className="mb-2" />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DestructionSelector;
