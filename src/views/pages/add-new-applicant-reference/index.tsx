// THIRD-PARTY
import { Box, Button } from '@mui/material';
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

const AddApplicantReference = () => {
  const dispatch = useDispatch();
  const applicantInfo = useSelector((state) => state.applicant);
  const intl = useIntl();
  const navigate = useNavigate();
  const [isSubmitting, setSubmitting] = useState(false);
  useEffect(() => {
    dispatch(activeItem(['applicant']));
    dispatch(applicantFormInit());
  }, [dispatch]);

  const submitInfo = () => {
    setSubmitting(true);
    axiosServices
      .post(`${process.env.REACT_APP_FAKE_API_URL}/applicant`, applicantInfo)
      .then(async (res) => {
        setSubmitting(false);
        navigate(`/interview/${res.data.applicantId}`, { replace: true });
      })
      .catch((err) => err);
  };
  return (
    <Box>
      <MainCard title={intl.formatMessage({ id: 'applicant reference form' })}>
        <ApplicantForm />
      </MainCard>
      {applicantInfo.interviewQuestions.length > 0 && (
        <>
          <MainCard title={intl.formatMessage({ id: 'interview questions' })} sx={{ margin: '1em 0' }}>
            <QuestionList questionList={applicantInfo.interviewQuestions} />
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
                color="secondary"
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
