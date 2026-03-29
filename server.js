const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const questions = [
  {
    key: 'vehicleDebt',
    question: 'What is your vehicle situation?',
    options: ['own', 'loan', 'lease']
  },
  {
    key: 'carLoanBalance',
    question: 'What is your car loan balance?',
    conditions: [
      { key: 'vehicleDebt', operator: 'equals', value: 'loan' }
    ]
  }
];

function shouldAsk(question, answers) {
  if (!question.conditions) return true;

  return question.conditions.every(cond => {
    const value = answers[cond.key];

    switch (cond.operator) {
      case 'equals':
        return value === cond.value;
      default:
        return true;
    }
  });
}

function getNextQuestionIndex(questions, answers, currentIndex) {
  for (let i = currentIndex + 1; i < questions.length; i++) {
    if (shouldAsk(questions[i], answers)) {
      return i;
    }
  }
  return null;
}

app.post('/next-question', (req, res) => {
  const { answers, currentIndex } = req.body;

  const nextIndex = getNextQuestionIndex(questions, answers, currentIndex);

  if (nextIndex === null) {
    return res.json({ done: true });
  }

  res.json({
    question: questions[nextIndex],
    index: nextIndex
  });
});

app.get('/', (req, res) => {
  res.send('Foundation Brain is running');
});

app.listen(4000, () => {
  console.log('Server running on port 4000');
});
