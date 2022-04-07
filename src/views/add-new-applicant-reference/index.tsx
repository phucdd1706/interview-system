// THIRD-PARTY
import { Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

// PROJECT IMPORTS
import MainCard from 'ui-component/cards/MainCard';
import EmployeeForm from './employeeForm';
import QuestionList from './questionList/index';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { activeItem } from 'store/slices/menu';

// const state = {
//   firstName: '',
//   lastName: '',
//   age: '',
//   email: '',
//   phone: '',
//   address: '',
//   notes: '',
//   applyPosition: [
//     {
//       position: '',
//       level: ''
//     }
//   ],
//   questionList: [
//     {
//       questionId: '',
//       question: ''
//     }
//   ],
//   interviewTime: ''
// };

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

const AddApplicantReference = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(activeItem(['applicant']));
  }, [dispatch]);
  return (
    <Box>
      <MainCard title="Applicant Reference Form" sx={{ margin: '1em 0' }}>
        <EmployeeForm />
      </MainCard>
      <MainCard title="Question List" sx={{ margin: '1em 0' }}>
        <QuestionList questionList={questionListData} />
      </MainCard>
      <MainCard sx={{ margin: '1em 0' }}>
        <AnimateButton>
          <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
            Submit
          </Button>
        </AnimateButton>
      </MainCard>
    </Box>
  );
};

export default AddApplicantReference;
