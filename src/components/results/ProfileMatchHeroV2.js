import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Xarrow from 'react-xarrows';
import { CheckCircle, Star, ArrowsLeftRight, ArrowBendUpRight, Target, Lightbulb, Rocket, Books, ChartLine, Code, BriefcaseMetal, GraduationCap, Users, Trophy, Medal, Globe, Compass, Laptop, CloudArrowUp, Database, GitBranch, TestTube, FileMagnifyingGlass, UsersFour, MagnifyingGlass, Brain, Wrench, SparkleIcon as Sparkle } from 'phosphor-react';
import scalerBot from '../../assets/scaler-bot.png';
import oliveBranchLeft from '../../assets/Left-Olive-Branch.png';
import oliveBranchRight from '../../assets/Right-Olive-branch.png';

const HeroContainer = styled.div`
  background: white;
  border-radius: 0;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 48px;
  display: ${props => props.layoutMode === 'vertical' ? 'flex' : 'grid'};
  flex-direction: ${props => props.layoutMode === 'vertical' ? 'column' : 'unset'};
  grid-template-columns: ${props => props.layoutMode === 'vertical' ? 'unset' : '420px 1fr'};
  min-height: ${props => props.layoutMode === 'vertical' ? 'auto' : '90vh'};
  overflow: ${props => props.layoutMode === 'vertical' ? 'visible' : 'hidden'};

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    min-height: auto;
  }
`;

const LeftPanel = styled.div`
  background: ${props => props.score >= 50 ? '#064e3b' : '#1f2937'};
  color: #ffffff;
  padding: ${props => props.layoutMode === 'vertical' ? '48px 120px 48px 60px' : '40px 28px'};
  display: flex;
  flex-direction: ${props => props.layoutMode === 'vertical' ? 'row' : 'column'};
  justify-content: ${props => props.layoutMode === 'vertical' ? 'space-between' : 'flex-start'};
  align-items: ${props => props.layoutMode === 'vertical' ? 'center' : 'stretch'};
  gap: ${props => props.layoutMode === 'vertical' ? '60px' : '24px'};
  position: ${props => props.layoutMode === 'vertical' ? 'relative' : 'sticky'};
  top: ${props => props.layoutMode === 'vertical' ? 'auto' : '0'};
  height: ${props => props.layoutMode === 'vertical' ? 'auto' : '90vh'};
  overflow-y: ${props => props.layoutMode === 'vertical' ? 'visible' : 'auto'};
  border-right: ${props => props.layoutMode === 'vertical' ? 'none' : `2px solid ${props.score >= 50 ? '#065f46' : '#374151'}`};
  border-bottom: ${props => props.layoutMode === 'vertical' ? `2px solid ${props.score >= 50 ? '#065f46' : '#374151'}` : 'none'};

  @media (max-width: 1024px) {
    position: relative;
    height: auto;
    overflow-y: visible;
    border-right: none;
    flex-direction: column;
    padding: 32px 24px;
  }

  @media (max-width: 768px) {
    padding: 16px;
    flex-direction: column;
    gap: 24px;
    align-items: stretch;
  }
`;

const HeroGreeting = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: #ffffff;
  white-space: pre-line;

  @media (max-width: 768px) {
    font-size: 1.75rem;
    text-align: left;
  }
`;

const GreetingSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  gap: 16px;
`;

const GreetingSubtext = styled.div`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.85);
  max-width: 400px;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const RightPanel = styled.div`
  padding: 64px;
  overflow-y: ${props => props.layoutMode === 'vertical' ? 'visible' : 'auto'};
  height: ${props => props.layoutMode === 'vertical' ? 'auto' : '90vh'};

  @media (max-width: 1024px) {
    height: auto;
    overflow-y: visible;
    padding: 32px 24px;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const ScoreSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 24px 0;
  position: relative;
`;

const OliveBranch = styled.img`
  position: absolute;
  height: 100px;
  width: auto;
  opacity: 0.8;

  ${props => props.position === 'left' ? `
    left: -65px;
    top: 40%;
    transform: translateY(-50%);
  ` : `
    right: -65px;
    top: 40%;
    transform: translateY(-50%);
  `}

  @media (max-width: 768px) {
    ${props => props.position === 'left' ? `
      left: 0;
    ` : `
      right: 0;
    `}
  }
`;

const ScoreDisplay = styled.div`
  font-size: 4.625rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 8px;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 3.5rem;
  }
`;

const ScoreLabel = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: #cbd5e1;
`;

const PercentileText = styled.div`
  font-size: 1.0625rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 6px;
`;

const PeerText = styled.div`
  font-size: 0.9375rem;
  font-weight: 500;
  color: #cbd5e1;
  line-height: 1.5;
  text-align: left;
  padding: 0 8px;
`;

const SectionTitle = styled.h4`
  font-size: 0.8125rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.75px;
`;

const Divider = styled.div`
  height: 1px;
  background: #334155;
  margin: 20px 0;
  opacity: 0.5;
`;

const ChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Chip = styled.div`
  background: ${props => {
    if (props.variant === 'strength') return 'rgba(16, 185, 129, 0.2)';
    if (props.variant === 'improve') return 'rgba(148, 163, 184, 0.15)';
    return 'rgba(251, 146, 60, 0.15)';
  }};
  border: 1.5px solid ${props => {
    if (props.variant === 'strength') return '#10b981';
    if (props.variant === 'improve') return '#94a3b8';
    return '#fb923c';
  }};
  color: ${props => {
    if (props.variant === 'strength') return '#ffffff';
    if (props.variant === 'improve') return '#475569';
    return '#9a3412';
  }};
  padding: 6px 12px;
  border-radius: 0;
  font-size: 0.8125rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const ChatBubbleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 32px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const ChatSection = styled.div`
  background: #fefce8;
  border: 2px solid #fde047;
  border-radius: 0;
  padding: 16px 20px;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  flex: 1;

  &::before {
    content: '';
    position: absolute;
    left: -14px;
    top: 20px;
    width: 0;
    height: 0;
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
    border-right: 14px solid #fde047;

    @media (max-width: 768px) {
      left: 24px;
      top: -14px;
      border-left: 12px solid transparent;
      border-right: 12px solid transparent;
      border-bottom: 14px solid #fde047;
      border-top: 0;
    }
  }

  &::after {
    content: '';
    position: absolute;
    left: -10px;
    top: 20px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 12px solid #fefce8;

    @media (max-width: 768px) {
      left: 26px;
      top: -10px;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 12px solid #fefce8;
      border-top: 0;
    }
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const BotAvatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 0;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
`;

const BotImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ChatText = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  margin: 0 0 16px 0;
  font-weight: 600;
  color: #1e293b;
`;

const AttributesContainer = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #fde68a;
`;

const AttributesLabel = styled.div`
  font-size: 0.8125rem;
  font-weight: 700;
  color: #854d0e;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const AttributesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const AttributeBadge = styled.div`
  background: #fef3c7;
  border: 1px solid #fde047;
  color: #78350f;
  padding: 6px 12px;
  border-radius: 0;
  font-size: 0.8125rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const SectionBlock = styled.div`
  margin-bottom: 64px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const SectionHeading = styled.h4`
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SectionSubtitle = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin: 0 0 16px 0;
  line-height: 1.4;
`;

const SectionDivider = styled.div`
  height: 1px;
  background: #e2e8f0;
  margin-bottom: 20px;
`;

const QuickWinsList = styled.div`
  display: ${props => props.layoutMode === 'vertical' ? 'flex' : 'grid'};
  flex-direction: ${props => props.layoutMode === 'vertical' ? 'column' : 'unset'};
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.layoutMode === 'vertical' ? '32px' : '16px'};
  overflow-x: ${props => props.layoutMode === 'vertical' ? 'visible' : 'visible'};
  padding-bottom: ${props => props.layoutMode === 'vertical' ? '0' : '0'};

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

