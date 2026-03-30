const WEIGHTS = {
  income: 0.15,
  spending: 0.15,
  saving: 0.20,
  investing: 0.15,
  debt: 0.15,
  protection: 0.10,
  vision: 0.10
};

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function scoreIncome(answers) {
  let score = 0;

  const income = Number(answers.monthlyTakeHomeIncome || 0);
  if (income >= 8000) score += 30;
  else if (income >= 6000) score += 25;
  else if (income >= 4000) score += 20;
  else if (income >= 2500) score += 12;
  else if (income > 0) score += 5;

  switch (answers.incomeConsistency) {
    case 'very_consistent':
      score += 25;
      break;
    case 'mostly_consistent':
      score += 18;
      break;
    case 'variable':
      score += 10;
      break;
    case 'highly_unpredictable':
      score += 3;
      break;
  }

  switch (answers.incomeSources) {
    case 'three_or_more':
      score += 15;
      break;
    case 'two':
      score += 10;
      break;
    case 'one':
      score += 5;
      break;
  }

  switch (answers.incomeGrowth) {
    case 'increased_significantly':
      score += 15;
      break;
    case 'increased_moderately':
      score += 10;
      break;
    case 'stable':
      score += 7;
      break;
    case 'decreased':
      score += 2;
      break;
  }

  switch (answers.incomeGrowthPotential) {
    case 'high':
      score += 15;
      break;
    case 'moderate':
      score += 10;
      break;
    case 'limited':
      score += 5;
      break;
    case 'none':
      score += 0;
      break;
  }

  return clamp(Math.round(score));
}

function scoreSpending(answers) {
  let score = 0;

  switch (answers.spendingAwareness) {
    case 'track_everything':
      score += 30;
      break;
    case 'good_general_idea':
      score += 22;
      break;
    case 'not_really_sure':
      score += 10;
      break;
    case 'no_idea':
      score += 0;
      break;
  }

  switch (answers.spendingTracking) {
    case 'yes_consistently':
      score += 20;
      break;
    case 'occasionally':
      score += 10;
      break;
    case 'no':
      score += 0;
      break;
  }

  switch (answers.overspendingFrequency) {
    case 'rarely':
      score += 20;
      break;
    case 'sometimes':
      score += 12;
      break;
    case 'often':
      score += 5;
      break;
    case 'almost_always':
      score += 0;
      break;
  }

  switch (answers.moneyLeaks) {
    case 'none':
      score += 15;
      break;
    case 'a_few':
      score += 10;
      break;
    case 'several':
      score += 5;
      break;
    case 'a_lot':
      score += 0;
      break;
  }

  switch (answers.lifestyleInflation) {
    case 'save_or_invest_most':
      score += 10;
      break;
    case 'split_it':
      score += 6;
      break;
    case 'spend_most':
      score += 0;
      break;
  }

  switch (answers.threeMonthReview) {
    case 'yes':
      score += 5;
      break;
    case 'no':
      score += 0;
      break;
  }

  return clamp(Math.round(score));
}

function scoreSaving(answers) {
  let score = 0;

  switch (answers.totalLiquidSavings) {
    case '100000_plus':
      score += 30;
      break;
    case '50000_100000':
      score += 26;
      break;
    case '30000_50000':
      score += 22;
      break;
    case '15000_30000':
      score += 18;
      break;
    case '5000_15000':
      score += 12;
      break;
    case '1000_5000':
      score += 6;
      break;
    case 'under_1000':
      score += 2;
      break;
  }

  switch (answers.emergencyAccess) {
    case 'all':
      score += 20;
      break;
    case 'most':
      score += 15;
      break;
    case 'some':
      score += 8;
      break;
    case 'very_little':
      score += 2;
      break;
  }

  switch (answers.savingConsistency) {
    case 'yes_consistently':
      score += 20;
      break;
    case 'yes_irregularly':
      score += 10;
      break;
    case 'not_currently':
      score += 0;
      break;
  }

  switch (answers.savingsAutomation) {
    case 'fully_automated':
      score += 15;
      break;
    case 'partially_automated':
      score += 10;
      break;
    case 'manual':
      score += 5;
      break;
    case 'not_saving':
      score += 0;
      break;
  }

  switch (answers.savingsConfidence) {
    case 'very_confident':
      score += 15;
      break;
    case 'somewhat_confident':
      score += 10;
      break;
    case 'not_confident':
      score += 3;
      break;
  }

  return clamp(Math.round(score));
}

