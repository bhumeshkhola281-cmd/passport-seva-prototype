import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplication } from '../context/ApplicationContext';
import { MOCK_CENTRES, getMockDates, MOCK_TIME_SLOTS } from '../data/mockData';
import { DeskNote } from '../components/layout/DeskNote';
import { CentreCard } from '../components/ui/CentreCard';
import { TimeSlotGrid } from '../components/ui/TimeSlotGrid';
import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';

function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}

export function AppointmentPage() {
  const navigate = useNavigate();
  const { draft, dispatch, isStageComplete } = useApplication();

  const [selectedCentreId, setSelectedCentreId] = useState<string>(draft.appointment?.centreId ?? '');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const mockDates = useMemo(() => getMockDates(), []);

  useEffect(() => {
    if (!isStageComplete(3)) {
      navigate('/apply/details', { replace: true });
    }
  }, [isStageComplete, navigate]);

  const selectedCentre = MOCK_CENTRES.find(c => c.id === selectedCentreId);
  const isComplete = selectedCentreId !== '' && selectedDate !== '' && selectedTime !== '';

  const handleContinue = () => {
    if (!isComplete || !selectedCentre) return;
    dispatch({
      type: 'SET_APPOINTMENT',
      appointment: {
        centre: selectedCentre.name,
        centreId: selectedCentre.id,
        date: formatDate(selectedDate),
        time: selectedTime,
        visitDuration: selectedCentre.visitDuration,
        travelCue: selectedCentre.travelCue,
        languages: selectedCentre.languages,
      },
    });
    dispatch({ type: 'COMPLETE_STAGE', stage: 4 });
    navigate('/apply/payment');
  };

  return (
    <div className="w-full max-w-3xl mx-auto pb-24 animate-fadeIn">
      <h1 className="text-4xl mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-indigo)' }}>
        Select your appointment
      </h1>
      <p className="mb-10 text-base" style={{ color: 'var(--color-graphite-light)' }}>
        Choose a convenient service centre, date, and time for your visit.
      </p>

      <div className="flex flex-col gap-12">
        {/* ── Step 1: Centre ───────────────────────────────────── */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
              style={{ backgroundColor: selectedCentreId ? 'var(--color-success)' : 'var(--color-indigo)', color: 'white' }}
            >
              {selectedCentreId ? '✓' : '1'}
            </div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--color-graphite)' }}>Choose a service centre</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {MOCK_CENTRES.map((centre) => (
              <CentreCard
                key={centre.id}
                centre={centre}
                selected={selectedCentreId === centre.id}
                onSelect={() => {
                  setSelectedCentreId(centre.id);
                  setSelectedDate('');
                  setSelectedTime('');
                }}
              />
            ))}
          </div>
        </section>

        {/* ── Step 2: Date ─────────────────────────────────────── */}
        {selectedCentreId && (
          <section className="animate-fadeIn">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
                style={{ backgroundColor: selectedDate ? 'var(--color-success)' : 'var(--color-indigo)', color: 'white' }}
              >
                {selectedDate ? '✓' : '2'}
              </div>
              <h2 className="text-xl font-bold" style={{ color: 'var(--color-graphite)' }}>Choose a date</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {mockDates.map((iso) => {
                const d = new Date(iso + 'T00:00:00');
                const dayName = d.toLocaleDateString('en-IN', { weekday: 'short' });
                const dayNum = d.getDate();
                const monthName = d.toLocaleDateString('en-IN', { month: 'short' });
                const isSelected = selectedDate === iso;
                return (
                  <button
                    key={iso}
                    type="button"
                    onClick={() => { setSelectedDate(iso); setSelectedTime(''); }}
                    className="flex flex-col items-center justify-center rounded-xl border-2 transition-all"
                    style={{
                      width: '88px',
                      height: '88px',
                      backgroundColor: isSelected ? 'var(--color-indigo)' : 'var(--color-surface)',
                      borderColor: isSelected ? 'var(--color-indigo)' : 'var(--color-ivory-dark)',
                      color: isSelected ? 'white' : 'var(--color-graphite)',
                      cursor: 'pointer',
                    }}
                  >
                    <span className="text-xs font-semibold opacity-70">{dayName}</span>
                    <span className="text-2xl font-bold leading-tight">{dayNum}</span>
                    <span className="text-xs font-medium">{monthName}</span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* ── Step 3: Time ─────────────────────────────────────── */}
        {selectedDate && (
          <section className="animate-fadeIn">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
                style={{ backgroundColor: selectedTime ? 'var(--color-success)' : 'var(--color-indigo)', color: 'white' }}
              >
                {selectedTime ? '✓' : '3'}
              </div>
              <h2 className="text-xl font-bold" style={{ color: 'var(--color-graphite)' }}>Choose a time</h2>
            </div>
            <TimeSlotGrid
              slots={MOCK_TIME_SLOTS}
              selectedSlot={selectedTime}
              onSelect={setSelectedTime}
            />
          </section>
        )}

        {/* ── Summary Card ─────────────────────────────────────── */}
        {isComplete && selectedCentre && (
          <section className="animate-fadeIn">
            <div
              className="card p-6 flex flex-col gap-4 border-2"
              style={{ borderColor: 'var(--color-saffron)', backgroundColor: 'var(--color-surface-warm)' }}
            >
              <h3 className="eyebrow" style={{ color: 'var(--color-saffron-dark)' }}>
                Your selection
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-indigo)' }} />
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--color-graphite-light)' }}>Centre</div>
                    <div className="font-semibold text-sm">{selectedCentre.name}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-indigo)' }} />
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--color-graphite-light)' }}>Date</div>
                    <div className="font-semibold text-sm">{formatDate(selectedDate)}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-indigo)' }} />
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--color-graphite-light)' }}>Time</div>
                    <div className="font-semibold text-sm">{selectedTime}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <DeskNote title="About changing your selection">
          You can change your selection at any time before payment. Your document pack will not be affected.
        </DeskNote>

        <div className="flex justify-end">
          <button
            onClick={handleContinue}
            disabled={!isComplete}
            className="btn btn-primary flex items-center gap-2 text-base px-8 py-3"
          >
            Continue to payment
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
