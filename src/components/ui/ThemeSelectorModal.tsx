import React, { useEffect } from 'react';
import { useTheme, THEMES, type ThemeId } from '../../context/ThemeContext';
import { Palette, Check, Sparkles, X, Sun, Moon, Shield, Compass, Feather } from 'lucide-react';

const THEME_ICONS: Record<ThemeId, React.ElementType> = {
  obsidian: Sparkles,
  ivory: Sun,
  midnight: Compass,
  emerald: Shield,
  saffron: Feather,
};

export function ThemeSelectorModal() {
  const { themeId, setThemeId, isThemeModalOpen, closeThemeModal, openThemeModal } = useTheme();

  // Listen for CustomEvent to open theme modal from anywhere
  useEffect(() => {
    const handleOpen = () => openThemeModal();
    window.addEventListener('open-theme-selector', handleOpen);
    return () => window.removeEventListener('open-theme-selector', handleOpen);
  }, [openThemeModal]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isThemeModalOpen) {
        closeThemeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isThemeModalOpen, closeThemeModal]);

  if (!isThemeModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
      onClick={closeThemeModal}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="theme-modal-title"
        className="w-full max-w-2xl rounded-2xl p-6 sm:p-8 shadow-2xl relative animate-fadeIn"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-indigo)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 35px rgba(6, 182, 212, 0.15)',
          color: 'var(--color-graphite)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6 pb-4 border-b" style={{ borderColor: 'var(--color-ivory-dark)' }}>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: 'var(--color-indigo-light)20',
                border: '1px solid var(--color-indigo)',
              }}
            >
              <Palette className="w-5 h-5" style={{ color: 'var(--color-indigo)' }} />
            </div>
            <div>
              <h2 id="theme-modal-title" className="text-xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-graphite)' }}>
                Select Visual Identity
              </h2>
              <p className="text-xs" style={{ color: 'var(--color-graphite-light)' }}>
                Choose from 5 government-grade and executive display themes.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeThemeModal}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10"
            style={{ color: 'var(--color-graphite-light)' }}
            title="Close theme selector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Theme Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6 max-h-[60vh] overflow-y-auto pr-1">
          {Object.values(THEMES).map((t) => {
            const isSelected = themeId === t.id;
            const Icon = THEME_ICONS[t.id] || Sparkles;

            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setThemeId(t.id);
                }}
                className="group relative rounded-xl p-4 text-left transition-all duration-200 flex flex-col justify-between"
                style={{
                  background: isSelected ? `${t.tokens.primaryDim}` : 'rgba(255, 255, 255, 0.03)',
                  border: `1.5px solid ${isSelected ? t.tokens.primary : 'rgba(255, 255, 255, 0.08)'}`,
                  boxShadow: isSelected ? `0 0 20px ${t.tokens.primaryGlow}, inset 0 0 12px ${t.tokens.primaryDim}` : 'none',
                }}
              >
                {/* Top Row: Icon + Name + Selection Badge */}
                <div className="flex items-center justify-between mb-3 w-full">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{
                        background: t.tokens.bg,
                        border: `1px solid ${t.tokens.primary}`,
                        color: t.tokens.primary,
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold flex items-center gap-1.5" style={{ color: isSelected ? t.tokens.primary : 'var(--color-graphite)' }}>
                        {t.name}
                        {t.mode === 'light' ? (
                          <Sun className="w-3 h-3 text-amber-500" />
                        ) : (
                          <Moon className="w-3 h-3 text-cyan-400" />
                        )}
                      </div>
                      <div className="text-[11px] font-medium" style={{ color: 'var(--color-graphite-light)' }}>
                        {t.tag}
                      </div>
                    </div>
                  </div>

                  {isSelected ? (
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        background: t.tokens.primary,
                        color: t.mode === 'light' ? '#ffffff' : '#0a0a0c',
                        boxShadow: `0 0 10px ${t.tokens.primaryGlow}`,
                      }}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-white/20 group-hover:border-white/40" />
                  )}
                </div>

                {/* Color Swatch Preview Bar */}
                <div className="w-full flex items-center gap-1.5 pt-2 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.06)' }}>
                  <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: 'var(--color-graphite-light)' }}>
                    Palette:
                  </span>
                  <div className="flex items-center gap-1.5 ml-auto">
                    <div
                      className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                      style={{ background: t.tokens.bg }}
                      title={`Background: ${t.tokens.bg}`}
                    />
                    <div
                      className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                      style={{ background: t.tokens.primary }}
                      title={`Primary: ${t.tokens.primary}`}
                    />
                    <div
                      className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                      style={{ background: t.tokens.accent }}
                      title={`Accent: ${t.tokens.accent}`}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="flex items-center justify-between pt-4 border-t text-xs" style={{ borderColor: 'var(--color-ivory-dark)', color: 'var(--color-graphite-light)' }}>
          <span>Preference is saved locally in your browser</span>
          <button
            type="button"
            onClick={closeThemeModal}
            className="px-5 py-2 rounded-lg font-bold text-xs transition-all"
            style={{
              background: 'var(--color-indigo)',
              color: '#0a0a0c',
              boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)',
            }}
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
}

export function ThemeQuickTrigger() {
  const { openThemeModal, theme } = useTheme();

  return (
    <button
      type="button"
      onClick={openThemeModal}
      className="fixed bottom-5 left-5 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-indigo)',
        color: 'var(--color-graphite)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 15px var(--color-indigo-light)30',
      }}
      title="Change Visual Theme"
    >
      <Palette className="w-3.5 h-3.5" style={{ color: 'var(--color-indigo)' }} />
      <span className="hidden sm:inline">Theme:</span>
      <span className="font-bold" style={{ color: 'var(--color-indigo)' }}>
        {theme.name}
      </span>
    </button>
  );
}
