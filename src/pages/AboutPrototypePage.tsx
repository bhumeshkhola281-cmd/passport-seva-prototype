import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Info, CheckCircle2, AlertTriangle, Shield, Database, Lock, Eye } from 'lucide-react';

export function AboutPrototypePage() {
  const navigate = useNavigate();

  const handleOpenVault = () => {
    window.dispatchEvent(new CustomEvent('open-storage-inspector'));
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-24 animate-fadeIn">
      <button 
        onClick={() => navigate('/')}
        className="btn btn-ghost flex items-center gap-2 mb-8 -ml-4"
      >
        <ArrowLeft className="w-5 h-5" />
        Return to the prototype
      </button>

      <h1 className="text-4xl mb-12" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-indigo)' }}>
        About this prototype
      </h1>

      <div className="space-y-12">
        <section className="card p-8">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-3" style={{ color: 'var(--color-graphite)' }}>
            <AlertTriangle className="w-6 h-6" style={{ color: 'var(--color-warning)' }} />
            The problem
          </h3>
          <p className="text-lg leading-relaxed opacity-90">
            Citizens often face uncertainty when applying for essential government services like passports. 
            Complex forms, opaque document requirements, and anxiety around payment failures lead to a stressful experience, repeated support calls, and application rejections.
          </p>
        </section>

        <section className="card p-8">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-3" style={{ color: 'var(--color-graphite)' }}>
            <Info className="w-6 h-6" style={{ color: 'var(--color-indigo)' }} />
            Our approach
          </h3>
          <ul className="list-disc pl-6 space-y-3 text-lg opacity-90">
            <li><strong>Visible progress:</strong> Continuous context of where you are in the journey.</li>
            <li><strong>Scenario-aware checklists:</strong> Only asking for documents relevant to the applicant's specific demographic and history.</li>
            <li><strong>Payment recovery:</strong> Designing for the unhappy path of payment verification, bringing transparency to a high-anxiety moment.</li>
            <li><strong>Mechanically Provable Privacy:</strong> Building a real-time inspectable local storage vault directly into the UI so trust is verifiable, not just promised.</li>
          </ul>
        </section>

        {/* ── Mechanically Provable Trust Section ── */}
        <section 
          className="card p-8 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(56, 189, 248, 0.03) 100%)',
            borderColor: 'rgba(6, 182, 212, 0.3)'
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Database className="w-6 h-6" style={{ color: '#06b6d4' }} />
                <h3 className="text-2xl font-bold" style={{ color: '#ffffff' }}>
                  Mechanically Provable Trust (Live Data Vault)
                </h3>
              </div>
              <p className="text-sm leading-relaxed opacity-90 max-w-2xl" style={{ color: 'var(--color-graphite)' }}>
                Anyone can claim <em>"your data stays on your device."</em> We make this mechanically verifiable. We built an in-app <strong>Local Storage Inspector</strong> that allows you to see the exact JSON payload sitting in your browser's local sandbox (<code className="font-mono text-cyan-300">localStorage</code>) in real time as you interact with the app.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-medium" style={{ color: '#38bdf8' }}>
                <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> 0 network requests transmitted</span>
                <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> Verifiable in Browser DevTools (F12)</span>
              </div>
            </div>

            <button
              onClick={handleOpenVault}
              className="btn flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl font-bold shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #06b6d4 0%, #38bdf8 100%)',
                color: '#0a0a0c',
                boxShadow: '0 0 20px rgba(6, 182, 212, 0.35)',
              }}
            >
              <Database className="w-4 h-4" />
              Open Live Storage Vault
            </button>
          </div>
        </section>

        <section className="card p-8">
          <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-graphite)' }}>
            What works vs What is mocked
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2" style={{ borderColor: 'var(--color-graphite-light)' }}>
                  <th className="py-3 px-4 w-1/2">What works in this prototype</th>
                  <th className="py-3 px-4 w-1/2">What is intentionally mocked</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                <tr>
                  <td className="py-4 px-4 flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-success)' }} />
                    <strong>Live Local Storage Vault &amp; JSON Inspector</strong> (verifiable in DevTools)
                  </td>
                  <td className="py-4 px-4 text-sm opacity-80">Real identity verification (Aadhaar/DigiLocker)</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-success)' }} />
                    Multi-step application navigation
                  </td>
                  <td className="py-4 px-4 text-sm opacity-80">Government databases and eligibility rules</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-success)' }} />
                    Client-side data persistence &amp; state
                  </td>
                  <td className="py-4 px-4 text-sm opacity-80">Live centre availability and real time slots</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-success)' }} />
                    Scenario-based document checklist
                  </td>
                  <td className="py-4 px-4 text-sm opacity-80">Actual file uploads and remote OCR servers</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-success)' }} />
                    Appointment selection &amp; fee calculation logic
                  </td>
                  <td className="py-4 px-4 text-sm opacity-80">Real payment gateway authorization</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-success)' }} />
                    Simulated payment states &amp; recovery
                  </td>
                  <td className="py-4 px-4 text-sm opacity-80">Actual SMS/Email confirmation triggers</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-success)' }} />
                    Responsive UI and basic accessibility
                  </td>
                  <td className="py-4 px-4 text-sm opacity-80">Physical police station field verification visits</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-6 border-l-4" style={{ borderColor: 'var(--color-success)' }}>
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--color-graphite)' }}>
              <Shield className="w-5 h-5" style={{ color: 'var(--color-success)' }} />
              Safety and privacy
            </h3>
            <p className="opacity-90 leading-relaxed text-sm">
              This is purely a front-end design prototype. No real data is collected, stored remotely, or transmitted. 
              No government systems are accessed. All names, numbers, and references generated are completely fictional.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--color-graphite)' }}>Built with</h3>
            <div className="flex flex-wrap gap-2">
              {['React 18', 'TypeScript', 'Tailwind CSS', 'Vite', 'Three.js', 'React Router'].map(tech => (
                <span key={tech} className="px-3 py-1 rounded-full text-sm font-bold bg-white/5 border" style={{ color: 'var(--color-indigo)', borderColor: 'var(--color-indigo-light)' }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="pt-8 text-center">
          <button 
            onClick={() => navigate('/')}
            className="btn btn-primary"
          >
            Return to the prototype
          </button>
        </div>
      </div>
    </div>
  );
}
