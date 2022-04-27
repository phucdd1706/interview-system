// THIRD-PARTY
import { Box, Button, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';

// PROJECT IMPORTS
import MainCard from 'ui-component/cards/MainCard';
import ApplicantForm from './applicantInfo/applicantReferenceForm';
import QuestionList from './questionList/index';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { activeItem } from 'store/slices/menu';
import { useSelector } from 'store';
import axiosServices from 'utils/axios';
import { applicantInit, setApplicantInfo, setInterviewData } from 'store/slices/applicant/applicantReferences';
import { ApplicantDataAPI, ApplicantInfo } from 'types/applicantData';
import { axiosPost, axiosPut } from 'utils/helpers/axios';
import { Candidates } from 'types/history';
import { QuestionType } from 'types/question';
import { getInterviewDataThunk } from 'store/slices/applicant/applicantAsyncAction';

const applicantDataInit: ApplicantInfo = {
  name: '',
  age: '',
  email: '',
  phone: '',
  address: '',
  time: '',
  applyPosition: [],
  questions: [],
  status: 1,
  note: ''
};

type Keys = 'id' | 'name' | 'age' | 'email' | 'note' | 'time' | 'status';

const AddApplicantReference = () => {
  const dispatch = useDispatch();
  const applicant = useSelector((state) => state.applicant);
  const { history } = useSelector((state) => state.history);
  const { id } = useParams();
  const intl = useIntl();
  const navigate = useNavigate();
  const [isSubmitting, setSubmitting] = useState(false);

  const submitInfo = (type: boolean) => {
    // type: true - add new applicant, false - send interview result
    const data: ApplicantDataAPI = { ...applicant.applicantInfo };
    const candidateQuestions =
      (data.questions &&
        data.questions.map((element) => ({
          question_id: element.question_id,
          status: element.status
        }))) ||
      [];
    delete data.applyPosition;
    data.status = 0;
    setSubmitting(true);
    if (type) {
      data.status = 1;
      delete data.questions;
      axiosPut(`${process.env.REACT_APP_API_URL}/v1/client/candidates/${id}`, { ...data, candidateQuestions }, 'Success');
    } else {
      data.status = 0;
      axiosPost(`${process.env.REACT_APP_API_URL}/v1/client/candidates`, data, 'Add applicant success').then((res: any) => {
        res.success.id && navigate(`/applicant/${res.success.id}`);
      });
    }
    setSubmitting(false);
  };

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
      <MainCard title={intl.formatMessage({ id: 'applicant-reference-form' })}>
        <ApplicantForm interviewing={!!id} />
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
                disabled={isSubmitting}
                onClick={() => {
                  submitInfo(!!id);
                }}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="primary"
              >
                {id ? 'Send Interview Result' : 'Submit'}
              </Button>
            </AnimateButton>
          </MainCard>
        </>
      )}
    </Box>
  );
};

export default AddApplicantReference;
