// THIRD-PARTY
import { Stack } from '@mui/material';
import { useState } from 'react';

// PROJECT IMPORTS
import QuestionStack from 'views/add-new-applicant-reference/questionList/questionStack';

const questionListData = [
  {
    type: 'Basic',
    questions: [
      {
        questionId: '1',
        question: 'What is your name?'
      },
      {
        questionId: '2',
        question: 'What is your age?'
      },
      {
        questionId: '3',
        question: 'Expected salary?'
      }
    ]
  },
  {
    type: 'React J1',
    questions: [
      {
        questionId: '4',
        question: 'What is ReactJS?'
      },
      {
        questionId: '5',
        question: 'What is Redux?'
      },
      {
        questionId: '6',
        question: 'What is J1?'
      },
      {
        questionId: '9',
        question: 'explain about React lifecycle?'
      }
    ]
  },
  {
    type: 'Advanced',
    questions: [
      {
        questionId: '7',
        question: 'How to increase performance?'
      },
      {
        questionId: '8',
        question: 'How to increase security?'
      }
    ]
  }
];

const InterviewQuestion = () => {
  const [questions] = useState(questionListData);
  return (
    <Stack direction="column" spacing={2}>
      {questions.map((type) => (
        <QuestionStack questionStack={type} key={type.type} interviewing />
      ))}
    </Stack>
  );
};

export default InterviewQuestion;
