import React, { useMemo, useRef, useEffect, createRef } from 'react';
import styled from 'styled-components';
import QuizQuestion from './QuizQuestion';
import {
  GraduationCap,
  Briefcase,
  ArrowsClockwise,
  Clock,
  Code,
  Globe,
  DeviceMobile,
  BookOpen,
  Database,
  Layout,
  CloudArrowUp,
  Coffee,
  TrendUp,
  Handshake,
  CurrencyDollar,
  Users,
  Heart,
  Target,
  ChartBar,
  Cpu,
  Stack,
  Wrench,
  Buildings,
  Rocket,
  Bank,
  MagnifyingGlass,
  Lightbulb,
  ChartLineUp,
  GitBranch,
  FolderOpen,
  UsersFour
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

const SkillOptionsByRole = {
  student: [
    { value: 'dsa', label: 'Data structures & algorithms focus', icon: <Code size={24} weight="duotone" /> },
    { value: 'web', label: 'Web development projects', icon: <Globe size={24} weight="duotone" /> },
    { value: 'mobile', label: 'Mobile app or cross-platform work', icon: <DeviceMobile size={24} weight="duotone" /> },
    { value: 'academics', label: 'Academic projects & research', icon: <BookOpen size={24} weight="duotone" /> }
  ],
  'swe-product': [
    { value: 'backend', label: 'Backend & microservices expertise', icon: <Database size={24} weight="duotone" /> },
    { value: 'frontend', label: 'Modern frontend frameworks', icon: <Layout size={24} weight="duotone" /> },
    { value: 'system-design', label: 'System design & architecture', icon: <ChartLineUp size={24} weight="duotone" /> },
    { value: 'cloud', label: 'Cloud & DevOps ownership', icon: <CloudArrowUp size={24} weight="duotone" /> }
  ],
  'swe-service': [
    { value: 'java-stack', label: 'Java/enterprise stack specialization', icon: <Coffee size={24} weight="duotone" /> },
    { value: 'database', label: 'Database & data engineering', icon: <Database size={24} weight="duotone" /> },
    { value: 'testing', label: 'Automation & quality engineering', icon: <Wrench size={24} weight="duotone" /> },
    { value: 'support', label: 'Production support & maintenance', icon: <Lightbulb size={24} weight="duotone" /> }
  ],
  'career-switcher': [
    { value: 'bootcamp', label: 'Bootcamp/comprehensive online program', icon: <GraduationCap size={24} weight="duotone" /> },
    { value: 'self-learning', label: 'Self-learning & open-source contributions', icon: <GitBranch size={24} weight="duotone" /> },
    { value: 'project-work', label: 'Capstone/portfolio project experience', icon: <FolderOpen size={24} weight="duotone" /> },
    { value: 'freelance', label: 'Freelance or contract assignments', icon: <Handshake size={24} weight="duotone" /> }
  ],
};

const getTechSkillOptions = (role) => {
  if (!role) {
    return [
      { value: 'backend', label: 'Backend development', icon: <Database size={24} weight="duotone" /> },
      { value: 'frontend', label: 'Frontend development', icon: <Layout size={24} weight="duotone" /> },
      { value: 'data', label: 'Data engineering & analytics', icon: <ChartBar size={24} weight="duotone" /> },
      { value: 'devops', label: 'DevOps, cloud & infrastructure', icon: <CloudArrowUp size={24} weight="duotone" /> }
    ];
  }

  return SkillOptionsByRole[role] || SkillOptionsByRole.student;
};

export const TECH_SCREENS = [
  {
    id: 'techScreen1',
    questions: [
      {
        id: 'currentRole',
        question: 'What is your current role/background?',
        options: [
          { value: 'student', label: 'Student (CS/Engineering)', icon: <GraduationCap size={24} weight="duotone" /> },
          { value: 'swe-product', label: 'Software Engineer (Product Company)', icon: <Briefcase size={24} weight="duotone" /> },
          { value: 'swe-service', label: 'Software Engineer (Service Company)', icon: <Buildings size={24} weight="duotone" /> },
          { value: 'career-switcher', label: 'Career Switcher (Other to Tech)', icon: <ArrowsClockwise size={24} weight="duotone" /> }
        ]
      },
      {
        id: 'experience',
        question: 'How many years of experience do you have?',
        options: [
          { value: '0', label: '0 years (Student/Intern)', icon: <GraduationCap size={24} weight="duotone" /> },
          { value: '0-2', label: '0-2 years', icon: <Clock size={24} weight="duotone" /> },
          { value: '3-5', label: '3-5 years', icon: <Briefcase size={24} weight="duotone" /> },
          { value: '5+', label: '5+ years', icon: <Target size={24} weight="duotone" /> }
        ]
      },
      {
        id: 'currentSkill',
        question: 'Where do you spend most of your skill-building time today?',
        dynamicOptions: true
      }
    ]
  },
  {
    id: 'techScreen2',
    questions: [
      {
        id: 'requirementType',
        question: 'What are you optimising for right now?',
        options: [
          { value: 'upskilling', label: 'Upskilling in current role', icon: <TrendUp size={24} weight="duotone" /> },
          { value: 'career-transition', label: 'Career transition', icon: <ArrowsClockwise size={24} weight="duotone" /> },
          { value: 'salary', label: 'Higher compensation', icon: <CurrencyDollar size={24} weight="duotone" /> },
          { value: 'peer-influence', label: 'Peer influence/industry pressure', icon: <Users size={24} weight="duotone" /> },
          { value: 'interest', label: 'Personal interest & passion projects', icon: <Heart size={24} weight="duotone" /> }
        ]
      },
      {
        id: 'targetRole',
        question: 'What target role are you preparing for?',
        options: [
          { value: 'faang-sde', label: 'FAANG SDE', icon: <Target size={24} weight="duotone" /> },
          { value: 'backend', label: 'Senior Backend Developer', icon: <Database size={24} weight="duotone" /> },
          { value: 'data-ml', label: 'Data/ML Engineer', icon: <Cpu size={24} weight="duotone" /> },
          { value: 'fullstack', label: 'Full-Stack Developer', icon: <Stack size={24} weight="duotone" /> },
          { value: 'tech-lead', label: 'Tech Lead/Architect', icon: <ChartLineUp size={24} weight="duotone" /> }
        ]
      },
      {
        id: 'targetCompany',
        question: 'Which company/domain are you targeting next?',
        options: [
          { value: 'faang', label: 'FAANG / Big Tech', icon: <Buildings size={24} weight="duotone" /> },
          { value: 'product', label: 'Product-scaleups & unicorns', icon: <Rocket size={24} weight="duotone" /> },
          { value: 'startup', label: 'Early stage startups', icon: <Lightbulb size={24} weight="duotone" /> },
          { value: 'service', label: 'IT services / captives', icon: <Bank size={24} weight="duotone" /> },
          { value: 'not-sure', label: 'Still evaluating options', icon: <MagnifyingGlass size={24} weight="duotone" /> }
        ]
      }
    ]
  },
  {
    id: 'techScreen3',
    questions: [
      {
        id: 'problemSolving',
        question: 'How active has your coding practice been lately?',
        options: [
          { value: '0-10', label: 'Solved 0-10 problems recently', icon: <Code size={24} weight="duotone" /> },
          { value: '11-50', label: 'Solved 11-50 problems recently', icon: <Code size={24} weight="duotone" /> },
          { value: '51-100', label: 'Solved 51-100 problems recently', icon: <Code size={24} weight="duotone" /> },
          { value: '100+', label: 'Solved 100+ problems recently', icon: <Target size={24} weight="duotone" /> }
        ]
      },
      {
        id: 'systemDesign',
        question: 'What is your system design exposure level?',
        options: [
          { value: 'multiple', label: 'Led multiple design discussions', icon: <ChartLineUp size={24} weight="duotone" /> },
          { value: 'once', label: 'Participated once or twice', icon: <ChartLineUp size={24} weight="duotone" /> },
          { value: 'not-yet', label: 'Not yet, but learning', icon: <BookOpen size={24} weight="duotone" /> }
        ]
      },
      {
        id: 'portfolio',
        question: 'How strong is your portfolio/GitHub presence?',
        options: [
          { value: 'active-5+', label: 'Active with 5+ maintained repos', icon: <GitBranch size={24} weight="duotone" /> },
          { value: 'limited-1-5', label: 'Limited with 1-5 repos', icon: <FolderOpen size={24} weight="duotone" /> },
          { value: 'inactive', label: 'Inactive or outdated', icon: <FolderOpen size={24} weight="duotone" /> },
          { value: 'none', label: 'No public portfolio yet', icon: <MagnifyingGlass size={24} weight="duotone" /> }
        ]
      },
      {
        id: 'mockInterviews',
        question: 'How often do you practise interviews?',
        options: [
          { value: 'weekly+', label: 'Weekly or more', icon: <UsersFour size={24} weight="duotone" /> },
          { value: 'monthly', label: 'Monthly', icon: <UsersFour size={24} weight="duotone" /> },
          { value: 'rarely', label: 'Rarely', icon: <Clock size={24} weight="duotone" /> },
          { value: 'never', label: 'Never', icon: <MagnifyingGlass size={24} weight="duotone" /> }
        ]
      }
    ]
  }
];

const TechQuiz = ({ questions, onResponse, responses, startIndex, totalQuestions }) => {
  const skillOptions = useMemo(
    () => getTechSkillOptions(responses.currentRole),
    [responses.currentRole]
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

export default TechQuiz;
