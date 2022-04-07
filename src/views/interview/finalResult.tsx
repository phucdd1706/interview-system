import { Box, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, Stack } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';

const FinalResult = () => (
  <Box>
    <Formik
      enableReinitialize
      initialValues={{
        passed: true,
        salary: '10,000,000',
        notes: ''
      }}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        console.log('values', values);
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Stack direction="row" spacing={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Status">
                <MenuItem value={10}>Fail</MenuItem>
                <MenuItem value={20}>Pass</MenuItem>
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

export default FinalResult;
