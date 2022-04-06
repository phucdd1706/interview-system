import React from 'react';
import { Button, Grid, InputLabel, TextField, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { HiPlus } from 'react-icons/hi';
import { DataGrid } from '@mui/x-data-grid';

const DanhSachAdmin = () => {
  const columns = [
    { field: 'id', headerName: 'Stt', width: 70 },
    { field: 'name', headerName: 'Họ tên', width: 150 },
    { field: 'bod', headerName: 'Phòng ban quản lý', width: 190 },
    {
      field: 'phone',
      headerName: 'Số điện thoại',
      width: 180
    },
    {
      field: 'email',
      headerName: 'Email',
      sortable: true,
      width: 190
    },
    {
      field: 'gender',
      headerName: 'Giới tính',
      sortable: true,
      width: 140
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      sortable: true,
      width: 150
    }
  ];

  const rows = [
    {
      id: 1,
      name: 'Trần Thanh Sơn',
      bod: 'Phòng công nghệ',
      phone: '0973513454',
      email: 'tuna123@gmail.com',
      gender: 'nam',
      status: 'active'
    },
    {
      id: 2,
      name: 'Nguyễn Phúc Tuấn',
      bod: 'Phòng kế toán',
      phone: '07343456667',
      email: 'hello@gmail.com',
      gender: 'nam',
      status: 'active'
    },
    {
      id: 3,
      name: 'Đỗ Thanh Hiếu',
      bod: 'Phòng nhân viên',
      phone: '0745423423',
      email: 'hiloo@gmail.com',
      gender: 'nam',
      status: 'active'
    },
    {
      id: 4,
      name: 'Lê Quý Đạt',
      bod: 'Phòng giám đốc',
      phone: '0675675677',
      email: 'tuna12233@gmail.com',
      gender: 'nam',
      status: 'active'
    },
    {
      id: 5,
      name: 'Mai Văn Nam',
      bod: 'Phòng marketing',
      phone: '0975675677',
      email: 'tuna123@gmail.com',
      gender: 'nam',
      status: 'active'
    },
    { id: 6, name: 'Đỗ Đình Phúc', bod: 'Phòng D1', phone: '091676445', email: 'tuna123@gmail.com', gender: 'nam', status: 'active' },
    { id: 7, name: 'Hà Minh Long', bod: 'Phòng Faster', phone: '0302342233', email: 'tuna123@gmail.com', gender: 'nam', status: 'active' },
    {
      id: 8,
      name: 'Nguyễn Đình Minh',
      bod: 'Phòng triển lãm',
      phone: '0332342346',
      email: 'tuna123@gmail.com',
      gender: 'nam',
      status: 'active'
    },
    { id: 9, name: 'Nguyễn Tuna', bod: 'Phòng nhân sự', phone: '0336532566', email: 'tuna123@gmail.com', gender: 'nam', status: 'active' }
  ];
  return (
    <>
      <MainCard
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h2">Quản lý Admin</Typography>
            <Button variant="contained" size="medium" startIcon={<HiPlus className="mr-1 mb-1" />}>
              Thêm mới
            </Button>
          </div>
        }
      >
        <Grid container spacing={3}>
          <Grid item xs={6} sm={4}>
            <InputLabel style={{ color: 'black' }}>Tên quản lý</InputLabel>
            <TextField name="firstName" fullWidth autoFocus size="small" />
          </Grid>
          <Grid item xs={6} sm={4}>
            <InputLabel style={{ color: 'black' }}>Phòng ban quản lý</InputLabel>
            <TextField name="firstName" fullWidth autoFocus size="small" />
          </Grid>
          <Grid item xs={6} sm={4}>
            <InputLabel style={{ color: 'black' }}>Trạng thái</InputLabel>
            <TextField name="firstName" fullWidth autoFocus size="small" />
          </Grid>
        </Grid>
        <div style={{ marginTop: '20px', border: '1px solid #ddd', height: 400, width: 'auto' }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection />
        </div>
      </MainCard>
    </>
  );
};

export default DanhSachAdmin;
