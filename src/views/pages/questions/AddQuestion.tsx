// THIRD-PARTY
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';

// PROJECT IMPORTS
import AnimateButton from 'ui-component/extended/AnimateButton';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { gridSpacing } from 'store/constant';
import { PostQuestion } from 'store/slices/question';
import { SelectProps } from 'types/question';
import { openSnackbar } from 'store/slices/snackbar';
import { useDispatch, useSelector } from 'store';
import { getRanksList } from 'store/slices/rank';
import { Department, DepartmentFilter } from 'types/department';
import { getDepartmentList } from 'store/slices/department';
import { RankFilter, RankType } from 'types/rank';
import { Languages, SearchValues } from 'types/language';
import { fetchLanguages } from 'store/slices/language';

interface AddQuestionProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

const validationSchema = Yup.object({
  rankId: Yup.string().required('Rank is required'),
  departmentId: Yup.string().required('Department is required'),
  languageId: Yup.string().required('Language is required'),
  questionContent: Yup.string().required('Question content is required'),
  type: Yup.string().required('Question type is required')
});

const AddQuestion = ({ open, handleDrawerOpen }: AddQuestionProps) => {
  const dispatch = useDispatch();
  // department
  const [department, setDepartment] = React.useState<Department[]>([]);
  const initialState: DepartmentFilter = {
    search: '',
    status: '',
    currentPage: 1,
    limit: 20
  };
  const [filter, setFilter] = useState(initialState);
  const filterData = async () => {
    await dispatch(getDepartmentList(filter));
  };
  const departmentState = useSelector((state) => state.department);
  useEffect(() => {
    setDepartment(departmentState.department);
  }, [departmentState]);
  useEffect(() => {
    filterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
  // department

  // rank
  const [rank, setRank] = React.useState<RankType[]>([]);
  const initialStateRank: RankFilter = {
    search: '',
    status: '',
    currentPage: 1
  };
  const [filterRank, setFilterRank] = useState(initialStateRank);
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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      rank_id: '',
      department_id: '',
      language_id: '',
      question_content: '',
      type: 1,
      status: 1
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(PostQuestion(values));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Submit Success',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: true
        })
      );
      handleDrawerOpen();
      formik.resetForm();
    }
  });

  return (
    <Dialog
      open={open}
      onClose={() => {
        handleDrawerOpen();
        formik.resetForm();
      }}
      sx={{
        '&>div:nth-of-type(3)': {
          '&>div': {
            m: 0,
            borderRadius: '0px',
            width: 850,
            maxWidth: 850,
            maxHeight: '100%'
          }
        }
      }}
    >
      {open && (
        <>
          <Box sx={{ p: 3 }}>
            <Grid container alignItems="center" spacing={0.5} justifyContent="space-between">
              <Grid item sx={{ width: 'calc(100% - 50px)' }}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Button
                    variant="text"
                    color="error"
                    sx={{ p: 0.5, minWidth: 32, display: { xs: 'block', md: 'none' } }}
                    onClick={handleDrawerOpen}
                  >
                    <HighlightOffIcon />
                  </Button>
                  <Typography
                    variant="h4"
                    sx={{
                      display: 'inline-block',
                      width: 'calc(100% - 34px)',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      verticalAlign: 'middle'
                    }}
                  >
                    Add Rank
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <form onSubmit={formik.handleSubmit}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DialogContent>
                <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Rank</InputLabel>
                      <Select
                        id="rank_id"
                        name="rank_id"
                        label="Rank"
                        displayEmpty
                        value={formik.values.rank_id}
                        onChange={formik.handleChange}
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        {rank.map((rankk: RankType, index: number) => (
                          <MenuItem key={index} value={rankk.id}>
                            {rankk.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Department</InputLabel>
                      <Select
                        id="department_id"
                        name="department_id"
                        label="department"
                        displayEmpty
                        value={formik.values.department_id}
                        onChange={formik.handleChange}
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        {department.map((depart: Department, index: number) => (
                          <MenuItem key={index} value={depart.id}>
                            {depart.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Language</InputLabel>
                      <Select
                        id="language_id"
                        name="language_id"
                        label="Language"
                        displayEmpty
                        value={formik.values.language_id}
                        onChange={formik.handleChange}
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        {language.map((lang: Languages, index: number) => (
                          <MenuItem key={index} value={lang.id}>
                            {lang.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="question_content"
                      name="question_content"
                      label="question_content"
                      value={formik.values.question_content}
                      onChange={formik.handleChange}
                      error={formik.touched.question_content && Boolean(formik.errors.question_content)}
                      helperText={formik.touched.question_content && formik.errors.question_content}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="type"
                      name="type"
                      label="type"
                      value={formik.values.type}
                      onChange={formik.handleChange}
                      error={formik.touched.type && Boolean(formik.errors.type)}
                      helperText={formik.touched.type && formik.errors.type}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <AnimateButton>
                      <Button fullWidth variant="contained" type="submit">
                        Save
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </DialogContent>
            </LocalizationProvider>
          </form>
        </>
      )}
    </Dialog>
  );
};

export default AddQuestion;
