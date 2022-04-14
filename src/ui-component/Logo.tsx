// THIRD-PARTY
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import BeetsoftLogo from 'assets/images/logo/beetsoft.png';

const Logo = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ marginLeft: 5 }}>
      <img src={BeetsoftLogo} alt="Beetsoft" style={{ marginRight: matchDownSM ? 8 : 16, height: '54px' }} />
    </Box>
  );
};

export default Logo;
