import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Home, Clock, FileText, HelpCircle, ChevronDown, ChevronUp, AlertTriangle, CheckCircle } from 'lucide-react';

const PV_FAQ = [
  { q: 'What if I am not at home when the officer visits?', a: 'The officer will typically visit 2\u20133 times. If you miss all visits, they may file an "unable to verify" report which delays your application. Inform a family member or neighbour about the expected visit. You can also contact your local police station to schedule a convenient time.' },
  { q: 'What documents should I keep ready?', a: 'Keep originals of: Aadhaar card, passport application receipt, proof of address (utility bill / rental agreement), and your old passport (if re-issue). The officer may ask to see these.' },
  { q: 'What if my address proof does not match my current address?', a: 'This is one of the most common delays. If you have recently moved, get a fresh utility bill, bank statement, or rental agreement for your current address before your appointment. The address on your application must match what the officer verifies.' },
  { q: 'Can my landlord or neighbour be asked questions?', a: 'Yes. The officer may speak to neighbours or your landlord to confirm you reside at the stated address. This is standard procedure and not a cause for concern.' },
  { q: 'How long does police verification take?', a: 'Typically 2\u20134 weeks, but it varies significantly by state and district. Metro cities tend to be faster (1\u20132 weeks) while rural areas can take up to 6 weeks.' },
  { q: 'What is the difference between pre-verification and post-verification?', a: 'Pre-verification happens before your passport is issued (applied for Tatkal or certain re-issue cases). Post-verification happens after your passport is printed and dispatched \u2014 it runs in the background and only causes issues if something negative is found.' },
  { q: 'What happens if police verification fails?', a: 'A "negative" or "adverse" police report means the passport office may ask for additional documents or clarification. In rare cases, the application may be rejected. You will be notified and given a chance to respond.' },
];

export function PoliceVerificationPage() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto pb-24 animate-fadeIn">
      <button onClick={() => navigate(-1)} className="btn btn-ghost flex items-center gap-2 mb-8 -ml-4">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <h1 className="text-4xl mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-indigo)' }}>
        Police Verification Explained
      </h1>
      <p className="text-base mb-12" style={{ color: 'var(--color-graphite-light)' }}>
        The step people worry about most. Here is everything you need to know.
      </p>

      {/* What is it */}
      <section className="card p-6 md:p-8 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6" style={{ color: 'var(--color-indigo)' }} />
          <h2 className="text-xl font-bold" style={{ color: 'var(--color-graphite)' }}>What is police verification?</h2>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-graphite-light)' }}>
          After your passport application is processed at the Passport Seva Kendra, the passport office sends a verification request to your local police station. A police officer is assigned to confirm your identity and address by visiting your residence. This is a mandatory step for all passport applications in India.
        </p>
      </section>

      {/* What to expect */}
      <section className="card p-6 md:p-8 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Home className="w-6 h-6" style={{ color: 'var(--color-indigo)' }} />
          <h2 className="text-xl font-bold" style={{ color: 'var(--color-graphite)' }}>What to expect during the visit</h2>
        </div>
        <div className="space-y-4">
          {[
            { icon: Clock, text: 'The visit typically lasts 10\u201315 minutes.' },
            { icon: FileText, text: 'The officer may ask to see your original Aadhaar, application receipt, and address proof.' },
            { icon: HelpCircle, text: 'They may ask basic questions: your name, occupation, how long you have lived at the address, family details.' },
            { icon: CheckCircle, text: 'If everything checks out, they file a "clear" report and your passport moves to the next stage.' },
          ].map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-start gap-3">
              <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-saffron)' }} />
              <p className="text-sm" style={{ color: 'var(--color-graphite-light)' }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pre vs Post */}
      <section className="card p-6 md:p-8 mb-6">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-graphite)' }}>Pre-verification vs Post-verification</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl" style={{ background: 'var(--color-surface-warm)', border: '1px solid var(--color-ivory-dark)' }}>
            <h3 className="font-bold mb-2 text-sm" style={{ color: 'var(--color-saffron)' }}>PRE-VERIFICATION</h3>
            <p className="text-sm" style={{ color: 'var(--color-graphite-light)' }}>
              Done <strong>before</strong> passport is printed. Required for Tatkal applications and some re-issue cases. Passport is issued only after a clear report.
            </p>
          </div>
          <div className="p-4 rounded-xl" style={{ background: 'var(--color-surface-warm)', border: '1px solid var(--color-ivory-dark)' }}>
            <h3 className="font-bold mb-2 text-sm" style={{ color: 'var(--color-indigo)' }}>POST-VERIFICATION</h3>
            <p className="text-sm" style={{ color: 'var(--color-graphite-light)' }}>
              Done <strong>after</strong> passport is printed and dispatched. Standard for normal applications. Runs in the background; passport is already in your hands.
            </p>
          </div>
        </div>
      </section>

      {/* Documents to keep ready */}
      <section className="card p-6 md:p-8 mb-6" style={{ borderLeft: '4px solid var(--color-saffron)' }}>
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6" style={{ color: 'var(--color-saffron)' }} />
          <h2 className="text-xl font-bold" style={{ color: 'var(--color-graphite)' }}>Documents to keep ready</h2>
        </div>
        <ul className="space-y-2 text-sm" style={{ color: 'var(--color-graphite-light)' }}>
          {['Aadhaar card (original)', 'Passport application receipt / appointment acknowledgment', 'Proof of current address (utility bill, bank statement, or rental agreement)', 'Old passport (if re-issue)', 'Photographs (2 recent passport-size photos, just in case)'].map((d, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-success)' }} />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ Accordion */}
      <h2 className="text-2xl font-bold mb-6 mt-12" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-indigo)' }}>
        Common questions
      </h2>
      <div className="space-y-3">
        {PV_FAQ.map((item, i) => (
          <div key={i} className="card overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left font-semibold text-sm"
              style={{ color: 'var(--color-graphite)' }}
            >
              <span>{item.q}</span>
              {openIndex === i ? <ChevronUp className="w-5 h-5 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 flex-shrink-0" />}
            </button>
            {openIndex === i && (
              <div className="px-5 pb-5 text-sm leading-relaxed animate-fadeIn" style={{ color: 'var(--color-graphite-light)' }}>
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
