import React from 'react';
import { Calendar, Clock, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Appointment {
  centre: string;
  date: string;
  time: string;
  reference: string;
}

interface AppointmentPassProps {
  appointment: Appointment;
  journeyType: string;
}

export function AppointmentPass({ appointment, journeyType }: AppointmentPassProps) {
  return (
    <div className="max-w-md w-full mx-auto rounded-2xl overflow-hidden shadow-lg border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-ivory-dark)' }}>
      {/* Header */}
      <div className="p-6 text-center border-b" style={{ backgroundColor: 'var(--color-indigo)', color: 'var(--color-surface)', borderColor: 'var(--color-indigo-light)' }}>
        <p className="eyebrow uppercase text-xs font-bold tracking-wider mb-2 opacity-80" style={{ fontFamily: 'var(--font-ui)' }}>Passport Seva Prototype</p>
        <h2 className="text-3xl mb-1" style={{ fontFamily: 'var(--font-display)' }}>Appointment Confirmed</h2>
        <p className="text-sm opacity-90">{journeyType}</p>
      </div>

      {/* Details */}
      <div className="p-6 border-b" style={{ borderColor: 'var(--color-ivory-dark)' }}>
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <MapPin className="mt-1" style={{ color: 'var(--color-indigo)' }} size={20} />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--color-graphite-light)' }}>Location</p>
              <p className="font-medium" style={{ color: 'var(--color-graphite)' }}>{appointment.centre}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Calendar className="mt-1" style={{ color: 'var(--color-indigo)' }} size={20} />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--color-graphite-light)' }}>Date</p>
              <p className="font-medium" style={{ color: 'var(--color-graphite)' }}>{appointment.date}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="mt-1" style={{ color: 'var(--color-indigo)' }} size={20} />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--color-graphite-light)' }}>Time</p>
              <p className="font-medium" style={{ color: 'var(--color-graphite)' }}>{appointment.time}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-xl text-center border-2 border-dashed" style={{ borderColor: 'var(--color-ivory-dark)', backgroundColor: 'var(--color-surface-warm)' }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--color-graphite-light)' }}>Reference Number</p>
          <p className="text-2xl font-mono tracking-widest font-bold" style={{ color: 'var(--color-indigo)' }}>{appointment.reference}</p>
          <p className="text-xs mt-2" style={{ color: 'var(--color-saffron)' }}>
            Please save this number. You will need it upon arrival.
          </p>
        </div>
      </div>

      {/* Checklist */}
      <div className="p-6">
        <h3 className="font-bold text-lg mb-3" style={{ color: 'var(--color-graphite)' }}>What to bring</h3>
        <ul className="flex flex-col gap-3">
          <li className="flex items-start gap-2" style={{ color: 'var(--color-graphite)' }}>
            <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--color-success)' }} />
            <span className="text-sm">Printed appointment confirmation</span>
          </li>
          <li className="flex items-start gap-2" style={{ color: 'var(--color-graphite)' }}>
            <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--color-success)' }} />
            <span className="text-sm">All original documents from your readiness checklist</span>
          </li>
          <li className="flex items-start gap-2" style={{ color: 'var(--color-graphite)' }}>
            <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--color-success)' }} />
            <span className="text-sm">Current passport (if renewing)</span>
          </li>
        </ul>

        <div className="mt-6 p-3 rounded-lg flex items-start gap-2 text-xs" style={{ backgroundColor: '#FDF2F2', color: 'var(--color-error)' }}>
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          <p>
            <strong>Simulated Prototype:</strong> This is an unofficial hackathon prototype. No real appointment has been booked.
          </p>
        </div>
      </div>
    </div>
  );
}
