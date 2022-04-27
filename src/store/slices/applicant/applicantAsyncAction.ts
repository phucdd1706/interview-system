import { dispatch } from 'store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { applicantAPI, setApplicantInfo, setQuestions, setInterviewData } from './applicantReferences';
import { ApplicantInfo } from 'types/applicantData';
import { QuestionType } from 'types/question';

// export const applicantReferenceInit = createAsyncThunk('applicantReferences/applicantReferenceInit', async (applicantId: string) => {
//   const data = await applicantAPI.applicantReferenceInit(applicantId);
//   return data && dispatch(setApplicantInfo(data));
// });

export const getQuestionsThunk = createAsyncThunk(
  'applicantReferences/getQuestionsThunk',
  async (params: { language_id: number; rank_id: number }) => {
    const data = await applicantAPI.getQuestionsThunk(params.language_id, params.rank_id);
    return data && dispatch(setQuestions(data.success));
  }
);

export const getInterviewQuestionThunk = createAsyncThunk(
  'applicant/getInterviewQuestionThunk',
  async (params: ApplicantInfo, thunkAPI) => {
    const data = await applicantAPI.getInterviewQuestionThunk({ data: params.applyPosition });
    const questions = data.success.map((item) => Object.keys(item).map((key) => [...item[key]])).flat(2);
    return data && dispatch(setApplicantInfo({ applicant: params, questions }));
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
  return data && dispatch(setInterviewData({ applicant: { ...applicantDataInit }, interviewQuestions, questions }));
});
