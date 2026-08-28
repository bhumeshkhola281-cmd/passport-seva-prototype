import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type TextScale = 'normal' | 'large' | 'xlarge';
export type Language = 'en' | 'hi';

interface AccessibilityContextType {
  textScale: TextScale;
  setTextScale: (scale: TextScale) => void;
  increaseTextScale: () => void;
  decreaseTextScale: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const DICTIONARY: Record<Language, Record<string, string>> = {
  en: {
    services: 'Services',
    howItWorks: 'How it Works',
    trackStatus: 'Track Status',
    faq: 'FAQ',
    contact: 'Contact',
    aboutPrototype: 'About this prototype',
    inspectVault: 'Inspect Vault',
    startApplication: 'Begin your application',
    learnMore: 'Learn more',
    newPassport: 'New Passport',
    newPassportDesc: 'First-time application with guided document checklist tailored to your profile.',
    passportRenewal: 'Passport Renewal',
    passportRenewalDesc: 'Re-issue for expired, damaged, or lost passports with minimal extra paperwork.',
    feeCalculator: 'Fee Calculator',
    feeCalculatorDesc: 'See the exact fee for your situation — normal, tatkal, minor, adult, 36 or 60 pages.',
    docValidator: 'Document Validator',
    docValidatorDesc: 'Check your passport photo dimensions, file size, and background colour — all client-side.',
    policeVerification: 'Police Verification',
    policeVerificationDesc: 'Everything you need to know about the step people worry about most.',
    faqDesc: 'What happens if you miss your appointment, documents are rejected, or payment fails.',
    theme: 'Theme',
    verifiedStamp: 'VERIFIED',
    fourSimpleSteps: 'Four simple steps',
    step1: 'Choose service type',
    step2: 'Prepare documents',
    step3: 'Book appointment',
    step4: 'Pay & confirm',
    vaultNudgeTitle: 'Written to local browser memory',
    vaultNudgeDesc: '0 KB network egress. State is inspectable in your local device vault.',
    vaultNudgeBtn: 'Inspect raw JSON in Vault →',
  },
  hi: {
    services: 'सेवाएं',
    howItWorks: 'प्रक्रिया कैसे काम करती है',
    trackStatus: 'स्थिति ट्रैक करें',
    faq: 'अक्सर पूछे जाने वाले प्रश्न',
    contact: 'संपर्क करें',
    aboutPrototype: 'प्रोटोटाइप के बारे में',
    inspectVault: 'लोकल वॉल्ट देखें',
    startApplication: 'आवेदन शुरू करें',
    learnMore: 'अधिक जानें',
    newPassport: 'नया पासपोर्ट',
    newPassportDesc: 'आपकी प्रोफाइल के अनुसार मार्गदर्शन और दस्तावेज़ सूची के साथ पहला आवेदन।',
    passportRenewal: 'पासपोर्ट नवीनीकरण',
    passportRenewalDesc: 'समाप्त, क्षतिग्रस्त या खोए हुए पासपोर्ट के लिए न्यूनतम कागजी कार्रवाई के साथ पुनः जारी।',
    feeCalculator: 'शुल्क कैलकुलेटर',
    feeCalculatorDesc: 'सामान्य, तत्काल, वयस्क या नाबालिग के लिए सटीक शुल्क जानें।',
    docValidator: 'दस्तावेज़ सत्यापनकर्ता',
    docValidatorDesc: 'फोटो का आकार, फाइल साइज और पृष्ठभूमि रंग तुरंत जांचें — सब कुछ आपके डिवाइस पर।',
    policeVerification: 'पुलिस सत्यापन गाइड',
    policeVerificationDesc: 'पुलिस सत्यापन प्रक्रिया के बारे में संपूर्ण मार्गदर्शन।',
    faqDesc: 'यदि अपॉइंटमेंट छूट जाए या दस्तावेज़ अस्वीकार हों तो क्या करें।',
    theme: 'थीम',
    verifiedStamp: 'सत्यापित (VERIFIED)',
    fourSimpleSteps: 'चार सरल चरण',
    step1: 'सेवा प्रकार चुनें',
    step2: 'दस्तावेज़ तैयार करें',
    step3: 'अपॉइंटमेंट बुक करें',
    step4: 'भुगतान और पुष्टि',
    vaultNudgeTitle: 'ब्राउज़र मेमोरी में सुरक्षित रूप से सहेजा गया',
    vaultNudgeDesc: '0 KB नेटवर्क ट्रांसमिशन। डेटा आपके डिवाइस पर ही रहता है।',
    vaultNudgeBtn: 'वॉल्ट में लाइव JSON देखें →',
  },
};

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [textScale, setTextScaleState] = useState<TextScale>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('psp-text-scale') as TextScale;
      if (saved && ['normal', 'large', 'xlarge'].includes(saved)) return saved;
    }
    return 'normal';
  });

  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('psp-language') as Language;
      if (saved && (saved === 'en' || saved === 'hi')) return saved;
    }
    return 'en';
  });

  const setTextScale = (scale: TextScale) => {
    setTextScaleState(scale);
    localStorage.setItem('psp-text-scale', scale);
  };

  const increaseTextScale = () => {
    if (textScale === 'normal') setTextScale('large');
    else if (textScale === 'large') setTextScale('xlarge');
  };

  const decreaseTextScale = () => {
    if (textScale === 'xlarge') setTextScale('large');
    else if (textScale === 'large') setTextScale('normal');
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('psp-language', lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-text-scale', textScale);
    document.documentElement.setAttribute('lang', language);
  }, [textScale, language]);

  const t = (key: string): string => {
    return DICTIONARY[language]?.[key] || DICTIONARY.en[key] || key;
  };

  return (
    <AccessibilityContext.Provider
      value={{
        textScale,
        setTextScale,
        increaseTextScale,
        decreaseTextScale,
        language,
        setLanguage,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
