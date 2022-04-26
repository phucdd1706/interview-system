// THIRD-PARTY
import { Autocomplete, Divider, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

// PROJECT IMPORTS
import QuestionStack from './questionStack';
import ModalStyled from '../modal';
import QuestionTag from './questionTag';
import { getQuestionsThunk } from 'store/slices/applicant/applicantAsyncAction';
import { deleteInterviewQuestions, addInterviewQuestions } from 'store/slices/applicant/applicantReferences';
import { jobPosition, jobLevel } from '../constants';
import { useDispatch, useSelector } from 'store';

// TYPE IMPORTS
import { QuestionStackInterface } from 'types/interviewQuestion';
import { QuestionType } from 'types/question';
import { Languages } from 'types/language';

interface Props {
  questionList: QuestionStackInterface;
  type: string;
}

const QuestionList = ({ questionList, type }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('basic');
  const { questions } = useSelector((state) => state.applicant);
  const { language } = useSelector((state) => state.language);
  const { ranks } = useSelector((state) => state.rank);
  const [searchQuestion, setSearchQuestion] = useState({
    rank_id: 0,
    language_id: 0
  });
  const dispatch = useDispatch();
  const handleModalOpen = (questionType: string) => {
    setSelectedType(questionType);
    setOpen(true);
  };
  const handleModalClose = () => {
    setOpen(false);
  };
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
        <Typography variant="h3" component="h3" sx={{ flexGrow: 1, marginBottom: 1 }}>
          {type.toUpperCase()}
        </Typography>
        {Object.keys(questionList.questions).map((key) => (
          <QuestionStack
            stackType={key}
            questionStack={questionList.questions[key]}
            onClickAddButton={handleModalOpen}
            onClickDeleteButton={deleteQuestion}
            key={key}
          />
        ))}
      </Stack>
      <ModalStyled open={open} onModalClose={handleModalClose} modalTitle="Add Questions">
        <Stack direction="row" alignItems="center" spacing={2} sx={{ padding: '1em 0' }}>
          <Autocomplete
            options={language}
            getOptionLabel={(option) => option.name || ''}
            onChange={(event, value) => setSearchQuestion({ ...searchQuestion, language_id: (value && Number(value.id)) || -1 })}
            renderInput={(params) => <TextField {...params} variant="standard" label="Language" placeholder="Language" />}
            sx={{ flexGrow: 1 }}
          />
          <Autocomplete
            options={ranks}
            onChange={(event, value) => setSearchQuestion({ ...searchQuestion, rank_id: (value && Number(value.id)) || -1 })}
            getOptionLabel={(option) => option.name || ''}
            renderInput={(params) => <TextField {...params} variant="standard" label="Rank" placeholder="Rank" />}
            sx={{ flexGrow: 1 }}
          />
        </Stack>
        <Divider />
        <Stack direction="column" spacing={1} sx={{ padding: '1em 0', overflowY: 'auto', marginBottom: 2, height: 'calc(90vh - 200px)' }}>
          {questions &&
            questions.map((data: QuestionType, index: number) => (
              <QuestionTag key={index} type={selectedType} value={data} onAddTag={addQuestion} />
            ))}
        </Stack>
      </ModalStyled>
    </>
  );
};

export default QuestionList;
