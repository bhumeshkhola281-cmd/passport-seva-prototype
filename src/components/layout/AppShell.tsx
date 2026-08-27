import { ReactNode } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { DisclaimerBanner } from './DisclaimerBanner';
import { JourneySpine } from './JourneySpine';
import { BookOpen } from 'lucide-react';
import { LocalStorageInspector } from '../ui/LocalStorageInspector';

export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isApplyRoute = location.pathname.startsWith('/apply');
  const isLanding = location.pathname === '/';

  // Landing page gets full-bleed rendering — with persistent local storage inspector
  if (isLanding) {
    return (
      <>
        {children}
        <LocalStorageInspector />
      </>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col" style={{ backgroundColor: 'var(--color-ivory)' }}>
      <DisclaimerBanner />

      {/* Header */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{
          background: 'rgba(10, 10, 12, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderColor: 'rgba(255,255,255,0.08)'
        }}
      >
        <div className="mx-auto flex items-center justify-between px-6 py-4" style={{ maxWidth: '1200px' }}>
          <Link to="/" className="flex items-center gap-3 no-underline transition-opacity hover:opacity-90">
            <div
              className="flex items-center justify-center rounded-lg"
              style={{
                width: '40px',
                height: '40px',
                background: 'rgba(6, 182, 212, 0.15)',
                border: '1px solid rgba(6, 182, 212, 0.25)'
              }}
            >
              <BookOpen size={22} style={{ color: '#06b6d4' }} strokeWidth={2} />
            </div>
            <span
              className="text-xl font-bold leading-tight tracking-wide"
              style={{ fontFamily: 'var(--font-display)', color: 'white' }}
            >
              Passport Seva
            </span>
          </Link>

          <nav className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-storage-inspector'))}
              className="hidden sm:flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
              style={{
                background: 'rgba(6, 182, 212, 0.12)',
                color: '#38bdf8',
                border: '1px solid rgba(6, 182, 212, 0.3)'
              }}
              title="Inspect live browser local storage state"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Inspect Local Vault</span>
            </button>

            <button
              type="button"
              className="text-sm px-4 py-2 rounded-md font-medium transition-colors hover:bg-white/10"
              style={{
                color: 'white',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.15)'
              }}
              title="Language selection (English only in this prototype)"
            >
              EN / हि
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

      {/* Persistent LocalStorage Inspector */}
      <LocalStorageInspector />

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
