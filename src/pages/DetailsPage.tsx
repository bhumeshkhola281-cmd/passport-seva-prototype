import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplication } from '../context/ApplicationContext';
import { FormField } from '../components/ui/FormField';
import { VaultNudge } from '../components/ui/VaultNudge';
import { INDIAN_STATES } from '../data/mockData';
import { ArrowRight, User, Phone, MapPin, CheckCircle2 } from 'lucide-react';

export function DetailsPage() {
  const navigate = useNavigate();
  const { draft, dispatch, isStageComplete } = useApplication();

  useEffect(() => {
    if (!isStageComplete(2)) {
      navigate('/apply/documents', { replace: true });
    }
  }, [isStageComplete, navigate]);

  const [formData, setFormData] = useState({
    fullName: draft.profile.fullName,
    dateOfBirth: draft.profile.dateOfBirth,
    gender: draft.profile.gender,
    placeOfBirth: draft.profile.placeOfBirth,
    mobile: draft.profile.mobile,
    email: draft.profile.email,
    addressLine1: draft.profile.addressLine1,
    addressLine2: draft.profile.addressLine2,
    city: draft.profile.city,
    state: draft.profile.state,
    pincode: draft.profile.pincode,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaved, setIsSaved] = useState(false);

  // Auto-save on change
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: 'SET_PROFILE', profile: formData });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }, 800);
    return () => clearTimeout(timer);
  }, [formData, dispatch]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.fullName.trim()) e.fullName = 'Full name is required';
    if (!formData.dateOfBirth) e.dateOfBirth = 'Date of birth is required';
    if (!formData.mobile || formData.mobile.length < 10) e.mobile = 'Valid 10-digit mobile number required';
    if (!formData.pincode || formData.pincode.length < 6) e.pincode = 'Valid 6-digit pincode required';
    if (!formData.city.trim()) e.city = 'City is required';
    if (!formData.state.trim()) e.state = 'State is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleContinue = () => {
    if (!validate()) return;
    dispatch({ type: 'SET_PROFILE', profile: formData });
    dispatch({ type: 'COMPLETE_STAGE', stage: 3 });
    navigate('/apply/appointment');
  };

  const inputStyle = (field?: string) => ({
    border: `1.5px solid ${errors[field ?? ''] ? 'var(--color-error)' : 'var(--color-ivory-dark)'}`,
    borderRadius: '10px',
    padding: '0.625rem 0.875rem',
    minHeight: '44px',
    width: '100%',
    fontFamily: 'var(--font-ui)',
    fontSize: '0.9375rem',
    color: 'var(--color-graphite)',
    outline: 'none',
  } as React.CSSProperties);

  return (
    <div className="max-w-3xl mx-auto pb-20 animate-fadeIn">
      {/* Header */}
      <div className="flex items-start justify-between mb-10">
        <div>
          <h1
            className="text-4xl mb-3"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-indigo)' }}
          >
            Your details
          </h1>
          <p className="text-base" style={{ color: 'var(--color-graphite-light)' }}>
            Pre-filled with sample data. In a real service, you'd enter your own information.
          </p>
        </div>
        {isSaved && (
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold animate-fadeIn flex-shrink-0"
            style={{ backgroundColor: 'rgba(45, 138, 78, 0.1)', color: 'var(--color-success)' }}
          >
            <CheckCircle2 size={14} /> Saved
          </div>
        )}
      </div>

      {/* Local Vault In-Flow Discovery Nudge */}
      <VaultNudge fieldKey="profile" />

      {/* ── Personal Details ──────────────────────────────────────── */}
      <section
        className="card p-6 md:p-8 mb-6"
        style={{ backgroundColor: 'var(--color-surface)' }}
      >
        <div className="flex items-center gap-3 mb-6 pb-4 border-b" style={{ borderColor: 'var(--color-ivory-dark)' }}>
          <User size={20} style={{ color: 'var(--color-indigo)' }} />
          <h2 className="text-xl font-bold" style={{ color: 'var(--color-indigo)' }}>Personal Details</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <FormField label="Full Name" htmlFor="fullName" required error={errors.fullName}>
            <input
              id="fullName"
              className="form-input"
              style={inputStyle('fullName')}
              value={formData.fullName}
              onChange={e => handleChange('fullName', e.target.value)}
            />
          </FormField>
          <FormField label="Date of Birth" htmlFor="dateOfBirth" required error={errors.dateOfBirth}>
            <input
              id="dateOfBirth"
              type="date"
              className="form-input"
              style={inputStyle('dateOfBirth')}
              value={formData.dateOfBirth}
              onChange={e => handleChange('dateOfBirth', e.target.value)}
            />
          </FormField>
          <FormField label="Gender" htmlFor="gender">
            <select
              id="gender"
              className="form-input"
              style={inputStyle()}
              value={formData.gender}
              onChange={e => handleChange('gender', e.target.value)}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </FormField>
          <FormField label="Place of Birth" htmlFor="placeOfBirth">
            <input
              id="placeOfBirth"
              className="form-input"
              style={inputStyle()}
              value={formData.placeOfBirth}
              onChange={e => handleChange('placeOfBirth', e.target.value)}
            />
          </FormField>
        </div>
      </section>

      {/* ── Contact Details ───────────────────────────────────────── */}
      <section
        className="card p-6 md:p-8 mb-6"
        style={{ backgroundColor: 'var(--color-surface)' }}
      >
        <div className="flex items-center gap-3 mb-6 pb-4 border-b" style={{ borderColor: 'var(--color-ivory-dark)' }}>
          <Phone size={20} style={{ color: 'var(--color-indigo)' }} />
          <h2 className="text-xl font-bold" style={{ color: 'var(--color-indigo)' }}>Contact</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <FormField label="Mobile Number" htmlFor="mobile" required error={errors.mobile} hint="10-digit Indian mobile number">
            <input
              id="mobile"
              type="tel"
              className="form-input"
              style={inputStyle('mobile')}
              value={formData.mobile}
              onChange={e => handleChange('mobile', e.target.value)}
              maxLength={10}
            />
          </FormField>
          <FormField label="Email" htmlFor="email">
            <input
              id="email"
              type="email"
              className="form-input"
              style={inputStyle()}
              value={formData.email}
              onChange={e => handleChange('email', e.target.value)}
            />
          </FormField>
        </div>
      </section>

      {/* ── Address ───────────────────────────────────────────────── */}
      <section
        className="card p-6 md:p-8 mb-10"
        style={{ backgroundColor: 'var(--color-surface)' }}
      >
        <div className="flex items-center gap-3 mb-6 pb-4 border-b" style={{ borderColor: 'var(--color-ivory-dark)' }}>
          <MapPin size={20} style={{ color: 'var(--color-indigo)' }} />
          <h2 className="text-xl font-bold" style={{ color: 'var(--color-indigo)' }}>Present Address</h2>
        </div>

        <div className="space-y-5">
          <FormField label="Address Line 1" htmlFor="addr1">
            <input
              id="addr1"
              className="form-input"
              style={inputStyle()}
              value={formData.addressLine1}
              onChange={e => handleChange('addressLine1', e.target.value)}
            />
          </FormField>
          <FormField label="Address Line 2" htmlFor="addr2">
            <input
              id="addr2"
              className="form-input"
              style={inputStyle()}
              value={formData.addressLine2}
              onChange={e => handleChange('addressLine2', e.target.value)}
            />
          </FormField>
          <div className="grid md:grid-cols-3 gap-5">
            <FormField label="City" htmlFor="city" required error={errors.city}>
              <input
                id="city"
                className="form-input"
                style={inputStyle('city')}
                value={formData.city}
                onChange={e => handleChange('city', e.target.value)}
              />
            </FormField>
            <FormField label="State" htmlFor="state" required error={errors.state}>
              <select
                id="state"
                className="form-input"
                style={inputStyle('state')}
                value={formData.state}
                onChange={e => handleChange('state', e.target.value)}
              >
                <option value="">Select state</option>
                {INDIAN_STATES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </FormField>
            <FormField label="Pincode" htmlFor="pincode" required error={errors.pincode} hint="6-digit code">
              <input
                id="pincode"
                className="form-input"
                style={inputStyle('pincode')}
                value={formData.pincode}
                onChange={e => handleChange('pincode', e.target.value)}
                maxLength={6}
              />
            </FormField>
          </div>
        </div>
      </section>

      {/* ── Continue ──────────────────────────────────────────────── */}
      <div className="flex justify-end">
        <button
          onClick={handleContinue}
          className="btn btn-primary flex items-center gap-2 px-8 py-3 text-base"
        >
          Continue
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
