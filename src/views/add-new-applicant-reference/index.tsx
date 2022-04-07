// THIRD-PARTY
import { Box, Button } from '@mui/material';

// PROJECT IMPORTS
import MainCard from 'ui-component/cards/MainCard';
import EmployeeForm from './employeeForm';
import QuestionList from './questionList/index';
import AnimateButton from 'ui-component/extended/AnimateButton';

const AddApplicantReference = () => (
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

export default AddApplicantReference;
