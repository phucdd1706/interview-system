// THIRD-PARTY
import React from 'react';
import { Grid, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// PROJECT IMPORTS
import Customer from 'views/pages/customer/Customer';
import MainCard from 'ui-component/cards/MainCard';
import { getCustomerList } from 'store/slices/customer';
import { useDispatch, useSelector } from 'store';
import { UserProfile } from 'types/user-profile';
import { gridSpacing } from 'store/constant';

const Customers = () => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState<UserProfile[]>([]);
  const customerState = useSelector((state) => state.customer);

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    console.log(page);
  };

  React.useEffect(() => {
    setData(customerState.customers);
  }, [customerState]);

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
      <Grid item xs={12} sx={{ p: 3 }}>
        <Grid container justifyContent="space-between" spacing={gridSpacing}>
          <Grid item>
            <Pagination count={customerState.pageCount} page={customerState.currentPage} onChange={handleChange} color="primary" />
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Customers;
