import type { DocumentItem } from '../context/ApplicationContext';

/* ── Base documents required for all applications ─────────────── */

export const BASE_DOCUMENTS: DocumentItem[] = [
  {
    id: 'photo',
    label: 'Recent passport-size photograph',
    description: 'A colour photograph with white background, taken within the last 3 months.',
    format: '3.5 cm × 4.5 cm, matte finish, front-facing',
    whyNeeded: 'Your photograph will be printed on the passport booklet and used for identification at immigration checkpoints.',
    status: 'not-set',
  },
  {
    id: 'proof-of-identity',
    label: 'Proof of identity',
    description: 'Any government-issued photo ID such as Aadhaar card, voter ID, or PAN card.',
    format: 'Original + one self-attested photocopy',
    whyNeeded: 'This confirms your identity and is verified against your application details.',
    status: 'not-set',
  },
  {
    id: 'proof-of-dob',
    label: 'Proof of date of birth',
    description: 'Birth certificate, school leaving certificate, or Aadhaar card showing date of birth.',
    format: 'Original + one self-attested photocopy',
    whyNeeded: 'Your date of birth determines the validity period of the passport and must match official records.',
    status: 'not-set',
  },
  {
    id: 'proof-of-address',
    label: 'Proof of present address',
    description: 'Aadhaar card, utility bill (under 3 months old), bank statement, or rental agreement.',
    format: 'Original + one self-attested photocopy',
    whyNeeded: 'Your current address is used for police verification after your appointment.',
    status: 'not-set',
  },
  {
    id: 'self-declaration',
    label: 'Self-declaration form (Annexure D or E)',
    description: 'A signed declaration confirming your personal details are correct. The specific annexure depends on your family situation.',
    format: 'Printed, signed, and not notarised (for standard cases)',
    whyNeeded: 'This is a mandatory legal declaration required by passport regulations.',
    status: 'not-set',
  },
];

/* ── Conditional documents ────────────────────────────────────── */

export const ADDRESS_CHANGE_DOCUMENTS: DocumentItem[] = [
  {
    id: 'old-address-proof',
    label: 'Proof of previous address',
    description: 'A document showing the address listed on your current passport.',
    format: 'Original + one self-attested photocopy',
    whyNeeded: 'When your address has changed, the office verifies both your old and new addresses.',
    status: 'not-set',
    conditional: true,
    conditionKey: 'addressChanged',
  },
];

export const REISSUE_DOCUMENTS: DocumentItem[] = [
  {
    id: 'old-passport',
    label: 'Old / expiring passport',
    description: 'Your current passport, whether valid or expired.',
    format: 'Original passport booklet',
    whyNeeded: 'The existing passport must be surrendered or verified before a new one is issued.',
    status: 'not-set',
  },
  {
    id: 'old-passport-copy',
    label: 'Copy of first and last page of old passport',
    description: 'The page with your photograph and the page with your last address.',
    format: 'Self-attested photocopy',
    whyNeeded: 'These copies help verify the details that will be carried forward to your new passport.',
    status: 'not-set',
  },
];

export const DETAILS_CHANGE_DOCUMENTS: DocumentItem[] = [
  {
    id: 'name-change-proof',
    label: 'Proof of name or detail change',
    description: 'Marriage certificate, gazette notification, or court order confirming the change.',
    format: 'Original + one self-attested photocopy',
    whyNeeded: 'Any change to your name, marital status, or other personal details must be supported by a legal document.',
    status: 'not-set',
    conditional: true,
    conditionKey: 'detailsChanged',
  },
];

/* ── Build a scenario-aware document list ─────────────────────── */

export function buildDocumentList(
  journeyType: 'standard' | 'reissue',
  scenario: { addressChanged: boolean; detailsChanged: boolean }
): DocumentItem[] {
  const docs = [...BASE_DOCUMENTS];

  if (journeyType === 'reissue') {
    docs.push(...REISSUE_DOCUMENTS);
  }

  if (scenario.addressChanged) {
    docs.push(...ADDRESS_CHANGE_DOCUMENTS);
  }

  if (scenario.detailsChanged) {
    docs.push(...DETAILS_CHANGE_DOCUMENTS);
  }

  return docs;
}

/* ── Mock Service Centres ─────────────────────────────────────── */

export const MOCK_CENTRES: Array<{
  id: string;
  name: string;
  city: string;
  address: string;
  travelCue: string;
  visitDuration: string;
  languages: string[];
}> = [
  {
    id: 'jpr-01',
    name: 'Demo Citizen Service Centre — Jaipur',
    city: 'Jaipur',
    address: '14, Civil Lines Road, Near Collectorate Circle, Jaipur 302001',
    travelCue: 'Approximately 20 minutes from Jaipur Junction railway station',
    visitDuration: '45–90 minutes',
    languages: ['Hindi', 'English'],
  },
  {
    id: 'mum-01',
    name: 'Demo Citizen Service Centre — Mumbai',
    city: 'Mumbai',
    address: '3rd Floor, Commerce House, Andheri East, Mumbai 400069',
    travelCue: 'Approximately 10 minutes from Andheri metro station',
    visitDuration: '60–120 minutes',
    languages: ['Hindi', 'English', 'Marathi'],
  },
  {
    id: 'blr-01',
    name: 'Demo Citizen Service Centre — Bengaluru',
    city: 'Bengaluru',
    address: '22, Infantry Road, near Mekhri Circle, Bengaluru 560001',
    travelCue: 'Approximately 15 minutes from Majestic bus terminal',
    visitDuration: '45–90 minutes',
    languages: ['English', 'Hindi', 'Kannada'],
  },
];

/* ── Mock Available Dates & Times ─────────────────────────────── */

export function getMockDates(): string[] {
  // Generate 10 future dates starting 5 days from now
  const dates: string[] = [];
  const start = new Date();
  start.setDate(start.getDate() + 5);
  for (let i = 0; i < 10; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    // Skip Sundays
    if (d.getDay() === 0) continue;
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
}

export const MOCK_TIME_SLOTS = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
];

/* ── Mock Payment Config ──────────────────────────────────────── */

export const MOCK_PAYMENT_METHODS = [
  { id: 'net-banking', label: 'Net Banking (simulated)', icon: 'landmark' },
  { id: 'debit-card', label: 'Debit Card (simulated)', icon: 'credit-card' },
  { id: 'upi', label: 'UPI (simulated)', icon: 'smartphone' },
];

export const PASSPORT_FEE = 1500;

export function generateMockReference(): string {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `SL-PAY-${num}`;
}

/* ── Journey Stage Labels ─────────────────────────────────────── */

export const STAGE_LABELS = [
  { stage: 0, label: 'Welcome', short: 'Start' },
  { stage: 1, label: 'Choose your need', short: 'Scenario' },
  { stage: 2, label: 'Prepare documents', short: 'Documents' },
  { stage: 3, label: 'Confirm details', short: 'Details' },
  { stage: 4, label: 'Select appointment', short: 'Appointment' },
  { stage: 5, label: 'Complete payment', short: 'Payment' },
  { stage: 6, label: 'Your appointment pass', short: 'Confirmation' },
];

/* ── Indian States (for address form) ─────────────────────────── */

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
];
