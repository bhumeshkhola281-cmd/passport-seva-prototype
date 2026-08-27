import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Shield, Truck, CheckCircle, FileText, Eye, Printer, Package, AlertCircle } from 'lucide-react';

const STATUSES = [
  { id: 'submitted', icon: FileText, label: 'Application Submitted', duration: 'Immediate', meaning: 'Your application has been received and a file number has been assigned. No action needed from you.', action: 'Save your application reference number.' },
  { id: 'under-review', icon: Eye, label: 'Under Review', duration: '1\u20133 working days', meaning: 'A passport officer is reviewing your documents and personal details for completeness and accuracy.', action: 'No action needed. If documents are missing, you will be contacted.' },
  { id: 'police-verification', icon: Shield, label: 'Police Verification', duration: '2\u20134 weeks (varies by state)', meaning: 'Your local police station has been asked to verify your address and identity. An officer may visit your home.', action: 'Keep original documents ready. Be available at your registered address.' },
  { id: 'pv-complete', icon: CheckCircle, label: 'Police Verification Complete', duration: 'Immediate after report', meaning: 'The police have submitted their verification report to the passport office. Your file moves back for final review.', action: 'No action needed.' },
  { id: 'granted', icon: CheckCircle, label: 'Passport Granted', duration: '1\u20132 working days after PV', meaning: 'Your passport application has been approved. It will now be sent for printing.', action: 'No action needed. Your passport will be printed shortly.' },
  { id: 'printing', icon: Printer, label: 'Printing', duration: '2\u20134 working days', meaning: 'Your passport booklet is being printed at the Central Passport Printing Facility in Delhi.', action: 'No action needed.' },
  { id: 'dispatched', icon: Package, label: 'Dispatched', duration: '3\u20137 working days for delivery', meaning: 'Your passport has been dispatched via Speed Post. You will receive an SMS with the tracking number.', action: 'Track using the Speed Post consignment number sent via SMS.' },
  { id: 'delivered', icon: Truck, label: 'Delivered', duration: 'Final', meaning: 'Your passport has been delivered to your registered address. If you did not receive it, contact the Speed Post office.', action: 'Sign for delivery. Verify all details in the passport immediately.' },
];

export function StatusGlossaryPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto pb-24 animate-fadeIn">
      <button onClick={() => navigate(-1)} className="btn btn-ghost flex items-center gap-2 mb-8 -ml-4">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <h1 className="text-4xl mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-indigo)' }}>
        Application Status Guide
      </h1>
      <p className="text-base mb-12" style={{ color: 'var(--color-graphite-light)' }}>
        Plain-language explanations of every status your passport application goes through, with estimated timelines.
      </p>

      {/* Estimated Total */}
      <div className="card p-6 mb-10 flex items-center gap-4" style={{ borderLeft: '4px solid var(--color-indigo)' }}>
        <Clock className="w-8 h-8 flex-shrink-0" style={{ color: 'var(--color-indigo)' }} />
        <div>
          <h3 className="text-lg font-bold" style={{ color: 'var(--color-graphite)' }}>Estimated total time</h3>
          <p className="text-sm" style={{ color: 'var(--color-graphite-light)' }}>
            Normal: <strong>30\u201345 days</strong> from appointment to delivery &nbsp;|&nbsp; Tatkal: <strong>7\u201314 days</strong>
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative ml-6">
        {/* Vertical line */}
        <div className="absolute left-4 top-4 bottom-4 w-0.5" style={{ background: 'var(--color-ivory-dark)' }} />

        <div className="space-y-1">
          {STATUSES.map((s) => (
            <div key={s.id} className="relative pl-14 pb-8">
              {/* Dot */}
              <div
                className="absolute left-0 top-1 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'var(--color-surface)', border: '2px solid var(--color-indigo)' }}
              >
                <s.icon className="w-4 h-4" style={{ color: 'var(--color-indigo)' }} />
              </div>

              <div className="card p-5">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold" style={{ color: 'var(--color-graphite)' }}>{s.label}</h3>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: 'var(--color-indigo)', color: '#0a0a0c' }}>
                    {s.duration}
                  </span>
                </div>
                <p className="text-sm mb-3" style={{ color: 'var(--color-graphite-light)' }}>{s.meaning}</p>
                <div className="flex items-start gap-2 text-sm font-medium" style={{ color: 'var(--color-saffron)' }}>
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{s.action}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
