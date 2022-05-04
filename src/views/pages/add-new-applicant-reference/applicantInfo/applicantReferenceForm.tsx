// THIRD-PARTY
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { Box, Button, FormControl, FormHelperText, Stack, Autocomplete, TextField, useMediaQuery } from '@mui/material';
import { IconX } from '@tabler/icons';
import { v4 as uuidv4 } from 'uuid';
import { useIntl } from 'react-intl';

// PROJECT IMPORTS
import AnimateButton from 'ui-component/extended/AnimateButton';
import axiosServices from 'utils/axios';
import LegendWrapper from '../legend';
import { useDispatch, useSelector } from 'store';
import { getRanksListSuccess } from 'store/slices/rank';
import { getLanguageListSuccess } from 'store/slices/language';
import { getInterviewQuestionThunk } from 'store/slices/applicant/applicantAsyncAction';
import personalDetail from './layoutMapping';

// TYPE IMPORTS
import { RankType } from 'types/rank';
import { Languages } from 'types/language';
import FormInput from './formInput';
import { alertError } from 'utils/helpers/axios/errorAlert';

type personalDetailType = 'name' | 'email' | 'phone' | 'address';

const ApplicantForm = ({ interviewing, errors, handleBlur, handleChange, handleSubmit, setFieldValue, touched, values }: any) => {
  const intl = useIntl();
  const theme = useTheme();
  const dispatch = useDispatch();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
  const { language } = useSelector((state) => state.language);
  const { ranks } = useSelector((state) => state.rank);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  React.useEffect(() => {
    axios.all([axiosServices.get('/v1/languages/all'), axiosServices.get('/v1/ranks/all')]).then((res) => {
      dispatch(getLanguageListSuccess({ data: res[0].data.success }));
      dispatch(getRanksListSuccess({ data: res[1].data.success }));
    });
  }, [dispatch]);
  const getInterviewQuestion = async () => {
    const isReady = values.applyPosition.every(
      (item: { language_id: string; rank_id: string; rank_advanced_id: string }) =>
        item.language_id && item.rank_id && item.rank_advanced_id
    );
    if (isReady) {
      setIsSubmitting(true);
      await dispatch(getInterviewQuestionThunk(values));
      setIsSubmitting(false);
    } else {
      alertError('Please select all field in apply position');
    }
  };
  return (
    <Box>
      <>
        {personalDetail.map((row: { label: string; render: { key: string; label: string; type: string; required?: boolean }[] }) => {
          const { render } = row;
          return (
            <Stack direction={matchDownMD ? 'column' : 'row'} spacing={2} sx={{ paddingBottom: 2 }} key={row.label}>
              {render.map((item: { key: string; label: string; type: string; required?: boolean }) => {
                const key: personalDetailType = item.key as personalDetailType;
                const { label, type, required } = item;
                return (
                  <FormInput
                    key={`${row.label}-${label}`}
                    touched={touched[key]}
                    errors={errors[key]}
                    label={label}
                    type={type}
                    values={values[key]}
                    name={key}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    required={required}
                    readOnly={interviewing}
                  />
                );
              })}
            </Stack>
          );
        })}

        {!interviewing && (
          <>
            <LegendWrapper legend={intl.formatMessage({ id: 'apply-positions' })}>
              <Box>
                {values.applyPosition.map((item: { rank_advanced_id: string; language_id: string; rank_id: string }, index: number) => (
                  <Stack direction="row" alignItems="center" spacing={2} sx={{ padding: '1em 0' }} key={uuidv4()}>
                    <Stack direction={matchDownMD ? 'column' : 'row'} spacing={2} sx={{ flexGrow: 1 }}>
                      <FormControl fullWidth error={Boolean(touched.applyPosition && errors.applyPosition)}>
                        <Autocomplete
                          options={language}
                          onChange={(event, value) => {
                            setFieldValue(`applyPosition[${index}].language_id`, (value && value.id) || '');
                          }}
                          value={language.find((element) => element.id === item.language_id)}
                          getOptionLabel={(option: Languages) => option.name || ''}
                          renderInput={(params) => (
                            <TextField {...params} variant="standard" label="Apply Position" placeholder="Position" />
                          )}
                          sx={{ flexGrow: 1 }}
                        />
                        {touched.applyPosition && errors.applyPosition && (
                          <FormHelperText error id="standard-weight-helper-text-last-name">
                            {
                              // @ts-ignore:next-line
                              errors.applyPosition[index] && errors.applyPosition[index].language_id
                            }
                          </FormHelperText>
                        )}
                      </FormControl>
                      <FormControl fullWidth error={Boolean(touched.applyPosition && errors.applyPosition)}>
                        <Autocomplete
                          options={ranks}
                          onChange={(event, value) => {
                            setFieldValue(`applyPosition[${index}].rank_id`, (value && value.id) || '');
                          }}
                          value={ranks.find((element) => element.id === item.rank_id)}
                          getOptionLabel={(option: RankType) => option.name || ''}
                          renderInput={(params) => <TextField {...params} variant="standard" label="Rank" placeholder="Rank" />}
                          sx={{ flexGrow: 1 }}
                        />
                        {touched.applyPosition && errors.applyPosition && (
                          <FormHelperText error id="standard-weight-helper-text-last-name">
                            {
                              // @ts-ignore:next-line
                              errors.applyPosition[index] && errors.applyPosition[index].rank_id
                            }
                          </FormHelperText>
                        )}
                      </FormControl>
                      <FormControl fullWidth error={Boolean(touched.applyPosition && errors.applyPosition)}>
                        <Autocomplete
                          options={ranks}
                          onChange={(event, value) => {
                            setFieldValue(`applyPosition[${index}].rank_advanced_id`, (value && value.id) || '');
                          }}
                          value={ranks.find((element) => element.id === item.rank_advanced_id)}
                          getOptionLabel={(option: RankType) => option.name || ''}
                          renderInput={(params) => (
                            <TextField {...params} variant="standard" label="Rank Advanced" placeholder="Rank Advanced" />
                          )}
                          sx={{ flexGrow: 1 }}
                        />
                        {touched.applyPosition && errors.applyPosition && (
                          <FormHelperText error id="standard-weight-helper-text-last-name">
                            {
                              // @ts-ignore:next-line
                              errors.applyPosition[index] && errors.applyPosition[index].rank_advanced_id
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
                          values.applyPosition.filter(
                            (position: { rank_advanced_id: string; language_id: string; rank_id: string }, positionIndex: number) =>
                              positionIndex !== index
                          )
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
                      setFieldValue('applyPosition', values.applyPosition.concat({ rank_advanced_id: '', language_id: '', rank_id: '' }));
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
                  onClick={getInterviewQuestion}
                  fullWidth
                  size="large"
                  // type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 4 }}
                >
                  Get Interview Question
                </Button>
              </AnimateButton>
            </Box>
          </>
        )}
      </>
    </Box>
  );
};

export default ApplicantForm;