function scoreInvesting(answers) {
  let score = 0;

  switch (answers.investingStatus) {
    case 'yes_consistently':
      score += 30;
      break;
    case 'yes_irregularly':
      score += 18;
      break;
    case 'not_yet':
      score += 0;
      break;
  }

  switch (answers.employerMatch) {
    case 'maximizing_match':
      score += 20;
      break;
    case 'have_match_not_maxing':
      score += 10;
      break;
    case 'have_match_not_contributing':
      score += 2;
      break;
    case 'no_match_or_no_access':
      score += 5;
      break;
  }

  const accounts = answers.investmentAccounts || [];
  if (Array.isArray(accounts)) {
    if (accounts.includes('401k')) score += 10;
    if (accounts.includes('roth_ira') || accounts.includes('traditional_ira')) score += 10;
    if (accounts.includes('brokerage')) score += 5;
    if (accounts.includes('hsa')) score += 5;
  }

  switch (answers.investmentConfidence) {
    case 'very_confident':
      score += 15;
      break;
    case 'somewhat_confident':
      score += 10;
      break;
    case 'not_confident':
      score += 3;
      break;
  }

  switch (answers.totalInvestments) {
    case '500000_plus':
      score += 15;
      break;
    case '250000_500000':
      score += 13;
      break;
    case '100000_250000':
      score += 10;
      break;
    case '50000_100000':
      score += 8;
      break;
    case '10000_50000':
      score += 5;
      break;
    case '1000_10000':
      score += 3;
      break;
    case 'under_1000':
      score += 1;
      break;
  }

  return clamp(Math.round(score));
}

function scoreDebt(answers) {
  let score = 100;

  const debtTypes = Array.isArray(answers.debtTypes) ? answers.debtTypes : [];

  if (debtTypes.length === 0 || (debtTypes.length === 1 && debtTypes.includes('none'))) {
    return 100;
  }

  if (debtTypes.includes('credit_cards')) score -= 25;
  if (debtTypes.includes('bnpl')) score -= 15;
  if (debtTypes.includes('personal_loan')) score -= 12;
  if (debtTypes.includes('student_loans')) score -= 10;
  if (debtTypes.includes('car_loan')) score -= 12;
  if (debtTypes.includes('car_lease')) score -= 15;
  if (debtTypes.includes('mortgage')) score -= 6;
  if (debtTypes.includes('other')) score -= 10;

  if (debtTypes.length >= 4) score -= 15;
  else if (debtTypes.length === 3) score -= 10;
  else if (debtTypes.length === 2) score -= 5;

  switch (answers.creditCardBehavior) {
    case 'always_carry_balance':
      score -= 25;
      break;
    case 'usually':
      score -= 18;
      break;
    case 'sometimes':
      score -= 10;
      break;
    case 'never_pay_in_full':
      score -= 0;
      break;
  }

  switch (answers.monthlyDebtPayments) {
    case 'none':
      score -= 0;
      break;
    case 'under_250':
      score -= 4;
      break;
    case '250_500':
      score -= 8;
      break;
    case '500_1000':
      score -= 15;
      break;
    case '1000_2000':
      score -= 24;
      break;
    case '2000_plus':
      score -= 35;
      break;
    case 'manageable':
      score -= 10;
      break;
  }

  switch (answers.debtManageability) {
    case 'very_manageable':
      score -= 0;
      break;
    case 'comfortable':
      score -= 8;
      break;
    case 'manageable':
      score -= 12;
      break;
    case 'tight':
      score -= 25;
      break;
    case 'struggling':
      score -= 40;
      break;
    case 'overwhelming':
      score -= 50;
      break;
    case 'very_comfortable':
      score -= 0;
      break;
  }

  return clamp(Math.round(score));
}

function scoreProtection(answers) {
  let score = 0;

  switch (answers.incomeInterruptionCoverage) {
    case '6_plus_months':
      score += 30;
      break;
    case '3_6_months':
      score += 22;
      break;
    case '1_3_months':
      score += 12;
      break;
    case 'under_1_month':
      score += 4;
      break;
    case 'not_sure':
      score += 2;
      break;
    case 'none':
      score += 0;
      break;
  }

  switch (answers.healthInsurance) {
    case 'employer':
    case 'private':
    case 'government':
    case 'through_spouse':
    case 'excellent':
      score += 20;
      break;
    case 'no_coverage':
    case 'none':
      score += 0;
      break;
  }

  switch (answers.incomeProtection) {
    case 'well_covered':
      score += 20;
      break;
    case 'some_coverage':
      score += 12;
      break;
    case 'rely_on_savings':
      score += 6;
      break;
    case 'not_protected':
      score += 0;
      break;
    case 'full_coverage':
      score += 20;
      break;
    case 'none':
      score += 0;
      break;
  }

  if (answers.dependents === 'yes') {
    switch (answers.lifeInsurance) {
      case 'adequate':
        score += 15;
        break;
      case 'some':
        score += 8;
        break;
      case 'none':
        score += 0;
        break;
      case 'fully_covered':
        score += 15;
        break;
    }
  } else {
    score += 15;
  }

  switch (answers.propertyCoverage) {
    case 'appropriate_coverage':
      score += 10;
      break;
    case 'some_coverage':
      score += 6;
      break;
    case 'no_coverage':
      score += 0;
      break;
    case 'not_applicable':
      score += 6;
      break;
    case 'well_protected':
      score += 10;
      break;
    case 'underinsured':
      score += 2;
      break;
  }

  switch (answers.autoCoverage) {
    case 'full':
      score += 5;
      break;
    case 'basic':
      score += 3;
      break;
    case 'minimal':
      score += 1;
      break;
    case 'do_not_drive':
      score += 5;
      break;
    case 'minimum':
      score += 1;
      break;
  }

  return clamp(Math.round(score));
}

