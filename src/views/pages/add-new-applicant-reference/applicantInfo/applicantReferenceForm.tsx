// THIRD-PARTY
import { Formik } from 'formik';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
  Autocomplete,
  TextField,
  useMediaQuery
} from '@mui/material';
import { IconX } from '@tabler/icons';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { useIntl } from 'react-intl';

// PROJECT IMPORTS
import AnimateButton from 'ui-component/extended/AnimateButton';
import LegendWrapper from '../legend';
import { useDispatch } from 'store';
import { ApplicantInfo } from 'types/applicantData';
import { getInterviewQuestionThunk } from 'store/slices/applicant/applicantAsyncAction';
import personalDetail from './layoutMapping';
import { jobPosition, jobLevel, workingExperiences } from '../constants';

type personalDetailType = 'firstName' | 'lastName' | 'email' | 'phone' | 'address' | 'notes';

const initialApplicantInfo: ApplicantInfo = {
  id: '',
  firstName: '',
  lastName: '',
  age: '',
  email: 'denvl585@gmail.com',
  phone: '',
  address: '',
  applyPosition: [
    {
      id: uuidv4(),
      position: '',
      level: ''
    }
  ],
  experiences: [
    {
      id: uuidv4(),
      position: '',
      durations: ''
    }
  ],
  notes: '',
  interviewTime: `${new Date().toISOString().split('T')[0]}T09:00`
};

