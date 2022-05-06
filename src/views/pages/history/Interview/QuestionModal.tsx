// THIRD PARTY
import React, { useState, useEffect } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
  Box,
  Button,
  Stack,
  DialogContent,
  Typography,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Grid,
  Dialog,
  useMediaQuery,
  Menu,
  MenuItem
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// PROJECT IMPORT
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Candidates, Question, Status, SearchQuestions } from 'types/history';
import QuestionTag from 'views/pages/history/Interview/QuestionTag';
import { gridSpacing } from 'store/constant';
import { editCandidate } from 'store/slices/history';
import { dispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import RankFilters from 'ui-component/CommonFilters/RankFilters';
import LanguageFilters from 'ui-component/CommonFilters/LanguageFilters';
import NoDataImg from 'assets/images/logo/nodata.png';
import CandidateInformation from 'views/pages/history/Interview/CandidateInformation';

interface Props {
  dataCandidate: Candidates;
  visible: boolean;
  handleVisibleQuestionModal: () => void;
}

const initialSearchState: SearchQuestions = {
  rank_id: '',
  language_id: '',
  typeId: ''
};

const Type: Status[] = [
  {
    value: '',
    label: 'All'
  },
  {
    value: 'basic',
    label: 'Basic'
  },
  {
    value: 'advanced',
    label: 'Advanced'
  }
];

const QuestionModal = ({ dataCandidate, visible, handleVisibleQuestionModal }: Props) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
  const spacingMD = matchDownMD ? 1 : 1.5;

  const [questionList, setQuestionList] = useState<Question[]>();
  const [questionAll, setQuestionAll] = useState<Question[]>();

  const [filters, setFilters] = useState(initialSearchState);
  const [anchorElType, setAnchorElType] = useState(null);
  const [anchorElRank, setAnchorElRank] = useState(null);
  const [anchorElLanguage, setAnchorElLanguage] = useState(null);

  const openType = Boolean(anchorElType);

  useEffect(() => {
    filterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    const dataQuestion = dataCandidate?.candidate_question?.map((item: Question) => ({
      candidate_id: item?.candidate_id,
      question_content: item?.question?.question_content,
      type: item?.question?.type === 1 ? 'advanced' : 'basic',
      status: item?.status,
      id: item?.id,
      rankName: item?.question?.rank?.name,
      rankId: item?.question?.rank?.id,
      languageName: item?.question?.language?.name,
      languageId: item?.question?.language?.id
    }));

    const dataQuestionSoft = dataQuestion.reduce((questionArr: any, question: any) => {
      if (!questionArr[question.type]) questionArr[question.type] = [];
      questionArr[question.type].push(question);
      return questionArr;
    }, {});
    const basicQuestion = dataQuestionSoft?.basic || [];
    const advancedQuestion = dataQuestionSoft?.advanced || [];

    setQuestionList(basicQuestion.concat(advancedQuestion));
    setQuestionAll(basicQuestion.concat(advancedQuestion));
  }, [dataCandidate]);

  const filterData = async () => {
    let dataFilters = questionAll;

    if (filters.rank_id) {
      dataFilters = dataFilters?.filter((item) => item.rankId === filters.rank_id);
    }
    if (filters.language_id) {
      dataFilters = dataFilters?.filter((item) => item.languageId === filters.language_id);
    }
    if (filters.typeId !== '') {
      dataFilters = dataFilters?.filter((item) => item.type === filters.typeId);
    }
    setQuestionList(dataFilters);
  };

  const handleStatusQuestion = (questionId: number | undefined, status: number | string) => {
    setQuestionList(questionList?.map((item) => (item.id !== questionId ? item : { ...item, status })));
  };

  const handleInterviewResult = () => {
    const candidateQuestions = questionList?.map((item) => ({ question_id: item?.id, status: item?.status }));
    const finalInterview = {
      candidateQuestions,
      name: dataCandidate?.name,
      email: dataCandidate?.email,
      time: dataCandidate?.time,
      age: dataCandidate?.age,
      phone: dataCandidate?.phone,
      address: dataCandidate?.address,
      status: 1
    };
    dispatch(
      editCandidate({
        id: dataCandidate?.id,
        params: finalInterview,
        callback: (res) => {
          if (res?.data?.success) {
            openNotification('success', `Interview ${dataCandidate?.name} successfully!`);
            changeModal('close');
          } else {
            openNotification('error', res?.message);
          }
        }
      })
    );
  };

  const openNotification = (color: string, message: string) => {
    dispatch(
      openSnackbar({
        open: true,
        message,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        variant: 'alert',
        alert: {
          color
        },
        close: true
      })
    );
  };

  const changeModal = (type: string) => {
    if (type === 'close') {
      handleVisibleQuestionModal();
    }
  };

  //  sort by question type
  const handleTypeClick = (index: number | string | undefined) => {
    setFilters({ ...filters, typeId: index });
    setAnchorElType(null);
  };

  const handleType = (event: any) => {
    setAnchorElType(event.currentTarget);
  };

  const handleCloseType = () => {
    setAnchorElType(null);
  };

  //  sort by question rank
  const handleRankClick = (index: number | string | undefined) => {
    setFilters({ ...filters, rank_id: index });
    setAnchorElRank(null);
  };

  const handleRank = (event: any) => {
    setAnchorElRank(event.currentTarget);
  };

  const handleCloseRank = () => {
    setAnchorElRank(null);
  };

  //  sort by question language
  const handleLanguageClick = (index: number | string | undefined) => {
    setFilters({ ...filters, language_id: index });
    setAnchorElLanguage(null);
  };

  const handleLanguage = (event: any) => {
    setAnchorElLanguage(event.currentTarget);
  };

  const handleCloseLanguage = () => {
    setAnchorElLanguage(null);
  };

  const renderSearchForm = () => {
    const typeLabel = Type?.filter((items) => items.value === filters.typeId);

    return (
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={12}>
          <Grid container alignItems="center" justifyContent="space-between" spacing={matchDownMD ? 0.5 : 2}>
            <Grid item>
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={matchDownSM ? 2 : spacingMD}>
                <RankFilters
                  filters={filters}
                  anchorElRank={anchorElRank}
                  handleRank={handleRank}
                  handleCloseRank={handleCloseRank}
                  handleRankClick={handleRankClick}
                />

                <Typography sx={{ display: { xs: 'none', sm: 'flex' }, fontSize: '1rem', color: 'grey.500', fontWeight: 400 }}>
                  |
                </Typography>
                <LanguageFilters
                  filters={filters}
                  anchorElLanguage={anchorElLanguage}
                  handleLanguage={handleLanguage}
                  handleCloseLanguage={handleCloseLanguage}
                  handleLanguageClick={handleLanguageClick}
                />

                <Typography sx={{ display: { xs: 'none', sm: 'flex' }, fontSize: '1rem', color: 'grey.500', fontWeight: 400 }}>
                  |
                </Typography>
                <Stack direction="row" alignItems="center" justifyContent="center" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                  <Typography variant="h5">Sort by type: </Typography>
                  <Button
                    id="demo-positioned-button"
                    aria-controls="demo-positioned-menu"
                    aria-haspopup="true"
                    aria-expanded={openType ? 'true' : undefined}
                    onClick={handleType}
                    sx={{ color: 'grey.500', fontWeight: 400 }}
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                    {typeLabel?.length > 0 && typeLabel[0]?.label}
                  </Button>
                  <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorElType}
                    open={openType}
                    onClose={handleCloseType}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                  >
                    {Type?.map((status, index) => (
                      <MenuItem
                        sx={{ p: 1.5 }}
                        key={index}
                        selected={status.value === filters.typeId}
                        onClick={() => handleTypeClick(status.value)}
                      >
                        {status.label}
                      </MenuItem>
                    ))}
                  </Menu>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <Dialog
      open={visible}
      onClose={() => {
        changeModal('close');
      }}
      fullScreen
      sx={{
        '&>div:nth-of-type(3)': {
          '&>div': {
            m: 0,
            borderRadius: '0px',
            width: '100%',
            maxHeight: '100%'
          }
        }
      }}
    >
      {visible && (
        <>
          <Box sx={{ p: 3 }}>
            <Grid container alignItems="center" spacing={0.5} justifyContent="space-between">
              <Grid item sx={{ width: '100%' }}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Typography
                    variant={matchDownSM ? 'h4' : 'h3'}
                    sx={{
                      display: 'inline-block',
                      width: 'calc(100% - 34px)',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      verticalAlign: 'middle'
                    }}
                  >
                    {`Interview candidate ${dataCandidate?.name}`}
                  </Typography>
                  <Button variant="text" color="error" sx={{ p: 0.5, minWidth: 32, display: 'block' }} onClick={() => changeModal('close')}>
                    <HighlightOffIcon />
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>

          <Divider />

          <DialogContent sx={{ p: 3 }}>
            <CandidateInformation dataCandidate={dataCandidate} />

            <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
              <Grid item xs={12}>
                {renderSearchForm()}
                <Divider />
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ pr: 3, width: '5%' }}>STT</TableCell>
                        <TableCell sx={{ width: '40%' }}>Question Content</TableCell>
                        <TableCell sx={{ width: '15%' }}>Rank</TableCell>
                        <TableCell sx={{ width: '15%' }}>Language</TableCell>
                        <TableCell sx={{ width: '15%' }}>Type</TableCell>
                        <TableCell sx={{ width: '10%' }} align="right">
                          Evaluate
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {questionList?.map((question, index) => (
                        <QuestionTag
                          index={index}
                          value={question}
                          key={`${question?.id}_${index}`}
                          handleStatusQuestion={handleStatusQuestion}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {questionList?.length === 0 && (
                  <div className="noData">
                    <img src={NoDataImg} alt="NoDataImg" style={{ marginRight: matchDownSM ? 8 : 16 }} />
                    <p>No data available</p>
                  </div>
                )}
              </Grid>

              <Grid item xs={12}>
                <AnimateButton>
                  <Button fullWidth variant="contained" onClick={() => handleInterviewResult()}>
                    Final Interview
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default QuestionModal;
