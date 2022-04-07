// PROJECT IMPORTS
import MainCard from 'ui-component/cards/MainCard';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Input } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import './listUser.css';
import { useEffect, useState } from 'react';
import axiosServices from 'utils/axios';

const ListUser = () => {
  const [user, setUser] = useState([]);

  const accessToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMmZlYzZmNjJkZDdhMDI1MWUwYzcwNWMyY2RhODUxZDA5NDU0ZjkxZDNjOWYyYzQxNjI0ZWEwNzVhNTFkMjg4YmI0MTA2OTQzYTVjYzFjZTAiLCJpYXQiOjE2NDkyOTU0NDAuMjE5ODgxLCJuYmYiOjE2NDkyOTU0NDAuMjE5ODg1LCJleHAiOjE2ODA4MzE0NDAuMjE3NDI0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.W7gjZQoxi6XBAo8amN8m22Fl7ZcbACZs1QyRydmrK2NMh9yHkoIvjpLncp_m6-ZekXzxc3lnEqnYiknhcAU_qO5O_Ie9PkYM2sdkFNGQR7ZHFJ59AJC3z6XiE5A4cr4VoS2U6qVqW_BIh7_mzvUaX1yVJu_PI1SIIAgbiDNyWCNumB-b6MDn6f_0NSUDOLGnGTTKdqPlUzrSZi_ZJ6212TuKLv0bPshcbYG6FbZUhbKJiMrZmUQIZbeavfd_fgr02BUAyMNza0l8CkPdGoKgcFtrY8r7VFQNSFAwv5-apsaXlTt_LALjoQumjBTjEGbCpESj_4gfDBojP0-yYH2MwacdQVkMBTnC5AGQP2j2_1WcTOKH3Vp25SHO5VMS4ERRq4MJ-nYOlqJPxDiEznZRSr6RuBWaKTjItC4oejYvwpYYl49nD2T9GsV9G7tANUrh8v6FVHU402Gn4DFagV7bKudFm7VTaLgZ1i6iCQ020JzVHAiUpekXWJDf1qECbu_I6iNTCd4QnT2aHruGWIxEBII58pgddsc0rZ18Z1JflQWUJlzaA7DePKuTkdoGfBqIG2MGMrAz1Yd6mq84B39EG5JNldPUkSQdMG-i44S7DazVB0RYb9aFLgH_fSr35_lqSkYAPw-sxRpq01lozJ70k9YPycNIc0XldeSDI1vJEoM';
  const fetchUser = async () => {
    const res = await axiosServices.get(`${process.env.REACT_APP_API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    console.log(res.data.success.data);
    setUser(res.data.success.data);
  };
  const handleDelete = (id: number) => {
    console.log(id);
    //axiosServices.delete(`${process.env.REACT_APP_API_URL}/users/${id}`);

    //window.location.reload();
  };
  console.log(process.env.REACT_APP_API_URL);
  useEffect(() => {
    fetchUser();
  }, []);
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 20 },
    { field: 'name', headerName: 'Name', width: 100 },
    { field: 'username', headerName: 'User Name', width: 100 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 130 },
    { field: 'dob', headerName: 'Date Of Birth', width: 70 },
    { field: 'gender', headerName: 'Gender', width: 30 },
    { field: 'type', headerName: 'Gender', sortable: false, width: 20 },
    { field: 'status', headerName: 'Status', width: 20 },
    { field: 'created_at', headerName: 'Create at', width: 70 },
    { field: 'updated_at', headerName: 'Updated at', width: 70 },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 160,
      renderCell: (param: any) => (
        <>
          <Link to={`/user/${param.row.id}`}>
            <Button className="btn btnEdit" variant="outlined" color="info">
              Edit
            </Button>
          </Link>
          <Button className="btn btnDel" variant="outlined" color="error" onClick={() => handleDelete(param.user.id)}>
            Delete
          </Button>
        </>
      )
    }
  ];

  return (
    <MainCard title="User">
      <h3>Quản lý User</h3>
      <div>
        <Input
          placeholder="Find user by name or id"
          style={{
            margin: '1rem'
          }}
        />
        <Button
          variant="outlined"
          color="primary"
          style={{
            marginLeft: '1rem'
          }}
        >
          Add
        </Button>
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={user} disableSelectionOnClick columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection />
      </div>
    </MainCard>
  );
};

export default ListUser;
