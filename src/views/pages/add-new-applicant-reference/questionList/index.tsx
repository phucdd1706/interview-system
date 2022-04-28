// THIRD-PARTY
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';

// PROJECT IMPORTS
import QuestionTag from './questionTag';
import QuestionStack from './questionStack';
import { getQuestionsThunk } from 'store/slices/applicant/applicantAsyncAction';
import { deleteInterviewQuestions, addInterviewQuestions } from 'store/slices/applicant/applicantReferences';
import { useDispatch } from 'store';

// TYPE IMPORTS
import { QuestionType } from 'types/question';
import { QuestionStackInterface } from 'types/interviewQuestion';

interface Props {
  questionList: QuestionStackInterface[];
  interviewing: boolean;
}

const QuestionList = ({ questionList, interviewing }: Props) => {
  const [searchQuestion, setSearchQuestion] = useState({
    rank_id: 0,
    language_id: 0
  });
  const dispatch = useDispatch();
  const deleteQuestion = (questionType: string, id: number) => {
    dispatch(deleteInterviewQuestions({ questionType, id }));
  };
  const addQuestion = (questionType: string, languageT: string, question: QuestionType) => {
    dispatch(addInterviewQuestions({ questionType, language: languageT, question }));
  };
  const getQuestions = (language_id: number, rank_id: number) => {
    dispatch(getQuestionsThunk({ language_id, rank_id }));
  };

  useEffect(() => {
    searchQuestion.language_id && searchQuestion.rank_id && getQuestions(searchQuestion.language_id, searchQuestion.rank_id);
  }, [searchQuestion]);

  return (
    <>
      <Stack direction="column" spacing={2} sx={{ border: 'solid 1px #e9e9e9', borderRadius: 5, padding: 2 }}>
        {questionList.map((question, index) => (
          <QuestionStack questionStack={question} key={question.language} interviewing={interviewing} />
        ))}
      </Stack>
    </>
  );
};

export default QuestionList;
