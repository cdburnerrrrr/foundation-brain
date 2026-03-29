const express = require('express');
const cors = require('cors');
const questions = require('./questions');
const { scoreAssessment } = require('./scoring');

const app = express();

app.use(cors());
app.use(express.json());

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

      case 'includes':
        return Array.isArray(actual) && actual.includes(cond.value);

      case 'not_includes':
        return Array.isArray(actual) && !actual.includes(cond.value);

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


app.post('/calculate-score', (req, res) => {
  const { answers = {} } = req.body;

  const results = scoreAssessment(answers);

  return res.json(results);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
