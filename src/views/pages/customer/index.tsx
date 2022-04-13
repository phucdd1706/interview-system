// THIRD-PARTY
import React from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// PROJECT IMPORTS
import Customer from 'views/pages/customer/Customer';
import MainCard from 'ui-component/cards/MainCard';
import { getCustomerList } from 'store/slices/customer';
import { useDispatch, useSelector } from 'store';
import { UserProfile } from 'types/user-profile';

const Customers = () => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState<UserProfile[]>([]);
  const { customers } = useSelector((state) => state.customer);

  React.useEffect(() => {
    setData(customers);
  }, [customers]);

  React.useEffect(() => {
    dispatch(getCustomerList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainCard
      title={
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} />
        </Grid>
      }
      content={false}
    >
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
              <TableCell>Updated</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center" sx={{ pr: 3 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ '& th,& td': { whiteSpace: 'nowrap' } }}>
            {data && data.map((customer, index) => <Customer key={customer.id} customer={customer} index={index} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
};

export default Customers;
