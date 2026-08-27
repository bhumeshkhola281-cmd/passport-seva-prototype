import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp, Search } from 'lucide-react';

const FAQS = [
  { cat: 'Appointment', q: 'What happens if I miss my appointment?', a: 'Your appointment will be marked as a no-show. You will need to book a new appointment through the portal. There is no penalty, but you will lose your slot and may have to wait for the next available date. If you know in advance, reschedule before the appointment date.' },
  { cat: 'Appointment', q: 'Can I reschedule my appointment?', a: 'Yes. You can reschedule up to 3 times before your appointment date. Log in with your application reference and select a new date and time. Your documents and details will be preserved.' },
  { cat: 'Documents', q: 'What if my documents are rejected at the counter?', a: 'If a document is rejected, the officer will tell you which one and why. Common reasons: photocopy not self-attested, document expired, name mismatch. You will typically be asked to return with the correct document. Your appointment is not cancelled \u2014 you get a second visit window.' },
  { cat: 'Documents', q: 'What if my name on Aadhaar does not match my other documents?', a: 'Name mismatches are the #1 cause of delays. Before your appointment, ensure your name is spelled identically on your Aadhaar, PAN, and application form. If there is a difference, get it corrected on Aadhaar first (takes 2\u20135 days online) or carry a gazette notification / court affidavit for the name change.' },
  { cat: 'Documents', q: 'My address proof is more than 3 months old. Will it be accepted?', a: 'Utility bills (electricity, water, gas) must be less than 3 months old. Bank statements must be recent. Aadhaar and rental agreements do not have an expiry for this purpose. If your only proof is an old bill, get a fresh one before your appointment.' },
  { cat: 'Documents', q: 'Can I use a digital Aadhaar (mAadhaar or DigiLocker)?', a: 'Yes. Digital Aadhaar from the official UIDAI website, mAadhaar app, or DigiLocker is accepted at most Passport Seva Kendras. However, carrying a printed copy is recommended as a backup.' },
  { cat: 'Payment', q: 'My payment failed but money was deducted. What do I do?', a: 'Do NOT make another payment. Note your transaction reference number. The payment gateway will auto-refund within 5\u20137 working days. If the amount is not refunded, contact the helpline with your reference number. Your application slot is preserved for 48 hours.' },
  { cat: 'Payment', q: 'Can I pay at the Passport Seva Kendra instead of online?', a: 'No. Since 2020, all passport fees must be paid online before your appointment. Cash or card payments at the centre are not accepted. Accepted methods: net banking, debit card, credit card, UPI.' },
  { cat: 'Verification', q: 'Police verification is taking more than 4 weeks. What can I do?', a: 'You can: (1) Check status on the Passport Seva portal, (2) Visit your local police station with your application reference and ask for an update, (3) File a grievance on the MEA portal or call the helpline. Most delays are due to officer workload, not issues with your application.' },
  { cat: 'Verification', q: 'I moved to a new address after applying. What happens?', a: 'If you move before police verification, inform the passport office immediately and update your address. If verification has already started at the old address, it may need to be re-initiated at the new one, which adds 2\u20134 weeks.' },
  { cat: 'Delivery', q: 'My passport shows "Dispatched" but I have not received it.', a: 'Use the Speed Post tracking number (sent via SMS) to track delivery on the India Post website. If it shows "delivered" but you did not receive it, contact your local post office immediately. If not resolved within 7 days, file a grievance on the passport portal.' },
  { cat: 'General', q: 'How do I apply for a Tatkal (urgent) passport?', a: 'Select "Tatkal" as your scheme type during application. Tatkal passports cost more (\u20B93,500 for adults vs \u20B91,500 normal) but are processed in 1\u20133 working days after your appointment. Police verification is done before issuance (pre-verification).' },
];

const CATEGORIES = ['All', ...Array.from(new Set(FAQS.map(f => f.cat)))];

export function FAQPage() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = FAQS.filter(f => {
    const matchCat = filter === 'All' || f.cat === filter;
    const matchSearch = !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-3xl mx-auto pb-24 animate-fadeIn">
      <button onClick={() => navigate(-1)} className="btn btn-ghost flex items-center gap-2 mb-8 -ml-4">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <h1 className="text-4xl mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-indigo)' }}>
        Frequently Asked Questions
      </h1>
      <p className="text-base mb-8" style={{ color: 'var(--color-graphite-light)' }}>
        Real answers to the questions people actually ask about passport applications.
      </p>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--color-graphite-light)' }} />
        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="form-input pl-10"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className="px-4 py-2 rounded-full text-xs font-bold transition-all"
            style={{
              background: filter === cat ? 'var(--color-indigo)' : 'var(--color-surface-warm)',
              color: filter === cat ? '#0a0a0c' : 'var(--color-graphite-light)',
              border: `1px solid ${filter === cat ? 'var(--color-indigo)' : 'var(--color-ivory-dark)'}`,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ List */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <p className="text-center py-8" style={{ color: 'var(--color-graphite-light)' }}>No matching questions found.</p>
        )}
        {filtered.map((item, i) => {
          const globalIdx = FAQS.indexOf(item);
          return (
            <div key={globalIdx} className="card overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === globalIdx ? null : globalIdx)}
                className="w-full flex items-start justify-between gap-4 p-5 text-left"
              >
                <div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full mr-2" style={{ background: 'var(--color-surface-warm)', color: 'var(--color-indigo)' }}>{item.cat}</span>
                  <span className="font-semibold text-sm" style={{ color: 'var(--color-graphite)' }}>{item.q}</span>
                </div>
                {openIndex === globalIdx ? <ChevronUp className="w-5 h-5 flex-shrink-0 mt-0.5" /> : <ChevronDown className="w-5 h-5 flex-shrink-0 mt-0.5" />}
              </button>
              {openIndex === globalIdx && (
                <div className="px-5 pb-5 text-sm leading-relaxed animate-fadeIn" style={{ color: 'var(--color-graphite-light)' }}>
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
