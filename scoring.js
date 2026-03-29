const WEIGHTS = {
  income: 15,
  spending: 15,
  saving: 15,
  investing: 15,
  debt: 15,
  protection: 12.5,
  vision: 12.5
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

  switch (answers.debtManageability) {
    case 'very_manageable':
      score -= 0;
      break;
    case 'comfortable':
      score -= 10;
      break;
    case 'tight':
      score -= 25;
      break;
    case 'struggling':
      score -= 40;
      break;
  }

  const debtTypes = answers.debtTypes || [];
  if (Array.isArray(debtTypes)) {
    if (debtTypes.includes('credit_cards')) score -= 20;
    if (debtTypes.includes('bnpl')) score -= 12;
    if (debtTypes.includes('personal_loan')) score -= 10;
    if (debtTypes.includes('student_loans')) score -= 8;
    if (debtTypes.includes('car_loan')) score -= 10;
    if (debtTypes.includes('car_lease')) score -= 12;
    if (debtTypes.includes('mortgage')) score -= 5;
  }

  switch (answers.creditCardBehavior) {
    case 'never_pay_in_full':
      score -= 0;
      break;
    case 'sometimes':
      score -= 8;
      break;
    case 'usually':
      score -= 15;
      break;
    case 'always_carry_balance':
      score -= 25;
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
      score -= 22;
      break;
    case '2000_plus':
      score -= 30;
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
  }

  switch (answers.healthInsurance) {
    case 'employer':
    case 'private':
    case 'government':
    case 'through_spouse':
      score += 20;
      break;
    case 'no_coverage':
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
  }

  switch (answers.primaryFinancialPriority) {
    case 'get_out_of_debt':
    case 'build_savings':
    case 'grow_investing':
    case 'increase_income':
    case 'maintain_optimize':
      score += 20;
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
  }

  return clamp(Math.round(score));
}

function calculateFoundationScore(pillars) {
  const weightedTotal =
    pillars.income * WEIGHTS.income +
    pillars.spending * WEIGHTS.spending +
    pillars.saving * WEIGHTS.saving +
    pillars.investing * WEIGHTS.investing +
    pillars.debt * WEIGHTS.debt +
    pillars.protection * WEIGHTS.protection +
    pillars.vision * WEIGHTS.vision;

  return Math.round(weightedTotal / 100);
}

function getScoreBand(score) {
  if (score >= 80) return 'Strong Foundation';
  if (score >= 60) return 'Building Momentum';
  if (score >= 40) return 'Needs Attention';
  return 'At Risk';
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

  return {
    foundationScore,
    scoreBand,
    pillars
  };
}

module.exports = {
  scoreAssessment
};
