// THIRD-PARTY
import { Link, Stack, Typography } from '@mui/material';

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="subtitle2" component={Link} href="https://beetsoft.com.vn" target="_blank" underline="hover">
      beetsoft.com.vn
    </Typography>
    <Typography variant="subtitle2" component={Link} href="https://beetsoft.com.vn" target="_blank" underline="hover">
      &copy; beetsoft.com.vn
    </Typography>
  </Stack>
);

export default AuthFooter;
