// THIRD-PARTY
import { useTheme } from '@mui/material/styles';
import { Avatar, Box } from '@mui/material';
import { IconMenu2 } from '@tabler/icons';

// PROJECT IMPORTS
import LocalizationSection from 'layout/MainLayout/Header/LocalizationSection';
import { useDispatch, useSelector } from 'store';
import { openDrawer } from 'store/slices/menu';
import UserAvatar from 'layout/MainLayout/Header/UserAvatar';
import LogoSection from 'layout/MainLayout/LogoSection';

const Header = () => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const { drawerOpen } = useSelector((state) => state.menu);
  return (
    <>
      <Box
        sx={{
          width: 150,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          }
        }}
      >
        <Avatar
          variant="rounded"
          sx={{
            ...theme.typography.commonAvatar,
            ...theme.typography.mediumAvatar,
            overflow: 'hidden',
            transition: 'all .2s ease-in-out',
            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
            color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
            '&:hover': {
              background: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
              color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.light
            }
          }}
          onClick={() => dispatch(openDrawer(!drawerOpen))}
          color="inherit"
        >
          <IconMenu2 stroke={1.5} size="1.3rem" />
        </Avatar>
      </Box>
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
        <LogoSection />
      </Box>
      <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', width: 150, justifyContent: 'flex-end' }}>
        <LocalizationSection />
        <UserAvatar />
      </Box>
      <Box
        sx={{
          width: 150,
          display: { xs: 'flex', sm: 'none' },
          [theme.breakpoints.down('md')]: {
            width: 34
          }
        }}
      />
    </>
  );
};

export default Header;
