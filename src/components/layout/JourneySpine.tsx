import { useApplication } from '../../context/ApplicationContext';
import { STAGE_LABELS } from '../../data/mockData';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';

const STAGE_ROUTES = [
  '/',
  '/apply/scenario',
  '/apply/documents',
  '/apply/details',
  '/apply/appointment',
  '/apply/payment',
  '/apply/confirmation',
];

export function JourneySpine({ compact = false }: { compact?: boolean }) {
  const { draft, isStageComplete, isStageAccessible } = useApplication();
  const navigate = useNavigate();
  const location = useLocation();

  const currentRouteIndex = STAGE_ROUTES.findIndex((r) => r === location.pathname);

  // Only show stages 1-6 in the spine (welcome is the entry point)
  const stages = STAGE_LABELS.slice(1);

  if (compact) {
    // Mobile: compact horizontal ribbon
    return (
      <nav aria-label="Application progress" className="flex items-center gap-1 overflow-x-auto pb-2">
        {stages.map((s) => {
          const completed = isStageComplete(s.stage);
          const active = currentRouteIndex === s.stage;
          const accessible = isStageAccessible(s.stage);

          return (
            <button
              key={s.stage}
              type="button"
              onClick={() => accessible && navigate(STAGE_ROUTES[s.stage])}
              disabled={!accessible}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors"
              style={{
                backgroundColor: active
                  ? 'var(--color-indigo)'
                  : completed
                    ? 'var(--color-success)'
                    : 'var(--color-ivory-dark)',
                color: active || completed ? 'white' : 'var(--color-graphite-light)',
                minHeight: '36px',
                opacity: accessible ? 1 : 0.5,
                cursor: accessible ? 'pointer' : 'not-allowed',
              }}
              aria-current={active ? 'step' : undefined}
              aria-label={`${s.short}${completed ? ' (completed)' : active ? ' (current)' : ''}`}
            >
              {completed && <Check size={12} />}
              {s.short}
            </button>
          );
        })}
      </nav>
    );
  }

  // Desktop: vertical spine with connecting lines
  return (
    <nav aria-label="Application progress">
      <p className="eyebrow mb-4">Your journey</p>
      <ol className="list-none p-0 m-0 space-y-0">
        {stages.map((s, i) => {
          const completed = isStageComplete(s.stage);
          const active = currentRouteIndex === s.stage;
          const accessible = isStageAccessible(s.stage);
          const isLast = i === stages.length - 1;

          return (
            <li key={s.stage} className="spine-step">
              {/* Connecting line */}
              {!isLast && (
                <div
                  className={`spine-line ${completed ? 'spine-line-completed' : ''}`}
                />
              )}

              {/* Dot */}
              <div
                className={`spine-dot ${
                  completed
                    ? 'spine-dot-completed'
                    : active
                      ? 'spine-dot-active'
                      : 'spine-dot-locked'
                }`}
              >
                {completed ? <Check size={14} /> : s.stage}
              </div>

              {/* Label */}
              <button
                type="button"
                onClick={() => accessible && navigate(STAGE_ROUTES[s.stage])}
                disabled={!accessible}
                className="text-left bg-transparent border-0 p-0 cursor-pointer"
                style={{
                  color: active
                    ? 'var(--color-indigo)'
                    : completed
                      ? 'var(--color-success)'
                      : 'var(--color-graphite-light)',
                  fontWeight: active ? 700 : 500,
                  fontSize: '0.875rem',
                  cursor: accessible ? 'pointer' : 'default',
                  opacity: accessible ? 1 : 0.5,
                }}
                aria-current={active ? 'step' : undefined}
              >
                {s.label}
              </button>
            </li>
          );
        })}
      </ol>

      {/* Save status */}
      <div
        className="mt-6 pt-4 border-t text-xs"
        style={{ borderColor: 'var(--color-ivory-dark)', color: 'var(--color-graphite-light)' }}
      >
        <p>Application: {draft.id}</p>
        {draft.journeyType && (
          <p className="mt-1 capitalize">{draft.journeyType === 'reissue' ? 'Passport reissue' : 'New passport'}</p>
        )}
      </div>
    </nav>
  );
}
