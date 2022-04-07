// THIRD-PARTY
import { IconButton, InputBase, Paper } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridRowId } from '@mui/x-data-grid';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';
// PROJECT IMPORTS
import MainCard from 'ui-component/cards/MainCard';
import Dialog from './dialog';

const initrows = [
  { id: 1, rank: 'Interner' },
  { id: 2, rank: 'Fresher' },
  { id: 3, rank: 'Junior' },
  { id: 4, rank: 'Senior' }
];

export default function DashboardPage() {
  const [rows, setRows] = React.useState(initrows);
  const deleteRow = React.useCallback(
    (id: GridRowId) => () => {
      setTimeout(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      });
    },
    []
  );
  const editRow = React.useCallback(
    (id: GridRowId) => () => {
      setTimeout(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      });
    },
    []
  );

  // Create a new rank fucn

  // let idCounter = 0;
  // const createRow = () => {
  //   idCounter = rows.length;
  //   return { id: idCounter + 1, rank: 'new rank' };
  // };
  // const addRow = () => {
  //   setRows((prevRows) => [...prevRows, createRow()]);
  // };

  // end

  const columns = React.useMemo(
    () => [
      { field: 'rank', headerName: 'Rank', type: 'string', width: 220 },
      {
        headerName: 'Actions',
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params: { id: GridRowId }) => [
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={deleteRow(params.id)} />,
          <GridActionsCellItem icon={<EditIcon />} onClick={editRow(params.id)} label="Edit" />
        ]
      }
    ],
    [deleteRow, editRow]
  );

  return (
    <MainCard title="Rank Management">
      <div style={{ height: 500, width: '100%', margin: '2pt' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <Dialog />
          <Paper component="form" sx={{ display: 'flex', mr: 2, width: 400, border: 1 }}>
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search..." inputProps={{ 'aria-label': 'search' }} />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
        <DataGrid
          editMode="row"
          columns={columns}
          rows={rows}
          sx={{
            boxShadow: 1,
            borderColor: 'primary.light',
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main'
            }
          }}
        />
      </div>
    </MainCard>
  );
}