const QuickWinItem = styled.div`
  display: flex;
  flex-direction: ${props => props.layoutMode === 'vertical' ? 'row' : 'row'};
  align-items: ${props => props.layoutMode === 'vertical' ? 'center' : 'flex-start'};
  gap: 0;
  padding: 0;
  background: transparent;
  border: none;
  width: ${props => props.layoutMode === 'vertical' ? '100%' : 'auto'};
  text-align: ${props => props.layoutMode === 'vertical' ? 'left' : 'left'};
  transition: all 0.2s ease;
  position: relative;
`;

const QuickWinIcon = styled.div`
  width: ${props => props.layoutMode === 'vertical' ? '72px' : '64px'};
  height: ${props => props.layoutMode === 'vertical' ? '72px' : '64px'};
  background: ${props => {
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    ];
    return gradients[props.index % 4];
  }};
  border-radius: ${props => props.layoutMode === 'vertical' ? '12px' : '12px'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  flex-shrink: 0;
  position: relative;
`;

const QuickWinNumber = styled.div`
  background: #f1f5f9;
  color: #1e293b;
  width: 64px;
  height: 64px;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  flex-shrink: 0;
  border: 2px solid #e2e8f0;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    width: 104px;
    height: 2px;
    background: #e2e8f0;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const QuickWinSpacer = styled.div`
  width: 104px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const QuickWinCard = styled.div`
  flex: 1;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const QuickWinIconContainer = styled.div`
  width: 48px;
  height: 48px;
  background: ${props => props.iconColor || '#e8eaf6'};
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
  margin-bottom: 16px;

  svg {
    color: white;
  }
`;

const QuickWinContent = styled.div`
  flex: 1;
  width: 100%;
`;

const QuickWinTitle = styled.div`
  font-size: ${props => props.layoutMode === 'vertical' ? '1.0625rem' : '0.9375rem'};
  color: #1e293b;
  font-weight: 700;
  margin-bottom: ${props => props.layoutMode === 'vertical' ? '8px' : '6px'};
  line-height: 1.3;
`;

const QuickWinDescription = styled.div`
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.5;
`;

const EmptySection = styled.div`
  padding: 32px 24px;
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  border-radius: 0;
  text-align: center;
  color: #64748b;
  font-size: 0.875rem;
  font-style: italic;
`;

const PageTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 20px;
`;

const CareerTransitionContainer = styled.div`
  margin-bottom: 36px;
`;

const CareerTransitionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
`;

const CareerTransitionSubtitle = styled.p`
  font-size: 0.8125rem;
  color: #64748b;
  margin: 0 0 20px 0;
`;

const PathContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 60px;
  margin-bottom: 24px;
  position: relative;
  max-width: 100%;
  overflow: visible;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileRolesContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;

const MobileRoleCategory = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${props => {
    if (props.type === 'most-common') return '#10b981';
    if (props.type === 'similar') return '#3b82f6';
    if (props.type === 'pivot') return '#9333ea';
    return '#64748b';
  }};
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;

  &:nth-child(2) {
    align-items: center;
    justify-content: flex-start;
  }
`;

const CurrentRoleCard = styled.div`
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 0;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CurrentRoleInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const CurrentRoleTitle = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
`;

const CurrentBadge = styled.div`
  display: inline-block;
  background: #e0f2fe;
  color: #0369a1;
  padding: 2px 6px;
  border-radius: 0;
  font-size: 0.7rem;
  font-weight: 500;
`;

const CategoryCard = styled.div`
  background: white;
  border: 1px solid #cbd5e1;
  border-radius: 0;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #64748b;
  font-size: 0.8rem;
  font-weight: 600;
  position: relative;
  z-index: 10;
  width: 160px;

  svg {
    color: ${props => {
      if (props.type === 'most-common') return '#10b981';
      if (props.type === 'similar') return '#3b82f6';
      if (props.type === 'pivot') return '#9333ea';
      return '#64748b';
    }};
  }
`;

const RoleCard = styled.div`
  background: ${props => props.isPriority ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' : '#ffffff'};
  border: 2px solid ${props => props.isPriority ? '#10b981' : '#e2e8f0'};
  border-radius: 0;
  padding: 12px;
  display: flex;
  gap: 10px;
  position: relative;
  z-index: 10;

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const RoleContent = styled.div`
  flex: 1;
`;

const RoleHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
`;

const RoleTitle = styled.h4`
  font-size: 0.95rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  flex: 1;
`;

const RoleDescription = styled.p`
  font-size: 0.875rem;
  color: #475569;
  line-height: 1.5;
  margin: 8px 0 0 0;
  max-height: 3.9375rem;
  overflow: hidden;
`;

const RoleFooter = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`;

const Salary = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  color: #059669;
`;

const MatchBadge = styled.div`
  background: ${props => {
    if (props.match >= 80) return '#dcfce7';
    if (props.match >= 60) return '#fef3c7';
    return '#f1f5f9';
  }};
  color: ${props => {
    if (props.match >= 80) return '#15803d';
    if (props.match >= 60) return '#a16207';
    return '#475569';
  }};
  padding: 3px 8px;
  border-radius: 0;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
`;

const BenchmarkContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BenchmarkLeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const BenchmarkItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f8fafc;
  border-radius: 0;
  border: 1px solid #e2e8f0;
`;

const BenchmarkLabel = styled.div`
  font-size: 0.875rem;
  color: #64748b;
`;

const BenchmarkValue = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
`;

const GapAnalysis = styled.div`
  background: #f8fafc;
  border-radius: 0;
  padding: 16px;
  font-size: 0.875rem;
  color: #334155;
  line-height: 1.5;
  border: 1px solid #e2e8f0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ToolsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const Tool = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 0;
  padding: 12px 16px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #cbd5e1;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
`;

