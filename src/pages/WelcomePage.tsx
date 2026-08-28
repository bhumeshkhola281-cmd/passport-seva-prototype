import { useNavigate } from 'react-router-dom';
import { useApplication } from '../context/ApplicationContext';
import { useTheme } from '../context/ThemeContext';
import { ArrowRight, Zap, Fingerprint, Shield, FileText, Calendar, CreditCard, CheckCircle, Clock, MapPin, Mail, Phone, Upload, HelpCircle, Palette } from 'lucide-react';

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useApplication();
  const { theme, openThemeModal } = useTheme();
  const t = theme.tokens;
  const isLight = theme.mode === 'light';

  const handleStart = () => {
    dispatch({ type: 'START_APPLICATION' });
    dispatch({ type: 'COMPLETE_STAGE', stage: 0 });
    navigate('/apply/scenario');
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden transition-colors duration-300"
      style={{ background: t.bg, fontFamily: 'var(--font-ui)', scrollBehavior: 'smooth', color: t.text }}
    >
      {/* ─── Glassmorphism Navbar ─────────────────────────────── */}
      <nav
        className="landing-nav glass fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-colors duration-300"
        style={{ background: t.navGlassBg, borderColor: t.border }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span
            className="text-lg font-bold tracking-wide cursor-pointer"
            style={{ color: t.text, fontFamily: 'var(--font-display)' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Passport Seva
          </span>

          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Services',     target: 'services' },
              { label: 'How it Works', target: 'how-it-works' },
              { label: 'Track Status', target: '/track/glossary' },
              { label: 'FAQ',          target: '/faq' },
              { label: 'Contact',      target: 'contact' },
            ].map(({ label, target }) => {
              const isRoute = target.startsWith('/');
              return (
              <button
                key={label}
                type="button"
                onClick={() => isRoute ? navigate(target) : scrollTo(target)}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: t.textMuted }}
                onMouseEnter={(e) => (e.currentTarget.style.color = t.text)}
                onMouseLeave={(e) => (e.currentTarget.style.color = t.textMuted)}
              >
                {label}
              </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openThemeModal}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105"
              style={{
                background: t.badgeBg,
                color: t.primary,
                border: `1px solid ${t.badgeBorder}`,
              }}
              title="Switch Visual Theme"
            >
              <Palette className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Theme:</span>
              <span className="font-bold">{theme.name}</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/about-prototype')}
              className="glass-button px-5 py-2.5 rounded-full text-sm font-semibold"
              style={{ color: t.primary, borderColor: t.badgeBorder }}
            >
              About this prototype
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Central Backlight Orb ───────────────────────────── */}
      <div
        className="landing-orb absolute pointer-events-none transition-all duration-700"
        style={{
          top: '50%', left: '55%',
          width: '900px', height: '900px', borderRadius: '50%',
          background: `radial-gradient(circle, ${t.orb1} 0%, ${t.orb2} 35%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: isLight
            ? 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)'
            : 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ─── HERO SECTION ────────────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 min-h-screen flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 items-center">

          {/* LEFT (60%) */}
          <div className="lg:col-span-3 flex flex-col justify-center">
            <div className="landing-reveal landing-reveal-delay-1 mb-6">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
                style={{ background: t.badgeBg, color: t.primary, border: `1px solid ${t.badgeBorder}` }}
              >
                Passport Seva 2.0
              </span>
            </div>

            <h1
              className="landing-reveal landing-reveal-delay-2 text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.06] tracking-tight mb-6"
              style={{ color: t.text, fontFamily: 'var(--font-display)' }}
            >
              Identity that
              <br />
              moves{' '}
              <span
                className="inline-block font-extrabold"
                style={{
                  background: `linear-gradient(135deg, ${t.primaryLight || t.primary} 0%, ${t.secondary} 50%, ${t.accent} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                with you.
              </span>
            </h1>

            <p
              className="landing-reveal landing-reveal-delay-3 text-base md:text-lg leading-relaxed max-w-xl mb-10"
              style={{ color: t.textMuted }}
            >
              A reimagined passport application journey. From documents to
              appointment&nbsp;— one clear path, zero confusion, complete transparency.
            </p>

            <div className="landing-reveal landing-reveal-delay-4 flex flex-wrap gap-4 mb-10">
              <button
                onClick={handleStart}
                className="cta-primary group flex items-center gap-3 px-9 py-4 text-base font-bold transition-all duration-200"
                style={{
                  background: `linear-gradient(135deg, ${t.primary} 0%, ${t.secondary} 100%)`,
                  color: isLight ? '#ffffff' : '#0a0a0c',
                  boxShadow: `0 0 25px ${t.primaryGlow}, 0 4px 14px rgba(0,0,0,0.3)`,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 45px ${t.primaryGlow}, 0 8px 24px rgba(0,0,0,0.4), inset 0 0 16px rgba(16,185,129,0.15)`; e.currentTarget.style.transform = 'scale(1.03) translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = `0 0 25px ${t.primaryGlow}, 0 4px 14px rgba(0,0,0,0.3)`; e.currentTarget.style.transform = 'scale(1) translateY(0)'; }}
              >
                Begin your application
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollTo('how-it-works')}
                className="glass-button flex items-center gap-2 px-7 py-4 rounded-xl text-base font-semibold"
                style={{ color: t.textMuted }}
              >
                Learn more
              </button>
            </div>

            <div className="landing-reveal landing-reveal-delay-5 flex flex-wrap gap-3">
              {[
                { icon: Zap,         label: 'Complete in 5 minutes',     color: t.primary },
                { icon: Fingerprint, label: 'Smart document checklist',  color: t.secondary },
                { icon: Shield,      label: 'Data stays on your device', color: t.accent },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} className="glass flex items-center gap-2.5 px-4 py-2.5 rounded-full" style={{ background: t.surfaceGlass, borderColor: t.border }}>
                  <Icon className="w-4 h-4" style={{ color }} />
                  <span className="text-xs font-semibold" style={{ color: t.textMuted }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT (40%) — Portal + Passport */}
          <div
            className="lg:col-span-2 flex flex-col items-center justify-center relative"
            style={{ minHeight: '520px' }}
            onMouseMove={(e) => {
              const el = e.currentTarget.querySelector('.landing-passport') as HTMLElement;
              if (!el) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const x = (e.clientX - rect.left) / rect.width - 0.5;
              const y = (e.clientY - rect.top) / rect.height - 0.5;
              const rotateY = x * 20;
              const rotateX = -y * 15;
              el.style.setProperty('--ry', `${rotateY}deg`);
              el.style.setProperty('--rx', `${rotateX}deg`);
            }}
            onMouseLeave={() => {
              const el = document.querySelector('.landing-passport') as HTMLElement;
              if (!el) return;
              el.style.removeProperty('--ry');
              el.style.removeProperty('--rx');
            }}
          >
            {/* Portal ring */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2" style={{ perspective: '800px' }}>
              <div
                className="landing-portal-ring"
                style={{
                  width: '288px', height: '64px', borderRadius: '50%',
                  borderTop: `2px solid ${t.primary}`,
                  borderLeft: `1px solid ${t.badgeBorder}`,
                  borderRight: `1px solid ${t.badgeBorder}`,
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  background: `radial-gradient(ellipse, ${t.primaryDim} 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.85) 100%)`,
                  transform: 'rotateX(55deg)',
                }}
              />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2" style={{ width: '200px', height: '10px', borderRadius: '50%', background: `radial-gradient(ellipse, ${t.portalGlow} 0%, transparent 70%)`, filter: 'blur(6px)' }} />
            </div>

            {/* Passport with 3D effects */}
            <div className="landing-passport relative" style={{ marginBottom: '60px' }}>
              {/* Ambient glow */}
              <div className="passport-ambient" style={{ background: `radial-gradient(ellipse, ${t.primaryGlow} 0%, ${t.orb2} 35%, transparent 65%)` }} />

              {/* Floating sparkle particles */}
              <div className="passport-particle" />
              <div className="passport-particle" />
              <div className="passport-particle" />
              <div className="passport-particle" />
              <div className="passport-particle" />
              <div className="passport-particle" />

              {/* The 3D passport card */}
              <div className="passport-card">
                <img src="/passport.jpg" alt="Indian Passport" className="w-full h-full object-cover" style={{ filter: 'brightness(1.08) contrast(1.04)' }} />
                {/* Edge highlights */}
                <div className="passport-edge-top" />
                <div className="passport-edge-left" />
                {/* Verification stamp */}
                <div className="passport-stamp">
                  <div className="passport-stamp-inner">
                    VERIFIED
                  </div>
                </div>
              </div>

              {/* Floor shadow */}
              <div className="passport-shadow" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ─── SERVICES SECTION ────────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section id="services" className="relative z-10 py-24 border-t" style={{ borderColor: t.border }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ background: t.badgeBg, color: t.primary, border: `1px solid ${t.badgeBorder}` }}>
              Services
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: t.text }}>
              What can you do here?
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: t.textMuted }}>
              Whether you're applying for the first time or renewing an existing passport, we've streamlined the entire process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                icon: FileText, 
                title: 'New Passport', 
                desc: 'First-time application with guided document checklist tailored to your profile.', 
                color: t.primary, 
                action: () => {
                  dispatch({ type: 'START_APPLICATION' });
                  dispatch({ type: 'SET_JOURNEY_TYPE', journeyType: 'standard' });
                  dispatch({ type: 'COMPLETE_STAGE', stage: 0 });
                  navigate('/apply/scenario');
                },
                cta: 'Start Application'
              },
              { 
                icon: Calendar, 
                title: 'Passport Renewal', 
                desc: 'Re-issue for expired, damaged, or lost passports with minimal extra paperwork.', 
                color: t.secondary, 
                action: () => {
                  dispatch({ type: 'START_APPLICATION' });
                  dispatch({ type: 'SET_JOURNEY_TYPE', journeyType: 'reissue' });
                  dispatch({ type: 'COMPLETE_STAGE', stage: 0 });
                  navigate('/apply/scenario');
                },
                cta: 'Renew Passport'
              },
              { 
                icon: CreditCard, 
                title: 'Fee Calculator', 
                desc: 'See the exact fee for your situation — normal, tatkal, minor, adult, 36 or 60 pages.', 
                color: t.accent, 
                action: () => navigate('/tools/fee-calculator'),
                cta: 'Calculate Fee'
              },
              { 
                icon: Upload, 
                title: 'Document Validator', 
                desc: 'Check your passport photo dimensions, file size, and background colour — all client-side.', 
                color: t.primary, 
                action: () => navigate('/tools/document-validator'),
                cta: 'Validate Documents'
              },
              { 
                icon: Shield, 
                title: 'Police Verification', 
                desc: 'Everything you need to know about the step people worry about most.', 
                color: t.secondary, 
                action: () => navigate('/learn/police-verification'),
                cta: 'Read Guide'
              },
              { 
                icon: HelpCircle, 
                title: 'FAQ', 
                desc: 'What happens if you miss your appointment, documents are rejected, or payment fails.', 
                color: t.accent, 
                action: () => navigate('/faq'),
                cta: 'View Answers'
              },
            ].map(({ icon: Icon, title, desc, color, action, cta }) => (
              <div
                key={title}
                className="glass rounded-2xl p-8 transition-all duration-200 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
                style={{ background: t.surfaceGlass, borderColor: t.cardBorder }}
                onClick={action}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${color}15` }}>
                    <Icon className="w-6 h-6" style={{ color }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: t.text }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: t.textMuted }}>{desc}</p>
                </div>
                <div className="cta-card-action mt-6 flex items-center justify-between" style={{ borderTopColor: t.cardBorder }}>
                  <span className="cta-card-label text-xs font-bold" style={{ color }}>{cta}</span>
                  <span className="cta-card-arrow text-sm font-bold" style={{ color }}>&rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ─── HOW IT WORKS ────────────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="relative z-10 py-24 border-t" style={{ borderColor: t.border }}>
        {/* Subtle background glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ width: '600px', height: '600px', borderRadius: '50%', background: `radial-gradient(circle, ${t.primaryDim} 0%, transparent 70%)`, filter: 'blur(40px)' }} />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ background: t.badgeBg, color: t.primary, border: `1px solid ${t.badgeBorder}` }}>
              How it Works
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: t.text }}>
              Four simple steps
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: t.textMuted }}>
              No downloaded forms, no guesswork, no repeated visits. Just a clear path from start to finish.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', icon: FileText, title: 'Choose service type', desc: 'New passport or renewal? We customize your checklist instantly.' },
              { step: '02', icon: CheckCircle, title: 'Prepare documents', desc: 'Interactive checklist with format hints and "why we need this" explanations.' },
              { step: '03', icon: MapPin, title: 'Book appointment', desc: 'Pick your nearest centre, date, and time slot — all in one view.' },
              { step: '04', icon: CreditCard, title: 'Pay & confirm', desc: 'Simulated payment with reference tracking and full recovery state.' },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="relative glass rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-200" style={{ background: t.surfaceGlass, borderColor: t.cardBorder }}>
                <span className="block text-4xl font-black mb-4" style={{ color: `${t.primary}25`, fontFamily: 'var(--font-display)' }}>{step}</span>
                <Icon className="w-5 h-5 mb-3" style={{ color: t.primary }} />
                <h3 className="text-lg font-bold mb-2" style={{ color: t.text }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: t.textMuted }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ─── TRACK STATUS ────────────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section id="track-status" className="relative z-10 py-24 border-t" style={{ borderColor: t.border }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ background: t.badgeBg, color: t.primary, border: `1px solid ${t.badgeBorder}` }}>
            Track Status
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: t.text }}>
            Never lose sight of your application
          </h2>
          <p className="text-base mb-12 max-w-2xl mx-auto" style={{ color: t.textMuted }}>
            Every step is saved automatically to your device. Pick up exactly where you left off — from any browser.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Clock, title: 'Real-time progress', desc: 'See which stage you’re on and what’s left to do.' },
              { icon: Shield, title: 'Local-first storage', desc: 'Your data never leaves your device. Resume anytime.' },
              { icon: CheckCircle, title: 'Payment recovery', desc: 'If payment fails, your reference is preserved — no double charges.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass rounded-2xl p-6 text-left hover:-translate-y-1 transition-all duration-200" style={{ background: t.surfaceGlass, borderColor: t.cardBorder }}>
                <Icon className="w-6 h-6 mb-4" style={{ color: t.secondary }} />
                <h3 className="text-base font-bold mb-2" style={{ color: t.text }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: t.textMuted }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ─── CONTACT ─────────────────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section id="contact" className="relative z-10 py-24 border-t" style={{ borderColor: t.border }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ background: t.badgeBg, color: t.primary, border: `1px solid ${t.badgeBorder}` }}>
              Contact
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: t.text }}>
              Get in touch
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: t.textMuted }}>
              This is a prototype — but we'd love to hear your feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="glass rounded-2xl p-6 flex items-start gap-4" style={{ background: t.surfaceGlass, borderColor: t.cardBorder }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${t.primary}18` }}>
                <Mail className="w-5 h-5" style={{ color: t.primary }} />
              </div>
              <div>
                <h3 className="text-base font-bold mb-1" style={{ color: t.text }}>Email</h3>
                <p className="text-sm" style={{ color: t.textMuted }}>feedback@passportseva.prototype</p>
              </div>
            </div>
            <div className="glass rounded-2xl p-6 flex items-start gap-4" style={{ background: t.surfaceGlass, borderColor: t.cardBorder }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${t.secondary}18` }}>
                <Phone className="w-5 h-5" style={{ color: t.secondary }} />
              </div>
              <div>
                <h3 className="text-base font-bold mb-1" style={{ color: t.text }}>Helpline (simulated)</h3>
                <p className="text-sm" style={{ color: t.textMuted }}>1800-XXX-XXXX (demo only)</p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center mt-16">
            <button
              onClick={handleStart}
              className="cta-primary group inline-flex items-center gap-3 px-10 py-5 text-lg font-bold transition-all duration-200"
              style={{
                background: `linear-gradient(135deg, ${t.primary} 0%, ${t.secondary} 100%)`,
                color: isLight ? '#ffffff' : '#0a0a0c',
                boxShadow: `0 0 25px ${t.primaryGlow}, 0 4px 14px rgba(0,0,0,0.3)`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 45px ${t.primaryGlow}, 0 8px 24px rgba(0,0,0,0.4), inset 0 0 16px rgba(16,185,129,0.15)`; e.currentTarget.style.transform = 'scale(1.03) translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = `0 0 25px ${t.primaryGlow}, 0 4px 14px rgba(0,0,0,0.3)`; e.currentTarget.style.transform = 'scale(1) translateY(0)'; }}
            >
              Start your passport journey
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* ─── Bottom Trust Bar ────────────────────────────────── */}
      <div className="relative z-10 border-t" style={{ borderColor: t.border }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium" style={{ color: t.textDim }}>
            <span>✓ No login required</span>
            <span>✓ No fees until appointment</span>
            <span>✓ 100% client-side</span>
            <span>✓ Open source prototype</span>
          </div>
          <span className="text-xs" style={{ color: t.textDim }}>
            Passport Seva Prototype · Not affiliated with any government body
          </span>
        </div>
      </div>
    </div>
  );
};
