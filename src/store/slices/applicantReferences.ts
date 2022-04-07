// PROJECT IMPORTS
import { ApplicantDataInterface } from 'types/applicantData';

// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';
import { questionInterface, QuestionStackInterface } from 'types/question';

const initialState: ApplicantDataInterface = {
  id: '',
  fristName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  interviewTime: '',
  experiences: [],
  applyPosition: [],
  employment: [],
  interviewQuestions: [
    {
      type: 'Basic',
      questions: [
        {
          questionId: '1',
          question: 'What is your name?',
          answerScore: 'good',
          notes: ''
        },
        {
          questionId: '2',
          question: 'What is your age?',
          answerScore: 'bad',
          notes: ''
        },
        {
          questionId: '3',
          question: 'Expected salary?',
          answerScore: 'good',
          notes: ''
        }
      ]
    },
    {
      type: 'React J1',
      questions: [
        {
          questionId: '4',
          question: 'What is ReactJS?',
          answerScore: 'excellent',
          notes: ''
        },
        {
          questionId: '5',
          question: 'What is Redux?',
          answerScore: '',
          notes: ''
        },
        {
          questionId: '6',
          question: 'What is J1?',
          answerScore: '',
          notes: 'Thang nay tra loi chan'
        },
        {
          questionId: '9',
          question: 'explain about React lifecycle?',
          answerScore: '',
          notes: ''
        }
      ]
    },
    {
      type: 'Advanced',
      questions: [
        {
          questionId: '7',
          question: 'How to increase performance?',
          answerScore: '',
          notes: ''
        },
        {
          questionId: '8',
          question: 'How to increase security?',
          answerScore: '',
          notes: ''
        }
      ]
    }
  ],
  referenceEvaluate: {
    totalQuestions: 0,
    passedQuestions: 0,
    failedQuestions: 0,
    passedPercentage: 0,
    result: '',
    salary: 0
  },
  interviewerEvaluate: {
    level: '',
    expectedSalary: 0,
    result: '',
    salary: 0,
    notes: ''
  }
};

const applicantReferences = createSlice({
  name: 'applicantReferences',
  initialState,
  reducers: {
    setInterviewQuestions(state, action: { payload: QuestionStackInterface[] }) {
      state.interviewQuestions = [...action.payload];
    },
    deleteInterviewQuestions(state, action: { payload: { type: string; questionId: string } }) {
      const { type, questionId } = action.payload;
      state.interviewQuestions.filter((item) => {
        if (item.type === type) {
          item.questions = item.questions.filter((question) => question.questionId !== questionId);
        }
        return item;
      });
    },
    addInterviewQuestions(state, action: { payload: { type: string; question: questionInterface } }) {
      const { type, question } = action.payload;
      state.interviewQuestions.filter((item) => {
        if (item.type.toLowerCase() === type && item.questions.every((element) => element.questionId !== question.questionId)) {
          item.questions.push(question);
        }
        return item;
      });
    },
    handleAnswerScore(state, action: { payload: { questionId: string; answerScore: string } }) {
      const { questionId, answerScore } = action.payload;
      state.interviewQuestions.map((item) => {
        item.questions.map((question) => {
          if (question.questionId === questionId) {
            question.answerScore = answerScore;
          }
          return question;
        });
        return item;
      });
    },
    handleInterviewQuestionNotes(state, action: { payload: { questionId: string; notes: string } }) {
      const { questionId, notes } = action.payload;
      state.interviewQuestions.map((item) => {
        item.questions.map((question) => {
          if (question.questionId === questionId) {
            question.notes = notes;
          }
          return question;
        });
        return item;
      });
    }
  }
});

export default applicantReferences.reducer;

export const { setInterviewQuestions, deleteInterviewQuestions, addInterviewQuestions, handleAnswerScore, handleInterviewQuestionNotes } =
  applicantReferences.actions;
