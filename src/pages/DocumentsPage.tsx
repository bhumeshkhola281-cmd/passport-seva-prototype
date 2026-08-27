import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplication } from '../context/ApplicationContext';
import type { DocumentStatus } from '../context/ApplicationContext';
import { DocumentCard } from '../components/ui/DocumentCard';
import { ReadinessRing } from '../components/ui/ReadinessRing';
import { DeskNote } from '../components/layout/DeskNote';
import { ArrowRight } from 'lucide-react';

export const DocumentsPage: React.FC = () => {
  const navigate = useNavigate();
  const { draft, dispatch, isStageComplete } = useApplication();

  useEffect(() => {
    if (!isStageComplete(1)) {
      navigate('/apply/scenario');
    }
  }, [isStageComplete, navigate]);

  const { documents } = draft;
  
  const readyCount = documents.filter(doc => doc.status === 'ready').length;
  const totalCount = documents.length;
  const allCoreDocsSet = documents
    .filter(doc => !doc.conditional)
    .every(doc => doc.status !== 'not-set');

  const handleStatusChange = (id: string, status: DocumentStatus) => {
    dispatch({ type: 'UPDATE_DOCUMENT_STATUS', id, status });
  };

  const handleContinue = () => {
    dispatch({ type: 'COMPLETE_STAGE', stage: 2 });
    navigate('/apply/details');
  };

  const coreDocs = documents.filter(doc => !doc.conditional);
  const conditionalDocs = documents.filter(doc => doc.conditional);

  const encouragement = readyCount === totalCount
    ? 'All documents ready — you can continue!'
    : readyCount > 0
      ? 'Good progress! Mark each document when you have it ready.'
      : 'Mark each document as ready or note what you still need to arrange.';

  return (
    <div className="max-w-2xl mx-auto pb-20 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center gap-8 mb-10">
        <div className="flex-1">
          <h1 
            className="text-4xl mb-4"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-indigo)' }}
          >
            Prepare your documents
          </h1>
          <p className="text-lg" style={{ color: 'var(--color-graphite-light)' }}>
            {readyCount} of {totalCount} documents ready
          </p>
          <p className="text-sm mt-2" style={{ color: 'var(--color-graphite-light)' }}>
            {encouragement}
          </p>
        </div>
        <div className="flex-shrink-0 flex justify-center">
          <ReadinessRing ready={readyCount} total={totalCount} />
        </div>
      </div>

      <div className="mb-10">
        <DeskNote title="About this step">
          You don't need to have everything right now, but knowing what you need helps you prepare for your appointment.
        </DeskNote>
      </div>

      <div className="space-y-4 mb-10">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-indigo)' }}>Core Documents</h2>
        {coreDocs.map(doc => (
          <DocumentCard 
            key={doc.id} 
            doc={doc} 
            onStatusChange={handleStatusChange} 
          />
        ))}
      </div>

      {conditionalDocs.length > 0 && (
        <div className="space-y-4 mb-10">
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-indigo)' }}>Additional documents for your situation</h2>
          {conditionalDocs.map(doc => (
            <DocumentCard 
              key={doc.id} 
              doc={doc} 
              onStatusChange={handleStatusChange} 
            />
          ))}
        </div>
      )}

      <div className="flex justify-end">
        <button 
          onClick={handleContinue}
          disabled={!allCoreDocsSet}
          className="btn btn-primary inline-flex items-center gap-2"
        >
          Continue
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};
