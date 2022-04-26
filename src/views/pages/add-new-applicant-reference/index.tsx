// THIRD-PARTY
import { Box, Button, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

// PROJECT IMPORTS
import MainCard from 'ui-component/cards/MainCard';
import ApplicantForm from './applicantInfo/applicantReferenceForm';
import QuestionList from './questionList/index';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { activeItem } from 'store/slices/menu';
import { useSelector } from 'store';
import axiosServices from 'utils/axios';
import { applicantFormInit } from 'store/slices/applicant/applicantReferences';
import { ApplicantDataAPI } from 'types/applicantData';
import { axiosPost } from 'utils/helpers/axios';

const AddApplicantReference = () => {
  const dispatch = useDispatch();
  const applicant = useSelector((state) => state.applicant);

  const intl = useIntl();
  const navigate = useNavigate();
  const [isSubmitting, setSubmitting] = useState(false);
  useEffect(() => {
    dispatch(activeItem(['applicant']));
    dispatch(applicantFormInit());
  }, [dispatch]);
  const submitInfo = () => {
    const data: ApplicantDataAPI = { ...applicant.applicantInfo };
    delete data.applyPosition;
    data.status = 0;
    setSubmitting(true);
    axiosPost(`${process.env.REACT_APP_API_URL}/v1/client/candidates`, data, 'Add applicant success', () => setSubmitting(false));
  };
  return (
    <Box>
      <MainCard title={intl.formatMessage({ id: 'applicant-reference-form' })}>
        <ApplicantForm />
      </MainCard>
      {applicant.interviewQuestions.length > 0 && (
        <>
          <MainCard title={intl.formatMessage({ id: 'interview-questions' })} sx={{ margin: '1em 0' }}>
            <Stack direction="column" spacing={2}>
              {applicant.interviewQuestions.map((question, index) => (
                <QuestionList questionList={question} type={question.type} key={index} />
              ))}
            </Stack>
          </MainCard>
          <MainCard sx={{ margin: '1em 0' }}>
            <AnimateButton>
              <Button
                disableElevation
                disabled={isSubmitting}
                onClick={submitInfo}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </AnimateButton>
          </MainCard>
        </>
      )}
    </Box>
  );
};

export default AddApplicantReference;
