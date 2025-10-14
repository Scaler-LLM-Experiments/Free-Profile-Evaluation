import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../context/ProfileContext';
import styled from 'styled-components';
import { CheckCircle, Clock, ChartBar, Star } from 'phosphor-react';
import BackgroundSelectionSplit from './BackgroundSelectionSplit';
import { NON_TECH_SCREENS } from './NonTechQuiz';
import { TECH_SCREENS } from './TechQuiz';

const SplitContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #FFFFFF;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftPanel = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #1a1f36 0%, #2d3548 100%);
  padding: 80px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  position: relative;

  @media (max-width: 768px) {
    display: none;
  }
`;

const RightPanel = styled.div`
  flex: 1;
  background: #FFFFFF;
  padding: 80px 60px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const LeftContent = styled.div`
  max-width: 500px;
  text-align: left;
`;

const LeftHeading = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 1.2;
`;

const LeftSubtext = styled.p`
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 24px;
  line-height: 1.6;
`;

const QuestionCount = styled.div`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
`;

const RightContent = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
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
  background: ${props => props.active ? '#FFFFFF' : 'rgba(255, 255, 255, 0.3)'};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: ${props => props.active ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)'};
  }
`;

const LandingContent = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const LandingHeading = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  color: white;
  margin: 0;
  line-height: 1.1;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const LandingSubheading = styled.h2`
  font-size: 1.25rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  margin: 12px 0 0 0;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const BenefitsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 1.0625rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
`;

const BenefitIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(253, 224, 71, 0.15);
  color: #fde047;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
`;

const StatValue = styled.div`
  font-size: 2.25rem;
  font-weight: 700;
  color: #fde047;
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 1;
`;

const StatLabel = styled.div`
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const SplitViewQuiz = () => {
  const navigate = useNavigate();
  const {
    background,
    setBackground,
    quizResponses,
    setQuizResponse,
    clearQuizResponses
  } = useProfile();

  const [currentScreen, setCurrentScreen] = useState(0);

  // Screen 0: Background selection (shown in left panel)
  // Screens 1-4: Question groups

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
      heading: "Current Focus",
      subtext: "Tell us what you're working on and optimizing for",
      questionCount: "2 questions in this section"
    },
    {
      heading: "Your Goals",
      subtext: "Share your target role and company aspirations",
      questionCount: "2 questions in this section"
    },
    {
      heading: "Preparation Status",
      subtext: "Let's assess your current readiness and practice levels",
      questionCount: "3 questions in this section"
    }
  ];

  const totalScreens = 5; // Background + 4 question groups

  const handleBackgroundSelect = (selectedBackground) => {
    clearQuizResponses();
    setBackground(selectedBackground);
    setCurrentScreen(1);
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
    // Add validation logic for each screen here
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
                  <CheckCircle size={20} weight="bold" />
                </BenefitIcon>
                <span>Profile strength analysis</span>
              </BenefitItem>
              <BenefitItem>
                <BenefitIcon>
                  <CheckCircle size={20} weight="bold" />
                </BenefitIcon>
                <span>Interview readiness score</span>
              </BenefitItem>
              <BenefitItem>
                <BenefitIcon>
                  <CheckCircle size={20} weight="bold" />
                </BenefitIcon>
                <span>Personalized recommendations</span>
              </BenefitItem>
            </BenefitsList>

            <StatsRow>
              <StatItem>
                <StatValue>
                  <Clock size={28} weight="bold" />
                  5
                </StatValue>
                <StatLabel>Minutes</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>
                  <Star size={28} weight="fill" />
                  100%
                </StatValue>
                <StatLabel>Free</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>
                  <ChartBar size={28} weight="bold" />
                  13
                </StatValue>
                <StatLabel>Metrics</StatLabel>
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
        <RightContent>
          {currentScreen === 0 ? (
            <BackgroundSelectionSplit onSelect={handleBackgroundSelect} />
          ) : (
            <FormSection>
              <div style={{ color: '#64748b', textAlign: 'center' }}>
                Question forms for screen {currentScreen} will go here
              </div>
            </FormSection>
          )}
        </RightContent>
      </RightPanel>
    </SplitContainer>
  );
};

export default SplitViewQuiz;
