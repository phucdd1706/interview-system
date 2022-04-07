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
        <QuestionList />
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
