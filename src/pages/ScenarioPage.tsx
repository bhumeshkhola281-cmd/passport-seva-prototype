import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplication } from '../context/ApplicationContext';
import { buildDocumentList } from '../data/mockData';
import { BookOpen, RefreshCw, ArrowRight, MapPin, UserCog, Check } from 'lucide-react';

export function ScenarioPage() {
  const navigate = useNavigate();
  const { draft, dispatch, isStageComplete } = useApplication();

  const [journeyType, setJourneyType] = useState<'standard' | 'reissue' | null>(draft.journeyType ?? null);
  const [addressChanged, setAddressChanged] = useState(draft.scenario.addressChanged);
  const [detailsChanged, setDetailsChanged] = useState(draft.scenario.detailsChanged);

  useEffect(() => {
    if (!isStageComplete(0)) {
      navigate('/', { replace: true });
    }
  }, [isStageComplete, navigate]);

  const handleContinue = () => {
    if (!journeyType) return;
    dispatch({ type: 'SET_JOURNEY_TYPE', journeyType });
    dispatch({ type: 'SET_SCENARIO', scenario: { addressChanged, detailsChanged } });
    const docs = buildDocumentList(journeyType, { addressChanged, detailsChanged });
    dispatch({ type: 'SET_DOCUMENTS', documents: docs });
    dispatch({ type: 'COMPLETE_STAGE', stage: 1 });
    navigate('/apply/documents');
  };

  return (
    <div className="max-w-3xl mx-auto pb-20 animate-fadeIn">
      {/* Heading */}
      <div className="mb-10">
        <h1
          className="text-4xl md:text-5xl mb-3"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-indigo)' }}
        >
          What do you need?
        </h1>
        <p className="text-lg" style={{ color: 'var(--color-graphite-light)' }}>
          Select the service that applies to you. This helps us build the right document checklist.
        </p>
      </div>

      {/* Journey type selection */}
      <div className="grid md:grid-cols-2 gap-5 mb-10">
        {/* First Passport */}
        <button
          type="button"
          onClick={() => setJourneyType('standard')}
          className="card text-left p-6 transition-all"
          style={{
            borderWidth: '2px',
            borderColor: journeyType === 'standard' ? 'var(--color-indigo)' : 'var(--color-ivory-dark)',
            boxShadow: journeyType === 'standard'
              ? '0 0 0 3px rgba(23, 62, 122, 0.1), 0 4px 12px rgba(23, 62, 122, 0.08)'
              : undefined,
            cursor: 'pointer',
          }}
          aria-pressed={journeyType === 'standard'}
        >
          <div className="flex items-start gap-4">
            <div
              className="p-3 rounded-xl flex-shrink-0"
              style={{ backgroundColor: journeyType === 'standard' ? 'var(--color-indigo)' : 'var(--color-ivory)' }}
            >
              <BookOpen size={26} style={{ color: journeyType === 'standard' ? 'white' : 'var(--color-indigo)' }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold" style={{ color: 'var(--color-graphite)' }}>New Passport</h3>
                {journeyType === 'standard' && (
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-indigo)' }}>
                    <Check size={14} color="white" />
                  </div>
                )}
              </div>
              <p className="text-sm mt-2" style={{ color: 'var(--color-graphite-light)' }}>
                Applying for the first time? We'll guide you through every document you need.
              </p>
            </div>
          </div>
        </button>

        {/* Reissue */}
        <button
          type="button"
          onClick={() => setJourneyType('reissue')}
          className="card text-left p-6 transition-all"
          style={{
            borderWidth: '2px',
            borderColor: journeyType === 'reissue' ? 'var(--color-indigo)' : 'var(--color-ivory-dark)',
            boxShadow: journeyType === 'reissue'
              ? '0 0 0 3px rgba(23, 62, 122, 0.1), 0 4px 12px rgba(23, 62, 122, 0.08)'
              : undefined,
            cursor: 'pointer',
          }}
          aria-pressed={journeyType === 'reissue'}
        >
          <div className="flex items-start gap-4">
            <div
              className="p-3 rounded-xl flex-shrink-0"
              style={{ backgroundColor: journeyType === 'reissue' ? 'var(--color-indigo)' : 'var(--color-ivory)' }}
            >
              <RefreshCw size={26} style={{ color: journeyType === 'reissue' ? 'white' : 'var(--color-indigo)' }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold" style={{ color: 'var(--color-graphite)' }}>Re-issue Passport</h3>
                {journeyType === 'reissue' && (
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-indigo)' }}>
                    <Check size={14} color="white" />
                  </div>
                )}
              </div>
              <p className="text-sm mt-2" style={{ color: 'var(--color-graphite-light)' }}>
                Expired, damaged, or need to update details? We'll include the extra documents you need.
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Reissue follow-up questions */}
      {journeyType === 'reissue' && (
        <div
          className="animate-fadeIn rounded-2xl p-6 md:p-8 mb-10"
          style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-ivory-dark)' }}
        >
          <h2
            className="text-xl mb-6 pb-4 border-b"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-indigo)', borderColor: 'var(--color-ivory-dark)' }}
          >
            A few more details
          </h2>

          <div className="space-y-8">
            {/* Address change */}
            <div>
              <p className="font-semibold text-base mb-3" style={{ color: 'var(--color-graphite)' }}>
                <MapPin size={16} className="inline mr-2" style={{ color: 'var(--color-indigo)' }} />
                Has your address changed since your last passport?
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setAddressChanged(true)}
                  className="px-6 py-3 rounded-full font-semibold text-sm transition-all min-h-[44px]"
                  style={{
                    backgroundColor: addressChanged ? 'var(--color-indigo)' : 'var(--color-ivory)',
                    color: addressChanged ? 'white' : 'var(--color-graphite)',
                  }}
                >
                  Yes, it has changed
                </button>
                <button
                  type="button"
                  onClick={() => setAddressChanged(false)}
                  className="px-6 py-3 rounded-full font-semibold text-sm transition-all min-h-[44px]"
                  style={{
                    backgroundColor: !addressChanged ? 'var(--color-indigo)' : 'var(--color-ivory)',
                    color: !addressChanged ? 'white' : 'var(--color-graphite)',
                  }}
                >
                  No change
                </button>
              </div>
            </div>

            {/* Details change */}
            <div>
              <p className="font-semibold text-base mb-3" style={{ color: 'var(--color-graphite)' }}>
                <UserCog size={16} className="inline mr-2" style={{ color: 'var(--color-indigo)' }} />
                Do you need to update your name or other personal details?
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setDetailsChanged(true)}
                  className="px-6 py-3 rounded-full font-semibold text-sm transition-all min-h-[44px]"
                  style={{
                    backgroundColor: detailsChanged ? 'var(--color-indigo)' : 'var(--color-ivory)',
                    color: detailsChanged ? 'white' : 'var(--color-graphite)',
                  }}
                >
                  Yes, update needed
                </button>
                <button
                  type="button"
                  onClick={() => setDetailsChanged(false)}
                  className="px-6 py-3 rounded-full font-semibold text-sm transition-all min-h-[44px]"
                  style={{
                    backgroundColor: !detailsChanged ? 'var(--color-indigo)' : 'var(--color-ivory)',
                    color: !detailsChanged ? 'white' : 'var(--color-graphite)',
                  }}
                >
                  No changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t" style={{ borderColor: 'var(--color-ivory-dark)' }}>
        <p className="text-sm" style={{ color: 'var(--color-graphite-light)' }}>
          You can change this selection later
        </p>
        <button
          onClick={handleContinue}
          disabled={!journeyType}
          className="btn btn-primary flex items-center gap-2 px-8 py-3 text-base"
        >
          Continue
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
