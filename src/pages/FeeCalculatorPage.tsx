import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calculator, IndianRupee } from 'lucide-react';

type AppType = 'fresh' | 'reissue';
type AgeGroup = 'adult' | 'minor';
type Scheme = 'normal' | 'tatkal' | 'super-tatkal';
type Booklet = '36' | '60';

const FEES: Record<string, number> = {
  'fresh-adult-normal-36': 1500,
  'fresh-adult-normal-60': 2000,
  'fresh-adult-tatkal-36': 3500,
  'fresh-adult-tatkal-60': 4000,
  'fresh-adult-super-tatkal-36': 0,
  'fresh-adult-super-tatkal-60': 0,
  'fresh-minor-normal-36': 1000,
  'fresh-minor-normal-60': 0,
  'fresh-minor-tatkal-36': 3000,
  'fresh-minor-tatkal-60': 0,
  'fresh-minor-super-tatkal-36': 0,
  'fresh-minor-super-tatkal-60': 0,
  'reissue-adult-normal-36': 1500,
  'reissue-adult-normal-60': 2000,
  'reissue-adult-tatkal-36': 3500,
  'reissue-adult-tatkal-60': 4000,
  'reissue-adult-super-tatkal-36': 0,
  'reissue-adult-super-tatkal-60': 0,
  'reissue-minor-normal-36': 1000,
  'reissue-minor-normal-60': 0,
  'reissue-minor-tatkal-36': 3000,
  'reissue-minor-tatkal-60': 0,
  'reissue-minor-super-tatkal-36': 0,
  'reissue-minor-super-tatkal-60': 0,
};

const SMS_FEE = 0;
const EXTRAS = [
  { label: 'Convenience fee (portal)', amount: 0, note: 'Waived in prototype' },
];

function fmtINR(n: number) {
  return `\u20B9${n.toLocaleString('en-IN')}`;
}

