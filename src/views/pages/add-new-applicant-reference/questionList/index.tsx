// THIRD-PARTY
import { Autocomplete, Divider, Stack, TextField } from '@mui/material';
import { useState } from 'react';

// PROJECT IMPORTS
import QuestionStack from './questionStack';
import ModalStyled from '../modal';
import QuestionTag from './questionTag';
import { addInterviewQuestions, deleteInterviewQuestions, getQuestionsThunk } from 'store/slices/applicantReferences';
// TYPE IMPORTS
import { QuestionStackInterface } from 'types/interviewQuestion';
import { useDispatch, useSelector } from 'store';

interface Props {
  questionList: QuestionStackInterface[];
}

const QuestionList = ({ questionList }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('basic');
  const { questions } = useSelector((state) => state.applicant);
  const dispatch = useDispatch();
  const handleModalOpen = (type: string) => {
    setSelectedType(type);
    setOpen(true);
  };
  const handleModalClose = () => {
    setOpen(false);
  };
  const deleteQuestion = (type: string, questionId: string) => {
    dispatch(deleteInterviewQuestions({ type, questionId }));
  };
  const addQuestion = (type: string, question: { questionId: string; question: string }) => {
    dispatch(addInterviewQuestions({ type, question: { ...question, answerScore: '', notes: '' } }));
  };
  const getQuestions = (type: string, value: string) => {
    dispatch(getQuestionsThunk({ type, value }));
  };

  return (
    <>
      <Stack direction="column" spacing={2}>
        {questionList.map((type) => (
          <QuestionStack questionStack={type} onClickAddButton={handleModalOpen} onClickDeleteButton={deleteQuestion} key={type.type} />
        ))}
      </Stack>
      <ModalStyled open={open} onModalClose={handleModalClose} modalTitle="Add Questions">
        <Stack direction="row" alignItems="center" spacing={2} sx={{ padding: '1em 0' }}>
          <Autocomplete
            options={jobPosition}
            getOptionLabel={(option) => option.title}
            onChange={(event, value) => getQuestions('position', (value && value.title) || '')}
            renderInput={(params) => <TextField {...params} variant="standard" label="Apply Position" placeholder="Position" />}
            sx={{ flexGrow: 1 }}
          />
          <Autocomplete
            options={jobLevel}
            onChange={(event, value) => getQuestions('level', (value && value.title) || '')}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => <TextField {...params} variant="standard" label="Level" placeholder="Level" />}
            sx={{ flexGrow: 1 }}
          />
        </Stack>
        <Divider />
        <Stack direction="column" spacing={1} sx={{ padding: '1em 0', overflowY: 'auto', marginBottom: 2, height: 'calc(90vh - 200px)' }}>
          {questions &&
            questions.map((data, index) => <QuestionTag key={data.questionId} type={selectedType} value={data} onAddTag={addQuestion} />)}
        </Stack>
      </ModalStyled>
    </>
  );
};

export default QuestionList;

const jobPosition = [
  { title: 'ReactJS' },
  { title: 'NodeJS' },
  { title: 'AngularJS' },
  { title: 'VueJS' },
  { title: 'React Native' },
  { title: 'Ionic' },
  { title: 'Flutter' },
  { title: 'ExpressJS' },
  { title: 'Laravel' },
  { title: 'Django' },
  { title: 'Ruby on Rails' },
  { title: 'PHP' }
];

const jobLevel = [{ title: 'Senior' }, { title: 'Middle' }, { title: 'Junior' }, { title: 'Intern' }];
