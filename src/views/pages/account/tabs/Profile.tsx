// THIRD-PARTY
import React, { useEffect } from 'react';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';

// PROJECT IMPORTS
// import useAuth from 'hooks/useAuth';
import User from 'assets/images/users/user-round.svg';
import MainCard from 'ui-component/cards/MainCard';
import ProfileEdit from './ProfileEdit';
import { useDispatch, useSelector } from 'store';
import { getProfile } from 'store/slices/profile';

export default function Profile() {
  const theme = useTheme();
  // const { user } = useAuth();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.userProfile);

  const getUserProfile = async () => {
    await dispatch(getProfile());
  };

  useEffect(() => {
    getUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const handleDialogOpen = () => {
    setOpenDialog((prevState: any) => !prevState);
  };

  const userStr: string = user?.dob!;
  const d = userStr ? new Date(userStr) : 'N/A';
  const dobLocale = (d !== 'N/A' && d.toLocaleDateString()) || d;

  const [displayGender, setDisplayGender] = React.useState<string>('');
  useEffect(() => {
    switch (user?.gender) {
      case 'male':
        setDisplayGender('Male');
        break;
      case 'female':
        setDisplayGender('Female');
        break;
      default:
        setDisplayGender('N/A');
        break;
    }
  }, [user?.gender]);

  return (
    <Box>
      <Grid container justifyContent="center" spacing={2} sx={{ minHeight: '100vh' }}>
        <Grid item xs={12} lg={4}>
          <MainCard>
            <CardHeader
              avatar={
                <Avatar
                  src={User}
                  sx={{
                    ...theme.typography.largeAvatar,
                    cursor: 'pointer'
                  }}
                  aria-haspopup="true"
                  color="inherit"
                />
              }
              title={user?.name}
              subheader={user?.type === 1 ? 'Administrator' : 'User'}
              sx={{
                borderBottom: '1px solid',
                borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary[200] + 75,
                ':hover': {
                  boxShadow: theme.palette.mode === 'dark' ? '0 2px 14px 0 rgb(33 150 243 / 10%)' : '0 2px 14px 0 rgb(32 40 45 / 8%)'
                }
              }}
            />
            <CardContent>
              <List>
                <ListItemButton>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="h5">Username</Typography>
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <Typography>{user?.username}</Typography>
                  </ListItemSecondaryAction>
                </ListItemButton>
                <Divider />
                <ListItemButton>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="h5">Email</Typography>
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <Typography>{user?.email === null ? 'N/A' : user?.email}</Typography>
                  </ListItemSecondaryAction>
                </ListItemButton>
                <Divider />
                <ListItemButton>
                  <ListItemIcon>
                    <PhoneIphoneIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="h5">Phone Number</Typography>
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <Typography>{user?.phone === null ? 'N/A' : user?.phone}</Typography>
                  </ListItemSecondaryAction>
                </ListItemButton>
              </List>
            </CardContent>
          </MainCard>
        </Grid>
        <Grid item xs={12} lg={8}>
          <MainCard>
            <CardHeader
              title="Personal Details"
              action={
                <Button onClick={handleDialogOpen}>
                  <EditIcon />
                </Button>
              }
              sx={{
                borderBottom: '1px solid',
                borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary[200] + 75,
                ':hover': {
                  boxShadow: theme.palette.mode === 'dark' ? '0 2px 14px 0 rgb(33 150 243 / 10%)' : '0 2px 14px 0 rgb(32 40 45 / 8%)'
                }
              }}
            />
            <CardContent>
              <TableContainer component={Card}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell variant="head">Full Name</TableCell>
                      <TableCell variant="body">{user?.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head">Phone</TableCell>
                      <TableCell variant="body">{user?.phone === null ? 'N/A' : user?.phone}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head">Date Of Birth</TableCell>
                      <TableCell variant="body">{dobLocale}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head">Gender</TableCell>
                      <TableCell variant="body">{displayGender}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head">Position</TableCell>
                      <TableCell variant="body">{user?.type === 1 ? 'Administrator' : 'User'}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <ProfileEdit open={openDialog} handleDialogOpen={handleDialogOpen} getUserProfile={getUserProfile} user={user} />
              </TableContainer>
            </CardContent>
          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
}
