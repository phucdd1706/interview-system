// THIRD-PARTY
import { Box, Button, Stack } from '@mui/material';
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
    dispatch(activeItem(['applicant']));
  }, [id, dispatch]);
  return (
    <Box>
      <Formik
        enableReinitialize
        initialValues={applicant.applicantInfo}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('First name is required'),
          age: Yup.number().required('Age is required'),
          email: Yup.string().email('Email is invalid').required('Email is required'),
          phone: Yup.string().required('Phone is required'),
          address: Yup.string().required('Address is required'),
          applyPosition: Yup.array().of(
            Yup.object().shape({
              language_id: Yup.string().required('Language is required'),
              rank_id: Yup.string().required('Rank is required'),
              rank_advanced_id: Yup.string().required('Rank advanced is required')
            })
          )
        })}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          if (id) {
            const data = {
              ...values,
              status: 1,
              candidateQuestions: values.questions
            };
            await axiosPut(`${process.env.REACT_APP_API_URL}/v1/client/candidates/${id}`, data, 'Success');
          } else {
            await axiosPost(`${process.env.REACT_APP_API_URL}/v1/client/candidates`, values, 'Add applicant success').then((res: any) => {
              res && res.success.id && navigate(`/applicant/${res.success.id}`);
            });
          }
          setSubmitting(false);
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
                      {id ? 'Send Interview Result' : 'Submit'}
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
