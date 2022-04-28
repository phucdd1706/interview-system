import { dispatch } from 'store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { applicantAPI, setApplicantInfo, setInterviewData } from './applicantReferences';
import { ApplicantInfo } from 'types/applicantData';
import { QuestionType } from 'types/question';

export const getQuestionsThunk = createAsyncThunk(
  'applicantReferences/getQuestionsThunk',
  async (params: { language_id: number; rank_id: number }) => {
    const data = await applicantAPI.getQuestionsThunk(params.language_id, params.rank_id);
    // return data && dispatch(setQuestions(data.success));
  }
);

export const getInterviewQuestionThunk = createAsyncThunk(
  'applicant/getInterviewQuestionThunk',
  async (params: ApplicantInfo, thunkAPI) => {
    const data = await applicantAPI.getInterviewQuestionThunk({ data: params.applyPosition });
    console.log(params.applyPosition);
    console.log('data', data.success);
    return data && dispatch(setApplicantInfo({ applicant: params, questions: data.success }));
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
  const interviewQuestions: QuestionType[] =
    candidate_question.map((element: any) => ({ ...element.question, status: element.status, candidate_id: element.id })) || [];
  console.log(candidate_question);
  const questionStack = {
    language: '',
    questions: {
      base: interviewQuestions,
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
    status: element.status
  }));
  applicantDataInit.time = applicantDataInit.time.split('.')[0];
  return data && dispatch(setInterviewData({ applicant: { ...applicantDataInit }, interviewQuestions: [{ ...questionStack }], questions }));
});
