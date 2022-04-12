// THIRD-PARTY
import { Autocomplete, Divider, Stack, TextField } from '@mui/material';
import { useState } from 'react';

// PROJECT IMPORTS
import QuestionStack from './questionStack';
import ModalStyled from '../modal';
import QuestionTag from './questionTag';
import { addInterviewQuestions, deleteInterviewQuestions } from 'store/slices/applicantReferences';
// TYPE IMPORTS
import { QuestionStackInterface } from 'types/interviewQuestion';
import { useDispatch } from 'store';

interface Props {
  questionList: QuestionStackInterface[];
}

const QuestionList = ({ questionList }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('basic');
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

  return (
    <>
      <Stack direction="column" spacing={2}>
        {questionList.map((type) => (
          <QuestionStack questionStack={type} onClickAddButton={handleModalOpen} onClickDeleteButton={deleteQuestion} key={type.type} />
        ))}
      </Stack>
      <ModalStyled open={open} onModalClose={handleModalClose} modalTitle="Question List">
        <Stack direction="row" alignItems="center" spacing={2} sx={{ padding: '1em 0' }}>
          <Autocomplete
            options={jobPosition}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => <TextField {...params} variant="standard" label="Apply Position" placeholder="Position" />}
            sx={{ flexGrow: 1 }}
          />
          <Autocomplete
            options={jobLevel}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => <TextField {...params} variant="standard" label="Level" placeholder="Level" />}
            sx={{ flexGrow: 1 }}
          />
        </Stack>
        <Divider />
        <Stack direction="column" spacing={1} sx={{ padding: '1em 0', overflowY: 'auto', marginBottom: 2, height: 'calc(90vh - 200px)' }}>
          {ListQuestions.map((data, index) => (
            <QuestionTag key={data.questionId} type={selectedType} value={data} onAddTag={addQuestion} />
          ))}
        </Stack>
      </ModalStyled>
    </>
  );
};

export default QuestionList;

const ListQuestions = [
  {
    questionId: '1234',
    question: 'What is your 23423?'
  },
  {
    questionId: '21234',
    question: 'What is werweyour age?'
  },
  {
    questionId: '3sdf',
    question: 'erwer salary?'
  },
  {
    questionId: '412',
    question: 'What is RwerwfeactJS?'
  },
  {
    questionId: '524',
    question: 'What is sdfRedux?'
  },
  {
    questionId: '623',
    question: 'What is werJ1?'
  },
  {
    questionId: '754',
    question: 'How to increafwese performance?'
  },
  {
    questionId: '83',
    question: 'How to increweqase security?'
  },
  {
    questionId: '9654',
    question: 'explain about React lifecycle?'
  },
  {
    questionId: '1340',
    question: 'What is RefwwactJS?'
  }
];

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
