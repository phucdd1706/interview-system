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
        question: 'What is your name?',
        answerStatus: '',
        notes: ''
      },
      {
        questionId: '2',
        question: 'What is your age?',
        answerStatus: '',
        notes: ''
      },
      {
        questionId: '3',
        question: 'Expected salary?',
        answerStatus: '',
        notes: ''
      }
    ]
  },
  {
    type: 'React J1',
    questions: [
      {
        questionId: '4',
        question: 'What is ReactJS?',
        answerStatus: '',
        notes: ''
      },
      {
        questionId: '5',
        question: 'What is Redux?',
        answerStatus: '',
        notes: ''
      },
      {
        questionId: '6',
        question: 'What is J1?',
        answerStatus: '',
        notes: ''
      },
      {
        questionId: '9',
        question: 'explain about React lifecycle?',
        answerStatus: '',
        notes: ''
      }
    ]
  },
  {
    type: 'Advanced',
    questions: [
      {
        questionId: '7',
        question: 'How to increase performance?',
        answerStatus: '',
        notes: ''
      },
      {
        questionId: '8',
        question: 'How to increase security?',
        answerStatus: '',
        notes: ''
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
