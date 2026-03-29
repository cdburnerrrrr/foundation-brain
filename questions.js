const questions = [
  // =========================
  // CONTEXT
  // =========================
  {
    key: 'ageRange',
    section: 'context',
    question: 'What is your age range?',
    type: 'single',
    options: ['under_25', '25_34', '35_44', '45_54', '55_plus']
  },
  {
    key: 'relationshipStatus',
    section: 'context',
    question: 'What best describes your household?',
    type: 'single',
    options: ['single', 'partnered', 'partnered_with_children']
  },
  {
    key: 'housingStatus',
    section: 'context',
    question: 'What is your current housing situation?',
    type: 'single',
    options: ['living_with_family', 'rent', 'own_with_mortgage', 'own_outright']
  },
  {
    key: 'dependents',
    section: 'context',
    question: 'Do you have anyone who depends on your income?',
    type: 'single',
    options: ['no', 'yes']
  },
  {
    key: 'financialAlignment',
    section: 'context',
    question: 'How do you and your partner currently manage money?',
    type: 'single',
    options: ['mostly_combined', 'mostly_separate', 'mixed', 'not_clearly_discussed'],
    conditions: [
      { key: 'relationshipStatus', operator: 'in', value: ['partnered', 'partnered_with_children'] }
    ]
  },

  // =========================
  // INCOME
  // =========================
  {
    key: 'monthlyTakeHomeIncome',
    section: 'income',
    question: 'What is your approximate monthly take-home income?',
    type: 'number'
  },
  {
    key: 'incomeConsistency',
    section: 'income',
    question: 'How consistent is your income month to month?',
    type: 'single',
    options: ['very_consistent', 'mostly_consistent', 'variable', 'highly_unpredictable']
  },
  {
    key: 'incomeSources',
    section: 'income',
    question: 'How many income sources do you have?',
    type: 'single',
    options: ['one', 'two', 'three_or_more']
  },
  {
    key: 'incomeGrowth',
    section: 'income',
    question: 'How has your income changed over the past year?',
    type: 'single',
    options: ['increased_significantly', 'increased_moderately', 'stable', 'decreased']
  },
  {
    key: 'incomeGrowthPotential',
    section: 'income',
    question: 'What is your income growth potential over the next few years?',
    type: 'single',
    options: ['high', 'moderate', 'limited', 'none']
  },
  {
    key: 'contributesToRetirement',
    section: 'income',
    question: 'Do you currently contribute to retirement through payroll or automatic contributions?',
    type: 'single',
    options: ['yes', 'no']
  },
  {
    key: 'monthlyRetirementContributionType',
    section: 'income',
    question: 'How would you like to enter your retirement contribution?',
    type: 'single',
    options: ['dollar', 'percent'],
    conditions: [
      { key: 'contributesToRetirement', operator: 'equals', value: 'yes' }
    ]
  },
  {
    key: 'monthlyRetirementContributionDollar',
    section: 'income',
    question: 'How much do you contribute to retirement each month?',
    type: 'number',
    conditions: [
      { key: 'contributesToRetirement', operator: 'equals', value: 'yes' },
      { key: 'monthlyRetirementContributionType', operator: 'equals', value: 'dollar' }
    ]
  },
  {
    key: 'monthlyRetirementContributionPercent',
    section: 'income',
    question: 'What percent of your income do you contribute to retirement?',
    type: 'number',
    conditions: [
      { key: 'contributesToRetirement', operator: 'equals', value: 'yes' },
      { key: 'monthlyRetirementContributionType', operator: 'equals', value: 'percent' }
    ]
  },

  // =========================
  // SPENDING
  // =========================
  {
    key: 'spendingAwareness',
    section: 'spending',
    question: 'How well do you understand where your money goes each month?',
    type: 'single',
    options: ['track_everything', 'good_general_idea', 'not_really_sure', 'no_idea']
  },
  {
    key: 'spendingTracking',
    section: 'spending',
    question: 'Do you actively track your spending?',
    type: 'single',
    options: ['yes_consistently', 'occasionally', 'no']
  },
  {
    key: 'monthlySpendingEstimate',
    section: 'spending',
    question: 'About how much do you spend each month?',
    type: 'number'
  },
  {
    key: 'overspendingFrequency',
    section: 'spending',
    question: 'How often do you feel like you overspend?',
    type: 'single',
    options: ['rarely', 'sometimes', 'often', 'almost_always']
  },
  {
    key: 'moneyLeaks',
    section: 'spending',
    question: 'How many recurring or unnecessary expenses do you think are quietly draining your money?',
    type: 'single',
    options: ['none', 'a_few', 'several', 'a_lot']
  },
  {
    key: 'lifestyleInflation',
    section: 'spending',
    question: 'When your income increases, what typically happens?',
    type: 'single',
    options: ['save_or_invest_most', 'split_it', 'spend_most']
  },
  {
    key: 'threeMonthReview',
    section: 'spending',
    question: 'Have you ever reviewed your last 3 months of spending in detail?',
    type: 'single',
    options: ['yes', 'no']
  },

  // =========================
  // SAVING
  // =========================
  {
    key: 'totalLiquidSavings',
    section: 'saving',
    question: 'Approximately how much do you have in total liquid savings?',
    type: 'single',
    options: [
      'under_1000',
      '1000_5000',
      '5000_15000',
      '15000_30000',
      '30000_50000',
      '50000_100000',
      '100000_plus'
    ]
  },
  {
    key: 'emergencyAccess',
    section: 'saving',
    question: 'How much of that savings could you realistically use in an emergency?',
    type: 'single',
    options: ['all', 'most', 'some', 'very_little']
  },
  {
    key: 'savingConsistency',
    section: 'saving',
    question: 'Are you currently saving money each month?',
    type: 'single',
    options: ['yes_consistently', 'yes_irregularly', 'not_currently']
  },
  {
    key: 'monthlySavingsContributionType',
    section: 'saving',
    question: 'How would you like to enter your monthly savings?',
    type: 'single',
    options: ['dollar', 'percent'],
    conditions: [
      { key: 'savingConsistency', operator: 'in', value: ['yes_consistently', 'yes_irregularly'] }
    ]
  },
  {
    key: 'monthlySavingsContributionDollar',
    section: 'saving',
    question: 'How much do you save each month?',
    type: 'number',
    conditions: [
      { key: 'savingConsistency', operator: 'in', value: ['yes_consistently', 'yes_irregularly'] },
      { key: 'monthlySavingsContributionType', operator: 'equals', value: 'dollar' }
    ]
  },
  {
    key: 'monthlySavingsContributionPercent',
    section: 'saving',
    question: 'What percent of your income do you save each month?',
    type: 'number',
    conditions: [
      { key: 'savingConsistency', operator: 'in', value: ['yes_consistently', 'yes_irregularly'] },
      { key: 'monthlySavingsContributionType', operator: 'equals', value: 'percent' }
    ]
  },
  {
    key: 'savingsAutomation',
    section: 'saving',
    question: 'How automated is your saving?',
    type: 'single',
    options: ['fully_automated', 'partially_automated', 'manual', 'not_saving']
  },
  {
    key: 'savingsPurpose',
    section: 'saving',
    question: 'What are you primarily saving for right now?',
    type: 'multi',
    options: ['emergency_fund', 'home', 'travel', 'big_purchase', 'general_security', 'other']
  },
  {
    key: 'savingsConfidence',
    section: 'saving',
    question: 'How confident are you in your ability to save consistently?',
    type: 'single',
    options: ['very_confident', 'somewhat_confident', 'not_confident']
  },

  // =========================
  // INVESTING
  // =========================
  {
    key: 'investingStatus',
    section: 'investing',
    question: 'Are you currently investing for the future?',
    type: 'single',
    options: ['yes_consistently', 'yes_irregularly', 'not_yet']
  },
  {
    key: 'totalInvestments',
    section: 'investing',
    question: 'Approximately how much do you have invested?',
    type: 'single',
    options: [
      'under_1000',
      '1000_10000',
      '10000_50000',
      '50000_100000',
      '100000_250000',
      '250000_500000',
      '500000_plus'
    ],
    conditions: [
      { key: 'investingStatus', operator: 'not_equals', value: 'not_yet' }
    ]
  },
  {
    key: 'monthlyInvestingContributionType',
    section: 'investing',
    question: 'How would you like to enter your monthly investing?',
    type: 'single',
    options: ['dollar', 'percent'],
    conditions: [
      { key: 'investingStatus', operator: 'in', value: ['yes_consistently', 'yes_irregularly'] }
    ]
  },
  {
    key: 'monthlyInvestingContributionDollar',
    section: 'investing',
    question: 'How much do you invest each month?',
    type: 'number',
    conditions: [
      { key: 'investingStatus', operator: 'in', value: ['yes_consistently', 'yes_irregularly'] },
      { key: 'monthlyInvestingContributionType', operator: 'equals', value: 'dollar' }
    ]
  },
  {
    key: 'monthlyInvestingContributionPercent',
    section: 'investing',
    question: 'What percent of your income do you invest each month?',
    type: 'number',
    conditions: [
      { key: 'investingStatus', operator: 'in', value: ['yes_consistently', 'yes_irregularly'] },
      { key: 'monthlyInvestingContributionType', operator: 'equals', value: 'percent' }
    ]
  },
  {
    key: 'employerMatch',
    section: 'investing',
    question: 'What best describes your employer match situation?',
    type: 'single',
    options: ['maximizing_match', 'have_match_not_maxing', 'have_match_not_contributing', 'no_match_or_no_access']
  },
  {
    key: 'investmentAccounts',
    section: 'investing',
    question: 'What types of investment accounts do you currently have?',
    type: 'multi',
    options: ['401k', 'roth_ira', 'traditional_ira', 'brokerage', 'hsa', 'none']
  },
  {
    key: 'investmentConfidence',
    section: 'investing',
    question: 'How confident are you in your investment strategy?',
    type: 'single',
    options: ['very_confident', 'somewhat_confident', 'not_confident']
  },

  // =========================
  // DEBT
  // =========================
  {
    key: 'debtTypes',
    section: 'debt',
    question: 'What types of debt do you currently have?',
    type: 'multi',
    options: ['none', 'mortgage', 'student_loans', 'car_loan', 'car_lease', 'credit_cards', 'personal_loan', 'bnpl', 'other']
  },
  {
    key: 'monthlyDebtPayments',
    section: 'debt',
    question: 'Approximately how much are your total monthly debt payments?',
    type: 'single',
    options: [
      'none',
      'under_250',
      '250_500',
      '500_1000',
      '1000_2000',
      '2000_plus'
    ]
  },
  {
    key: 'debtManageability',
    section: 'debt',
    question: 'How manageable do your debt payments feel right now?',
    type: 'single',
    options: ['very_manageable', 'comfortable', 'tight', 'struggling']
  },

  // Mortgage only if housing supports it
  {
    key: 'mortgageBalance',
    section: 'debt',
    question: 'What is your approximate remaining mortgage balance?',
    type: 'single',
    options: [
      'under_50000',
      '50000_100000',
      '100000_200000',
      '200000_300000',
      '300000_plus'
    ],
    conditions: [
      { key: 'housingStatus', operator: 'equals', value: 'own_with_mortgage' }
    ]
  },
  {
    key: 'mortgageRate',
    section: 'debt',
    question: 'What is your approximate mortgage interest rate?',
    type: 'single',
    options: ['under_4', '4_6', '6_8', '8_plus'],
    conditions: [
      { key: 'housingStatus', operator: 'equals', value: 'own_with_mortgage' }
    ]
  },

  // Student loans
  {
    key: 'studentLoanBalance',
    section: 'debt',
    question: 'What is your approximate student loan balance?',
    type: 'single',
    options: [
      'under_5000',
      '5000_20000',
      '20000_50000',
      '50000_100000',
      '100000_plus'
    ],
    conditions: [
      { key: 'debtTypes', operator: 'in', value: ['student_loans'] }
    ]
  },
  {
    key: 'studentLoanRate',
    section: 'debt',
    question: 'What is your approximate student loan interest rate?',
    type: 'single',
    options: ['under_4', '4_6', '6_8', '8_plus', 'not_sure'],
    conditions: [
      { key: 'debtTypes', operator: 'in', value: ['student_loans'] }
    ]
  },

  // Credit cards
  {
    key: 'creditCardBalance',
    section: 'debt',
    question: 'What is your approximate total credit card balance?',
    type: 'single',
    options: ['under_1000', '1000_5000', '5000_10000', '10000_20000', '20000_plus'],
    conditions: [
      { key: 'debtTypes', operator: 'in', value: ['credit_cards'] }
    ]
  },
  {
    key: 'creditCardBehavior',
    section: 'debt',
    question: 'How often do you carry a credit card balance month to month?',
    type: 'single',
    options: ['never_pay_in_full', 'sometimes', 'usually', 'always_carry_balance'],
    conditions: [
      { key: 'debtTypes', operator: 'in', value: ['credit_cards'] }
    ]
  },

  // Vehicle
  {
    key: 'vehicleDebt',
    section: 'debt',
    question: 'What is your vehicle situation?',
    type: 'single',
    options: ['own', 'loan', 'lease']
  },
  {
    key: 'carLoanBalance',
    section: 'debt',
    question: 'What is your approximate car loan balance?',
    type: 'single',
    options: ['under_5000', '5000_15000', '15000_30000', '30000_plus'],
    conditions: [
      { key: 'vehicleDebt', operator: 'equals', value: 'loan' }
    ]
  },
  {
    key: 'leasePayment',
    section: 'debt',
    question: 'What is your approximate monthly lease payment?',
    type: 'single',
    options: ['under_250', '250_500', '500_750', '750_plus'],
    conditions: [
      { key: 'vehicleDebt', operator: 'equals', value: 'lease' }
    ]
  },

  // Other debt
  {
    key: 'otherDebtBalance',
    section: 'debt',
    question: 'What is your approximate balance of other unsecured debt?',
    type: 'single',
    options: ['under_1000', '1000_5000', '5000_10000', '10000_plus'],
    conditions: [
      { key: 'debtTypes', operator: 'in', value: ['personal_loan', 'bnpl', 'other'] }
    ]
  },

  // =========================
  // PROTECTION
  // =========================
  {
    key: 'incomeInterruptionCoverage',
    section: 'protection',
    question: 'If your income stopped today, how long could you cover your expenses?',
    type: 'single',
    options: ['6_plus_months', '3_6_months', '1_3_months', 'under_1_month', 'not_sure']
  },
  {
    key: 'healthInsurance',
    section: 'protection',
    question: 'What is your health insurance situation?',
    type: 'single',
    options: ['employer', 'private', 'government', 'through_spouse', 'no_coverage']
  },
  {
    key: 'incomeProtection',
    section: 'protection',
    question: 'If you could not work due to illness or injury, what would happen?',
    type: 'single',
    options: ['well_covered', 'some_coverage', 'rely_on_savings', 'not_protected']
  },
  {
    key: 'lifeInsurance',
    section: 'protection',
    question: 'Do you currently have life insurance coverage?',
    type: 'single',
    options: ['adequate', 'some', 'none'],
    conditions: [
      { key: 'dependents', operator: 'equals', value: 'yes' }
    ]
  },
  {
    key: 'propertyCoverage',
    section: 'protection',
    question: 'What best describes your home/renters coverage?',
    type: 'single',
    options: ['appropriate_coverage', 'some_coverage', 'no_coverage', 'not_applicable']
  },
  {
    key: 'autoCoverage',
    section: 'protection',
    question: 'What best describes your auto insurance coverage?',
    type: 'single',
    options: ['full', 'basic', 'minimal', 'do_not_drive']
  },

  // =========================
  // VISION
  // =========================
  {
    key: 'financialDirection',
    section: 'vision',
    question: 'What best describes your current financial direction?',
    type: 'single',
    options: ['clear_plan', 'goals_no_plan', 'figuring_it_out', 'stuck']
  },
  {
    key: 'financialTimeHorizon',
    section: 'vision',
    question: 'When do you want to reach financial independence or flexibility?',
    type: 'single',
    options: ['5_10_years', '10_20_years', '20_plus_years', 'not_sure']
  },
  {
    key: 'primaryFinancialPriority',
    section: 'vision',
    question: 'What is your biggest financial priority right now?',
    type: 'single',
    options: ['get_out_of_debt', 'build_savings', 'grow_investing', 'increase_income', 'maintain_optimize']
  },
  {
    key: 'financialConfidence',
    section: 'vision',
    question: 'How confident are you in your financial future?',
    type: 'single',
    options: ['very_confident', 'somewhat_confident', 'uncertain', 'not_confident']
  },
  {
    key: 'lifeGoal',
    section: 'vision',
    question: 'What kind of life are you ultimately trying to build?',
    type: 'single',
    options: ['freedom_from_stress', 'time_flexibility', 'early_retirement', 'family_security', 'not_sure_yet']
  }
];

module.exports = questions;