const ApplicantForm = () => {
  const intl = useIntl();
  const theme = useTheme();
  const dispatch = useDispatch();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box>
      <Formik
        initialValues={initialApplicantInfo}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required('First name is required'),
          lastName: Yup.string().required('Last name is required'),
          age: Yup.number().required('Age is required'),
          email: Yup.string().email('Email is invalid').required('Email is required'),
          phone: Yup.string().required('Phone is required'),
          address: Yup.string().required('Address is required'),
          applyPosition: Yup.array().of(
            Yup.object().shape({
              position: Yup.string().required('Position is required'),
              level: Yup.string().required('Level is required')
            })
          )
        })}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          await dispatch(getInterviewQuestionThunk(values));
          setSubmitting(false);
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            {personalDetail.map((row: { label: string; render: { key: string; label: string; type: string; required?: boolean }[] }) => {
              const { render } = row;
              return (
                <Stack direction={matchDownMD ? 'column' : 'row'} spacing={2} sx={{ paddingBottom: 2 }} key={row.label}>
                  {render.map((item: { key: string; label: string; type: string; required?: boolean }) => {
                    const key: personalDetailType = item.key as personalDetailType;
                    const { label, type, required } = item;
                    return (
                      <FormControl fullWidth error={Boolean(touched[key] && errors[key])} key={`${row.label}-${label}`}>
                        <InputLabel htmlFor={`outlined-adornment-${row.label}-${label}`} required={required}>
                          {label}
                        </InputLabel>
                        <OutlinedInput
                          id={`outlined-adornment-${row.label}-${label}`}
                          type={type}
                          value={values[key]}
                          name={key}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label={label}
                          inputProps={{}}
                        />
                        {touched[key] && errors[key] && (
                          <FormHelperText error id="standard-weight-helper-text-last-name">
                            {errors[key]}
                          </FormHelperText>
                        )}
                      </FormControl>
                    );
                  })}
                </Stack>
              );
            })}

            <LegendWrapper legend={intl.formatMessage({ id: 'experiences' })}>
              <Box>
                {values.experiences.map((item: { id: string; position: string; durations: string }, index: number) => (
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ padding: '1em 0' }} key={item.id}>
                    <Stack direction={matchDownMD ? 'column' : 'row'} spacing={2} sx={{ flexGrow: 1 }}>
                      <FormControl fullWidth error={Boolean(touched.experiences && errors.experiences)}>
                        <Autocomplete
                          options={jobPosition}
                          onChange={(event, value) => {
                            setFieldValue(`experiences[${index}].position`, value);
                          }}
                          getOptionLabel={(option) => option}
                          renderInput={(params) => <TextField {...params} variant="standard" label="Position" placeholder="Position" />}
                          sx={{ flexGrow: 1 }}
                        />
                      </FormControl>
                      <FormControl fullWidth error={Boolean(touched.experiences && errors.experiences)}>
                        <Autocomplete
                          options={workingExperiences}
                          onChange={(event, value) => {
                            setFieldValue(`experiences[${index}].durations`, value);
                          }}
                          getOptionLabel={(option) => option}
                          renderInput={(params) => <TextField {...params} variant="standard" label="Durations" placeholder="Durations" />}
                          sx={{ flexGrow: 1 }}
                        />
                      </FormControl>
                    </Stack>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        setFieldValue(
                          'experiences',
                          values.experiences.filter((experience) => experience.id !== item.id)
                        );
                      }}
                      sx={{ borderRadius: 9999, width: '28px', height: '28px', padding: '3px', minWidth: 'auto' }}
                    >
                      <IconX />
                    </Button>
                  </Stack>
                ))}
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setFieldValue('experiences', [...values.experiences, { id: uuidv4(), position: '', durations: '' }]);
                    }}
                    sx={{ marginTop: 2 }}
                  >
                    + Add more experiences
                  </Button>
                </Stack>
              </Box>
            </LegendWrapper>

            <LegendWrapper legend={intl.formatMessage({ id: 'apply-positions' })}>
              <Box>
                {values.applyPosition.map((item: { id: string; position: string; level: string }, index: number) => (
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ padding: '1em 0' }} key={item.id}>
                    <Stack direction={matchDownMD ? 'column' : 'row'} spacing={2} sx={{ flexGrow: 1 }}>
                      <FormControl fullWidth error={Boolean(touched.applyPosition && errors.applyPosition)}>
                        <Autocomplete
                          options={jobPosition}
                          onChange={(event, value) => {
                            setFieldValue(`applyPosition[${index}].position`, value);
                          }}
                          getOptionLabel={(option) => option}
                          renderInput={(params) => (
                            <TextField {...params} variant="standard" label="Apply Position" placeholder="Position" />
                          )}
                          sx={{ flexGrow: 1 }}
                        />
                        {touched.applyPosition && errors.applyPosition && (
                          <FormHelperText error id="standard-weight-helper-text-last-name">
                            {
                              // @ts-ignore:next-line
                              errors.applyPosition[index] && errors.applyPosition[index].position
                            }
                          </FormHelperText>
                        )}
                      </FormControl>
                      <FormControl fullWidth error={Boolean(touched.applyPosition && errors.applyPosition)}>
                        <Autocomplete
                          options={jobLevel}
                          onChange={(event, value) => {
                            setFieldValue(`applyPosition[${index}].level`, value);
                          }}
                          getOptionLabel={(option) => option}
                          renderInput={(params) => <TextField {...params} variant="standard" label="Level" placeholder="Level" />}
                          sx={{ flexGrow: 1 }}
                        />
                        {touched.applyPosition && errors.applyPosition && (
                          <FormHelperText error id="standard-weight-helper-text-last-name">
                            {
                              // @ts-ignore:next-line
                              errors.applyPosition[index] && errors.applyPosition[index].level
                            }
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Stack>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        setFieldValue(
                          'applyPosition',
                          values.applyPosition.filter((position) => position.id !== item.id)
                        );
                      }}
                      sx={{ borderRadius: 9999, width: '28px', height: '28px', padding: '3px', minWidth: 'auto' }}
                    >
                      <IconX />
                    </Button>
                  </Stack>
                ))}
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setFieldValue('applyPosition', values.applyPosition.concat({ id: uuidv4(), position: '', level: '' }));
                    }}
                    sx={{ marginTop: 2 }}
                  >
                    + Add more position
                  </Button>
                </Stack>
              </Box>
            </LegendWrapper>
            <Box sx={{ mt: 2, width: { md: 'fit-content', sm: '100%' } }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 4 }}
                >
                  Get Interview Question
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default ApplicantForm;
