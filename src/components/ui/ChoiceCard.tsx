import React, { ReactNode } from 'react';
import { Check } from 'lucide-react';

interface ChoiceCardProps {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  icon: ReactNode;
}

export function ChoiceCard({ title, description, selected, onClick, icon }: ChoiceCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`card text-left p-6 w-full flex items-start gap-4 transition-all min-h-[44px] ${selected ? 'ring-2 ring-offset-2' : 'hover:opacity-90'}`}
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: selected ? 'var(--color-indigo)' : 'var(--color-ivory-dark)',
        boxShadow: selected ? '0 4px 12px rgba(23, 62, 122, 0.1)' : '0 2px 4px rgba(0,0,0,0.05)'
      }}
      aria-pressed={selected}
    >
      <div 
        className="flex-shrink-0 p-3 rounded-full flex items-center justify-center"
        style={{ backgroundColor: 'var(--color-surface-warm)', color: 'var(--color-indigo)' }}
      >
        {icon}
      </div>
      <div className="flex-grow">
        <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--color-graphite)' }}>{title}</h3>
        <p className="text-sm" style={{ color: 'var(--color-graphite-light)' }}>{description}</p>
      </div>
      <div 
        className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${selected ? 'border-transparent' : ''}`}
        style={{
          borderColor: selected ? 'transparent' : 'var(--color-ivory-dark)',
          backgroundColor: selected ? 'var(--color-indigo)' : 'transparent',
          color: 'var(--color-surface)'
        }}
      >
        {selected && <Check size={16} />}
      </div>
    </button>
  );
}