function scoreVision(answers) {
  let score = 0;

  switch (answers.financialDirection) {
    case 'clear_plan':
      score += 30;
      break;
    case 'goals_no_plan':
      score += 18;
      break;
    case 'figuring_it_out':
      score += 10;
      break;
    case 'stuck':
      score += 2;
      break;
    case 'no_goals':
      score += 0;
      break;
    case 'somewhat_clear':
      score += 15;
      break;
  }

  switch (answers.financialTimeHorizon) {
    case '5_10_years':
      score += 20;
      break;
    case '10_20_years':
      score += 18;
      break;
    case '20_plus_years':
      score += 12;
      break;
    case 'not_sure':
      score += 3;
      break;
    case 'long_term':
      score += 20;
      break;
    case 'short_term':
      score += 5;
      break;
  }

  switch (answers.primaryFinancialPriority) {
    case 'get_out_of_debt':
    case 'build_savings':
    case 'grow_investing':
    case 'increase_income':
    case 'maintain_optimize':
      score += 20;
      break;
    case 'wealth_building':
      score += 20;
      break;
    case 'survival':
      score += 5;
      break;
    case 'reduce_debt':
      score += 18;
      break;
  }

  switch (answers.financialConfidence) {
    case 'very_confident':
      score += 20;
      break;
    case 'somewhat_confident':
      score += 12;
      break;
    case 'uncertain':
      score += 6;
      break;
    case 'not_confident':
      score += 0;
      break;
  }

  switch (answers.lifeGoal) {
    case 'freedom_from_stress':
    case 'time_flexibility':
    case 'early_retirement':
    case 'family_security':
      score += 10;
      break;
    case 'not_sure_yet':
      score += 2;
      break;
    case 'financial_freedom':
      score += 10;
      break;
    case 'just_get_by':
      score += 0;
      break;
    case 'financial_stability':
      score += 8;
      break;
  }

  return clamp(Math.round(score));
}

function calculateFoundationScore(pillars) {
  let foundationScore = Math.round(
    pillars.income * WEIGHTS.income +
    pillars.spending * WEIGHTS.spending +
    pillars.saving * WEIGHTS.saving +
    pillars.investing * WEIGHTS.investing +
    pillars.debt * WEIGHTS.debt +
    pillars.protection * WEIGHTS.protection +
    pillars.vision * WEIGHTS.vision
  );

  const pillarValues = Object.values(pillars);
  const lowestPillar = Math.min(...pillarValues);

  if (lowestPillar < 20) {
    foundationScore = Math.min(foundationScore, 59);
  } else if (lowestPillar < 30) {
    foundationScore = Math.min(foundationScore, 69);
  } else if (lowestPillar < 40) {
    foundationScore = Math.min(foundationScore, 79);
  }

  return clamp(foundationScore);
}

function getScoreBand(score) {
  if (score >= 80) return 'Strong Foundation';
  if (score >= 60) return 'Building Momentum';
  if (score >= 40) return 'Needs Attention';
  return 'At Risk';
}

function getStrengths(pillars) {
  const labels = {
    income: 'Income',
    spending: 'Spending',
    saving: 'Saving',
    investing: 'Investing',
    debt: 'Debt',
    protection: 'Protection',
    vision: 'Vision'
  };

  return Object.entries(pillars)
    .filter(([key, score]) => {
      if (key === 'debt') return score >= 90;
      return score >= 70;
    })
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key, score]) => ({
      pillar: key,
      label: labels[key],
      score
    }));
}

