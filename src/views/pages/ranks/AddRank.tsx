// THIRD-PARTY
import { Box, Button, Dialog, DialogContent, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// PROJECT IMPORTS
import AnimateButton from 'ui-component/extended/AnimateButton';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { gridSpacing } from 'store/constant';
import { getRanksList, PostRank } from 'store/slices/rank';
import { openSnackbar } from 'store/slices/snackbar';
import { RankFilter, RankType } from 'types/rank';
import { useDispatch } from 'store';
import { useState } from 'react';

interface AddRankProps {
  open: boolean;
  filter: RankFilter;
  handleDrawerOpen: () => void;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  description: Yup.string().max(255, 'content is too long, must be lower than 256 character').required('Description is required')
});

const AddRank = ({ open, handleDrawerOpen, filter }: AddRankProps) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<any>({});
  const Notification = (color: string, message: string) => {
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
      handleDrawerOpen();
      setErrors({});
      formik.resetForm();
    }
  };
  const AddRankFunc = (values: RankType) => {
    dispatch(
      PostRank({
        params: values,
        callback: (response) => {
          if (response?.data?.success) {
            dispatch(getRanksList(filter));
            Notification('success', 'Add new rank successfully');
            changeModal('close');
          } else {
            Notification('error', response?.message);
            setErrors(response?.errors);
          }
        }
      })
    );
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      description: '',
      type: 2
    },
    validationSchema,
    onSubmit: (values) => {
      AddRankFunc(values);
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
              <Grid item sx={{ width: '100%' }}>
                <Stack direction="row" spacing={0.5} alignItems="center">
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
                  <Button
                    variant="text"
                    color="error"
                    sx={{ p: 0.5, minWidth: 32, display: { xs: 'block', md: 'none' } }}
                    onClick={handleDrawerOpen}
                  >
                    <HighlightOffIcon />
                  </Button>
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
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      label="Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={(formik.touched.name && Boolean(formik.errors.name)) || errors.name}
                      helperText={(formik.touched.name && formik.errors.name) || errors.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="description"
                      name="description"
                      label="Description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      error={(formik.touched.description && Boolean(formik.errors.description)) || errors.description}
                      helperText={(formik.touched.description && formik.errors.description) || errors.description}
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

export default AddRank;
