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
  FormHelperText,
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
import { dispatch, RootState, useSelector } from 'store';
import { QuestionType, SelectProps } from 'types/question';
import { openSnackbar } from 'store/slices/snackbar';
import { PutQuestion } from 'store/slices/question';
import RankSelect from 'ui-component/CommonSelect/RankSelect';
import LanguageSelect from 'ui-component/CommonSelect/LanguageSelect';
import DepartmentSelect from 'ui-component/CommonSelect/DepartmentSelect';
import { useState } from 'react';

interface EditQuestionProps {
  question: QuestionType;
  open: boolean;
  indexId: number;
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

const EditQuestion = ({ question, open, handleDrawerOpen, indexId }: EditQuestionProps) => {
  const [errors, setErrors] = useState<any>({});
  const changeModal = (type: string) => {
    if (type === 'close') {
      handleDrawerOpen();
      setErrors({});
      formik.resetForm();
    }
  };
  const EditQuestionFunc = (values: QuestionType) => {
    dispatch(
      PutQuestion({
        id: values.id,
        params: values,
        callback: (response) => {
          if (response?.data?.success) {
            dispatch(
              openSnackbar({
                open: true,
                message: 'Edit record successfully!',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alert: {
                  color: 'success'
                },
                close: true
              })
            );
            changeModal('close');
          } else {
            dispatch(
              openSnackbar({
                open: true,
                message: response?.message,
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alert: {
                  color: 'error'
                },
                close: true
              })
            );
            setErrors(response?.errors);
          }
        }
      })
    );
  };
  const questionState = useSelector((state: RootState) => state.question);
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
      EditQuestionFunc(values);
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
                    {`Edit "Question ${20 * (questionState.currentPage - 1) + indexId + 1}"`}
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
                    <RankSelect fullWidth size="medium" change={formik.handleChange} values={formik.values?.rank_id} formik={formik} />
                    {formik.touched.rank_id && formik.errors.rank_id && (
                      <FormHelperText error id="standard-weight-helper-text-rank-login">
                        {formik.errors.rank_id}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <DepartmentSelect
                      fullWidth
                      size="medium"
                      change={formik.handleChange}
                      values={formik.values?.department_id}
                      formik={formik}
                    />
                    {formik.touched.department_id && formik.errors.department_id && (
                      <FormHelperText error id="standard-weight-helper-text-rank-login">
                        {formik.errors.department_id}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <LanguageSelect
                      fullWidth
                      size="medium"
                      change={formik.handleChange}
                      values={formik.values?.language_id}
                      formik={formik}
                    />
                    {formik.touched.language_id && formik.errors.language_id && (
                      <FormHelperText error id="standard-weight-helper-text-rank-login">
                        {formik.errors.language_id}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        id="question_content"
                        name="question_content"
                        label={
                          <span>
                            <span style={{ color: 'red' }}>*</span> Question content
                          </span>
                        }
                        value={formik.values.question_content}
                        error={
                          (formik && formik.touched.question_content && Boolean(formik.errors.question_content)) || errors.question_content
                        }
                        helperText={(formik.touched.question_content && formik.errors.question_content) || errors.question_content}
                        onChange={formik.handleChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        <span style={{ color: formik && formik.touched.type && Boolean(formik.errors.type) ? '#f44336' : '' }}>
                          <span style={{ color: '#f44336' }}>*</span> Type
                        </span>
                      </InputLabel>
                      <Select
                        id="type"
                        name="type"
                        label={
                          <span>
                            <span style={{ color: 'red' }}>*</span> Type
                          </span>
                        }
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
                      <InputLabel id="demo-simple-select-label">
                        <span style={{ color: formik && formik.touched.status && Boolean(formik.errors.status) ? '#f44336' : '' }}>
                          <span style={{ color: '#f44336' }}>*</span> Status
                        </span>
                      </InputLabel>
                      <Select
                        id="status"
                        name="status"
                        label={
                          <span>
                            <span style={{ color: 'red' }}>*</span> Status
                          </span>
                        }
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