function getTopFocusAreas(pillars) {
  const candidates = [
    { key: 'debt', score: pillars.debt, text: 'Reduce debt pressure to free up cash flow and flexibility.' },
    { key: 'spending', score: pillars.spending, text: 'Improve spending clarity and reduce money leaks.' },
    { key: 'saving', score: pillars.saving, text: 'Build a stronger savings habit and emergency buffer.' },
    { key: 'investing', score: pillars.investing, text: 'Strengthen long-term investing consistency.' },
    { key: 'protection', score: pillars.protection, text: 'Close protection gaps before they become financial setbacks.' },
    { key: 'income', score: pillars.income, text: 'Increase income stability and growth capacity.' },
    { key: 'vision', score: pillars.vision, text: 'Clarify your financial direction so your decisions support a real destination.' }
  ];

  return candidates
    .filter(item => item.score < 60)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map(item => item.text);
}

function getInsights(pillars, answers) {
  const insights = [];

  if (pillars.income >= 60 && pillars.investing < 60) {
    insights.push('You have a workable income base, but it is not being converted into long-term wealth as effectively as it could be.');
  }

  if (pillars.spending < 60 && answers.threeMonthReview === 'no') {
    insights.push('Your biggest near-term opportunity may be clarity. A 3-month spending review could quickly uncover hidden leaks.');
  }

  if (pillars.saving < 50 && pillars.investing < 50) {
    insights.push('Right now, the biggest drag on your progress is not income alone — it is the lack of consistent saving and investing habits.');
  }

  if (pillars.protection >= 70 && pillars.income >= 60) {
    insights.push('You have built a meaningful layer of stability through income and protection, which gives you something solid to build on.');
  }

  if (pillars.vision >= 70) {
    insights.push('You have a clearer sense of direction than most people. The opportunity now is making sure the lower blocks fully support it.');
  }

  if (pillars.vision < 50) {
    insights.push('Your financial decisions may feel scattered because the long-term destination is not fully defined yet.');
  }

  if (pillars.debt < 55 && pillars.saving < 60) {
    insights.push('Debt and low savings together are putting pressure on your foundation. Strengthening both will noticeably improve your financial resilience.');
  }

  if (pillars.debt >= 70 && pillars.investing < 50) {
    insights.push('Your debt is not the biggest emergency right now, but your long-term progress is being limited by what is not yet being built on top of your current foundation.');
  }

  return insights.slice(0, 3);
}

function buildSummary(foundationScore, scoreBand, pillars) {
  const sorted = Object.entries(pillars).sort((a, b) => a[1] - b[1]);
  const weakest = sorted[0][0];
  const strongest = sorted[sorted.length - 1][0];

  const labels = {
    income: 'income',
    spending: 'spending',
    saving: 'saving',
    investing: 'investing',
    debt: 'debt',
    protection: 'protection',
    vision: 'vision'
  };

  return `Your Foundation Score is ${foundationScore}, which puts you in the "${scoreBand}" range. You have some solid pieces in place, but your weakest area right now is ${labels[weakest]}, while your strongest area is ${labels[strongest]}. Strengthening the weakest block first will give you the fastest lift to your overall foundation.`;
}

function buildNextStep(pillars, answers) {
  if (pillars.spending < 60 && answers.threeMonthReview === 'no') {
    return 'Start with a 3-month spending review to identify money leaks and free up cash flow.';
  }

  if (pillars.debt < 60) {
    return 'List every debt, minimum payment, and interest rate, then identify which balance is costing you the most in interest.';
  }

  if (pillars.saving < 60) {
    return 'Set up or increase one automatic transfer into savings so progress happens without relying on willpower.';
  }

  if (pillars.investing < 60) {
    return 'Review your retirement contributions and make sure you are at least capturing any available employer match.';
  }

  if (pillars.protection < 60) {
    return 'Review your core protection areas — health, disability, property, and life insurance if others depend on your income.';
  }

  if (pillars.vision < 60) {
    return 'Write down what financial freedom actually looks like for you, including when you want it and what life it should support.';
  }

  return 'Keep strengthening your lowest pillar first. Small improvements in the weakest block usually create the biggest overall lift.';
}

function scoreAssessment(answers) {
  const pillars = {
    income: scoreIncome(answers),
    spending: scoreSpending(answers),
    saving: scoreSaving(answers),
    investing: scoreInvesting(answers),
    debt: scoreDebt(answers),
    protection: scoreProtection(answers),
    vision: scoreVision(answers)
  };

  const foundationScore = calculateFoundationScore(pillars);
  const scoreBand = getScoreBand(foundationScore);
  const strengths = getStrengths(pillars);
  const topFocusAreas = getTopFocusAreas(pillars);
  const insights = getInsights(pillars, answers);
  const summary = buildSummary(foundationScore, scoreBand, pillars);
  const nextStep = buildNextStep(pillars, answers);

  return {
    foundationScore,
    scoreBand,
    pillars,
    strengths,
    topFocusAreas,
    insights,
    summary,
    nextStep
  };
}

module.exports = {
  scoreAssessment
};
