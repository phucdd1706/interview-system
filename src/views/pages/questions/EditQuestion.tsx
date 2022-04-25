// THIRD-PARTY
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
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

// PROJECT IMPORTS
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import { dispatch, useSelector } from 'store';
import { QuestionType, SelectProps } from 'types/question';

import { openSnackbar } from 'store/slices/snackbar';
import { PutQuestion } from 'store/slices/question';
import React, { useEffect, useState } from 'react';
import { Department, DepartmentFilter } from 'types/department';
import { getDepartmentList } from 'store/slices/department';
import { RankFilter, RankType } from 'types/rank';
import { getRanksList } from 'store/slices/rank';
import { Languages, SearchValues } from 'types/language';
import { fetchLanguages } from 'store/slices/language';

interface EditQuestionProps {
  question: QuestionType;
  open: boolean;
  handleDrawerOpen: () => void;
}
const Type: SelectProps[] = [
  {
    value: 0,
    label: 'Basic'
  },
  {
    value: 1,
    label: 'Advanced'
  }
];
const Status: SelectProps[] = [
  {
    value: 0,
    label: 'Inactive'
  },
  {
    value: 1,
    label: 'Active'
  }
];

const validationSchema = Yup.object({
  rank_id: Yup.string().required('Rank is required'),
  department_id: Yup.string().required('Department is required'),
  language_id: Yup.string().required('Language is required'),
  question_content: Yup.string().required('Question content is required'),
  type: Yup.string().required('Question type is required'),
  status: Yup.string().required('Question status is required')
});

const EditQuestion = ({ question, open, handleDrawerOpen }: EditQuestionProps) => {
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
    // await dispatch(getRanksList(filterRank));
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
    // await dispatch(fetchLanguages({ params: { filterLanguage } }));
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
      id: question.id,
      rank_id: question.rank_id,
      department_id: question.department_id,
      language_id: question.language_id,
      question_content: question.question_content,
      type: question.type,
      status: question.status
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(PutQuestion(values));
      dispatch(
        openSnackbar({
          open: true,
          message: 'Updated successfully!',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: true
        })
      );
      handleDrawerOpen();
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
                    {`Edit "${question.id}"`}
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
                    <FormControl fullWidth>
                      <InputLabel>Type</InputLabel>
                      <Select
                        id="type"
                        name="type"
                        label="Type"
                        displayEmpty
                        value={formik.values.type}
                        onChange={formik.handleChange}
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        {Type.map((typee: SelectProps, index: number) => (
                          <MenuItem key={index} value={typee.value}>
                            {typee.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        id="status"
                        name="status"
                        label="Status"
                        displayEmpty
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        {Status.map((status: SelectProps, index: number) => (
                          <MenuItem key={index} value={status.value}>
                            {status.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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

export default EditQuestion;
