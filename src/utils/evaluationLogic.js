const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

// Map new codingActivity values to old problemSolving format for backend
const mapCodingActivityToProblemSolving = (codingActivity) => {
  switch (codingActivity) {
    case 'very-active':
      return '100+';
    case 'moderately-active':
      return '51-100';
    case 'occasionally-active':
      return '11-50';
    case 'not-active':
      return '0-10';
    default:
      return '0-10';
  }
};

// Map new systemDesign values to old format
const mapSystemDesignComfort = (systemDesign) => {
  switch (systemDesign) {
    case 'very-comfortable':
      return 'multiple';
    case 'somewhat-comfortable':
      return 'once';
    case 'learning':
      return 'not-yet';
    case 'not-familiar':
      return 'not-yet';
    default:
      return 'not-yet';
  }
};

const mapTechQuizResponses = (quizResponses = {}) => ({
  currentRole: quizResponses.currentRole || 'career-switcher',
  experience: quizResponses.experience || '0-2',
  targetRole: quizResponses.targetRole || 'fullstack-sde',
  problemSolving: mapCodingActivityToProblemSolving(quizResponses.codingActivity),
  systemDesign: mapSystemDesignComfort(quizResponses.systemDesign),
  portfolio: 'none', // Not collected in new flow
  mockInterviews: 'never', // Not collected in new flow
  requirementType: quizResponses.primaryGoal || 'upskilling',
  targetCompany: quizResponses.targetCompany || 'Not specified',
  currentCompany: quizResponses.targetCompany || quizResponses.currentCompany || 'Not provided',
  currentSkill: quizResponses.currentSkill || mapCodingActivityToProblemSolving(quizResponses.codingActivity),
});

// Map new learningActivity and codeComfort to problemSolving for non-tech
const deriveNonTechProblemSolving = (learningActivity, codeComfort) => {
  // If learning activity is very active and code comfort is high, give higher score
  if (learningActivity === 'very-active' && codeComfort === 'very-comfortable') {
    return '51-100';
  }

  // Map based on code comfort primarily
  switch (codeComfort) {
    case 'very-comfortable':
      return '51-100';
    case 'somewhat-comfortable':
      return '11-50';
    case 'learning':
      return '0-10';
    case 'not-familiar':
      return '0-10';
    default:
      // Fallback to learningActivity if codeComfort not available
      switch (learningActivity) {
        case 'very-active':
          return '11-50';
        case 'moderately-active':
          return '0-10';
        default:
          return '0-10';
      }
  }
};

const mapNonTechQuizResponses = (quizResponses = {}) => {
  const inferredProblemSolving = deriveNonTechProblemSolving(
    quizResponses.learningActivity,
    quizResponses.codeComfort
  );

  return {
    currentRole: quizResponses.currentBackground || 'career-switcher',
    experience: quizResponses.experience || '0-2',
    targetRole: quizResponses.targetRole || 'exploring',
    problemSolving: inferredProblemSolving,
    systemDesign: 'not-yet', // Non-tech users typically don't have system design experience
    portfolio: 'none',
    mockInterviews: 'never',
    requirementType: quizResponses.primaryGoal || 'career-switch',
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
