// THIRD PARTY
import { useEffect, useState } from 'react';
import { Box, Typography, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';

// IMPORT PROJECT
import { gridSpacing } from 'store/constant';
import { Candidates } from 'types/history';
import Profile from 'assets/images/logo/profile.jpg';
import ProfileFemale from 'assets/images/logo/profile-female.png';

interface Props {
  dataCandidate: Candidates;
}

const CandidateInformation = ({ dataCandidate }: Props) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [numberRandom, setNumberRandom] = useState(0);
  useEffect(() => {
    setNumberRandom(Math.floor(Math.random() * 100));
  }, []);

  return (
    <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
      {!matchDownSM && (
        <Grid item xs={2} md={3} xl={2}>
          <Box sx={{ border: '1px solid #000', m: 1, ml: 0, width: '80%', height: '100%' }}>
            <img
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              src={numberRandom % 2 === 0 ? ProfileFemale : Profile}
              alt="profile"
            />
          </Box>
        </Grid>
      )}
      <Grid item xs={12} md={9} xl={10}>
        <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
          <Grid item xs={5} sm={2}>
            <Typography variant="h4">Name:</Typography>
          </Grid>
          <Grid item xs={7} sm={4}>
            {dataCandidate?.name}
          </Grid>
          <Grid item xs={5} sm={2}>
            <Typography variant="h4">Age:</Typography>
          </Grid>
          <Grid item xs={7} sm={4}>
            {dataCandidate?.age}
          </Grid>
        </Grid>

        <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
          <Grid item xs={5} sm={2}>
            <Typography variant="h4">Email:</Typography>
          </Grid>
          <Grid item xs={7} sm={4}>
            {dataCandidate?.email}
          </Grid>
          <Grid item xs={5} sm={2}>
            <Typography variant="h4">Phone:</Typography>
          </Grid>
          <Grid item xs={7} sm={4}>
            {dataCandidate?.phone}
          </Grid>
        </Grid>

        <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
          <Grid item xs={5} sm={2}>
            <Typography variant="h4">Interview Time:</Typography>
          </Grid>
          <Grid item xs={7} sm={10}>
            {moment(dataCandidate?.time).format('DD/MM/YYYY HH:mm')}
          </Grid>
        </Grid>

        <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
          <Grid item xs={5} sm={2}>
            <Typography variant="h4">Address:</Typography>
          </Grid>
          <Grid item xs={7} sm={10}>
            {dataCandidate?.address}
          </Grid>
        </Grid>

        <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
          <Grid item xs={5} sm={2}>
            <Typography variant="h4">Note:</Typography>
          </Grid>
          <Grid item xs={7} sm={10} xl={10}>
            {dataCandidate?.note}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CandidateInformation;