export function FeeCalculatorPage() {
  const navigate = useNavigate();
  const [appType, setAppType] = useState<AppType>('fresh');
  const [age, setAge] = useState<AgeGroup>('adult');
  const [scheme, setScheme] = useState<Scheme>('normal');
  const [booklet, setBooklet] = useState<Booklet>('36');

  const key = `${appType}-${age}-${scheme}-${booklet}`;
  const baseFee = FEES[key] ?? 0;
  const unavailable = baseFee === 0;
  const total = baseFee + SMS_FEE;

  const options = (items: { value: string; label: string; disabled?: boolean }[], selected: string, onChange: (v: string) => void) => (
    <div className="flex flex-wrap gap-2">
      {items.map(item => (
        <button
          key={item.value}
          onClick={() => !item.disabled && onChange(item.value)}
          disabled={item.disabled}
          className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
          style={{
            background: selected === item.value ? 'var(--color-indigo)' : 'var(--color-surface-warm)',
            color: selected === item.value ? '#0a0a0c' : item.disabled ? 'var(--color-ivory-dark)' : 'var(--color-graphite-light)',
            border: `1px solid ${selected === item.value ? 'var(--color-indigo)' : 'var(--color-ivory-dark)'}`,
            opacity: item.disabled ? 0.4 : 1,
            cursor: item.disabled ? 'not-allowed' : 'pointer',
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto pb-24 animate-fadeIn">
      <button onClick={() => navigate(-1)} className="btn btn-ghost flex items-center gap-2 mb-8 -ml-4">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <h1 className="text-4xl mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-indigo)' }}>
        Fee Calculator
      </h1>
      <p className="text-base mb-10" style={{ color: 'var(--color-graphite-light)' }}>
        See the exact passport fee for your situation \u2014 no hidden charges.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Selectors */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: 'var(--color-graphite)' }}>Application Type</label>
            {options([
              { value: 'fresh', label: 'Fresh / New' },
              { value: 'reissue', label: 'Re-issue / Renewal' },
            ], appType, v => setAppType(v as AppType))}
          </div>

          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: 'var(--color-graphite)' }}>Applicant</label>
            {options([
              { value: 'adult', label: 'Adult (18+)' },
              { value: 'minor', label: 'Minor (under 18)' },
            ], age, v => setAge(v as AgeGroup))}
          </div>

          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: 'var(--color-graphite)' }}>Scheme</label>
            {options([
              { value: 'normal', label: 'Normal' },
              { value: 'tatkal', label: 'Tatkal (Urgent)' },
              { value: 'super-tatkal', label: 'Super Tatkal', disabled: true },
            ], scheme, v => setScheme(v as Scheme))}
            {scheme === 'tatkal' && (
              <p className="text-xs mt-2" style={{ color: 'var(--color-saffron)' }}>
                Tatkal applications are processed within 1\u20133 working days. Police verification is done before issuance.
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: 'var(--color-graphite)' }}>Booklet Pages</label>
            {options([
              { value: '36', label: '36 pages (Standard)' },
              { value: '60', label: '60 pages (Jumbo)', disabled: age === 'minor' },
            ], booklet, v => setBooklet(v as Booklet))}
            {age === 'minor' && booklet === '60' && (
              <p className="text-xs mt-2" style={{ color: 'var(--color-graphite-light)' }}>60-page booklet not available for minors.</p>
            )}
          </div>
        </div>

        {/* Result */}
        <div>
          <div className="card p-6" style={{ borderLeft: '4px solid var(--color-indigo)' }}>
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="w-6 h-6" style={{ color: 'var(--color-indigo)' }} />
              <h2 className="text-xl font-bold" style={{ color: 'var(--color-graphite)' }}>Fee Breakdown</h2>
            </div>

            {unavailable ? (
              <p className="text-sm py-4" style={{ color: 'var(--color-error)' }}>
                This combination is not available. Please select a different option.
              </p>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm" style={{ color: 'var(--color-graphite-light)' }}>
                    <span>Passport fee ({scheme === 'tatkal' ? 'Tatkal' : 'Normal'}, {booklet} pages)</span>
                    <span className="font-semibold" style={{ color: 'var(--color-graphite)' }}>{fmtINR(baseFee)}</span>
                  </div>
                  {EXTRAS.map((ex, i) => (
                    <div key={i} className="flex justify-between text-sm" style={{ color: 'var(--color-graphite-light)' }}>
                      <span>{ex.label}</span>
                      <span>{ex.amount === 0 ? 'Free' : fmtINR(ex.amount)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 flex justify-between items-center" style={{ borderColor: 'var(--color-ivory-dark)' }}>
                  <span className="text-lg font-bold" style={{ color: 'var(--color-graphite)' }}>Total</span>
                  <span className="text-2xl font-bold flex items-center gap-1" style={{ color: 'var(--color-indigo)' }}>
                    <IndianRupee className="w-5 h-5" />{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Quick reference table */}
          <div className="card p-6 mt-6">
            <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--color-graphite)' }}>Quick Reference (Adult, 36 pages)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b" style={{ borderColor: 'var(--color-ivory-dark)' }}>
                    <th className="text-left py-2" style={{ color: 'var(--color-graphite-light)' }}>Type</th>
                    <th className="text-right py-2" style={{ color: 'var(--color-graphite-light)' }}>Normal</th>
                    <th className="text-right py-2" style={{ color: 'var(--color-graphite-light)' }}>Tatkal</th>
                  </tr>
                </thead>
                <tbody style={{ color: 'var(--color-graphite)' }}>
                  <tr className="border-b" style={{ borderColor: 'var(--color-ivory-dark)' }}>
                    <td className="py-2">Fresh (Adult)</td>
                    <td className="text-right">{fmtINR(1500)}</td>
                    <td className="text-right">{fmtINR(3500)}</td>
                  </tr>
                  <tr className="border-b" style={{ borderColor: 'var(--color-ivory-dark)' }}>
                    <td className="py-2">Re-issue (Adult)</td>
                    <td className="text-right">{fmtINR(1500)}</td>
                    <td className="text-right">{fmtINR(3500)}</td>
                  </tr>
                  <tr>
                    <td className="py-2">Minor</td>
                    <td className="text-right">{fmtINR(1000)}</td>
                    <td className="text-right">{fmtINR(3000)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