const ToolLogo = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
  flex-shrink: 0;
`;

const ToolLogoPlaceholder = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
  color: #64748b;
  flex-shrink: 0;
`;

const ToolName = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: #1e293b;
`;

const CTASection = styled.div`
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  border-radius: 0;
  padding: 24px 28px;
  margin: 48px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    margin: 40px 0;
    padding: 16px;
  }
`;

const CTAContent = styled.div`
  flex: 1;
`;

const CTATitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 6px;
`;

const CTAText = styled.p`
  font-size: 0.8125rem;
  color: #64748b;
  margin: 0;
`;

const CTAButton = styled.button`
  background: #c71f69;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: #a01855;
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 14px 20px;
  }
`;

const TwoColumnTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TableColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TableColumnTitle = styled.h5`
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${props => props.type === 'strength' ? '#059669' : '#dc2626'};
  margin-bottom: 8px;
`;

const TableItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: ${props => props.type === 'strength' ? '#f0fdf4' : '#fef2f2'};
  border: 1px solid ${props => props.type === 'strength' ? '#bbf7d0' : '#fecaca'};
  border-radius: 0;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => props.type === 'strength' ? '#166534' : '#991b1b'};

  svg {
    flex-shrink: 0;
  }
`;

const PeerComparisonCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0;
  padding: 24px 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const PeerComparisonContent = styled.div`
  display: flex;
  align-items: center;
  gap: 48px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
    text-align: left;
    align-items: flex-start;
  }
`;

const CircularChart = styled.div`
  position: relative;
  width: 160px;
  height: 160px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

const CircularChartInner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const CircularChartPercentile = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CircularChartLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 6px;
`;

const PeerComparisonText = styled.div`
  flex: 1;
`;

const PeerComparisonLabel = styled.div`
  display: inline-block;
  padding: 8px 16px;
  background: ${props => {
    const percentile = props.percentile || 0;
    if (percentile >= 80) return '#1D925B';
    if (percentile >= 60) return '#D77C00';
    return '#C32841';
  }};
  color: white;
  font-size: 0.9375rem;
  font-weight: 700;
  border-radius: 0;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const PeerComparisonSummary = styled.p`
  font-size: 0.875rem;
  color: #334155;
  line-height: 1.6;
  margin: 0;
  font-weight: 500;
`;

// Helper functions for career transition
const categorizeRoles = (roles) => {
  // Remove duplicates based on title
  const uniqueRoles = [];
  const seenTitles = new Set();

  roles.forEach(role => {
    const title = (role.title || role.role || '').toLowerCase().trim();
    if (title && !seenTitles.has(title)) {
      seenTitles.add(title);
      uniqueRoles.push(role);
    }
  });

  // Sort by match score
  const sorted = [...uniqueRoles].sort((a, b) => (b.match_score || 0) - (a.match_score || 0));

  const categories = {
    mostLikely: [],
    similar: [],
    pivot: []
  };

  // Take top 3 unique roles
  const rolesToShow = sorted.slice(0, 3);

  if (rolesToShow.length === 0) {
    return categories;
  }

  // Simple distribution: First role → Most Likely, Second → Similar, Third → Pivot
  rolesToShow.forEach((role, index) => {
    const match = role.match_score || 0;

    if (index === 0) {
      // First role always goes to Most Likely with at least 75% match
      categories.mostLikely.push({
        ...role,
        match_score: Math.max(match, 75)
      });
    } else if (index === 1) {
      // Second role goes to Similar with at least 60% match
      categories.similar.push({
        ...role,
        match_score: Math.max(match, 60)
      });
    } else if (index === 2) {
      // Third role goes to Pivot with at least 55% match
      categories.pivot.push({
        ...role,
        match_score: Math.max(match, 55)
      });
    }
  });

  return categories;
};

const formatSalary = (salary) => {
  if (!salary) return null;
  if (salary.toString().includes('₹')) return salary;
  return `₹${salary}`;
};

// Helper function to get tool logo URLs
const getToolLogoUrl = (toolName) => {
  const tool = toolName.toLowerCase();

  // Map common tools to their logo domains
  const logoMap = {
    'react': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'node': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'nodejs': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'javascript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'typescript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    'docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    'kubernetes': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
    'aws': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    'mongodb': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'postgresql': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    'mysql': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    'redis': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
    'git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    'github': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    'java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    'spring': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
    'angular': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
    'vue': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    'graphql': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
    'firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
    'leetcode': 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png',
    'pramp': null,
    'system design primer': null
  };

  // Check for exact match or partial match
  for (const [key, url] of Object.entries(logoMap)) {
    if (tool.includes(key) || key.includes(tool)) {
      return url;
    }
  }

  return null;
};

// Tool item component to handle logo state
const ToolItem = ({ toolName }) => {
  const logoUrl = getToolLogoUrl(toolName);
  const initial = toolName.charAt(0).toUpperCase();
  const [showLogo, setShowLogo] = useState(!!logoUrl);

  return (
    <Tool>
      {logoUrl && showLogo ? (
        <ToolLogo
          src={logoUrl}
          alt={toolName}
          onError={() => setShowLogo(false)}
        />
      ) : (
        <ToolLogoPlaceholder>
          {initial}
        </ToolLogoPlaceholder>
      )}
      <ToolName>{toolName}</ToolName>
    </Tool>
  );
};

