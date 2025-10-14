import React, { useMemo, useRef, useEffect, createRef } from 'react';
import styled from 'styled-components';
import QuizQuestion from './QuizQuestion';
import {
  UserCircle,
  Clock,
  Lightbulb,
  TrendUp,
  Target,
  Buildings,
  Path,
  Code,
  Timer,
  Briefcase,
  GraduationCap,
  Wrench,
  Cpu,
  ArrowsClockwise,
  CurrencyDollar,
  Users,
  Heart,
  Database,
  Stack,
  ChartBar,
  Rocket,
  MagnifyingGlass,
  BookOpen,
  Trophy,
  Handshake,
  ChatsCircle,
  ChartLineUp,
  Gear,
  ShoppingCart
} from 'phosphor-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 120px;
`;

const ScreenSection = styled.div`
  scroll-margin-top: 100px;
`;

const QuestionWrapper = styled.div`
  scroll-margin-top: 100px;
`;

const SkillOptionsByBackground = {
  'non-tech': [
    { value: 'communication', label: 'Strong communication & stakeholder management', icon: <ChatsCircle size={24} weight="duotone" /> },
    { value: 'analytical', label: 'Analytical or data-driven decision making', icon: <ChartLineUp size={24} weight="duotone" /> },
    { value: 'operations', label: 'Operations and process optimisation', icon: <Gear size={24} weight="duotone" /> },
    { value: 'sales-marketing', label: 'Sales, marketing or customer success experience', icon: <ShoppingCart size={24} weight="duotone" /> }
  ],
  'it-services': [
    { value: 'project-management', label: 'Project/Program management', icon: <Target size={24} weight="duotone" /> },
    { value: 'qa-testing', label: 'QA, testing or automation', icon: <Wrench size={24} weight="duotone" /> },
    { value: 'support', label: 'IT support or service delivery', icon: <Lightbulb size={24} weight="duotone" /> },
    { value: 'business-analysis', label: 'Business analysis & requirements gathering', icon: <ChartBar size={24} weight="duotone" /> }
  ],
  technical: [
    { value: 'engineering', label: 'Core engineering domain expertise', icon: <Cpu size={24} weight="duotone" /> },
    { value: 'design', label: 'Product/UX design experience', icon: <Path size={24} weight="duotone" /> },
    { value: 'hardware', label: 'Hardware or embedded systems knowledge', icon: <Cpu size={24} weight="duotone" /> },
    { value: 'research', label: 'Research & experimentation background', icon: <BookOpen size={24} weight="duotone" /> }
  ],
  'fresh-graduate': [
    { value: 'academics', label: 'Strong academics & projects', icon: <GraduationCap size={24} weight="duotone" /> },
    { value: 'internships', label: 'Internships or apprenticeships', icon: <Briefcase size={24} weight="duotone" /> },
    { value: 'hackathons', label: 'Hackathons or competitions', icon: <Trophy size={24} weight="duotone" /> },
    { value: 'self-learning', label: 'Self-learning and online courses', icon: <BookOpen size={24} weight="duotone" /> }
  ],
};

const getNonTechSkillOptions = (background) => {
  if (!background) {
    return [
      { value: 'communication', label: 'Communication & stakeholder management', icon: <ChatsCircle size={24} weight="duotone" /> },
      { value: 'analytical', label: 'Analytical & problem solving', icon: <ChartLineUp size={24} weight="duotone" /> },
      { value: 'operations', label: 'Operations & execution', icon: <Gear size={24} weight="duotone" /> },
      { value: 'self-learning', label: 'Self-learning & courses', icon: <BookOpen size={24} weight="duotone" /> }
    ];
  }

  return SkillOptionsByBackground[background] || SkillOptionsByBackground['non-tech'];
};

export const NON_TECH_SCREENS = [
  {
    id: 'nonTechScreen1',
    questions: [
      {
        id: 'currentBackground',
        question: 'What is your current role/background?',
        options: [
          { value: 'non-tech', label: 'Non-tech (Marketing, Sales, Finance, etc.)', icon: <UserCircle size={24} weight="duotone" /> },
          { value: 'it-services', label: 'IT Services (Support, QA, Project Management)', icon: <Wrench size={24} weight="duotone" /> },
          { value: 'technical', label: 'Other Technical (Engineering, Design, etc.)', icon: <Cpu size={24} weight="duotone" /> },
          { value: 'fresh-graduate', label: 'Fresh Graduate (Non-CS)', icon: <GraduationCap size={24} weight="duotone" /> }
        ]
      },
      {
        id: 'experience',
        question: 'How many years of professional experience do you have?',
        options: [
          { value: '0', label: '0 years (Student/Recent Graduate)', icon: <GraduationCap size={24} weight="duotone" /> },
          { value: '0-2', label: '0-2 years', icon: <Clock size={24} weight="duotone" /> },
          { value: '3-5', label: '3-5 years', icon: <Briefcase size={24} weight="duotone" /> },
          { value: '5+', label: '5+ years', icon: <Target size={24} weight="duotone" /> }
        ]
      },
      {
        id: 'currentSkill',
        question: 'Which skills describe you best today?',
        dynamicOptions: true
      }
    ]
  },
  {
    id: 'nonTechScreen2',
    questions: [
      {
        id: 'requirementType',
        question: 'What is the primary requirement driving this move?',
        options: [
          { value: 'upskilling', label: 'Upskilling in current track', icon: <TrendUp size={24} weight="duotone" /> },
          { value: 'career-transition', label: 'Career transition into tech', icon: <ArrowsClockwise size={24} weight="duotone" /> },
          { value: 'learn-new-skill', label: 'Learn a brand-new skill', icon: <Lightbulb size={24} weight="duotone" /> },
          { value: 'peer-influence', label: 'Peer influence/market trends', icon: <Users size={24} weight="duotone" /> },
          { value: 'interest', label: 'Personal interest & curiosity', icon: <Heart size={24} weight="duotone" /> }
        ]
      },
      {
        id: 'targetRole',
        question: 'What target role are you aiming for?',
        options: [
          { value: 'backend', label: 'Backend Developer', icon: <Database size={24} weight="duotone" /> },
          { value: 'fullstack', label: 'Full-Stack Developer', icon: <Stack size={24} weight="duotone" /> },
          { value: 'data-ml', label: 'Data/ML Engineer', icon: <Cpu size={24} weight="duotone" /> },
          { value: 'data-analyst', label: 'Data Analyst', icon: <ChartBar size={24} weight="duotone" /> },
          { value: 'not-sure', label: 'Not sure yet', icon: <MagnifyingGlass size={24} weight="duotone" /> }
        ]
      },
      {
        id: 'targetCompany',
        question: 'Which company/domain are you targeting?',
        options: [
          { value: 'product', label: 'Product tech companies', icon: <Buildings size={24} weight="duotone" /> },
          { value: 'startup', label: 'High-growth startups', icon: <Rocket size={24} weight="duotone" /> },
          { value: 'service', label: 'IT services & consulting', icon: <Handshake size={24} weight="duotone" /> },
          { value: 'domain-specific', label: 'Domain focused (FinTech, HealthTech, etc.)', icon: <Target size={24} weight="duotone" /> },
          { value: 'not-sure', label: 'Still exploring options', icon: <MagnifyingGlass size={24} weight="duotone" /> }
        ]
      }
    ]
  },
  {
    id: 'nonTechScreen3',
    questions: [
      {
        id: 'stepsTaken',
        question: 'What steps have you already taken?',
        options: [
          { value: 'completed-course', label: 'Completed a bootcamp/course', icon: <GraduationCap size={24} weight="duotone" /> },
          { value: 'self-learning', label: 'Self-learning (online tutorials, books)', icon: <BookOpen size={24} weight="duotone" /> },
          { value: 'just-exploring', label: 'Just exploring and researching', icon: <Path size={24} weight="duotone" /> }
        ]
      },
      {
        id: 'codeComfort',
        question: 'How comfortable are you with writing basic code?',
        options: [
          { value: 'havent-tried', label: "Haven't tried yet", icon: <MagnifyingGlass size={24} weight="duotone" /> },
          { value: 'follow-tutorials', label: 'Can follow tutorials', icon: <BookOpen size={24} weight="duotone" /> },
          { value: 'solve-problems', label: 'Can solve simple problems independently', icon: <Code size={24} weight="duotone" /> }
        ]
      },
      {
        id: 'timePerWeek',
        question: 'How much time can you invest per week?',
        options: [
          { value: '0-2', label: '0-2 hours', icon: <Timer size={24} weight="duotone" /> },
          { value: '3-5', label: '3-5 hours', icon: <Timer size={24} weight="duotone" /> },
          { value: '6-10', label: '6-10 hours', icon: <Timer size={24} weight="duotone" /> },
          { value: '10+', label: '10+ hours', icon: <Clock size={24} weight="duotone" /> }
        ]
      }
    ]
  }
];

const NonTechQuiz = ({ questions, onResponse, responses, startIndex, totalQuestions }) => {
  const skillOptions = useMemo(
    () => getNonTechSkillOptions(responses.currentBackground),
    [responses.currentBackground]
  );

  const questionRefs = useRef([]);

  useEffect(() => {
    questionRefs.current = questions.map((_, i) => questionRefs.current[i] || createRef());
  }, [questions]);

  if (!questions || questions.length === 0) {
    return null;
  }

  const handleSelect = (questionId, value, index) => {
    onResponse(questionId, value);

    // Scroll to next question after a short delay
    setTimeout(() => {
      const nextIndex = index + 1;
      if (nextIndex < questions.length && questionRefs.current[nextIndex]) {
        questionRefs.current[nextIndex].current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 300);
  };

  return (
    <Container>
      {questions.map((question, index) => {
        const options = question.dynamicOptions ? skillOptions : question.options;
        const questionNumber = startIndex + index + 2; // +2 because background selection is 1/11

        return (
          <div key={question.id} ref={questionRefs.current[index]}>
            <QuizQuestion
              question={question.question}
              options={options}
              selectedValue={responses[question.id]}
              onSelect={(value) => handleSelect(question.id, value, index)}
              questionNumber={questionNumber}
              totalQuestions={11}
            />
          </div>
        );
      })}
    </Container>
  );
};

export default NonTechQuiz;
