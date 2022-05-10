// THIRD-PARTY
import { Box, Button, TextareaAutosize, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
// PROJECT IMPORTS
import MainCard from 'ui-component/cards/MainCard';
import ApplicantForm from './applicantInfo/applicantReferenceForm';
import QuestionList from './questionList/index';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { activeItem } from 'store/slices/menu';
import { useSelector } from 'store';
import { applicantInit } from 'store/slices/applicant/applicantReferences';
import { ApplicantInfo } from 'types/applicantData';
import { axiosPost, axiosPut } from 'utils/helpers/axios';
import { getInterviewDataThunk } from 'store/slices/applicant/applicantAsyncAction';
import { isPhone } from 'utils/regexHelper';

const AddApplicantReference = () => {
  const dispatch = useDispatch();
  const applicant = useSelector((state) => state.applicant);
  const { id } = useParams();
  const intl = useIntl();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getInterviewDataThunk(id));
    } else {
      dispatch(applicantInit());
    }
  }, [id, dispatch]);
  useEffect(() => {
    if (id) {
      dispatch(activeItem(['interview']));
    } else {
      dispatch(activeItem(['applicant']));
    }
  }, []);
  return (
    <Box>
      <Formik
        enableReinitialize
        initialValues={applicant.applicantInfo}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .trim()
            .min(3, 'Name must have at least 3 characters')
            .max(50, `Maximum characters allowed is 50`)
            .required('Name is required'),
          age: Yup.number().max(100, 'Too old').min(0, 'Too young').required('Age is required'),
          email: Yup.string().trim().email('Email is not valid').required('Email is required'),
          phone: Yup.string()
            .trim()
            .max(10, 'Please enter the correct phone number format')
            .matches(isPhone, 'Please enter the correct phone number format')
            .required('Phone number is required'),
          address: Yup.string().max(255),
          applyPosition: Yup.array().of(
            Yup.object().shape({
              language_id: Yup.string().required('Language is required'),
              rank_id: Yup.string().required('Rank is required'),
              rank_advanced_id: Yup.string().required('Rank advanced is required')
            })
          ),
          time: Yup.string().required('Time is required'),
          note: Yup.string().max(255)
        })}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          if (id) {
            const data = {
              ...values,
              status: 1,
              candidateQuestions: values.questions
            };
            await axiosPut(`${process.env.REACT_APP_API_URL}/v1/client/candidates/${id}`, data, 'Complete').then(() =>
              navigate('/history')
            );
          } else {
            await axiosPost(`${process.env.REACT_APP_API_URL}/v1/client/candidates`, values, 'Add applicant success').then((res: any) => {
              res && res.success.id && navigate(`/interview/${res.success.id}`);
            });
          }
          await setSubmitting(false);
        }}
      >
        {(props: FormikProps<ApplicantInfo>) => (
          <form noValidate onSubmit={props.handleSubmit}>
            <MainCard title={intl.formatMessage({ id: 'applicant-reference-form' })}>
              <ApplicantForm interviewing={!!id} {...props} />
            </MainCard>
            {applicant.interviewQuestions.length > 0 && (
              <>
                <MainCard title={intl.formatMessage({ id: 'interview-questions' })} sx={{ margin: '1em 0' }}>
                  <Stack direction="column" spacing={2}>
                    <QuestionList questionList={applicant.interviewQuestions} interviewing={!!id} />
                  </Stack>
                </MainCard>
                {id && (
                  <MainCard>
                    <TextareaAutosize
                      name="note"
                      onChange={props.handleChange}
                      aria-label="minimum height"
                      minRows={3}
                      placeholder="Note"
                      value={props.values.note}
                      style={{ width: '100%', padding: '8px' }}
                    />
                  </MainCard>
                )}

                <MainCard sx={{ margin: '1em 0' }}>
                  <AnimateButton>
                    <Button
                      disableElevation
                      disabled={props.isSubmitting}
                      type="submit"
                      fullWidth
                      size="large"
                      variant="contained"
                      color="primary"
                    >
                      {id
                        ? `Send Interview Result (${
                            applicant.applicantInfo.questions &&
                            applicant.applicantInfo.questions.filter((item) => item.status && item.status !== 2).length
                          }/${applicant.applicantInfo.questions && applicant.applicantInfo.questions.length} answered)`
                        : 'Submit'}
                    </Button>
                  </AnimateButton>
                </MainCard>
              </>
            )}
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddApplicantReference;
