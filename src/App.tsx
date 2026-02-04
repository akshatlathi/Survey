import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/landing/LandingPage';

import { SurveyProvider } from './hooks/useSurvey';
import { ScreenerPage } from './pages/landing/ScreenerPage';
import { DemographicsPage } from './pages/demographics/DemographicsPage';
import { SurveySection } from './pages/survey/SurveySection';

function App() {
  return (
    <SurveyProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/screener" element={<ScreenerPage />} />
          <Route path="/demographics" element={<DemographicsPage />} />
          <Route path="/survey/:part" element={<SurveySection />} />
          <Route path="/thank-you" element={<div className="p-32 text-center font-heading text-4xl text-primary">Thank You for Participating!</div>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </SurveyProvider>
  );
}

export default App;
