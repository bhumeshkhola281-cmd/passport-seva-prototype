import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplication } from '../context/ApplicationContext';
import { AppointmentPass } from '../components/ui/AppointmentPass';
import { CitizenTravelBook } from '../components/CitizenTravelBook';
import { DeskNote } from '../components/layout/DeskNote';
import { FileCheck, MapPin, Truck, RefreshCw } from 'lucide-react';

export function ConfirmationPage() {
  const navigate = useNavigate();
  const { draft, dispatch, isStageComplete } = useApplication();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!isStageComplete(5)) {
      navigate('/apply/payment', { replace: true });
    } else {
      dispatch({ type: 'COMPLETE_STAGE', stage: 6 });
    }
  }, [isStageComplete, navigate, dispatch]);

  const handleRestart = () => {
    dispatch({ type: 'RESET' });
    navigate('/');
  };

  if (!draft.appointment) return null;

  return (
    <div className="w-full max-w-4xl mx-auto pb-24 animate-fadeIn">
      <h1 className="text-4xl mb-12 text-center" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-indigo)' }}>
        You are ready for your appointment
      </h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Pass + 3D Book Section */}
        <div className="flex-1">
          <AppointmentPass 
            appointment={draft.appointment} 
            journeyType={draft.journeyType === 'reissue' ? 'Passport Reissue' : 'New Passport'} 
          />

          {/* 3D Citizen Travel Book — confirmation moment */}
          <div className="mt-8">
            <CitizenTravelBook
              stage="confirmed"
              appointment={{
                centre: draft.appointment.centre,
                date: draft.appointment.date,
                time: draft.appointment.time,
                reference: draft.id,
              }}
              reducedMotion={prefersReducedMotion}
            />
          </div>
        </div>

        {/* Timeline Section */}
        <div className="flex-1 flex flex-col gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-graphite)' }}>What happens next</h2>
            <div className="relative border-l-2 ml-4 pl-8 py-2 space-y-10" style={{ borderColor: 'var(--color-indigo-light)' }}>
              
              <div className="relative">
                <div className="absolute -left-[41px] top-0.5 w-8 h-8 rounded-full flex items-center justify-center border-4" style={{ backgroundColor: 'var(--color-ivory)', borderColor: 'var(--color-indigo)', color: 'var(--color-indigo)' }}>
                  <FileCheck className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-lg" style={{ color: 'var(--color-graphite)' }}>1. Before your visit</h3>
                <p className="mt-1 opacity-80 leading-relaxed">Gather all required original documents from your checklist. Ensure all details match exactly.</p>
              </div>

              <div className="relative">
                <div className="absolute -left-[41px] top-0.5 w-8 h-8 rounded-full flex items-center justify-center border-4" style={{ backgroundColor: 'var(--color-ivory)', borderColor: 'var(--color-indigo)', color: 'var(--color-indigo)' }}>
                  <MapPin className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-lg" style={{ color: 'var(--color-graphite)' }}>2. At the service centre</h3>
                <p className="mt-1 opacity-80 leading-relaxed">Arrive 15 minutes early at {draft.appointment.centre} on {draft.appointment.date}. Bring your documents and this appointment reference.</p>
              </div>

              <div className="relative">
                <div className="absolute -left-[41px] top-0.5 w-8 h-8 rounded-full flex items-center justify-center border-4" style={{ backgroundColor: 'var(--color-ivory)', borderColor: 'var(--color-indigo)', color: 'var(--color-indigo)' }}>
                  <Truck className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-lg" style={{ color: 'var(--color-graphite)' }}>3. After your visit</h3>
                <p className="mt-1 opacity-80 leading-relaxed">Police verification will be initiated. Passport delivery typically takes 2-4 weeks after successful verification.</p>
              </div>

            </div>
          </div>

          <div className="mt-4">
            <DeskNote title="About this step">
              This is where a real service would send you an SMS confirmation and email. In this prototype, your journey is complete.
            </DeskNote>
          </div>

          <div className="mt-8 border-t pt-8" style={{ borderColor: 'var(--color-graphite-light)' }}>
            <button onClick={handleRestart} className="btn btn-ghost flex items-center gap-2 w-full justify-center text-lg">
              <RefreshCw className="w-5 h-5" />
              Start a new application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
