import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import styled, { keyframes } from 'styled-components';
import BackgroundSelection from './quiz/BackgroundSelection';
import NonTechQuiz, { NON_TECH_SCREENS } from './quiz/NonTechQuiz';
import TechQuiz, { TECH_SCREENS } from './quiz/TechQuiz';
import SplitViewQuiz from './quiz/SplitViewQuiz';
import SplitViewQuiz2 from './quiz/SplitViewQuiz2';
import ChattyQuiz from './quiz/ChattyQuiz';
import FinalModeQuiz from './quiz/FinalModeQuiz';
import { CaretLeft } from 'phosphor-react';

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const QuizContainer = styled.div`
  min-height: calc(100vh - 74px);
  background: #FFFFFF;
  position: relative;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 80px 20px 160px;
`;

const QuizContent = styled.div`
  min-height: 400px;
  animation: ${fadeIn} 1.2s cubic-bezier(0.16, 1, 0.3, 1);
`;

const BottomNavigation = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e2e8f0;
  padding: 12px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;

  @media print {
    display: none;
  }
`;

const NavigationContent = styled.div`
  max-width: 800px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PreviousButton = styled.button`
  background: transparent;
  color: #64748b;
  border: none;
  padding: 8px 20px;
  border-radius: 0;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #1e293b;
    background: #FAFAFA;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const NextButton = styled.button`
  background: ${props => props.disabled ? '#e2e8f0' : '#FFFFFF'};
  color: ${props => props.disabled ? '#94a3b8' : '#1e293b'};
  border: 2px solid ${props => props.disabled ? '#e2e8f0' : '#e2e8f0'};
  padding: 8px 24px;
  border-radius: 0;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  font-size: 0.9rem;

  &:hover {
    background: ${props => props.disabled ? '#e2e8f0' : '#FAFAFA'};
    border-color: ${props => props.disabled ? '#e2e8f0' : '#0041CA'};
  }
