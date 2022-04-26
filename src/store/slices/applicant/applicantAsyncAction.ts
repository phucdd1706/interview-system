import { dispatch } from 'store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { applicantAPI, setApplicantInfo, setQuestions, setReferenceEvaluate } from './applicantReferences';
import { ApplicantInfo, ApplicantDataInterface } from 'types/applicantData';

export const applicantReferenceInit = createAsyncThunk('applicantReferences/applicantReferenceInit', async (applicantId: string) => {
  const data = await applicantAPI.applicantReferenceInit(applicantId);
  return data && dispatch(setApplicantInfo(data));
});

export const getQuestionsThunk = createAsyncThunk(
  'applicantReferences/getQuestionsThunk',
  async (params: { type: string; value: string }) => {
    const data = await applicantAPI.getQuestionsThunk(params.type, params.value);
    return data && dispatch(setQuestions(data));
  }
);

export const getInterviewQuestionThunk = createAsyncThunk(
  'applicant/getInterviewQuestionThunk',
  async (
    params: {
      data: Array<{
        language_id: string | number;
        rank_id: string | number;
        rank_advanced_id: string | number;
      }>;
    },
    thunkAPI
  ) => {
    const data = await applicantAPI.getInterviewQuestionThunk(params);
    // return data && dispatch(setApplicantInfo(data));
    return data;
  }
);

export const getReferenceEvaluateThunk = createAsyncThunk(
  'applicant/getReferenceEvaluateThunk',
  async (params: ApplicantDataInterface, thunkAPI) => {
    const data = await applicantAPI.getReferenceEvaluateThunk(params);
    return data && dispatch(setReferenceEvaluate(data));
  }
);
