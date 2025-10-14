import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../context/ProfileContext';
import styled, { keyframes } from 'styled-components';
import BackgroundSelectionSplit2 from './BackgroundSelectionSplit2';
import GroupedQuestionScreen from './GroupedQuestionScreen';
import { CHATTY_QUIZ_SCREENS, isScreenComplete } from './ChattyQuizScreens';

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
  min-height: 100vh;
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

const BackButton = styled.button`
  background: transparent;
  color: #64748b;
  border: none;
  padding: 10px 20px;
  border-radius: 0;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    color: #1e293b;
    background: #f8fafc;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const CarouselDots = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Dot = styled.div`
  width: ${props => props.active ? '24px' : '8px'};
  height: 8px;
  border-radius: 4px;
  background: ${props => props.active ? '#0041CA' : '#e2e8f0'};
  transition: all 0.3s ease;
`;

const ContinueButton = styled.button`
  background: #0041CA;
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 0;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #003399;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ChattyQuiz = ({ onProgressChange }) => {
  const navigate = useNavigate();
  const {
    background,
    setBackground,
    quizResponses,
    setQuizResponse,
    clearQuizResponses
  } = useProfile();

  const [currentStep, setCurrentStep] = useState(() => (background ? 1 : 0));

  const totalSteps = 1 + CHATTY_QUIZ_SCREENS.length; // background + quiz screens

  useEffect(() => {
    if (!background && currentStep !== 0) {
      setCurrentStep(0);
    }

    if (background && currentStep === 0) {
      setCurrentStep(1);
    }
  }, [background, currentStep]);

  useEffect(() => {
    const progress = ((currentStep + 1) / totalSteps) * 100;
    onProgressChange?.(progress);
  }, [currentStep, totalSteps, onProgressChange]);

  const handleBackgroundSelect = (selectedBackground) => {
    setBackground(selectedBackground);
    setCurrentStep(1);
  };

  const handleQuizResponse = (questionId, value) => {
    setQuizResponse(questionId, value);
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/goals');
    }
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

  const canProceed = () => {
    if (currentStep === 0) {
      return !!background;
    }

    // Check if current screen's questions are all answered
    const screenIndex = currentStep - 1;
    if (screenIndex >= 0 && screenIndex < CHATTY_QUIZ_SCREENS.length) {
      const screen = CHATTY_QUIZ_SCREENS[screenIndex];
      return isScreenComplete(screen.id, quizResponses);
    }

    return false;
  };

  const renderContent = () => {
    if (!background) {
      return <BackgroundSelectionSplit2 onSelect={handleBackgroundSelect} onAutoAdvance={handleNext} />;
    }

    const screenIndex = currentStep - 1;
    if (screenIndex >= 0 && screenIndex < CHATTY_QUIZ_SCREENS.length) {
      const screen = CHATTY_QUIZ_SCREENS[screenIndex];

      // Calculate question start index based on previous screens
      let questionStartIndex = 2; // Start from 2 (after background question)
      for (let i = 0; i < screenIndex; i++) {
        questionStartIndex += CHATTY_QUIZ_SCREENS[i].questions.length;
      }

      return (
        <GroupedQuestionScreen
          questions={screen.questions}
          responses={quizResponses}
          onResponse={handleQuizResponse}
          initialChatText={screen.initialChatText}
          chatResponseMap={screen.chatResponseMap}
          questionStartIndex={questionStartIndex}
          onAutoAdvance={handleNext}
        />
      );
    }

    return null;
  };

  return (
    <QuizContainer>
      <Container>
        <QuizContent key={currentStep}>
          {renderContent()}
        </QuizContent>
      </Container>

      <BottomNavigation>
        <NavigationContent>
          <BackButton onClick={handlePrevious}>
            ← Back
          </BackButton>

          <CarouselDots>
            {[...Array(totalSteps)].map((_, index) => (
              <Dot key={index} active={index === currentStep} />
            ))}
          </CarouselDots>

          <ContinueButton onClick={handleNext} disabled={!canProceed()}>
            Continue
          </ContinueButton>
        </NavigationContent>
      </BottomNavigation>
    </QuizContainer>
  );
};

export default ChattyQuiz;
