// THIRD-PARTY
import { Box, Typography } from '@mui/material';

// PROJECT IMPORTS
import MainCard from 'ui-component/cards/MainCard';
import EmployeeForm from './EmployeeForm';

const AddEmployeeInfo = () => (
  <Box>
    <MainCard title="Employee Form">
      <EmployeeForm />
    </MainCard>
    <MainCard title="Employee form">
      <EmployeeForm />
    </MainCard>
  </Box>
);

export default AddEmployeeInfo;
