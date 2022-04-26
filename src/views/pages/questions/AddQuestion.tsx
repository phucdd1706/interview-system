// THIRD-PARTY
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
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { gridSpacing } from 'store/constant';
import { PostQuestion } from 'store/slices/question';
import { QuestionType, SelectProps } from 'types/question';
import { openSnackbar } from 'store/slices/snackbar';
import { useDispatch } from 'store';
import RankSelect from 'components/Common/RankSelect';
import LanguageSelect from 'components/Common/LanguageSelect';
import DepartmentSelect from 'components/Common/DepartmentSelect';
import { useState } from 'react';

interface AddQuestionProps {
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

const validationSchema = Yup.object({
  rank_id: Yup.string().required('Rank is required'),
  department_id: Yup.string().required('Department is required'),
  language_id: Yup.string().required('Language is required'),
  question_content: Yup.string().required('Question content is required'),
  type: Yup.string().required('Question type is required')
});

const AddQuestion = ({ open, handleDrawerOpen }: AddQuestionProps) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<any>({});

  const changeModal = (type: string) => {
    if (type === 'close') {
      handleDrawerOpen();
      setErrors({});
      formik.resetForm();
    }
  };
  const AddQuest = (values: QuestionType) => {
    dispatch(
      PostQuestion({
        params: values,
        callback: (response) => {
          if (response?.data?.success) {
            dispatch(
              openSnackbar({
                open: true,
                message: 'Add new question successfully!',
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
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      rank_id: '',
      department_id: '',
      language_id: '',
      question_content: '',
      type: '',
      status: 1
    },
    validationSchema,
    onSubmit: (values) => {
      AddQuest(values);
    }
  });
  return (
    <Dialog
      open={open}
      onClose={() => {
        changeModal('close');
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
                    Add Question
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
                  </Grid>
                  <Grid item xs={12}>
                    <DepartmentSelect
                      fullWidth
                      size="medium"
                      change={formik.handleChange}
                      values={formik.values?.department_id}
                      formik={formik}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <LanguageSelect
                      fullWidth
                      size="medium"
                      change={formik.handleChange}
                      values={formik.values?.language_id}
                      formik={formik}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        id="question_content"
                        size="medium"
                        name="question_content"
                        label={
                          <span>
                            <span style={{ color: 'red' }}>*</span> Question content
                          </span>
                        }
                        error={
                          (formik && formik.touched.question_content && Boolean(formik.errors.question_content)) || errors.question_content
                        }
                        value={formik.values.question_content}
                        onChange={formik.handleChange}
                      />
                      {(formik.touched.question_content && formik.errors.question_content && (
                        <FormHelperText error id="standard-weight-helper-text-rank-login">
                          {formik.errors.question_content}
                        </FormHelperText>
                      )) ||
                        errors.question_content}
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
                        size="medium"
                        name="type"
                        value={formik.values.type}
                        label={
                          <span>
                            <span style={{ color: 'red' }}>*</span> Type
                          </span>
                        }
                        onChange={formik.handleChange}
                        inputProps={{ 'aria-label': 'Without label' }}
                        error={formik.touched.type && Boolean(formik.errors.type)}
                      >
                        {Type.map((typee: SelectProps, index: number) => (
                          <MenuItem key={index} value={typee.value}>
                            {typee.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {formik.touched.type && formik.errors.type && (
                        <FormHelperText error id="standard-weight-helper-text-rank-login">
                          {formik.errors.type}
                        </FormHelperText>
                      )}
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

export default AddQuestion;
