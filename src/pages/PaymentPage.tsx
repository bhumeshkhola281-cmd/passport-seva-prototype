import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplication } from '../context/ApplicationContext';
import { MOCK_PAYMENT_METHODS, PASSPORT_FEE, generateMockReference } from '../data/mockData';
import { DeskNote } from '../components/layout/DeskNote';
import {
  Landmark, CreditCard, Smartphone, CheckCircle, Loader2,
  FileText, ChevronRight, AlertTriangle, ShieldCheck,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  landmark: <Landmark className="w-7 h-7" />,
  'credit-card': <CreditCard className="w-7 h-7" />,
  smartphone: <Smartphone className="w-7 h-7" />,
};

export function PaymentPage() {
  const navigate = useNavigate();
  const { draft, dispatch, isStageComplete } = useApplication();

  const [selectedMethodId, setSelectedMethodId] = useState<string>('');
  const [checking, setChecking] = useState(false);

  const paymentStatus = draft.payment.status;
  const mockReference = draft.payment.mockReference;

  useEffect(() => {
    if (!isStageComplete(4)) {
      navigate('/apply/appointment', { replace: true });
    }
  }, [isStageComplete, navigate]);

  // Auto-transition: processing → in-review after 2s
  useEffect(() => {
    if (paymentStatus === 'processing') {
      const timer = setTimeout(() => {
        dispatch({ type: 'SET_PAYMENT_STATUS', status: 'in-review' });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [paymentStatus, dispatch]);

  const handleStartPayment = () => {
    if (!selectedMethodId) return;
    const method = MOCK_PAYMENT_METHODS.find(m => m.id === selectedMethodId);
    dispatch({ type: 'SET_PAYMENT_METHOD', method: method?.label ?? 'Unknown' });
    dispatch({ type: 'SET_PAYMENT_STATUS', status: 'processing', mockReference: generateMockReference() });
  };

  const handleCheckStatus = () => {
    setChecking(true);
    setTimeout(() => {
      dispatch({ type: 'SET_PAYMENT_STATUS', status: 'complete' });
      setChecking(false);
    }, 1500);
  };

  const handleFinish = () => {
    dispatch({ type: 'COMPLETE_STAGE', stage: 5 });
    navigate('/apply/confirmation');
  };

  return (
    <div className="w-full max-w-3xl mx-auto pb-24 animate-fadeIn">
      <h1 className="text-4xl mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-indigo)' }}>
        Complete your payment
      </h1>
      <p className="mb-8 text-base" style={{ color: 'var(--color-graphite-light)' }}>
        Review and pay the application fee to confirm your appointment.
      </p>

      {/* ── Fee Summary ─────────────────────────────────────────── */}
      <div
        className="card p-6 mb-10 border-2"
        style={{ borderColor: 'var(--color-indigo)', backgroundColor: 'var(--color-surface)' }}
      >
        <div className="flex justify-between items-center mb-4 pb-4 border-b" style={{ borderColor: 'var(--color-ivory-dark)' }}>
          <div>
            <h3 className="font-bold text-lg" style={{ color: 'var(--color-graphite)' }}>Application Fee</h3>
            {draft.appointment && (
              <p className="text-sm mt-1" style={{ color: 'var(--color-graphite-light)' }}>
                {draft.appointment.centre} · {draft.appointment.date}
              </p>
            )}
          </div>
          <div className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-indigo)' }}>
            ₹{PASSPORT_FEE.toLocaleString('en-IN')}
          </div>
        </div>
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-bold"
          style={{ backgroundColor: 'rgba(216, 154, 43, 0.12)', color: 'var(--color-saffron-dark)' }}
        >
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          SIMULATED PAYMENT — No real money will be charged
        </div>
      </div>

      {/* ── View 1: Method Selection ────────────────────────────── */}
      {paymentStatus === 'not-started' && (
        <div className="flex flex-col gap-6 animate-fadeIn">
          <h2 className="text-xl font-bold" style={{ color: 'var(--color-graphite)' }}>Select a payment method</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {MOCK_PAYMENT_METHODS.map((method) => {
              const isSelected = selectedMethodId === method.id;
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setSelectedMethodId(method.id)}
                  className="card text-center p-5 flex flex-col items-center gap-3 transition-all"
                  style={{
                    borderColor: isSelected ? 'var(--color-indigo)' : 'var(--color-ivory-dark)',
                    borderWidth: '2px',
                    backgroundColor: isSelected ? 'rgba(23, 62, 122, 0.04)' : 'var(--color-surface)',
                    boxShadow: isSelected ? '0 0 0 3px rgba(23, 62, 122, 0.12)' : 'none',
                    cursor: 'pointer',
                  }}
                  aria-pressed={isSelected}
                >
                  <div style={{ color: isSelected ? 'var(--color-indigo)' : 'var(--color-graphite-light)' }}>
                    {ICON_MAP[method.icon] ?? <CreditCard className="w-7 h-7" />}
                  </div>
                  <span className="font-bold text-sm" style={{ color: 'var(--color-graphite)' }}>
                    {method.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              className="btn btn-saffron text-lg px-8 py-3"
              disabled={!selectedMethodId}
              onClick={handleStartPayment}
            >
              Pay ₹{PASSPORT_FEE.toLocaleString('en-IN')} (simulated)
            </button>
          </div>
        </div>
      )}

      {/* ── View 2: Processing ──────────────────────────────────── */}
      {paymentStatus === 'processing' && (
        <div className="flex flex-col items-center justify-center py-20 gap-6 animate-fadeIn">
          <Loader2 className="w-16 h-16 animate-spin" style={{ color: 'var(--color-indigo)' }} />
          <h2 className="text-2xl font-bold text-center" style={{ color: 'var(--color-graphite)' }}>
            Processing your simulated payment…
          </h2>
          {mockReference && (
            <p
              className="font-mono text-sm px-4 py-2 rounded-lg"
              style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-graphite)' }}
            >
              Reference: {mockReference}
            </p>
          )}
        </div>
      )}

      {/* ── View 3: In-Review (KEY RECOVERY STATE) ──────────────── */}
      {paymentStatus === 'in-review' && (
        <div className="flex flex-col items-center py-12 gap-8 animate-fadeIn">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(23, 62, 122, 0.1)' }}
          >
            <ShieldCheck className="w-10 h-10" style={{ color: 'var(--color-indigo)' }} />
          </div>

          <div className="text-center max-w-md">
            <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-indigo)' }}>
              Your payment is being verified
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-graphite-light)' }}>
              This may take a moment. Your payment reference has been recorded.
            </p>
          </div>

          <div
            className="p-5 rounded-xl text-center border-2 border-dashed"
            style={{ borderColor: 'var(--color-indigo)', backgroundColor: 'var(--color-surface-warm)' }}
          >
            <span className="block text-xs uppercase font-bold tracking-widest mb-2" style={{ color: 'var(--color-graphite-light)' }}>
              Reference Number
            </span>
            <span className="text-3xl font-mono font-bold tracking-wider" style={{ color: 'var(--color-indigo)' }}>
              {mockReference}
            </span>
          </div>

          <div
            className="flex items-start gap-3 p-4 rounded-xl max-w-md w-full"
            style={{ backgroundColor: 'rgba(192, 57, 43, 0.08)', color: 'var(--color-error)' }}
          >
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-bold">Do not make another payment.</p>
              <p className="mt-1 opacity-80">Your reference has been recorded. Making a duplicate payment may result in delays.</p>
            </div>
          </div>

          <DeskNote title="What's happening here">
            In a real service, this screen would check with the payment provider. Here it simulates a successful verification after you press the button below.
          </DeskNote>

          <button
            className="btn btn-primary px-8 py-3"
            onClick={handleCheckStatus}
            disabled={checking}
          >
            {checking ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Verifying…
              </>
            ) : (
              'Check payment status'
            )}
          </button>
        </div>
      )}

      {/* ── View 4: Success ─────────────────────────────────────── */}
      {paymentStatus === 'complete' && (
        <div className="flex flex-col items-center py-12 animate-fadeIn text-center gap-6">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-success)', color: 'white' }}
          >
            <CheckCircle className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-success)' }}>
            Payment Successful
          </h2>

          <div
            className="w-full max-w-md card p-6 text-left border"
            style={{ borderColor: 'var(--color-ivory-dark)' }}
          >
            <h3 className="flex items-center gap-2 font-bold mb-4 pb-4 border-b" style={{ borderColor: 'var(--color-ivory-dark)' }}>
              <FileText className="w-5 h-5" /> Receipt
            </h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt style={{ color: 'var(--color-graphite-light)' }}>Amount</dt>
                <dd className="font-bold">₹{PASSPORT_FEE.toLocaleString('en-IN')}</dd>
              </div>
              <div className="flex justify-between">
                <dt style={{ color: 'var(--color-graphite-light)' }}>Method</dt>
                <dd className="font-bold">{draft.payment.method}</dd>
              </div>
              <div className="flex justify-between">
                <dt style={{ color: 'var(--color-graphite-light)' }}>Reference</dt>
                <dd className="font-mono font-bold">{mockReference}</dd>
              </div>
              <div className="flex justify-between">
                <dt style={{ color: 'var(--color-graphite-light)' }}>Date</dt>
                <dd className="font-bold">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-6 w-full max-w-md">
            <button className="btn btn-primary w-full flex justify-center items-center gap-2 text-lg py-3" onClick={handleFinish}>
              View your appointment pass
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
