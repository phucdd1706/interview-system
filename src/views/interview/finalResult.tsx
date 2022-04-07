// THIRD-PARTY
import { Box, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';

const FinalResult = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box>
      <Formik
        enableReinitialize
        initialValues={{
          expectedSalary: '10000000',
          passed: true,
          salary: '10000000',
          notes: ''
        }}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          console.log('values', values);
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Stack direction={matchDownSM ? 'column' : 'row'} spacing={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="outlined-adornment-salary">Expected Salary</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-salary"
                  type="number"
                  value={values.expectedSalary}
                  name="expectedSalary"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="expected salary"
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="passed">Status</InputLabel>
                <Select id="passed" name="passed" label="Status" value={+values.passed} onChange={handleChange}>
                  <MenuItem value={0}>Fail</MenuItem>
                  <MenuItem value={1}>Pass</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor="outlined-adornment-salary">Salary</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-salary"
                  type="number"
                  value={values.salary}
                  name="salary"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="salary"
                />
              </FormControl>
            </Stack>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default FinalResult;
