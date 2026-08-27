import React, { ReactNode, useState } from 'react';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  whyWeAsk?: string;
  required?: boolean;
  children: ReactNode;
}

export function FormField({ label, htmlFor, error, hint, whyWeAsk, required, children }: FormFieldProps) {
  const [showWhy, setShowWhy] = useState(false);

  return (
    <div className="flex flex-col gap-1 mb-5">
      <div className="flex justify-between items-baseline">
        <label htmlFor={htmlFor} className="form-label font-medium" style={{ color: 'var(--color-graphite)' }}>
          {label} {required && <span style={{ color: 'var(--color-error)' }}>*</span>}
        </label>
      </div>
      
      {hint && (
        <span className="form-hint text-sm mb-1" style={{ color: 'var(--color-graphite-light)' }}>
          {hint}
        </span>
      )}
      
      {children}
      
      {error && (
        <span className="form-error text-sm mt-1 flex items-center gap-1" style={{ color: 'var(--color-error)' }}>
          {error}
        </span>
      )}

      {whyWeAsk && (
        <div className="mt-2">
          <button
            type="button"
            onClick={() => setShowWhy(!showWhy)}
            className="flex items-center gap-1 text-xs font-medium hover:underline min-h-[44px]"
            style={{ color: 'var(--color-indigo)' }}
            aria-expanded={showWhy}
          >
            <Info size={14} /> Why do we ask for this? {showWhy ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          
          {showWhy && (
            <div className="p-3 mt-1 rounded text-sm leading-relaxed" style={{ backgroundColor: 'var(--color-surface-warm)', color: 'var(--color-graphite-light)' }}>
              {whyWeAsk}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
