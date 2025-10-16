import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { DownloadSimple, Phone } from 'phosphor-react';
import { ReactComponent as ScalerLogo } from '../assets/scaler-logo.svg';
import { useProfile } from '../context/ProfileContext';

const NavContainer = styled.nav`
  background: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;

  @media print {
    display: none;
  }
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  gap: 24px;

  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    padding: 0 12px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const LogoGraphic = styled(ScalerLogo)`
  height: 28px;
  width: auto;
  display: block;

  @media (max-width: 768px) {
    height: 24px;
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const CTAButton = styled.button`
  background: #B30158;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 0;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: #8A0145;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const OutlineCTAButton = styled.button`
  background: transparent;
  color: #B30158;
  border: 2px solid #B30158;
  padding: 8px 18px;
  border-radius: 0;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #B30158;
    color: white;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const IconButton = styled.button`
  background: transparent;
  color: #B30158;
  border: 2px solid #B30158;
  padding: 8px;
  border-radius: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  display: none;

  &:hover {
    background: #B30158;
    color: white;
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const TextCTAButton = styled.button`
  background: transparent;
  color: #64748b;
  border: none;
  padding: 8px 16px;
  border-radius: 0;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    color: #1e293b;
    background: #f8fafc;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 6px 12px;
  }
`;

const SegmentedControl = styled.div`
  display: flex;
  background: #f1f5f9;
  border-radius: 6px;
  padding: 3px;
  gap: 2px;
`;

const SegmentButton = styled.button`
  background: ${props => props.active ? '#FFFFFF' : 'transparent'};
  color: ${props => props.active ? '#1e293b' : '#64748b'};
  border: none;
  padding: 6px 14px;
  border-radius: 4px;
  font-weight: ${props => props.active ? '600' : '500'};
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  box-shadow: ${props => props.active ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none'};

  &:hover {
    background: ${props => props.active ? '#FFFFFF' : '#e2e8f0'};
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 4px;
  background-color: #e2e8f0;
  position: relative;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  background: #0041CA;
  transition: width 0.3s ease;
  width: ${props => props.width}%;
`;

const CSATBanner = styled.button`
  background: #472472;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1001;
  cursor: pointer;
  border: none;
  width: 100%;
  transition: all 0.2s ease;

  &:hover {
    background: #5a2e8a;
  }

  &:active {
    background: #3a1d5e;
    transform: scale(0.995);
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
  }

  @media print {
    display: none;
  }
`;

const CSATContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 1200px;
  width: 100%;
  justify-content: center;
  pointer-events: none;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
`;

const CSATText = styled.span`
  font-size: 0.875rem;
  color: #FFFFFF;
  font-weight: 500;
  font-family: 'Plus Jakarta Sans', sans-serif;

  @media (max-width: 768px) {
    font-size: 0.8125rem;
  }
`;

const CSATLink = styled.span`
  font-size: 0.875rem;
  color: #FFFFFF;
  font-weight: 600;
  text-decoration: underline;
  font-family: 'Plus Jakarta Sans', sans-serif;

  @media (max-width: 768px) {
    font-size: 0.8125rem;
  }
`;

const NavigationBar = ({ progress = 0, quizMode = 'grouped', onQuizModeChange }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resetProfile, evaluationResults } = useProfile();

  const showProgress = location.pathname === '/quiz' || location.pathname === '/goals';
  const showModeToggle = location.pathname === '/quiz';
  const isResultsPage = location.pathname === '/results' || location.pathname === '/reports';

  const handleReEvaluate = () => {
    resetProfile();
    navigate('/quiz');
  };

  const handleDownloadReport = () => {
    window.print();
  };

  return (
    <>
      {/* CSAT Banner - Only show on results page */}
      {isResultsPage && (
        <CSATBanner data-tally-open="m6XrjY" data-tally-layout="modal" data-tally-width="600" data-tally-emoji-text="👋" data-tally-emoji-animation="wave">
          <CSATContent>
            <CSATText>How was your profile evaluation experience?</CSATText>
            <CSATLink>Share your feedback</CSATLink>
          </CSATContent>
        </CSATBanner>
      )}
      <NavContainer>
        <NavContent>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Logo>
            <LogoGraphic aria-label="Scaler" />
          </Logo>
        </Link>
        {showModeToggle && (
          <SegmentedControl>
            <SegmentButton
              active={quizMode === 'single'}
              onClick={() => onQuizModeChange?.('single')}
            >
              Single Question
            </SegmentButton>
            <SegmentButton
              active={quizMode === 'grouped'}
              onClick={() => onQuizModeChange?.('grouped')}
            >
              Grouped Questions
            </SegmentButton>
            <SegmentButton
              active={quizMode === 'split'}
              onClick={() => onQuizModeChange?.('split')}
            >
              Split View
            </SegmentButton>
            <SegmentButton
              active={quizMode === 'split-view2'}
              onClick={() => onQuizModeChange?.('split-view2')}
            >
              Split View 2
            </SegmentButton>
            <SegmentButton
              active={quizMode === 'final'}
              onClick={() => onQuizModeChange?.('final')}
            >
              Final Mode
            </SegmentButton>
          </SegmentedControl>
        )}
        <NavActions>
          {isResultsPage && evaluationResults && (
            <>
              <TextCTAButton onClick={handleReEvaluate}>Re-evaluate</TextCTAButton>
              {/* Desktop: Full button with text */}
              <OutlineCTAButton onClick={handleDownloadReport}>Download Report</OutlineCTAButton>
              {/* Mobile: Icon only */}
              <IconButton onClick={handleDownloadReport}>
                <DownloadSimple size={20} weight="bold" />
              </IconButton>
            </>
          )}
          <CTAButton onClick={() => window.open('/callback', '_blank')}>Request Call Back</CTAButton>
        </NavActions>
      </NavContent>
      {showProgress && (
        <ProgressBarContainer>
          <ProgressBarFill width={progress} />
        </ProgressBarContainer>
      )}
      </NavContainer>
    </>
  );
};

export default NavigationBar;
