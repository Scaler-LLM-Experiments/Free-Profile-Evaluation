const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

const mapTechQuizResponses = (quizResponses = {}) => ({
  currentRole: quizResponses.currentRole || 'career-switcher',
  experience: quizResponses.experience || '0',
  targetRole: quizResponses.targetRole || 'fullstack',
  problemSolving: quizResponses.problemSolving || '0-10',
  systemDesign: quizResponses.systemDesign || 'not-yet',
  portfolio: quizResponses.portfolio || 'none',
  mockInterviews: quizResponses.mockInterviews || 'never',
  requirementType: quizResponses.requirementType || 'upskilling',
  targetCompany: quizResponses.targetCompany || 'Not specified',
  currentCompany: quizResponses.targetCompany || quizResponses.currentCompany || 'Not provided',
  currentSkill: quizResponses.currentSkill || quizResponses.problemSolving || '0-10',
});

const deriveNonTechProblemSolving = (codeComfort) => {
  switch (codeComfort) {
    case 'solve-problems':
      return '51-100';
    case 'follow-tutorials':
      return '11-50';
    default:
      return '0-10';
  }
};

const mapNonTechQuizResponses = (quizResponses = {}) => {
  const inferredProblemSolving = deriveNonTechProblemSolving(quizResponses.codeComfort);

  return {
    currentRole: quizResponses.currentBackground
      ? `non-tech-${quizResponses.currentBackground}`
      : 'career-switcher',
    experience: quizResponses.experience || '0',
    targetRole: quizResponses.targetRole || 'not-sure',
    problemSolving: inferredProblemSolving,
    systemDesign: 'not-yet',
    portfolio: 'none',
    mockInterviews: 'never',
    requirementType: quizResponses.requirementType || 'career-transition',
    targetCompany: quizResponses.targetCompany || 'Transitioning from non-tech background',
    currentCompany: 'Transitioning from non-tech background',
    currentSkill: quizResponses.currentSkill || inferredProblemSolving,
  };
};

const normaliseGoals = (goals = {}) => ({
  requirementType: Array.isArray(goals.requirementType) ? goals.requirementType : [],
  targetCompany: goals.targetCompany || 'Not specified',
  topicOfInterest: Array.isArray(goals.topicOfInterest) ? goals.topicOfInterest : [],
});

const buildEvaluationPayload = (quizResponses, goals, background) => {
  if (!background) {
    throw new Error('User background is required before requesting evaluation.');
  }

  const mappedQuizResponses = background === 'tech'
    ? mapTechQuizResponses(quizResponses)
    : mapNonTechQuizResponses(quizResponses);

  return {
    background,
    quizResponses: mappedQuizResponses,
    goals: normaliseGoals(goals),
  };
};

export const evaluateProfile = async (quizResponses, goals, background, options = {}) => {
  const { signal } = options;
  const payload = buildEvaluationPayload(quizResponses, goals, background);

  const response = await fetch(`${API_BASE_URL}/evaluate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    signal,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Evaluation request failed with status ${response.status}: ${errorText || 'Unknown error'}`
    );
  }

  const data = await response.json();
  if (!data || !data.profile_evaluation) {
    throw new Error('Evaluation response missing "profile_evaluation" payload.');
  }

  return data.profile_evaluation;
};

export { buildEvaluationPayload };
