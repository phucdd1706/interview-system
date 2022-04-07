import React, { useEffect, useState } from 'react';
import { Button, Grid, InputLabel, Select, TextField, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

import { QLAdmin } from 'types/manage-admin';
import QLAdminService, { AdminParams } from 'contexts/admin';
import ThemMoiAdmin from '../add-admin';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import DetailAdmin from '../detail-admin';
import AddIcon from '@mui/icons-material/Add';

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
      width: 100
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      width: 100,
      cellClassName: 'actions',
      getActions: () => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          color="inherit"
          onClick={() => showDialogEditAdmin()}
        />,
        <GridActionsCellItem icon={<DeleteIcon />} label="Delete" color="inherit" />
      ]
    }
  ];

  const [open, setOpen] = useState<boolean>(false);
  const [dialog, setDialog] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [status, setStatus] = useState<number>();

  const [dsAdmin, setDsAdmin] = useState<QLAdmin[]>([]);
  const showDialogAdmin = () => {
    setOpen(true);
  };
  const showDialogEditAdmin = () => {
    setDialog(true);
  };

  const getDsAdmin = async () => {
    try {
      const params: AdminParams = {
        search,
        status
      };
      const resp = await QLAdminService.getDsAdmin(params);
      console.log(12222, resp);

      setDsAdmin(resp?.data?.success?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDsAdmin();
  }, []);
  useEffect(() => {
    getDsAdmin();
  }, [status, search]);
  return (
    <>
      <MainCard
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h2">Quản lý Admin</Typography>
            <Button variant="contained" size="medium" startIcon={<AddIcon className="mr-1 mb-1" />} onClick={() => showDialogAdmin()}>
              Thêm mới
            </Button>
          </div>
        }
      >
        <Grid container spacing={3}>
          <Grid item xs={6} sm={4}>
            <InputLabel style={{ color: 'black' }}>Tên quản lý</InputLabel>
            <TextField name="name" fullWidth autoFocus size="small" onChange={(e) => setSearch(e.target.value)} />
          </Grid>
          <Grid item xs={6} sm={4}>
            <InputLabel style={{ color: 'black' }}>Phòng ban quản lý</InputLabel>
            <TextField name="management" fullWidth autoFocus size="small" />
          </Grid>
          <Grid item xs={6} sm={4}>
            <InputLabel style={{ color: 'black' }}>Trạng thái</InputLabel>
            <Select
              name="status"
              fullWidth
              autoFocus
              size="small"
              // onChange={(value: StatusAdmin) => setStatus(value)}
              // options={StatusOptionsAdmin.map((stt) => ({
              //   label: stt.label,
              //   value: stt.value
              // }))}
            />
          </Grid>
        </Grid>
        <div style={{ marginTop: '20px', border: '1px solid #ddd', height: 400, width: 'auto' }}>
          <DataGrid rows={dsAdmin} columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection />
        </div>
      </MainCard>
      <ThemMoiAdmin open={open} setOpen={setOpen} />
      <DetailAdmin dialog={dialog} setDialog={setDialog} />
    </>
  );
};

export default DanhSachAdmin;
