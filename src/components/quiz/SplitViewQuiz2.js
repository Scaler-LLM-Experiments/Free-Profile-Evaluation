import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../context/ProfileContext';
import styled, { keyframes } from 'styled-components';
import { CheckCircle, Clock, ChartBar, Star } from 'phosphor-react';
import BackgroundSelectionSplit2 from './BackgroundSelectionSplit2';
import GroupedQuestionScreen from './GroupedQuestionScreen';
import { CHATTY_QUIZ_SCREENS, isScreenComplete } from './ChattyQuizScreens';
import { NON_TECH_SCREENS } from './NonTechQuiz';
import { TECH_SCREENS } from './TechQuiz';

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

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const SplitContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #ffffff;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
  }
`;

const LeftPanel = styled.div`
  flex: 0.8;
  padding: 80px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    display: none;
  }
`;

const RightPanel = styled.div`
  flex: 1.2;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -100px;
    transform: translateY(-50%);
    width: 500px;
    height: 500px;
    background: radial-gradient(circle at center, rgba(59, 130, 246, 0.12) 0%, rgba(139, 92, 246, 0.08) 45%, transparent 70%);
    animation: ${gradientAnimation} 15s ease infinite;
    pointer-events: none;
    z-index: 0;
  }

  @media (max-width: 768px) {
    padding: 20px;
    flex: 1;
  }
`;

const LeftContent = styled.div`
  max-width: 480px;
  width: 100%;
  text-align: left;
`;

const RightContent = styled.div`
  width: 100%;
  max-width: 100%;
  height: calc(100vh - 80px);
  margin: 40px 0;
  background: white;
  border-radius: 0;
  padding: 80px 60px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.02);
  position: relative;
  z-index: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  animation: ${fadeIn} 1.2s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: 768px) {
    padding: 40px 24px;
    margin: 20px 0;
    height: auto;
    min-height: 500px;
  }
`;

const CarouselDotsContainer = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  align-items: center;
  z-index: 10;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.active ? '#475569' : 'rgba(71, 85, 105, 0.3)'};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: ${props => props.active ? '#475569' : 'rgba(71, 85, 105, 0.5)'};
  }
`;

const LandingContent = styled.div`
  max-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const LandingHeading = styled.h1`
  font-size: 1.875rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0;
  line-height: 1.2;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const LandingSubheading = styled.h2`
  font-size: 0.9375rem;
  font-weight: 400;
  color: #334155;
  margin: 8px 0 0 0;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const BenefitsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.8125rem;
  color: #1e293b;
  font-weight: 400;
`;

const BenefitIcon = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background: #0f172a;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const StatsRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StatIconBox = styled.div`
  width: 40px;
  height: 40px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #0f172a;
`;

const StatContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const StatValue = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #0f172a;
  line-height: 1.2;
`;

const StatLabel = styled.div`
  font-size: 0.6875rem;
  color: #64748b;
  font-weight: 400;
  line-height: 1.3;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 550px;
  width: 100%;
  margin: 0 auto;
`;

