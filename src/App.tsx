import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ApplicationProvider } from './context/ApplicationContext';
import { AppShell } from './components/layout/AppShell';
import { WelcomePage } from './pages/WelcomePage';
import { ScenarioPage } from './pages/ScenarioPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { DetailsPage } from './pages/DetailsPage';
import { AppointmentPage } from './pages/AppointmentPage';
import { PaymentPage } from './pages/PaymentPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { AboutPrototypePage } from './pages/AboutPrototypePage';
import { StatusGlossaryPage } from './pages/StatusGlossaryPage';
import { PoliceVerificationPage } from './pages/PoliceVerificationPage';
import { FAQPage } from './pages/FAQPage';
import { DocumentValidatorPage } from './pages/DocumentValidatorPage';
import { FeeCalculatorPage } from './pages/FeeCalculatorPage';
import { AccessibilityPage } from './pages/AccessibilityPage';

export default function App() {
  return (
    <BrowserRouter>
      <ApplicationProvider>
        <AppShell>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/apply/scenario" element={<ScenarioPage />} />
            <Route path="/apply/documents" element={<DocumentsPage />} />
            <Route path="/apply/details" element={<DetailsPage />} />
            <Route path="/apply/appointment" element={<AppointmentPage />} />
            <Route path="/apply/payment" element={<PaymentPage />} />
            <Route path="/apply/confirmation" element={<ConfirmationPage />} />
            <Route path="/about-prototype" element={<AboutPrototypePage />} />
            <Route path="/track/glossary" element={<StatusGlossaryPage />} />
            <Route path="/learn/police-verification" element={<PoliceVerificationPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/tools/document-validator" element={<DocumentValidatorPage />} />
            <Route path="/tools/fee-calculator" element={<FeeCalculatorPage />} />
            <Route path="/accessibility" element={<AccessibilityPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppShell>
      </ApplicationProvider>
    </BrowserRouter>
  );
}
