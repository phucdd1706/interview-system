import { dispatch } from 'store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { applicantAPI, setApplicantInfo, setInterviewData } from './applicantReferences';
import { ApplicantInfo } from 'types/applicantData';
import { alertError } from 'utils/helpers/axios/errorAlert';

export const getQuestionsThunk = createAsyncThunk(
  'applicantReferences/getQuestionsThunk',
  async (params: { language_id: number; rank_id: number }) => {
    await applicantAPI.getQuestionsThunk(params.language_id, params.rank_id);
    // return data && dispatch(setQuestions(data.success));
  }
);

export const getInterviewQuestionThunk = createAsyncThunk(
  'applicant/getInterviewQuestionThunk',
  async (params: ApplicantInfo, thunkAPI) => {
    const data = await applicantAPI.getInterviewQuestionThunk({ data: params.applyPosition });
    const hasQuestions =
      data &&
      data.success.some((item) => item.questions.base.length > 0 || item.questions.focus.length > 0 || item.questions.advanced.length > 0);
    if (hasQuestions) {
      return data && dispatch(setApplicantInfo({ applicant: params, questions: data.success }));
    }
    return alertError('No questions found');
  }
);

export const getInterviewDataThunk = createAsyncThunk('applicant/getInterviewDataThunk', async (id: string | number) => {
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
  const data = await applicantAPI.getInterviewDataThunk(id);
  const applicantInfo = { ...data.success };
  const { candidate_question } = applicantInfo;
  const interivewQuestions = [...candidate_question].map(
    (element: any) => ({ ...element.question, status: element.status || 0, candidate_id: element.id, type: element.type } || [])
  );

  const questionStack = {
    language: '',
    questions: {
      base: interivewQuestions,
      focus: [],
      advanced: []
    }
  };
  Object.keys(applicantDataInit).forEach((key) => {
    if (applicantInfo && applicantInfo[key as Keys]) {
      // @ts-ignore
      applicantDataInit[key] = applicantInfo[key];
    }
  });
  const questions = candidate_question.map((element: any) => ({
    question_id: element.id,
    status: element.status || 2
  }));
  applicantDataInit.time = applicantDataInit.time.split('.')[0];
  return data && dispatch(setInterviewData({ applicant: { ...applicantDataInit }, interviewQuestions: [{ ...questionStack }], questions }));
});