const SplitViewQuiz2 = () => {
  const navigate = useNavigate();
  const {
    background,
    setBackground,
    quizResponses,
    setQuizResponse,
    clearQuizResponses
  } = useProfile();

  const [currentScreen, setCurrentScreen] = useState(0);

  const screenContent = [
    {
      heading: "Let's get started!",
      subtext: "Tell us about your background so we can personalize your evaluation",
      questionCount: "1 question"
    },
    {
      heading: "Your Profile",
      subtext: "Help us understand your current experience and skills",
      questionCount: "3 questions in this section"
    },
    {
      heading: "What's driving your move?",
      subtext: "Tell us what you're working on and optimizing for",
      questionCount: "3 questions in this section"
    },
    {
      heading: "Share your current preparation",
      subtext: "Let's assess your current readiness and practice levels",
      questionCount: "3 questions in this section"
    }
  ];

  const totalScreens = 1 + CHATTY_QUIZ_SCREENS.length; // background + quiz screens

  const handleBackgroundSelect = (selectedBackground) => {
    clearQuizResponses();
    setBackground(selectedBackground);
    setCurrentScreen(1);
  };

  const handleQuizResponse = (questionId, value) => {
    setQuizResponse(questionId, value);
  };

  const handleNext = () => {
    if (currentScreen < totalScreens - 1) {
      setCurrentScreen(currentScreen + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/goals');
    }
  };

  const handleBack = () => {
    if (currentScreen === 0) {
      navigate('/');
    } else {
      setCurrentScreen(currentScreen - 1);
      if (currentScreen === 1) {
        setBackground(null);
        clearQuizResponses();
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const canProceed = () => {
    if (currentScreen === 0) {
      return !!background;
    }

    // Check if current screen's questions are all answered
    const screenIndex = currentScreen - 1;
    if (screenIndex >= 0 && screenIndex < CHATTY_QUIZ_SCREENS.length) {
      const screen = CHATTY_QUIZ_SCREENS[screenIndex];
      return isScreenComplete(screen.id, quizResponses);
    }

    return true;
  };

  return (
    <SplitContainer>
      <LeftPanel>
        <LeftContent>
          <LandingContent>
            <div>
              <LandingHeading>Evaluate Your Tech Profile</LandingHeading>
              <LandingSubheading>Discover your strengths, gaps, and next steps</LandingSubheading>
            </div>

            <BenefitsList>
              <BenefitItem>
                <BenefitIcon>
                  <CheckCircle size={12} weight="bold" />
                </BenefitIcon>
                <span>Profile strength analysis</span>
              </BenefitItem>
              <BenefitItem>
                <BenefitIcon>
                  <CheckCircle size={12} weight="bold" />
                </BenefitIcon>
                <span>Interview readiness score</span>
              </BenefitItem>
              <BenefitItem>
                <BenefitIcon>
                  <CheckCircle size={12} weight="bold" />
                </BenefitIcon>
                <span>Personalized recommendations</span>
              </BenefitItem>
            </BenefitsList>

            <StatsRow>
              <StatItem>
                <StatIconBox>
                  <Clock size={20} weight="bold" />
                </StatIconBox>
                <StatContent>
                  <StatValue>5 minutes quick assessment</StatValue>
                  <StatLabel>Complete evaluation in minutes</StatLabel>
                </StatContent>
              </StatItem>
              <StatItem>
                <StatIconBox>
                  <Star size={20} weight="fill" />
                </StatIconBox>
                <StatContent>
                  <StatValue>100% free to use</StatValue>
                  <StatLabel>No hidden costs or fees</StatLabel>
                </StatContent>
              </StatItem>
              <StatItem>
                <StatIconBox>
                  <ChartBar size={20} weight="bold" />
                </StatIconBox>
                <StatContent>
                  <StatValue>13 detailed metrics</StatValue>
                  <StatLabel>Comprehensive profile analysis</StatLabel>
                </StatContent>
              </StatItem>
            </StatsRow>
          </LandingContent>
        </LeftContent>
        <CarouselDotsContainer>
          {[...Array(totalScreens)].map((_, index) => (
            <Dot
              key={index}
              active={index === currentScreen}
              onClick={() => setCurrentScreen(index)}
            />
          ))}
        </CarouselDotsContainer>
      </LeftPanel>

      <RightPanel>
        <RightContent key={currentScreen}>
          {currentScreen === 0 ? (
            <BackgroundSelectionSplit2 onSelect={handleBackgroundSelect} />
          ) : (
            <FormSection>
              {(() => {
                const screenIndex = currentScreen - 1;
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
                    />
                  );
                }
                return null;
              })()}
            </FormSection>
          )}
        </RightContent>
      </RightPanel>
    </SplitContainer>
  );
};

export default SplitViewQuiz2;
