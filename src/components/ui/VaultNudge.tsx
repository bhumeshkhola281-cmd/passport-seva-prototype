import React, { useState, useEffect } from 'react';
import { Database, ArrowRight, X, ShieldCheck } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

interface VaultNudgeProps {
  fieldKey?: string;
  className?: string;
}

export function VaultNudge({ fieldKey = 'draft', className = '' }: VaultNudgeProps) {
  const [visible, setVisible] = useState(false);
  const { t } = useAccessibility();

  useEffect(() => {
    // Only show once per session to avoid clutter
    const alreadyShown = sessionStorage.getItem('psp_vault_prompt_shown');
    if (!alreadyShown) {
      const timer = setTimeout(() => {
        setVisible(true);
        sessionStorage.setItem('psp_vault_prompt_shown', 'true');
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!visible) return null;

  const handleOpenVault = () => {
    window.dispatchEvent(new CustomEvent('open-storage-inspector', {
      detail: { highlightKey: fieldKey }
    }));
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={`my-3 p-3.5 rounded-lg border transition-all duration-300 animate-fadeIn flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${className}`}
      style={{
        background: 'var(--color-surface)',
        borderColor: 'var(--color-indigo)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25), 0 0 12px var(--color-indigo-light)15',
      }}
    >
      <div className="flex items-start gap-2.5">
        <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'var(--color-indigo-light)20', color: 'var(--color-indigo)' }}>
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div>
          <div className="text-xs font-bold flex items-center gap-1.5" style={{ color: 'var(--color-graphite)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {t('vaultNudgeTitle')}
          </div>
          <div className="text-[11px] leading-relaxed mt-0.5" style={{ color: 'var(--color-graphite-light)' }}>
            {t('vaultNudgeDesc')}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center">
        <button
          type="button"
          onClick={handleOpenVault}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all hover:scale-105"
          style={{
            background: 'var(--color-indigo)',
            color: '#0a0a0c',
          }}
        >
          <Database className="w-3 h-3" />
          <span>{t('vaultNudgeBtn')}</span>
        </button>

        <button
          type="button"
          onClick={() => setVisible(false)}
          className="p-1 rounded transition-colors hover:bg-white/10"
          style={{ color: 'var(--color-graphite-light)' }}
          title="Dismiss note"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
