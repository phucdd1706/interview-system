// THIRD-PARTY
import React, { useState, useEffect } from 'react';
import { Button, Typography, Menu, MenuItem, Stack } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// PROJECT IMPORTS
import { useDispatch } from 'store/index';
import { Department } from 'types/department';
import { getDepartmentsAll } from 'store/slices/department';

const DepartmentFilters = (props: any) => {
  const { filters, handleDepartmentClick, anchorElDepartment, handleDepartment, handleCloseDepartment } = props;
  const dispatch = useDispatch();
  const [dataDepartment, setDataDepartment] = useState<Department[]>([]);

  const openDepartment = Boolean(anchorElDepartment);
  useEffect(() => {
    dispatch(
      getDepartmentsAll({
        callback: (res) => {
          if (res?.data?.success) {
            setDataDepartment([{ id: '', name: 'All' }, ...res?.data?.success]);
          }
        }
      })
    );
  }, []);

  const departmentLabel = dataDepartment?.filter((items) => items.id === filters.department_id);

  return (
    <Stack direction="row" alignItems="center" justifyContent="center" sx={{ display: { xs: 'none', sm: 'flex' } }}>
      <Typography variant="h5" style={{ width: '130px' }}>
        Sort by department:{' '}
      </Typography>
      <Button
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={openDepartment ? 'true' : undefined}
        onClick={handleDepartment}
        sx={{ color: 'grey.500', fontWeight: 400 }}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {departmentLabel?.length > 0 && departmentLabel[0]?.name}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorElDepartment}
        open={openDepartment}
        onClose={handleCloseDepartment}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        sx={{ height: 300 }}
      >
        {dataDepartment?.map((item, index) => (
          <MenuItem sx={{ p: 1.5 }} key={index} selected={item.id === filters.department_id} onClick={() => handleDepartmentClick(item.id)}>
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  );
};

export default DepartmentFilters;
