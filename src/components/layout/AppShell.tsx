import type { ReactNode } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { DisclaimerBanner } from './DisclaimerBanner';
import { JourneySpine } from './JourneySpine';
import { BookOpen, Palette } from 'lucide-react';
import { LocalStorageInspector } from '../ui/LocalStorageInspector';
import { ThemeSelectorModal, ThemeQuickTrigger } from '../ui/ThemeSelectorModal';
import { useTheme } from '../../context/ThemeContext';
import { useAccessibility } from '../../context/AccessibilityContext';

export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isApplyRoute = location.pathname.startsWith('/apply');
  const isLanding = location.pathname === '/';
  const { theme, openThemeModal } = useTheme();
  const { language, setLanguage, textScale, setTextScale, t } = useAccessibility();

  // Landing page gets full-bleed rendering — with persistent local storage inspector and theme modal
  if (isLanding) {
    return (
      <>
        {children}
        <LocalStorageInspector />
        <ThemeQuickTrigger />
        <ThemeSelectorModal />
      </>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col transition-colors duration-300" style={{ backgroundColor: 'var(--color-ivory)', color: 'var(--color-graphite)' }}>
      <DisclaimerBanner />

      {/* Header */}
      <header
        className="sticky top-0 z-40 border-b transition-colors duration-300"
        style={{
          background: theme.tokens.navGlassBg,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderColor: theme.tokens.border,
        }}
      >
        <div className="mx-auto flex items-center justify-between px-6 py-4" style={{ maxWidth: '1200px' }}>
          <Link to="/" className="flex items-center gap-3 no-underline transition-opacity hover:opacity-90">
            <div
              className="flex items-center justify-center rounded-lg"
              style={{
                width: '40px',
                height: '40px',
                background: theme.tokens.primaryDim,
                border: `1px solid ${theme.tokens.badgeBorder}`,
              }}
            >
              <BookOpen size={22} style={{ color: theme.tokens.primary }} strokeWidth={2} />
            </div>
            <span
              className="text-xl font-bold leading-tight tracking-wide"
              style={{ fontFamily: 'var(--font-display)', color: theme.tokens.text }}
            >
              Passport Seva
            </span>
          </Link>

          <nav className="flex items-center gap-2.5">
            {/* Text Scale Accessibility Control */}
            <div
              className="hidden sm:inline-flex items-center rounded-md border p-0.5 text-xs font-mono"
              style={{
                borderColor: theme.tokens.border,
                background: theme.tokens.surfaceGlass,
              }}
              title="Text size scaling"
            >
              <button
                type="button"
                onClick={() => setTextScale('normal')}
                className="px-2 py-1 rounded transition-colors"
                style={{
                  background: textScale === 'normal' ? theme.tokens.primary : 'transparent',
                  color: textScale === 'normal' ? (theme.mode === 'light' ? '#fff' : '#0a0a0c') : theme.tokens.textMuted,
                  fontWeight: textScale === 'normal' ? 'bold' : 'normal',
                }}
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => setTextScale('large')}
                className="px-2 py-1 rounded transition-colors"
                style={{
                  background: textScale === 'large' ? theme.tokens.primary : 'transparent',
                  color: textScale === 'large' ? (theme.mode === 'light' ? '#fff' : '#0a0a0c') : theme.tokens.textMuted,
                  fontWeight: textScale === 'large' ? 'bold' : 'normal',
                }}
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setTextScale('xlarge')}
                className="px-2 py-1 rounded transition-colors"
                style={{
                  background: textScale === 'xlarge' ? theme.tokens.primary : 'transparent',
                  color: textScale === 'xlarge' ? (theme.mode === 'light' ? '#fff' : '#0a0a0c') : theme.tokens.textMuted,
                  fontWeight: textScale === 'xlarge' ? 'bold' : 'normal',
                }}
              >
                A+
              </button>
            </div>

            {/* Language Toggle */}
            <div
              className="inline-flex items-center rounded-md border p-0.5 text-xs font-semibold"
              style={{
                borderColor: theme.tokens.border,
                background: theme.tokens.surfaceGlass,
              }}
            >
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className="px-2 py-1 rounded transition-colors"
                style={{
                  background: language === 'en' ? theme.tokens.primary : 'transparent',
                  color: language === 'en' ? (theme.mode === 'light' ? '#fff' : '#0a0a0c') : theme.tokens.textMuted,
                }}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('hi')}
                className="px-2 py-1 rounded transition-colors"
                style={{
                  background: language === 'hi' ? theme.tokens.primary : 'transparent',
                  color: language === 'hi' ? (theme.mode === 'light' ? '#fff' : '#0a0a0c') : theme.tokens.textMuted,
                }}
              >
                हिन्दी
              </button>
            </div>

            <button
              type="button"
              onClick={openThemeModal}
              className="hidden md:flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full transition-all hover:scale-105"
              style={{
                background: theme.tokens.badgeBg,
                color: theme.tokens.primary,
                border: `1px solid ${theme.tokens.badgeBorder}`,
              }}
              title="Change visual theme"
            >
              <Palette size={14} />
              <span className="hidden sm:inline">Theme:</span>
              <span className="font-bold">{theme.name}</span>
            </button>

            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-storage-inspector'))}
              className="hidden sm:flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
              style={{
                background: theme.tokens.badgeBg,
                color: theme.tokens.secondary,
                border: `1px solid ${theme.tokens.badgeBorder}`,
              }}
              title="Inspect live browser local storage state"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t('inspectVault')}</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main content area */}
      <div className="flex-1 flex" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {/* Journey spine — visible on apply routes, desktop only */}
        {isApplyRoute && (
          <aside className="hidden lg:block w-64 flex-shrink-0 border-r p-6" style={{ borderColor: 'var(--color-ivory-dark)' }}>
            <JourneySpine />
          </aside>
        )}

        {/* Page content */}
        <main
          className="flex-1 px-4 py-6 md:px-8 md:py-10"
          style={{ maxWidth: isApplyRoute ? '800px' : undefined }}
        >
          {/* Mobile journey spine */}
          {isApplyRoute && (
            <div className="lg:hidden mb-6">
              <JourneySpine compact />
            </div>
          )}

          <div className="animate-fadeIn">
            {children}
          </div>
        </main>
      </div>

      {/* Persistent LocalStorage Inspector & Theme Modals */}
      <LocalStorageInspector />
      <ThemeQuickTrigger />
      <ThemeSelectorModal />

      {/* Footer */}
      <footer
        className="px-6 py-8 text-sm border-t mt-auto"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-ivory-dark)',
          color: 'var(--color-graphite-light)',
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-4">
            <Link to="/about-prototype" className="hover:underline" style={{ color: 'var(--color-indigo)' }}>About</Link>
            <Link to="/faq" className="hover:underline" style={{ color: 'var(--color-indigo)' }}>FAQ</Link>
            <Link to="/track/glossary" className="hover:underline" style={{ color: 'var(--color-indigo)' }}>Track Status</Link>
            <Link to="/tools/fee-calculator" className="hover:underline" style={{ color: 'var(--color-indigo)' }}>Fee Calculator</Link>
            <Link to="/tools/document-validator" className="hover:underline" style={{ color: 'var(--color-indigo)' }}>Document Validator</Link>
            <Link to="/learn/police-verification" className="hover:underline" style={{ color: 'var(--color-indigo)' }}>Police Verification</Link>
            <Link to="/accessibility" className="hover:underline" style={{ color: 'var(--color-indigo)' }}>Accessibility</Link>
          </div>
          <p className="text-center text-xs" style={{ color: 'var(--color-graphite-light)' }}>
            Passport Seva Prototype &middot; Built for demonstration purposes
          </p>
        </div>
      </footer>
    </div>
  );
}
