const express = require('express');
const cors = require('cors');
const questions = require('./questions');

const app = express();

app.use(cors());
app.use(express.json());

/**
 * QUESTIONS (sample structure)
 * We'll expand this later with your full system
 */
const questions = [
  {
    key: 'vehicleDebt',
    question: 'What is your vehicle situation?',
    type: 'single',
    options: ['own', 'loan', 'lease']
  },
  {
    key: 'carLoanBalance',
    question: 'What is your car loan balance?',
    type: 'number',
    conditions: [
      { key: 'vehicleDebt', operator: 'equals', value: 'loan' }
    ]
  },
  {
    key: 'leasePayment',
    question: 'What is your monthly lease payment?',
    type: 'number',
    conditions: [
      { key: 'vehicleDebt', operator: 'equals', value: 'lease' }
    ]
  },
  {
    key: 'savingConsistency',
    question: 'Are you currently saving money each month?',
    type: 'single',
    options: ['yes_consistently', 'yes_irregularly', 'not_currently']
  },
  {
    key: 'monthlySavingsContribution',
    question: 'How much do you save each month?',
    type: 'number',
    conditions: [
      {
        key: 'savingConsistency',
        operator: 'in',
        value: ['yes_consistently', 'yes_irregularly']
      }
    ]
  }
];

/**
 * CONDITION ENGINE
 */
function shouldAsk(question, answers) {
  if (!question.conditions || question.conditions.length === 0) return true;

  return question.conditions.every((cond) => {
    const actual = answers[cond.key];

    switch (cond.operator) {
      case 'equals':
        return actual === cond.value;
      case 'not_equals':
        return actual !== cond.value;
      case 'in':
        return Array.isArray(cond.value) && cond.value.includes(actual);
      case 'not_in':
        return Array.isArray(cond.value) && !cond.value.includes(actual);
      default:
        return true;
    }
  });
}

/**
 * NEXT QUESTION LOGIC
 */
function getNextQuestionIndex(questions, answers, currentIndex) {
  for (let i = currentIndex + 1; i < questions.length; i++) {
    if (shouldAsk(questions[i], answers)) {
      return i;
    }
  }
  return null;
}

/**
 * ROUTES
 */
app.get('/', (req, res) => {
  res.send('Foundation Brain is running');
});

app.post('/next-question', (req, res) => {
  const { answers = {}, currentIndex = -1 } = req.body;

  const nextIndex = getNextQuestionIndex(questions, answers, currentIndex);

  if (nextIndex === null) {
    return res.json({ done: true });
  }

  return res.json({
    done: false,
    index: nextIndex,
    question: questions[nextIndex]
  });
});

/**
 * START SERVER (RENDER COMPATIBLE)
 */
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
