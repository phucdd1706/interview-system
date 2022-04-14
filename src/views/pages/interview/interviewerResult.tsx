// THIRD-PARTY
import { Box, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Stack, useMediaQuery, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';

const InterviewerResult = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box>
      <Formik
        enableReinitialize
        initialValues={{
          applicantId: '',
          expectedSalary: '',
          passed: false,
          salary: '',
          level: '',
          notes: ''
        }}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {}}
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
                <InputLabel id="passed">Level</InputLabel>
                <Select id="level" name="level" label="Level" value={values.level} onChange={handleChange}>
                  <MenuItem value="J1">J1</MenuItem>
                  <MenuItem value="J2">J2</MenuItem>
                  <MenuItem value="S1">S1</MenuItem>
                  <MenuItem value="S2">S2</MenuItem>
                  <MenuItem value="S3">S3</MenuItem>
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
            <Box sx={{ marginTop: 3 }}>
              <AnimateButton>
                <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Submit
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default InterviewerResult;
