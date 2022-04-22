// THIRD-PARTY
import AddIcon from '@mui/icons-material/AddTwoTone';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MainCard from 'ui-component/cards/MainCard';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SortStatus from 'views/pages/questions/SortStatus';
import {
  Button,
  Fab,
  Grid,
  InputAdornment,
  Menu,
  MenuItem,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// PROJECT IMPORTS
import Question from 'views/pages/questions/Question';
import { useDispatch, useSelector } from 'store';
import { getQuestionsList } from 'store/slices/question';
import { QuestionType, QuestionFilter } from 'types/question';
import AddQuestion from './AddQuestion';
import { gridSpacing } from 'store/constant';
import { Department, DepartmentFilter } from 'types/department';
import { getDepartmentList } from 'store/slices/department';
import { RankFilter, RankType } from 'types/rank';
import { getRanksList } from 'store/slices/rank';
import { Languages, SearchValues } from 'types/language';
import { fetchLanguages } from 'store/slices/language';

const Questions = () => {
  // department
  const [department, setDepartment] = React.useState<Department[]>([]);
  const initialStateDepartment: DepartmentFilter = {
    search: '',
    status: '',
    currentPage: 1,
    limit: 20
  };
  const [filterDepartment, setFilterDepartment] = useState(initialStateDepartment);
  const filterDataDepartment = async () => {
    await dispatch(getDepartmentList(filter));
  };
  const departmentState = useSelector((state) => state.department);
  useEffect(() => {
    setDepartment(departmentState.department);
  }, [departmentState]);
  useEffect(() => {
    filterDataDepartment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterDepartment]);
  // department

  // rank
  const [anchorElRank, setAnchorElRank] = useState<null | HTMLElement>(null);
  const openSortRank = Boolean(anchorElRank);
  const handleClickListItemRank = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElRank(event.currentTarget);
  };

  const handleSortStatusCloseRank = () => {
    setAnchorElRank(null);
  };
  const handleMenuItemClickRank = (event: React.MouseEvent<HTMLElement>, index: any) => {
    setFilter({ ...filter, status: index });
    setAnchorElRank(null);
  };

  const [rank, setRank] = React.useState<RankType[]>([]);
  const [filterRank, setFilterRank] = useState();
  const filterDataRank = async () => {
    await dispatch(getRanksList(filterRank));
  };
  const rankState = useSelector((state) => state.rank);
  useEffect(() => {
    setRank(rankState.ranks);
  }, [rankState]);
  useEffect(() => {
    filterDataRank();
  }, [filterRank]);
  // rank

  // Language
  const [language, setLanguage] = React.useState<Languages[]>([]);
  const initialStateLanguage: SearchValues = {
    search: '',
    status: '',
    currentPage: 1
  };
  const token = localStorage.getItem('serviceToken');
  const [filterLanguage, setFilterLanguage] = useState(initialStateLanguage);
  const filterDataLanguage = async () => {
    await dispatch(fetchLanguages({ params: filterLanguage, token }));
  };
  const languageState = useSelector((state) => state.language);
  useEffect(() => {
    setLanguage(languageState.language);
  }, [languageState]);
  useEffect(() => {
    filterDataLanguage();
  }, [filterLanguage]);
  // Language
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
  const spacingMD = matchDownMD ? 1 : 1.5;

  const dispatch = useDispatch();
  const [data, setData] = React.useState<QuestionType[]>([]);
  const questionState = useSelector((state) => state.question);

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setFilter({ ...filter, currentPage: page! });
  };

  const initialState: QuestionFilter = {
    search: '',
    status: '',
    rank_id: '',
    currentPage: 1
  };
  const [filter, setFilter] = useState(initialState);
  const handleSearch = async (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
    const newString = event?.target.value;
    setFilter({ ...filter, search: newString! });
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openSort = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortStatusClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: any) => {
    setFilter({ ...filter, status: index });
    setAnchorEl(null);
  };
  const sortLabel = SortStatus.filter((items) => items.value === filter.status);

  const filterData = async () => {
    await dispatch(getQuestionsList(filter));
  };

  React.useEffect(() => {
    setData(questionState.questions);
  }, [questionState]);

  React.useEffect(() => {
    filterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const handleDrawerOpen = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  const addQuestion = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  return (
    <MainCard
      title={
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Grid container alignItems="center" justifyContent="space-between" spacing={matchDownMD ? 0.5 : 2}>
              <Grid item>
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={matchDownSM ? 0.5 : spacingMD}>
                  <TextField
                    sx={{ width: { xs: 140, md: 'auto' } }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon fontSize="small" />
                        </InputAdornment>
                      )
                    }}
                    value={filter.search}
                    placeholder="Search...."
                    size="small"
                    onChange={handleSearch}
                  />

                  <Typography sx={{ display: { xs: 'none', sm: 'flex' }, fontSize: '1rem', color: 'grey.500', fontWeight: 400 }}>
                    |
                  </Typography>
                  <Stack direction="row" alignItems="center" justifyContent="center" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                    <Typography variant="h5">Sort by: </Typography>
                    <Button
                      id="demo-positioned-button"
                      aria-controls="demo-positioned-menu"
                      aria-haspopup="true"
                      aria-expanded={openSort ? 'true' : undefined}
                      onClick={handleClickListItem}
                      sx={{ color: 'grey.500', fontWeight: 400 }}
                      endIcon={<KeyboardArrowDownIcon />}
                    >
                      {sortLabel.length > 0 && sortLabel[0].label}
                    </Button>
                    <Menu
                      id="demo-positioned-menu"
                      aria-labelledby="demo-positioned-button"
                      anchorEl={anchorEl}
                      open={openSort}
                      onClose={handleSortStatusClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                    >
                      {SortStatus.map((status, index) => (
                        <MenuItem
                          sx={{ p: 1.5 }}
                          key={index}
                          selected={status.value === filter.status}
                          onClick={(event) => handleMenuItemClick(event, status.value)}
                        >
                          {status.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Stack>
                  <Stack direction="row" alignItems="center" justifyContent="center" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                    <Typography variant="h5">Sort by Rank: </Typography>
                    <Button
                      id="demo-positioned-button-rank"
                      aria-controls="demo-positioned-menu-rank"
                      aria-haspopup="true"
                      aria-expanded={openSortRank ? 'true' : undefined}
                      onClick={handleClickListItemRank}
                      sx={{ color: 'grey.500', fontWeight: 400 }}
                      endIcon={<KeyboardArrowDownIcon />}
                    >
                      {rank.length > 0 && rank[0].name}
                    </Button>
                    <Menu
                      id="demo-positioned-menu-rank"
                      aria-labelledby="demo-positioned-button-rank"
                      anchorEl={anchorElRank}
                      open={openSort}
                      onClose={handleSortStatusCloseRank}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                    >
                      {rank.map((rankk: RankType, index: number) => (
                        <MenuItem
                          sx={{ p: 1.5 }}
                          key={index}
                          selected={rankk.id === filter.rank_id}
                          onClick={(event) => handleMenuItemClickRank(event, rankk.id)}
                        >
                          {rankk.name}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
            <Tooltip title="Add">
              <Fab
                color="primary"
                size="small"
                onClick={addQuestion}
                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
              >
                <AddIcon fontSize="small" />
              </Fab>
            </Tooltip>
          </Grid>
        </Grid>
      }
      content={false}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>#</TableCell>
              <TableCell>Question Content</TableCell>
              <TableCell>Rank</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Language</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center" sx={{ pr: 3 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ '& th,& td': { whiteSpace: 'nowrap' } }}>
            {data && data.map((question, index) => <Question key={question.id} question={question} index={index} />)}
          </TableBody>
        </Table>
        <AddQuestion open={openDrawer} handleDrawerOpen={handleDrawerOpen} />
      </TableContainer>
      <Grid item xs={12} sx={{ p: 3 }}>
        <Grid container justifyContent="space-between" spacing={gridSpacing}>
          <Grid item>
            <Pagination count={questionState.pageCount} page={questionState.currentPage} onChange={handleChange} color="primary" />
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Questions;