`;

const MAX_QUIZ_SCREENS = Math.max(NON_TECH_SCREENS.length, TECH_SCREENS.length);

function QuizPage({ onProgressChange, quizMode = 'grouped' }) {
  const navigate = useNavigate();
  const {
    background,
    setBackground,
    setQuizResponse,
    quizResponses,
    clearQuizResponses,
    evaluationResults
  } = useProfile();

  // Redirect to results if evaluation already exists (prevent direct URL access)
  useEffect(() => {
    if (evaluationResults) {
      navigate('/results', { replace: true });
    }
  }, [evaluationResults, navigate]);

  // Render split view mode
  if (quizMode === 'split') {
    return <SplitViewQuiz />;
  }

  // Render split view 2 mode
  if (quizMode === 'split-view2') {
    return <SplitViewQuiz2 />;
  }

  // Render chatty single-question mode
  if (quizMode === 'single') {
    return <ChattyQuiz onProgressChange={onProgressChange} />;
  }

  // Render final mode
  if (quizMode === 'final') {
    return <FinalModeQuiz onProgressChange={onProgressChange} />;
  }
  const [currentStep, setCurrentStep] = useState(() => (background ? 1 : 0));
  const containerRef = useRef(null);

  useEffect(() => {
    if (!background && currentStep !== 0) {
      setCurrentStep(0);
    }

    if (background && currentStep === 0) {
      setCurrentStep(1);
    }
  }, [background, currentStep]);

  // Reset to step 1 when quiz mode changes
  useEffect(() => {
    if (background && currentStep > 0) {
      setCurrentStep(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [quizMode]);

  const QUESTIONS_PER_SCREEN = quizMode === 'single' ? 1 : 3;

  // Count total questions instead of screens
  const questionCount = useMemo(() => {
    if (!background) {
      return 0;
    }

    const screens = background === 'non-tech' ? NON_TECH_SCREENS : TECH_SCREENS;
    return screens.reduce((total, screen) => total + screen.questions.length, 0);
  }, [background]);

  // Calculate total screens based on questions grouped by 3
  const totalScreens = useMemo(() => {
    if (!background) return 1;
    return Math.ceil(questionCount / QUESTIONS_PER_SCREEN);
  }, [background, questionCount]);

  const totalSteps = 1 + totalScreens; // background selection + question screens

  const getProgress = () => {
    // Progress starts at 0 for background selection
    if (currentStep === 0) return 0;

    const cappedStep = Math.min(currentStep, totalSteps - 1);
    return (cappedStep / totalSteps) * 100;
  };

  // Update progress bar in parent
  useEffect(() => {
    if (onProgressChange) {
      const progress = getProgress();
      onProgressChange(progress);
    }
  }, [currentStep, totalSteps]);

  const handleBackgroundSelect = (selectedBackground) => {
    clearQuizResponses();
    setBackground(selectedBackground);
    setCurrentStep(1);
  };

  const handleQuizResponse = (question, answer) => {
    setQuizResponse(question, answer);

    // Auto-advance to next screen in single question mode
    if (quizMode === 'single') {
      setTimeout(() => {
        handleNext();
      }, 300);
    }
  };

  const handleNext = () => {
    if (!background) return;

    // Scroll to top first
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (currentStep < totalScreens) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 100);
      return;
    }

    // All quiz questions answered, navigate to goals
    navigate('/goals');
  };

  const handlePrevious = () => {
    if (currentStep === 0) {
      navigate('/');
      return;
    }

    if (currentStep === 1) {
      clearQuizResponses();
      setBackground(null);
      setCurrentStep(0);
      return;
    }

    setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get current questions for the screen (3 questions per screen)
  const getCurrentQuestions = () => {
    if (!background || currentStep === 0) return [];

    const screens = background === 'non-tech' ? NON_TECH_SCREENS : TECH_SCREENS;
    const allQuestions = screens.flatMap(screen => screen.questions);

    const startIndex = (currentStep - 1) * QUESTIONS_PER_SCREEN;
    const endIndex = startIndex + QUESTIONS_PER_SCREEN;

    return allQuestions.slice(startIndex, endIndex);
  };

  const canProceed = () => {
    if (!background) return false;
    if (currentStep === 0) return !!background;

    const questions = getCurrentQuestions();
    if (questions.length === 0) return true;

    // Check if all required questions are answered
    return questions.every(question => {
      if (question.optional) return true;
      return Boolean(quizResponses[question.id]);
    });
  };

  const renderContent = () => {
    if (!background) {
      return <BackgroundSelection onSelect={handleBackgroundSelect} />;
    }

    const questions = getCurrentQuestions();
    if (questions.length === 0) return null;

    const screens = background === 'non-tech' ? NON_TECH_SCREENS : TECH_SCREENS;
    const allQuestions = screens.flatMap(screen => screen.questions);

    if (background === 'non-tech') {
      return (
        <NonTechQuiz
          questions={questions}
          onResponse={handleQuizResponse}
          responses={quizResponses}
          startIndex={(currentStep - 1) * QUESTIONS_PER_SCREEN}
          totalQuestions={allQuestions.length}
        />
      );
    }

    return (
      <TechQuiz
        questions={questions}
        onResponse={handleQuizResponse}
        responses={quizResponses}
        startIndex={(currentStep - 1) * QUESTIONS_PER_SCREEN}
        totalQuestions={allQuestions.length}
      />
    );
  };

  return (
    <QuizContainer ref={containerRef}>
      <Container>
        <QuizContent>
          {renderContent()}
        </QuizContent>
      </Container>

      <BottomNavigation>
        <NavigationContent>
          <PreviousButton
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </PreviousButton>
          <NextButton
            type="button"
            onClick={handleNext}
            disabled={!canProceed()}
          >
            Next
          </NextButton>
        </NavigationContent>
      </BottomNavigation>
    </QuizContainer>
  );
}

export default QuizPage;
