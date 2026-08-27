import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

/* ── Types ─────────────────────────────────────────────────────── */

export type JourneyType = 'standard' | 'reissue';

export type ScenarioFlags = {
  addressChanged: boolean;
  detailsChanged: boolean;
};

export type DocumentStatus = 'ready' | 'need-to-arrange' | 'not-set';

export type DocumentItem = {
  id: string;
  label: string;
  description: string;
  format: string;
  whyNeeded: string;
  status: DocumentStatus;
  conditional?: boolean;         // only shown for certain scenarios
  conditionKey?: keyof ScenarioFlags;
};

export type Profile = {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  placeOfBirth: string;
  mobile: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
};

export type AppointmentSlot = {
  centre: string;
  centreId: string;
  date: string;
  time: string;
  visitDuration: string;
  travelCue: string;
  languages: string[];
};

export type PaymentStatus = 'not-started' | 'pending' | 'processing' | 'in-review' | 'complete' | 'failed';

export type PaymentInfo = {
  status: PaymentStatus;
  mockReference: string;
  amount: number;
  method: string;
};

export type ApplicationDraft = {
  id: string;
  journeyType: JourneyType | null;
  scenario: ScenarioFlags;
  documents: DocumentItem[];
  profile: Profile;
  appointment: AppointmentSlot | null;
  payment: PaymentInfo;
  currentStage: number;
  completedStages: number[];
  createdAt: string;
};

export type AppStage = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/* ── Initial State ─────────────────────────────────────────────── */

const EMPTY_PROFILE: Profile = {
  fullName: '',
  dateOfBirth: '',
  gender: '',
  placeOfBirth: '',
  mobile: '',
  email: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  pincode: '',
};

const PREFILLED_PROFILE: Profile = {
  fullName: 'Meera Shah',
  dateOfBirth: '1998-03-15',
  gender: 'Female',
  placeOfBirth: 'Jaipur',
  mobile: '9876543210',
  email: 'meera.shah@example.com',
  addressLine1: '42, Rani Sati Nagar',
  addressLine2: 'Near City Hospital',
  city: 'Jaipur',
  state: 'Rajasthan',
  pincode: '302019',
};

export function createInitialDraft(prefilled = true): ApplicationDraft {
  return {
    id: 'SL-DEMO-2026-001',
    journeyType: null,
    scenario: { addressChanged: false, detailsChanged: false },
    documents: [],
    profile: prefilled ? { ...PREFILLED_PROFILE } : { ...EMPTY_PROFILE },
    appointment: null,
    payment: {
      status: 'not-started',
      mockReference: '',
      amount: 0,
      method: '',
    },
    currentStage: 0,
    completedStages: [],
    createdAt: new Date().toISOString(),
  };
}

/* ── Actions ───────────────────────────────────────────────────── */

type Action =
  | { type: 'START_APPLICATION'; prefilled?: boolean }
  | { type: 'SET_JOURNEY_TYPE'; journeyType: JourneyType }
  | { type: 'SET_SCENARIO'; scenario: Partial<ScenarioFlags> }
  | { type: 'SET_DOCUMENTS'; documents: DocumentItem[] }
  | { type: 'UPDATE_DOCUMENT_STATUS'; id: string; status: DocumentStatus }
  | { type: 'SET_PROFILE'; profile: Partial<Profile> }
  | { type: 'SET_APPOINTMENT'; appointment: AppointmentSlot }
  | { type: 'SET_PAYMENT_METHOD'; method: string }
  | { type: 'SET_PAYMENT_STATUS'; status: PaymentStatus; mockReference?: string }
  | { type: 'NAVIGATE_TO_STAGE'; stage: number }
  | { type: 'COMPLETE_STAGE'; stage: number }
  | { type: 'RESET' };

function reducer(state: ApplicationDraft, action: Action): ApplicationDraft {
  switch (action.type) {
    case 'START_APPLICATION':
      return createInitialDraft(action.prefilled ?? true);

    case 'SET_JOURNEY_TYPE':
      return { ...state, journeyType: action.journeyType };

    case 'SET_SCENARIO':
      return { ...state, scenario: { ...state.scenario, ...action.scenario } };

    case 'SET_DOCUMENTS':
      return { ...state, documents: action.documents };

    case 'UPDATE_DOCUMENT_STATUS':
      return {
        ...state,
        documents: state.documents.map((d) =>
          d.id === action.id ? { ...d, status: action.status } : d
        ),
      };

    case 'SET_PROFILE':
      return { ...state, profile: { ...state.profile, ...action.profile } };

    case 'SET_APPOINTMENT':
      return { ...state, appointment: action.appointment };

    case 'SET_PAYMENT_METHOD':
      return {
        ...state,
        payment: { ...state.payment, method: action.method },
      };

    case 'SET_PAYMENT_STATUS': {
      const ref = action.mockReference ?? state.payment.mockReference;
      return {
        ...state,
        payment: { ...state.payment, status: action.status, mockReference: ref },
      };
    }

    case 'NAVIGATE_TO_STAGE':
      return { ...state, currentStage: action.stage };

    case 'COMPLETE_STAGE':
      return {
        ...state,
        completedStages: state.completedStages.includes(action.stage)
          ? state.completedStages
          : [...state.completedStages, action.stage],
      };

    case 'RESET':
      return createInitialDraft();

    default:
      return state;
  }
}

/* ── Context ───────────────────────────────────────────────────── */

type AppContextValue = {
  draft: ApplicationDraft;
  dispatch: React.Dispatch<Action>;
  hasStarted: boolean;
  isStageComplete: (stage: number) => boolean;
  isStageAccessible: (stage: number) => boolean;
  savedStatus: 'idle' | 'saving' | 'saved';
};

const ApplicationContext = createContext<AppContextValue | null>(null);

const STORAGE_KEY = 'safar-ledger-draft';

function loadDraft(): ApplicationDraft | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore corrupt data
  }
  return null;
}

function saveDraft(draft: ApplicationDraft) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // storage full or unavailable
  }
}

export function ApplicationProvider({ children }: { children: React.ReactNode }) {
  const saved = loadDraft();
  const [draft, dispatch] = useReducer(reducer, saved ?? createInitialDraft());
  const [savedStatus, setSavedStatus] = React.useState<'idle' | 'saving' | 'saved'>('idle');

  useEffect(() => {
    setSavedStatus('saving');
    const t = setTimeout(() => {
      saveDraft(draft);
      setSavedStatus('saved');
    }, 300);
    return () => clearTimeout(t);
  }, [draft]);

  const hasStarted = draft.journeyType !== null;

  const isStageComplete = useCallback(
    (stage: number) => draft.completedStages.includes(stage),
    [draft.completedStages]
  );

  const isStageAccessible = useCallback(
    (stage: number) => {
      if (stage === 0) return true;
      // A stage is accessible if the previous stage is complete
      return draft.completedStages.includes(stage - 1);
    },
    [draft.completedStages]
  );

  return (
    <ApplicationContext.Provider
      value={{ draft, dispatch, hasStarted, isStageComplete, isStageAccessible, savedStatus }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplication() {
  const ctx = useContext(ApplicationContext);
  if (!ctx) throw new Error('useApplication must be used within ApplicationProvider');
  return ctx;
}
