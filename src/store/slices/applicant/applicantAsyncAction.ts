import { dispatch } from 'store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { applicantAPI, setApplicantInfo, setQuestions } from './applicantReferences';
import { ApplicantInfo } from 'types/applicantData';

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
    return data && dispatch(setApplicantInfo({ applicant: params, questions: data.success }));
  }
);

// export const getReferenceEvaluateThunk = createAsyncThunk(
//   'applicant/getReferenceEvaluateThunk',
//   async (params: ApplicantDataInterface, thunkAPI) => {
//     const data = await applicantAPI.getReferenceEvaluateThunk(params);
//     return data && dispatch(setReferenceEvaluate(data));
//   }
// );
