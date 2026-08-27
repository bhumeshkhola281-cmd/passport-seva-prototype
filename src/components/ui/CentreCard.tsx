import React from 'react';
import { MapPin, Clock, Languages, Check } from 'lucide-react';

interface Centre {
  id: string;
  name: string;
  city: string;
  address: string;
  travelCue: string;
  visitDuration: string;
  languages: string[];
}

interface CentreCardProps {
  centre: Centre;
  selected: boolean;
  onSelect: () => void;
}

export function CentreCard({ centre, selected, onSelect }: CentreCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`card text-left p-5 w-full rounded-xl border transition-all flex flex-col gap-3 min-h-[44px] ${selected ? 'ring-2 ring-offset-2' : 'hover:shadow-md'}`}
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: selected ? 'var(--color-indigo)' : 'var(--color-ivory-dark)',
        boxShadow: selected ? '0 4px 12px rgba(23, 62, 122, 0.1)' : '0 2px 4px rgba(0,0,0,0.05)'
      }}
      aria-pressed={selected}
    >
      <div className="flex justify-between items-start w-full">
        <div>
          <h3 className="font-bold text-lg" style={{ color: 'var(--color-graphite)' }}>{centre.name}</h3>
          <p className="text-sm font-medium" style={{ color: 'var(--color-graphite-light)' }}>{centre.city}</p>
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
      </div>

      <div className="text-sm flex flex-col gap-2 mt-2">
        <div className="flex items-start gap-2" style={{ color: 'var(--color-graphite-light)' }}>
          <MapPin size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--color-indigo)' }} />
          <div>
            <p>{centre.address}</p>
            <p className="text-xs mt-1" style={{ color: 'var(--color-saffron)' }}>{centre.travelCue}</p>
          </div>
        </div>

        <div className="flex items-center gap-2" style={{ color: 'var(--color-graphite-light)' }}>
          <Clock size={16} className="flex-shrink-0" style={{ color: 'var(--color-indigo)' }} />
          <span>Expected visit: {centre.visitDuration}</span>
        </div>

        <div className="flex items-start gap-2 mt-1" style={{ color: 'var(--color-graphite-light)' }}>
          <Languages size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--color-indigo)' }} />
          <div className="flex flex-wrap gap-1">
            {centre.languages.map((lang, idx) => (
              <span 
                key={idx} 
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ backgroundColor: 'var(--color-surface-warm)', color: 'var(--color-graphite)' }}
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}
