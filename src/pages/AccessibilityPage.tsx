import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, Keyboard, Monitor, Globe, Volume2, Sun } from 'lucide-react';

export function AccessibilityPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto pb-24 animate-fadeIn">
      <button onClick={() => navigate(-1)} className="btn btn-ghost flex items-center gap-2 mb-8 -ml-4">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <h1 className="text-4xl mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-indigo)' }}>
        Accessibility
      </h1>
      <p className="text-base mb-12" style={{ color: 'var(--color-graphite-light)' }}>
        Government services must work for everyone. Here is how this prototype approaches accessibility.
      </p>

      <div className="space-y-6">
        {[
          { icon: Keyboard, title: 'Keyboard navigation', desc: 'All interactive elements (buttons, links, form fields, accordions) are reachable and operable using only a keyboard. Tab to move between elements, Enter or Space to activate, and Escape to close modals.' },
          { icon: Eye, title: 'Screen reader support', desc: 'Semantic HTML5 elements (nav, main, section, header, footer) are used throughout. Form fields have associated labels, and buttons have descriptive text. ARIA attributes are used where native semantics are insufficient.' },
          { icon: Monitor, title: 'Reduced motion', desc: 'If your device is set to "prefer reduced motion," all animations (page transitions, floating passport, loading spinners) are disabled or shortened to near-instant. This respects users with vestibular disorders or motion sensitivity.' },
          { icon: Sun, title: 'Text readability', desc: 'Base font size is 15px with a comfortable line-height of 1.65. All text meets or exceeds WCAG AA contrast requirements against the background. Headings use a clear visual hierarchy.' },
          { icon: Volume2, title: 'No audio dependency', desc: 'No feature in this prototype requires audio. All information is conveyed visually through text, icons, and colour — and never through colour alone (icons and text always accompany colour-coded states).' },
          { icon: Globe, title: 'Language', desc: 'This prototype includes a language toggle for English and Hindi. In a production service, all 22 scheduled languages of India should be supported, along with right-to-left scripts where applicable.' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="card p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--color-surface-warm)' }}>
              <Icon className="w-5 h-5" style={{ color: 'var(--color-indigo)' }} />
            </div>
            <div>
              <h3 className="text-base font-bold mb-1" style={{ color: 'var(--color-graphite)' }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-graphite-light)' }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card p-6 mt-10" style={{ borderLeft: '4px solid var(--color-saffron)' }}>
        <h3 className="text-base font-bold mb-2" style={{ color: 'var(--color-graphite)' }}>Reporting an issue</h3>
        <p className="text-sm" style={{ color: 'var(--color-graphite-light)' }}>
          If you encounter any accessibility barrier while using this prototype, please reach out at <strong>feedback@passportseva.prototype</strong>. In a production service, a dedicated accessibility helpline and TTY number would be provided.
        </p>
      </div>
    </div>
  );
}
