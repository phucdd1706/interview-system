// THIRD-PARTY
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import moment from 'moment';
import React from 'react';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import { Chip, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TablePagination from '@mui/material/TablePagination';

// PROJECT IMPORTS
import { getAdministratorList } from 'store/slices/user';
import { useDispatch, useSelector } from 'store';
import { UserProfile } from 'types/user-profile';

const AdministratorList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const [data, setData] = React.useState<UserProfile[]>([]);
  const { users } = useSelector((state) => state.user);
  React.useEffect(() => {
    setData(users);
  }, [users]);

  React.useEffect(() => {
    dispatch(getAdministratorList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center" sx={{ pr: 3 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row, index) => (
                <TableRow hover key={index}>
                  <TableCell sx={{ pl: 3 }}>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.dob ?? 'N/A'}</TableCell>
                  <TableCell>{row.gender ?? 'N/A'}</TableCell>
                  <TableCell>{moment(row.created_at).format('DD/MM/YYYY HH:mm')}</TableCell>
                  <TableCell>
                    {row.status === 1 && (
                      <Chip
                        label="Inactive"
                        size="small"
                        sx={{
                          background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.warning.light,
                          color: theme.palette.warning.dark
                        }}
                      />
                    )}
                    {row.status === 2 && (
                      <Chip
                        label="Active"
                        size="small"
                        sx={{
                          background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.success.light + 60,
                          color: theme.palette.success.dark
                        }}
                      />
                    )}
                    {row.status === 3 && (
                      <Chip
                        label="Blocked"
                        size="small"
                        sx={{
                          background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.orange.light + 80,
                          color: theme.palette.orange.dark
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell align="center" sx={{ pr: 3 }}>
                    <IconButton color="primary" size="large">
                      <VisibilityTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                    </IconButton>
                    <IconButton color="secondary" size="large">
                      <EditTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                    </IconButton>
                    <IconButton color="error" size="large">
                      <DeleteTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[1, 2, 3]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default AdministratorList;