const ProfileMatchHeroV2 = ({ score, notes, badges, evaluationResults, background: backgroundProp, quizResponses, goals, layoutMode = 'split', userName = 'There' }) => {
  const [displayScore, setDisplayScore] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [showArrows, setShowArrows] = useState(false);
  const heroRef = useRef(null);

  const animateScore = useCallback(() => {
    if (!score || score === 0) {
      return;
    }

    const duration = 2000;
    const steps = 60;
    const increment = score / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.round(current));
      }
    }, duration / steps);
  }, [score]);

  // Animate score when it changes or component mounts
  useEffect(() => {
    if (score && score > 0 && !hasAnimated) {
      setHasAnimated(true);
      animateScore();
    }
  }, [score, hasAnimated, animateScore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated && score > 0) {
            setHasAnimated(true);
            animateScore();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    // Force re-render arrows for career transition
    const timer = setTimeout(() => {
      setShowArrows(true);
    }, 100);

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
      clearTimeout(timer);
    };
  }, [hasAnimated, score, animateScore]);

  const strengths = evaluationResults?.skill_analysis?.strengths || [];
  const areasToImprove = evaluationResults?.skill_analysis?.areas_to_develop || [];
  const quickWins = evaluationResults?.quick_wins || [];
  const tools = evaluationResults?.recommended_tools || [];
  const peerComparison = evaluationResults?.peer_comparison || {};
  const experienceBenchmark = evaluationResults?.experience_benchmark || null;
  const recommendedRoles = evaluationResults?.recommended_roles_based_on_interests || [];
  const background = backgroundProp || 'tech';

  const percentile = peerComparison.percentile || 68;

  // Categorize roles for career transition
  const categories = categorizeRoles(recommendedRoles);

  // Determine background label and current role
  const currentRole = quizResponses?.currentRole || quizResponses?.currentSkill || 'Current Role';
  const backgroundLabel = background === 'non-tech' ? 'Non-Tech Professional' : 'Tech Professional';

  // Dynamic greeting based on score
  const getGreetingText = (score) => {
    if (score >= 80) return 'Your Profile is Exceptional';
    if (score >= 65) return 'Your Profile Looks Strong';
    if (score >= 50) return 'Your Profile Looks Promising';
    if (score >= 35) return 'Your Profile Has Potential';
    return 'Your Profile Needs Work';
  };

  // Generate personalized summary with user inputs
  const getPersonalizedSummary = () => {
    const experience = quizResponses?.experience || '';
    const currentRoleText = quizResponses?.currentRole || quizResponses?.currentSkill || '';
    const targetRole = quizResponses?.targetRole || '';
    const topicsOfInterest = (goals?.topicOfInterest || []).join(', ');

    let summary = notes || '';

    if (!summary) {
      // Generate default summary with user context
      const roleContext = currentRoleText ? ` as a ${currentRoleText}` : '';
      const expContext = experience ? ` with ${experience} of experience` : '';
      const targetContext = targetRole ? ` Your target role of ${targetRole}` : '';
      const interestContext = topicsOfInterest ? ` Your interests in ${topicsOfInterest}` : '';

      summary = `Based on your profile${roleContext}${expContext}, your career readiness score is ${score}%.${targetContext || interestContext ? `${targetContext}${interestContext} aligns well with your current trajectory.` : ''} Let's work together to bridge the gaps and unlock your full potential!`;
    }

    return summary;
  };

  return (
    <HeroContainer ref={heroRef} layoutMode={layoutMode}>
      {/* Left Panel - Sticky or Horizontal */}
      <LeftPanel score={score} layoutMode={layoutMode}>
        {layoutMode === 'vertical' ? (
          <>
            {/* Vertical mode: Greeting on left, Score on right */}
            <GreetingSection>
              <HeroGreeting>Hey {userName},{'\n'}{getGreetingText(score)}</HeroGreeting>
              <GreetingSubtext>
                This report helps you get from {score}% to 100% career readiness. Give it a read!
              </GreetingSubtext>
            </GreetingSection>
            <ScoreSection>
              {score >= 60 && <OliveBranch src={oliveBranchLeft} alt="" position="left" />}
              {score >= 60 && <OliveBranch src={oliveBranchRight} alt="" position="right" />}
              <ScoreDisplay>{displayScore}%</ScoreDisplay>
              <ScoreLabel>Career Readiness Score</ScoreLabel>
            </ScoreSection>
          </>
        ) : (
          <>
            {/* Split mode: Original layout */}
            <ScoreSection>
              {score >= 60 && <OliveBranch src={oliveBranchLeft} alt="" position="left" />}
              {score >= 60 && <OliveBranch src={oliveBranchRight} alt="" position="right" />}
              <ScoreDisplay>{displayScore}%</ScoreDisplay>
              <ScoreLabel>Career Readiness Score</ScoreLabel>
            </ScoreSection>

            <PeerText>
              {peerComparison.summary || `You're performing better than ${percentile}% of candidates in your experience bracket.`}
            </PeerText>

            <Divider />

            {strengths.length > 0 && (
              <div>
                <SectionTitle>Your Strengths</SectionTitle>
                <ChipsContainer>
                  {strengths.slice(0, 5).map((strength, index) => (
                    <Chip key={index} variant="strength">
                      <CheckCircle size={14} weight="fill" color="#10b981" />
                      {strength}
                    </Chip>
                  ))}
                </ChipsContainer>
              </div>
            )}
          </>
        )}
      </LeftPanel>

      {/* Right Panel - Scrollable or Vertical */}
      <RightPanel layoutMode={layoutMode}>
        {/* Page Title - Only show in split mode */}
        {layoutMode !== 'vertical' && (
          <PageTitle>{userName}, {getGreetingText(score)}</PageTitle>
        )}

        {/* Chatbot Section */}
        <ChatBubbleWrapper>
          <BotAvatar>
            <BotImage src={scalerBot} alt="Scaler Bot" />
          </BotAvatar>
          <ChatSection>
            <ChatText>
              {getPersonalizedSummary()}
            </ChatText>
            {badges && badges.length > 0 && (
              <AttributesContainer>
                <AttributesLabel>Your Attributes:</AttributesLabel>
                <AttributesList>
                  {badges.map((badge, index) => (
                    <AttributeBadge key={index}>
                      {typeof badge === 'string' ? badge : badge.name}
                    </AttributeBadge>
                  ))}
                </AttributesList>
              </AttributesContainer>
            )}
          </ChatSection>
        </ChatBubbleWrapper>

        {/* Skills Section - Moved to top for both modes */}
        {(strengths.length > 0 || areasToImprove.length > 0) && (
          <SectionBlock>
            <SectionHeading>See Where You Stand Today</SectionHeading>
            <SectionSubtitle>Compare your strengths and areas for improvement</SectionSubtitle>
            <SectionDivider />
            <TwoColumnTable>
              <TableColumn>
                <TableColumnTitle type="strength">Your Strengths</TableColumnTitle>
                {strengths.length > 0 ? (
                  strengths.map((strength, index) => (
                    <TableItem key={index} type="strength">
                      <CheckCircle size={18} weight="fill" color="#059669" />
                      {strength}
                    </TableItem>
                  ))
                ) : (
                  <EmptySection>No strengths identified yet.</EmptySection>
                )}
              </TableColumn>
              <TableColumn>
                <TableColumnTitle type="improve">Areas to Improve</TableColumnTitle>
                {areasToImprove.length > 0 ? (
                  areasToImprove.map((area, index) => (
                    <TableItem key={index} type="improve">
                      <Target size={18} weight="fill" color="#dc2626" />
                      {area}
                    </TableItem>
                  ))
                ) : (
                  <EmptySection>No gaps identified yet.</EmptySection>
                )}
              </TableColumn>
            </TwoColumnTable>
          </SectionBlock>
        )}

        {/* VERTICAL MODE: Quick Wins → Tools → See Where You Stand Today → Experience → Peer → Career → Alumni */}
        {/* SPLIT MODE: Career → Quick Wins → Areas to Improve → Tools → Experience → Alumni */}

        {layoutMode === 'vertical' ? (
          <>
            {/* Career Transition Section - Moved to top */}
            {recommendedRoles.length > 0 && (
              <CareerTransitionContainer>
                <CareerTransitionTitle>Career Transition</CareerTransitionTitle>
                <CareerTransitionSubtitle>Explore potential career paths based on your profile and interests</CareerTransitionSubtitle>
                <SectionDivider />
                <PathContainer>
                  {/* Column 1: Current Role */}
                  <Column>
                    <CurrentRoleCard id="current-role">
                      <CurrentRoleInfo>
                        <CurrentRoleTitle>{backgroundLabel}</CurrentRoleTitle>
                        <CurrentBadge>You are here</CurrentBadge>
                      </CurrentRoleInfo>
                    </CurrentRoleCard>
                  </Column>

                  {/* Column 2: Category Labels */}
                  <Column>
                    {categories.mostLikely.length > 0 && (
                      <CategoryCard type="most-common" id="category-mostLikely">
                        <Star size={16} weight="fill" />
                        Most likely match
                      </CategoryCard>
                    )}
                    {categories.similar.length > 0 && (
                      <CategoryCard type="similar" id="category-similar">
                        <ArrowsLeftRight size={16} weight="regular" />
                        Similar jobs
                      </CategoryCard>
                    )}
                    {categories.pivot.length > 0 && (
                      <CategoryCard type="pivot" id="category-pivot">
                        <ArrowBendUpRight size={16} weight="regular" />
                        Pivot
                      </CategoryCard>
                    )}
                  </Column>

                  {/* Column 3: Role Cards */}
                  <Column>
                    {categories.mostLikely.map((role, index) => {
                      const match = role.match_score || 0;
                      const salary = formatSalary(role.salary_range_inr || role.salary_range_usd || role.salary);
                      return (
                        <RoleCard key={`mostLikely-${index}`} id={`role-mostLikely-${index}`} isPriority={true}>
                          <RoleContent>
                            <RoleHeader>
                              <RoleTitle>{role.title || role.role}</RoleTitle>
                              <MatchBadge match={match}>{match}% match</MatchBadge>
                            </RoleHeader>
                            {(role.reason || role.reasoning) && (
                              <RoleDescription>{role.reason || role.reasoning}</RoleDescription>
                            )}
                            <RoleFooter>
                              {salary && <Salary>{salary}</Salary>}
                            </RoleFooter>
                          </RoleContent>
                        </RoleCard>
                      );
                    })}
                    {categories.similar.map((role, index) => {
                      const match = role.match_score || 0;
                      const salary = formatSalary(role.salary_range_inr || role.salary_range_usd || role.salary);
                      return (
                        <RoleCard key={`similar-${index}`} id={`role-similar-${index}`} isPriority={false}>
                          <RoleContent>
                            <RoleHeader>
                              <RoleTitle>{role.title || role.role}</RoleTitle>
                              <MatchBadge match={match}>{match}% match</MatchBadge>
                            </RoleHeader>
                            {(role.reason || role.reasoning) && (
                              <RoleDescription>{role.reason || role.reasoning}</RoleDescription>
                            )}
                            <RoleFooter>
                              {salary && <Salary>{salary}</Salary>}
                            </RoleFooter>
                          </RoleContent>
                        </RoleCard>
                      );
                    })}
                    {categories.pivot.map((role, index) => {
                      const match = role.match_score || 0;
                      const salary = formatSalary(role.salary_range_inr || role.salary_range_usd || role.salary);
                      return (
                        <RoleCard key={`pivot-${index}`} id={`role-pivot-${index}`} isPriority={false}>
                          <RoleContent>
                            <RoleHeader>
                              <RoleTitle>{role.title || role.role}</RoleTitle>
                              <MatchBadge match={match}>{match}% match</MatchBadge>
                            </RoleHeader>
                            {(role.reason || role.reasoning) && (
                              <RoleDescription>{role.reason || role.reasoning}</RoleDescription>
                            )}
                            <RoleFooter>
                              {salary && <Salary>{salary}</Salary>}
                            </RoleFooter>
                          </RoleContent>
                        </RoleCard>
                      );
                    })}
                  </Column>

                  {/* Xarrow Connections */}
                  {showArrows && (
                    <>
                      {categories.mostLikely.length > 0 && (
                        <>
                          <Xarrow start="current-role" end="category-mostLikely" color="#a7f3d0" strokeWidth={8} curveness={0.8} headSize={0} path="smooth" zIndex={1} />
                          {categories.mostLikely.map((_, index) => (
                            <Xarrow key={`arrow-mostLikely-${index}`} start="category-mostLikely" end={`role-mostLikely-${index}`} color="#a7f3d0" strokeWidth={8} curveness={0.6} headSize={0} path="smooth" zIndex={1} />
                          ))}
                        </>
                      )}
                      {categories.similar.length > 0 && (
                        <>
                          <Xarrow start="current-role" end="category-similar" color="#bfdbfe" strokeWidth={8} curveness={0.8} headSize={0} path="smooth" zIndex={1} />
                          {categories.similar.map((_, index) => (
                            <Xarrow key={`arrow-similar-${index}`} start="category-similar" end={`role-similar-${index}`} color="#bfdbfe" strokeWidth={8} curveness={0.6} headSize={0} path="smooth" zIndex={1} />
                          ))}
                        </>
                      )}
                      {categories.pivot.length > 0 && (
                        <>
                          <Xarrow start="current-role" end="category-pivot" color="#e9d5ff" strokeWidth={8} curveness={0.3} headSize={0} path="smooth" zIndex={1} startAnchor="right" endAnchor="left" />
                          {categories.pivot.map((_, index) => (
                            <Xarrow key={`arrow-pivot-${index}`} start="category-pivot" end={`role-pivot-${index}`} color="#e9d5ff" strokeWidth={8} curveness={0.3} headSize={0} path="smooth" zIndex={1} startAnchor="right" endAnchor="left" />
                          ))}
                        </>
                      )}
                    </>
                  )}
                </PathContainer>

                {/* Mobile-Only Roles View */}
                <MobileRolesContainer>
                  {/* Most Likely Match */}
                  {categories.mostLikely.length > 0 && (
                    <div>
                      <MobileRoleCategory type="most-common">
                        <Star size={14} weight="fill" />
                        Most likely match
                      </MobileRoleCategory>
                      {categories.mostLikely.map((role, index) => {
                        const match = role.match_score || 0;
                        const salary = formatSalary(role.salary_range_inr || role.salary_range_usd || role.salary);
                        return (
                          <RoleCard key={`mobile-mostLikely-${index}`} isPriority={true}>
                            <RoleContent>
                              <RoleHeader>
                                <RoleTitle>{role.title || role.role}</RoleTitle>
                                <MatchBadge match={match}>{match}% match</MatchBadge>
                              </RoleHeader>
                              {(role.reason || role.reasoning) && (
                                <RoleDescription>{role.reason || role.reasoning}</RoleDescription>
                              )}
                              <RoleFooter>
                                {salary && <Salary>{salary}</Salary>}
                              </RoleFooter>
                            </RoleContent>
                          </RoleCard>
                        );
                      })}
                    </div>
                  )}

                  {/* Similar Jobs */}
                  {categories.similar.length > 0 && (
                    <div>
                      <MobileRoleCategory type="similar">
                        <ArrowsLeftRight size={14} weight="regular" />
                        Similar jobs
                      </MobileRoleCategory>
                      {categories.similar.map((role, index) => {
                        const match = role.match_score || 0;
                        const salary = formatSalary(role.salary_range_inr || role.salary_range_usd || role.salary);
                        return (
                          <RoleCard key={`mobile-similar-${index}`} isPriority={false}>
                            <RoleContent>
                              <RoleHeader>
                                <RoleTitle>{role.title || role.role}</RoleTitle>
                                <MatchBadge match={match}>{match}% match</MatchBadge>
                              </RoleHeader>
                              {(role.reason || role.reasoning) && (
                                <RoleDescription>{role.reason || role.reasoning}</RoleDescription>
                              )}
                              <RoleFooter>
                                {salary && <Salary>{salary}</Salary>}
                              </RoleFooter>
                            </RoleContent>
                          </RoleCard>
                        );
                      })}
                    </div>
                  )}

                  {/* Pivot */}
                  {categories.pivot.length > 0 && (
                    <div>
                      <MobileRoleCategory type="pivot">
                        <ArrowBendUpRight size={14} weight="regular" />
                        Pivot
                      </MobileRoleCategory>
                      {categories.pivot.map((role, index) => {
                        const match = role.match_score || 0;
                        const salary = formatSalary(role.salary_range_inr || role.salary_range_usd || role.salary);
                        return (
                          <RoleCard key={`mobile-pivot-${index}`} isPriority={false}>
                            <RoleContent>
                              <RoleHeader>
                                <RoleTitle>{role.title || role.role}</RoleTitle>
                                <MatchBadge match={match}>{match}% match</MatchBadge>
                              </RoleHeader>
                              {(role.reason || role.reasoning) && (
                                <RoleDescription>{role.reason || role.reasoning}</RoleDescription>
                              )}
                              <RoleFooter>
                                {salary && <Salary>{salary}</Salary>}
                              </RoleFooter>
                            </RoleContent>
                          </RoleCard>
                        );
                      })}
                    </div>
                  )}
                </MobileRolesContainer>
              </CareerTransitionContainer>
            )}

            {/* Quick Wins Section - Vertically Stacked */}
            {quickWins.length > 0 && (
              <SectionBlock>
                <SectionHeading>Quick Wins for You</SectionHeading>
                <SectionSubtitle>Take these actionable steps to improve your profile</SectionSubtitle>
                <SectionDivider />
                <QuickWinsList layoutMode={layoutMode}>
                  {quickWins.slice(0, 4).map((win, index) => {
                    // Icon colors array
                    const iconColors = ['#D90065', '#D77C00', '#C32841', '#1D925B', '#0052FF', '#016DD9'];
                    const iconColor = iconColors[index % iconColors.length];

                    // Icon mapping from Phosphor React
                    const iconMap = {
                      'lightbulb': <Lightbulb size={24} weight="fill" />,
                      'rocket': <Rocket size={24} weight="fill" />,
                      'books': <Books size={24} weight="fill" />,
                      'chart': <ChartLine size={24} weight="fill" />,
                      'code': <Code size={24} weight="fill" />,
                      'briefcase': <BriefcaseMetal size={24} weight="fill" />,
                      'graduation': <GraduationCap size={24} weight="fill" />,
                      'users': <Users size={24} weight="fill" />,
                      'trophy': <Trophy size={24} weight="fill" />,
                      'target': <Target size={24} weight="fill" />,
                      'certificate': <Medal size={24} weight="fill" />
                    };

                    // Get icon from win object or use default
                    const iconName = typeof win === 'object' && win.icon ? win.icon.toLowerCase() : 'lightbulb';
                    const IconComponent = iconMap[iconName] || iconMap['lightbulb'];

                    return (
                      <QuickWinItem key={index} layoutMode={layoutMode}>
                        <QuickWinNumber>{index + 1}</QuickWinNumber>
                        <QuickWinSpacer />
                        <QuickWinCard>
                          <QuickWinIconContainer iconColor={iconColor}>
                            {IconComponent}
                          </QuickWinIconContainer>
                          <QuickWinContent>
                            {typeof win === 'string' ? (
                              <QuickWinDescription>{win}</QuickWinDescription>
                            ) : (
                              <>
                                <QuickWinTitle layoutMode={layoutMode}>{win.name || win.title}</QuickWinTitle>
                                {win.description && <QuickWinDescription>{win.description}</QuickWinDescription>}
                              </>
                            )}
                          </QuickWinContent>
                        </QuickWinCard>
                      </QuickWinItem>
                    );
                  })}
                </QuickWinsList>
              </SectionBlock>
            )}

            {/* Tools & Technologies Section */}
            {tools.length > 0 && (
              <SectionBlock>
                <SectionHeading>Tools & Technologies to Learn</SectionHeading>
                <SectionSubtitle>Master these tools to enhance your skillset</SectionSubtitle>
                <SectionDivider />
                <ToolsGrid>
                  {tools.slice(0, 8).map((tool, index) => {
                    const toolName = typeof tool === 'string' ? tool : tool.name;
                    return <ToolItem key={index} toolName={toolName} />;
                  })}
                </ToolsGrid>
              </SectionBlock>
            )}


            {/* Experience Benchmark Section */}
            {experienceBenchmark && (
              <SectionBlock>
                <SectionHeading>Experience Benchmark</SectionHeading>
                <SectionSubtitle>Compare your experience with typical requirements for your target role</SectionSubtitle>
                <SectionDivider />
                <BenchmarkContainer>
                  <BenchmarkLeftSection>
                    <BenchmarkItem>
                      <BenchmarkLabel>Your Experience</BenchmarkLabel>
                      <BenchmarkValue>{experienceBenchmark.your_experience_years}</BenchmarkValue>
                    </BenchmarkItem>
                    <BenchmarkItem>
                      <BenchmarkLabel>Typical for Target Role</BenchmarkLabel>
                      <BenchmarkValue>{experienceBenchmark.typical_for_target_role_years}</BenchmarkValue>
                    </BenchmarkItem>
                  </BenchmarkLeftSection>
                  {experienceBenchmark.gap_analysis && (
                    <GapAnalysis>
                      <strong>Gap Analysis:</strong> {experienceBenchmark.gap_analysis}
                    </GapAnalysis>
                  )}
                </BenchmarkContainer>
              </SectionBlock>
            )}

            {/* Peer Comparison Card */}
            <SectionBlock>
              <SectionHeading>Peer Comparison</SectionHeading>
              <SectionSubtitle>See how you rank against others in your experience bracket</SectionSubtitle>
              <SectionDivider />
              <PeerComparisonCard>
                <PeerComparisonContent>
                  <CircularChart>
                    <svg viewBox="0 0 160 160" style={{ transform: 'rotate(-90deg)' }}>
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="12"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="none"
                        stroke={percentile >= 80 ? '#1D925B' : percentile >= 60 ? '#D77C00' : '#C32841'}
                        strokeWidth="12"
                        strokeDasharray={`${(percentile / 100) * 439.6} 439.6`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <CircularChartInner>
                      <CircularChartPercentile>{percentile}%</CircularChartPercentile>
                      <CircularChartLabel>Percentile</CircularChartLabel>
                    </CircularChartInner>
                  </CircularChart>
                  <PeerComparisonText>
                    <PeerComparisonLabel percentile={percentile}>
                      {peerComparison.label || (percentile >= 80 ? 'Above Average' : percentile >= 60 ? 'At par' : 'Below Average')}
                    </PeerComparisonLabel>
                    <PeerComparisonSummary>
                      {peerComparison.summary || `You're performing better than ${percentile}% of candidates in your experience bracket.`}
                    </PeerComparisonSummary>
                  </PeerComparisonText>
                </PeerComparisonContent>
              </PeerComparisonCard>
            </SectionBlock>

            {/* CTA 1 */}
            <CTASection>
              <CTAContent>
                <CTATitle>Ready to take the next step?</CTATitle>
                <CTAText>Get personalized guidance from our career advisors</CTAText>
              </CTAContent>
              <CTAButton onClick={() => window.open('/callback', '_blank')}>
                Request Callback
              </CTAButton>
            </CTASection>
          </>
        ) : (
          <>
            {/* SPLIT MODE - Original Layout */}
            {/* Career Transition Section */}
            {recommendedRoles.length > 0 && (
              <CareerTransitionContainer>
                <CareerTransitionTitle>Career Transition</CareerTransitionTitle>
                <CareerTransitionSubtitle>Explore potential career paths based on your profile and interests</CareerTransitionSubtitle>
                <PathContainer>
                  {/* Column 1: Current Role */}
                  <Column>
                    <CurrentRoleCard id="current-role">
                      <CurrentRoleInfo>
                        <CurrentRoleTitle>{backgroundLabel}</CurrentRoleTitle>
                        <CurrentBadge>You are here</CurrentBadge>
                  </CurrentRoleInfo>
                </CurrentRoleCard>
              </Column>

              {/* Column 2: Category Labels */}
              <Column>
                {categories.mostLikely.length > 0 && (
                  <CategoryCard type="most-common" id="category-mostLikely">
                    <Star size={16} weight="fill" />
                    Most likely match
                  </CategoryCard>
                )}

                {categories.similar.length > 0 && (
                  <CategoryCard type="similar" id="category-similar">
                    <ArrowsLeftRight size={16} weight="regular" />
                    Similar jobs
                  </CategoryCard>
                )}

                {categories.pivot.length > 0 && (
                  <CategoryCard type="pivot" id="category-pivot">
                    <ArrowBendUpRight size={16} weight="regular" />
                    Pivot
                  </CategoryCard>
                )}
              </Column>

              {/* Column 3: Role Cards */}
              <Column>
                {categories.mostLikely.map((role, index) => {
                  const match = role.match_score || 0;
                  const salary = formatSalary(role.salary_range_inr || role.salary_range_usd || role.salary);
                  return (
                    <RoleCard key={`mostLikely-${index}`} id={`role-mostLikely-${index}`} isPriority={true}>
                      <RoleContent>
                        <RoleHeader>
                          <RoleTitle>{role.title || role.role}</RoleTitle>
                          <MatchBadge match={match}>{match}% match</MatchBadge>
                        </RoleHeader>
                        {(role.reason || role.reasoning) && (
                          <RoleDescription>{role.reason || role.reasoning}</RoleDescription>
                        )}
                        <RoleFooter>
                          {salary && <Salary>{salary}</Salary>}
                        </RoleFooter>
                      </RoleContent>
                    </RoleCard>
                  );
                })}

                {categories.similar.map((role, index) => {
                  const match = role.match_score || 0;
                  const salary = formatSalary(role.salary_range_inr || role.salary_range_usd || role.salary);
                  return (
                    <RoleCard key={`similar-${index}`} id={`role-similar-${index}`} isPriority={false}>
                      <RoleContent>
                        <RoleHeader>
                          <RoleTitle>{role.title || role.role}</RoleTitle>
                          <MatchBadge match={match}>{match}% match</MatchBadge>
                        </RoleHeader>
                        {(role.reason || role.reasoning) && (
                          <RoleDescription>{role.reason || role.reasoning}</RoleDescription>
                        )}
                        <RoleFooter>
                          {salary && <Salary>{salary}</Salary>}
                        </RoleFooter>
                      </RoleContent>
                    </RoleCard>
                  );
                })}

                {categories.pivot.map((role, index) => {
                  const match = role.match_score || 0;
                  const salary = formatSalary(role.salary_range_inr || role.salary_range_usd || role.salary);
                  return (
                    <RoleCard key={`pivot-${index}`} id={`role-pivot-${index}`} isPriority={false}>
                      <RoleContent>
                        <RoleHeader>
                          <RoleTitle>{role.title || role.role}</RoleTitle>
                          <MatchBadge match={match}>{match}% match</MatchBadge>
                        </RoleHeader>
                        {(role.reason || role.reasoning) && (
                          <RoleDescription>{role.reason || role.reasoning}</RoleDescription>
                        )}
                        <RoleFooter>
                          {salary && <Salary>{salary}</Salary>}
                        </RoleFooter>
                      </RoleContent>
                    </RoleCard>
                  );
                })}
              </Column>

              {/* Xarrow Connections */}
              {showArrows && (
                <>
                  {/* Most Likely Match connections */}
                  {categories.mostLikely.length > 0 && (
                    <>
                      <Xarrow
                        start="current-role"
                        end="category-mostLikely"
                        color="#a7f3d0"
                        strokeWidth={8}
                        curveness={0.8}
                        headSize={0}
                        path="smooth"
                        zIndex={1}
                      />
                      {categories.mostLikely.map((_, index) => (
                        <Xarrow
                          key={`arrow-mostLikely-${index}`}
                          start="category-mostLikely"
                          end={`role-mostLikely-${index}`}
                          color="#a7f3d0"
                          strokeWidth={8}
                          curveness={0.6}
                          headSize={0}
                          path="smooth"
                          zIndex={1}
                        />
                      ))}
                    </>
                  )}

                  {/* Similar Jobs connections */}
                  {categories.similar.length > 0 && (
                    <>
                      <Xarrow
                        start="current-role"
                        end="category-similar"
                        color="#bfdbfe"
                        strokeWidth={8}
                        curveness={0.8}
                        headSize={0}
                        path="smooth"
                        zIndex={1}
                      />
                      {categories.similar.map((_, index) => (
                        <Xarrow
                          key={`arrow-similar-${index}`}
                          start="category-similar"
                          end={`role-similar-${index}`}
                          color="#bfdbfe"
                          strokeWidth={8}
                          curveness={0.6}
                          headSize={0}
                          path="smooth"
                          zIndex={1}
                        />
                      ))}
                    </>
                  )}

                  {/* Pivot connections */}
                  {categories.pivot.length > 0 && (
                    <>
                      <Xarrow
                        start="current-role"
                        end="category-pivot"
                        color="#e9d5ff"
                        strokeWidth={8}
                        curveness={0.3}
                        headSize={0}
                        path="smooth"
                        zIndex={1}
                        startAnchor="right"
                        endAnchor="left"
                      />
                      {categories.pivot.map((_, index) => (
                        <Xarrow
                          key={`arrow-pivot-${index}`}
                          start="category-pivot"
                          end={`role-pivot-${index}`}
                          color="#e9d5ff"
                          strokeWidth={8}
                          curveness={0.3}
                          headSize={0}
                          path="smooth"
                          zIndex={1}
                          startAnchor="right"
                          endAnchor="left"
                        />
                      ))}
                    </>
                  )}
                </>
              )}
                </PathContainer>
              </CareerTransitionContainer>
            )}

            {/* Quick Wins Section */}
            {quickWins.length > 0 && (
              <SectionBlock>
                <SectionHeading>Quick Wins to Reach Your Goal</SectionHeading>
                <SectionDivider />
                <QuickWinsList>
                  {quickWins.slice(0, 4).map((win, index) => {
                    // Icon colors array
                    const iconColors = ['#D90065', '#D77C00', '#C32841', '#1D925B', '#0052FF', '#016DD9'];
                    const iconColor = iconColors[index % iconColors.length];

                    // Icon mapping from Phosphor React
                    const iconMap = {
                      'lightbulb': <Lightbulb size={24} weight="fill" />,
                      'rocket': <Rocket size={24} weight="fill" />,
                      'books': <Books size={24} weight="fill" />,
                      'chart': <ChartLine size={24} weight="fill" />,
                      'code': <Code size={24} weight="fill" />,
                      'briefcase': <BriefcaseMetal size={24} weight="fill" />,
                      'graduation': <GraduationCap size={24} weight="fill" />,
                      'users': <Users size={24} weight="fill" />,
                      'trophy': <Trophy size={24} weight="fill" />,
                      'target': <Target size={24} weight="fill" />,
                      'certificate': <Medal size={24} weight="fill" />
                    };

                    // Get icon from win object or use default
                    const iconName = typeof win === 'object' && win.icon ? win.icon.toLowerCase() : 'lightbulb';
                    const IconComponent = iconMap[iconName] || iconMap['lightbulb'];

                    return (
                      <QuickWinItem key={index}>
                        <QuickWinNumber>{index + 1}</QuickWinNumber>
                        <QuickWinSpacer />
                        <QuickWinCard>
                          <QuickWinIconContainer iconColor={iconColor}>
                            {IconComponent}
                          </QuickWinIconContainer>
                          <QuickWinContent>
                            {typeof win === 'string' ? (
                              <QuickWinDescription>{win}</QuickWinDescription>
                            ) : (
                              <>
                                <QuickWinTitle>{win.name || win.title}</QuickWinTitle>
                                {win.description && <QuickWinDescription>{win.description}</QuickWinDescription>}
                              </>
                            )}
                          </QuickWinContent>
                        </QuickWinCard>
                      </QuickWinItem>
                    );
                  })}
                </QuickWinsList>
              </SectionBlock>
            )}

            {/* CTA 1 - After Quick Wins */}
            <CTASection>
              <CTAContent>
                <CTATitle>Need help prioritizing these actions?</CTATitle>
                <CTAText>Talk to our experts to create a personalized roadmap</CTAText>
              </CTAContent>
              <CTAButton onClick={() => window.open('/callback', '_blank')}>
                Request Callback
              </CTAButton>
            </CTASection>

            {/* Key Focus Areas to Improve */}
            {areasToImprove.length > 0 && (
              <SectionBlock>
                <SectionHeading>Key Focus Areas to Improve</SectionHeading>
                <SectionDivider />
                <ChipsContainer>
                  {areasToImprove.map((area, index) => (
                    <Chip key={index} variant="improve">
                      <Target size={16} weight="regular" />
                      {area}
                    </Chip>
                  ))}
                </ChipsContainer>
              </SectionBlock>
            )}

            {/* Tools & Technologies Section */}
            {tools.length > 0 && (
              <SectionBlock>
                <SectionHeading>Tools & Technologies to Learn</SectionHeading>
                <SectionDivider />
                <ToolsGrid>
                  {tools.slice(0, 8).map((tool, index) => {
                    const toolName = typeof tool === 'string' ? tool : tool.name;
                    return <ToolItem key={index} toolName={toolName} />;
                  })}
                </ToolsGrid>
              </SectionBlock>
            )}

            {/* Experience Benchmark Section */}
            {experienceBenchmark && (
              <SectionBlock>
                <SectionHeading>Experience Benchmark</SectionHeading>
                <SectionSubtitle>Compare your experience with typical requirements for your target role</SectionSubtitle>
                <SectionDivider />
                <BenchmarkContainer>
                  <BenchmarkLeftSection>
                    <BenchmarkItem>
                      <BenchmarkLabel>Your Experience</BenchmarkLabel>
                      <BenchmarkValue>{experienceBenchmark.your_experience_years}</BenchmarkValue>
                    </BenchmarkItem>
                    <BenchmarkItem>
                      <BenchmarkLabel>Typical for Target Role</BenchmarkLabel>
                      <BenchmarkValue>{experienceBenchmark.typical_for_target_role_years}</BenchmarkValue>
                    </BenchmarkItem>
                  </BenchmarkLeftSection>
                  {experienceBenchmark.gap_analysis && (
                    <GapAnalysis>
                      <strong>Gap Analysis:</strong> {experienceBenchmark.gap_analysis}
                    </GapAnalysis>
                  )}
                </BenchmarkContainer>
              </SectionBlock>
            )}

            {/* CTA 2 - Final */}
            <CTASection>
              <CTAContent>
                <CTATitle>Ready to take the next step?</CTATitle>
                <CTAText>Get personalized guidance from our career advisors</CTAText>
              </CTAContent>
              <CTAButton onClick={() => window.open('/callback', '_blank')}>
                Request Callback
              </CTAButton>
            </CTASection>
          </>
        )}
      </RightPanel>
    </HeroContainer>
  );
};

export default ProfileMatchHeroV2;
