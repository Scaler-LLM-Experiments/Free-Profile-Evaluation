import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ProfileProvider } from './context/ProfileContext';
import NavigationBar from './components/NavigationBar';
import QuizPage from './components/QuizPage';
import ResultsPage from './components/ResultsPage';

function AppContent() {
  const [quizProgress, setQuizProgress] = useState(0);
  const [quizMode, setQuizMode] = useState('final'); // Default to 'final' mode
  const location = useLocation();

  // AGGRESSIVE backend warming - start immediately when app loads
  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

    const pingBackend = async () => {
      try {
        await fetch(`${apiUrl}/health`, { method: 'GET' });
        console.log('Backend ping successful');
      } catch (error) {
        console.log('Backend ping failed (normal if backend is waking up):', error.message);
      }
    };

    // Ping immediately on app load
    pingBackend();

    // Then ping every 2 minutes to keep backend warm
    const intervalId = setInterval(pingBackend, 2 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Hide navigation bar when in final mode on quiz page
  const shouldShowNav = !(quizMode === 'final' && location.pathname === '/quiz');

  return (
    <div className="App">
      {shouldShowNav && (
        <NavigationBar
          progress={quizProgress}
          quizMode={quizMode}
          onQuizModeChange={setQuizMode}
        />
      )}
      <Routes>
        <Route path="/" element={<Navigate to="/quiz" replace />} />
        <Route path="/quiz" element={<QuizPage onProgressChange={setQuizProgress} quizMode={quizMode} />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/reports" element={<ResultsPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ProfileProvider>
      <Router>
        <AppContent />
      </Router>
    </ProfileProvider>
  );
}

export default App;
