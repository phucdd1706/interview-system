import { useState } from 'react';
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
import AnimateButton from 'ui-component/extended/AnimateButton';
import LegendWrapper from './legend';

type personalDetailType = 'firstName' | 'lastName' | 'email' | 'phone' | 'address' | 'notes';

const personalDetail = [
  {
    label: 'Information',
    render: [
      {
        key: 'firstName',
        label: 'First Name',
        type: 'text'
      },
      {
        key: 'lastName',
        label: 'Last Name',
        type: 'text'
      },
      {
        key: 'age',
        label: 'Age',
        type: 'number'
      }
    ]
  },
  {
    label: 'Contact',
    render: [
      {
        key: 'email',
        label: 'Email',
        type: 'email'
      },
      {
        key: 'phone',
        label: 'Phone Number',
        type: 'number'
      }
    ]
  },
  {
    label: 'Address',
    render: [
      {
        key: 'address',
        label: 'Address',
        type: 'text'
      }
    ]
  },
  {
    label: 'Interview Time',
    render: [
      {
        key: 'interviewTime',
        label: 'Interview Time',
        type: 'datetime-local'
      }
    ]
  },
  {
    label: 'Notes',
    render: [
      {
        key: 'notes',
        label: 'Notes',
        type: 'text'
      }
    ]
  }
];

const initialEmployeeForm = {
  firstName: '',
  lastName: '',
  age: '',
  email: '',
  phone: '',
  address: '',
  applyPosition: [
    {
      id: uuidv4(),
      positionName: '',
      level: ''
    }
  ],
  notes: '',
  interviewTime: `${new Date().toISOString().split('T')[0]}T00:00`
};

const EmployeeForm = () => {
  const [employeeForm, setEmployeeForm] = useState(initialEmployeeForm);
  const theme = useTheme();

  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const AddMoreApplyPosition = () => {
    setEmployeeForm({ ...employeeForm, applyPosition: [...employeeForm.applyPosition, { id: uuidv4(), positionName: '', level: '' }] });
  };

  const RemoveApplyPosition = (index: number) => {
    const newApplyPosition = [...employeeForm.applyPosition];
    newApplyPosition.splice(index, 1);
    setEmployeeForm({ ...employeeForm, applyPosition: newApplyPosition });
  };

  return (
    <Box>
      <Formik
        enableReinitialize
        initialValues={employeeForm}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required('First name is required'),
          lastName: Yup.string().required('Last name is required'),
          age: Yup.number().required('Age is required'),
          email: Yup.string().email('Email is invalid').required('Email is required'),
          phone: Yup.string().required('Phone is required'),
          address: Yup.string().required('Address is required'),
          applyPosition: Yup.array().of(
            Yup.object().shape({
              positionName: Yup.string().required('PositionName is required'),
              level: Yup.string().required('Level is required')
            })
          )
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          console.log('values', values);
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            {personalDetail.map((row: { label: string; render: { key: string; label: string; type: string }[] }) => {
              const { render } = row;
              return (
                <Stack direction={matchDownSM ? 'column' : 'row'} spacing={2} sx={{ paddingBottom: 2 }} key={row.label}>
                  {render.map((item: { key: string; label: string; type: string }) => {
                    const key: personalDetailType = item.key as personalDetailType;
                    const { label, type } = item;
                    return (
                      <FormControl fullWidth error={Boolean(touched[key] && errors[key])} key={`${row.label}-${label}`}>
                        <InputLabel htmlFor={`outlined-adornment-${row.label}-${label}`}>{label}</InputLabel>
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
            <LegendWrapper legend="Apply Position">
              <Box>
                {values.applyPosition.map((item: { id: string; positionName: string; level: string }, index: number) => (
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ padding: '1em 0' }} key={item.id}>
                    <Stack direction={matchDownSM ? 'column' : 'row'} spacing={2} sx={{ flexGrow: 1 }}>
                      <FormControl fullWidth error={Boolean(touched.applyPosition && errors.applyPosition)}>
                        <Autocomplete
                          options={jobPosition}
                          onChange={(event, value) => {
                            const newApplyPosition = [...values.applyPosition];
                            newApplyPosition[index].positionName = (value && value.title) || '';
                            setEmployeeForm({ ...employeeForm, applyPosition: newApplyPosition });
                          }}
                          getOptionLabel={(option) => option.title}
                          renderInput={(params) => (
                            <TextField {...params} variant="standard" label="Apply Position" placeholder="Position" />
                          )}
                          sx={{ flexGrow: 1 }}
                        />
                      </FormControl>
                      <FormControl fullWidth error={Boolean(touched.applyPosition && errors.applyPosition)}>
                        <Autocomplete
                          options={jobLevel}
                          onChange={(event, value) => {
                            const newApplyPosition = [...values.applyPosition];
                            newApplyPosition[index].level = (value && value.title) || '';
                            setEmployeeForm({ ...employeeForm, applyPosition: newApplyPosition });
                          }}
                          getOptionLabel={(option) => option.title}
                          renderInput={(params) => <TextField {...params} variant="standard" label="Level" placeholder="Level" />}
                          sx={{ flexGrow: 1 }}
                        />
                      </FormControl>
                    </Stack>

                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        RemoveApplyPosition(index);
                      }}
                      sx={{ borderRadius: 9999, width: '28px', height: '28px', padding: '3px', minWidth: 'auto' }}
                    >
                      <IconX />
                    </Button>
                  </Stack>
                ))}
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                  <Button variant="outlined" onClick={AddMoreApplyPosition} sx={{ marginTop: 2 }}>
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
                  color="secondary"
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

export default EmployeeForm;

const jobPosition = [
  { title: 'ReactJS' },
  { title: 'NodeJS' },
  { title: 'AngularJS' },
  { title: 'VueJS' },
  { title: 'React Native' },
  { title: 'Ionic' },
  { title: 'Flutter' },
  { title: 'ExpressJS' },
  { title: 'Laravel' },
  { title: 'Django' },
  { title: 'Ruby on Rails' },
  { title: 'PHP' }
];

const jobLevel = [{ title: 'Senior' }, { title: 'Middle' }, { title: 'Junior' }, { title: 'Intern' }];
