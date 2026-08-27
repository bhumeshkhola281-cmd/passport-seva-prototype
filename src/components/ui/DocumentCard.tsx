import { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, CheckCircle2, CircleDashed } from 'lucide-react';
import type { DocumentItem, DocumentStatus } from '../../context/ApplicationContext';

interface DocumentCardProps {
  doc: DocumentItem;
  onStatusChange: (id: string, status: DocumentStatus) => void;
}

export function DocumentCard({ doc, onStatusChange }: DocumentCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div 
      className="card p-5 w-full flex flex-col gap-3 rounded-xl border"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: doc.status === 'ready' ? 'var(--color-success)' : doc.status === 'need-to-arrange' ? 'var(--color-saffron)' : 'var(--color-ivory-dark)'
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-grow">
          <div className="mt-1" style={{ color: doc.status === 'ready' ? 'var(--color-success)' : 'var(--color-graphite-light)' }}>
            <FileText size={20} />
          </div>
          <div>
            <h4 className="font-bold text-base" style={{ color: 'var(--color-graphite)' }}>{doc.label}</h4>
            <p className="text-sm mt-1" style={{ color: 'var(--color-graphite-light)' }}>{doc.description}</p>
            {doc.format && (
              <span className="inline-block px-2 py-1 mt-2 text-xs font-medium rounded opacity-80" style={{ backgroundColor: 'var(--color-ivory-dark)', color: 'var(--color-graphite-light)' }}>
                Format: {doc.format}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {doc.whyNeeded && (
        <div>
          <button 
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-sm font-medium hover:underline min-h-[44px]"
            style={{ color: 'var(--color-indigo)' }}
            aria-expanded={expanded}
          >
            Why do I need this? {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {expanded && (
            <div className="p-3 mt-2 rounded text-sm" style={{ backgroundColor: 'var(--color-surface-warm)', color: 'var(--color-graphite-light)' }}>
              {doc.whyNeeded}
            </div>
          )}
        </div>
      )}

      <div className="flex items-center gap-3 mt-2 pt-3 border-t" style={{ borderColor: 'var(--color-ivory-dark)' }}>
        <button
          type="button"
          onClick={() => onStatusChange(doc.id, 'ready')}
          className="flex-1 py-2 px-3 rounded flex items-center justify-center gap-2 text-sm font-medium transition-colors min-h-[44px]"
          style={{
            backgroundColor: doc.status === 'ready' ? 'var(--color-success)' : 'transparent',
            color: doc.status === 'ready' ? 'var(--color-surface)' : 'var(--color-graphite-light)',
            border: `1px solid ${doc.status === 'ready' ? 'var(--color-success)' : 'var(--color-ivory-dark)'}`
          }}
        >
          <CheckCircle2 size={18} /> Ready
        </button>
        <button
          type="button"
          onClick={() => onStatusChange(doc.id, 'need-to-arrange')}
          className="flex-1 py-2 px-3 rounded flex items-center justify-center gap-2 text-sm font-medium transition-colors min-h-[44px]"
          style={{
            backgroundColor: doc.status === 'need-to-arrange' ? 'var(--color-surface-warm)' : 'transparent',
            color: doc.status === 'need-to-arrange' ? 'var(--color-saffron)' : 'var(--color-graphite-light)',
            border: `1px solid ${doc.status === 'need-to-arrange' ? 'var(--color-saffron)' : 'var(--color-ivory-dark)'}`
          }}
        >
          <CircleDashed size={18} /> Need to arrange
        </button>
      </div>
    </div>
  );
}
