// THIRD PARTY
import React, { useState, useEffect } from 'react';
import { Select, InputLabel, MenuItem, FormControl } from '@mui/material';

// IMPORT PROJECT
import { Department } from 'types/department';
import { getDepartmentsAll } from 'store/slices/department';
import { useDispatch } from 'store';

const DepartmentSelect = (props: any) => {
  const dispatch = useDispatch();
  const { change, values, size, formik, fullWidth } = props;
  const [data, setData] = useState<Department[]>([]);

  // const initialRankState: RankFilter = {
  //   search: '',
  //   status: '1',
  //   currentPage: 1
  // };

  useEffect(() => {
    dispatch(
      getDepartmentsAll({
        callback: (res) => {
          setData(res?.data?.success);
        }
      })
    );
  }, []);

  const ITEM_HEIGHT = 40;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        marginTop: 15
      }
    }
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          <span>
            <span style={{ color: 'red' }}>*</span> Department
          </span>
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="department_id"
          size={size || 'small'}
          label={
            <span>
              <span style={{ color: 'red' }}>*</span> Department
            </span>
          }
          onChange={change}
          value={values}
          fullWidth={fullWidth}
          error={formik && formik.touched.department_id && Boolean(formik.errors.department_id)}
          MenuProps={MenuProps}
        >
          {data?.map((row: Department) => (
            <MenuItem value={row?.id} key={row?.id}>
              {row?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default DepartmentSelect;
