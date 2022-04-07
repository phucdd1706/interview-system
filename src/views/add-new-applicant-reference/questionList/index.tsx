import QuestionStack from './questionStack';
import useStyles from '../useStylesHook/makeStyle';
import { Autocomplete, Divider, Modal, Paper, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import ModalStyled from '../modal';
import QuestionTag from './questionTag';

const questionListData = [
  {
    type: 'Basic',
    questions: [
      {
        questionId: '1',
        question: 'What is your name?'
      },
      {
        questionId: '2',
        question: 'What is your age?'
      },
      {
        questionId: '3',
        question: 'Expected salary?'
      }
    ]
  },
  {
    type: 'React J1',
    questions: [
      {
        questionId: '4',
        question: 'What is ReactJS?'
      },
      {
        questionId: '5',
        question: 'What is Redux?'
      },
      {
        questionId: '6',
        question: 'What is J1?'
      },
      {
        questionId: '9',
        question: 'explain about React lifecycle?'
      }
    ]
  },
  {
    type: 'Advanced',
    questions: [
      {
        questionId: '7',
        question: 'How to increase performance?'
      },
      {
        questionId: '8',
        question: 'How to increase security?'
      }
    ]
  }
];

const QuestionList = () => {
  const [questions] = useState(questionListData);
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleModalOpen = () => {
    setOpen(true);
  };
  const handleModalClose = () => {
    setOpen(false);
  };
  const deleteQuestion = (id: string) => {
    console.log('%c 🆑 ', `background: #${Math.floor(Math.random() * 999999)};color: #fff;font-weight: 700`, '🚀 ~ id', id);
  };

  return (
    <>
      <Stack direction="column" spacing={2}>
        {questions.map((type) => (
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
            <QuestionTag
              key={data.questionId}
              value={data}
              onAddTag={(id: string) => {
                console.log('%c 🆑 ', `background: #${Math.floor(Math.random() * 999999)};color: #fff;font-weight: 700`, '🚀 ~ id', id);
              }}
            />
          ))}
        </Stack>
      </ModalStyled>
    </>
  );
};

export default QuestionList;

const ListQuestions = [
  {
    questionId: '1',
    question: 'What is your name?'
  },
  {
    questionId: '2',
    question: 'What is your age?'
  },
  {
    questionId: '3',
    question: 'Expected salary?'
  },
  {
    questionId: '4',
    question: 'What is ReactJS?'
  },
  {
    questionId: '5',
    question: 'What is Redux?'
  },
  {
    questionId: '6',
    question: 'What is J1?'
  },
  {
    questionId: '7',
    question: 'How to increase performance?'
  },
  {
    questionId: '8',
    question: 'How to increase security?'
  },
  {
    questionId: '9',
    question: 'explain about React lifecycle?'
  },
  {
    questionId: '10',
    question: 'What is ReactJS?'
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
