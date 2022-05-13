// THIRD-PARTY
import { Box, Stack, Tab, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
// PROJECT IMPORTS
import QuestionStack from './questionStack';
import { getQuestionsThunk } from 'store/slices/applicant/applicantAsyncAction';
import { useDispatch } from 'store';

// TYPE IMPORTS
import { QuestionStackInterface } from 'types/interviewQuestion';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { makeStyles } from '@mui/styles';

interface Props {
  questionList: QuestionStackInterface[];
  interviewing: boolean;
}

const QuestionList = ({ questionList, interviewing }: Props) => {
  const [searchQuestion] = useState({
    rank_id: 0,
    language_id: 0
  });
  const divRef = React.useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [value, setValue] = useState('0');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const getQuestions = (language_id: number, rank_id: number) => {
    dispatch(getQuestionsThunk({ language_id, rank_id }));
  };

  useEffect(() => {
    searchQuestion.language_id && searchQuestion.rank_id && getQuestions(searchQuestion.language_id, searchQuestion.rank_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuestion]);

  return (
    <>
      <Stack direction="column" spacing={2} sx={{ border: 'solid 1px #e9e9e9', borderRadius: 5, padding: 2 }}>
        <TabContext value={value}>
          <Box ref={divRef} sx={{ borderBottom: 1, borderColor: 'divider', position: 'relative' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              {questionList.map((question, index) => (
                <Tab
                  value={index.toString()}
                  label={
                    <Typography variant="h4" component="h4">
                      {question.language}
                    </Typography>
                  }
                  key={index}
                />
              ))}
            </TabList>
          </Box>
          {questionList.map((question, index) => (
            <TabPanel value={index.toString()} key={index}>
              <QuestionStack questionStack={question} key={question.language} interviewing={interviewing} />
            </TabPanel>
          ))}
        </TabContext>
      </Stack>
    </>
  );
};

export default QuestionList;
