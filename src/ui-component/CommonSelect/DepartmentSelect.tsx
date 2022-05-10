// THIRD PARTY
import React, { useState, useEffect } from 'react';
import { Select, InputLabel, MenuItem, FormHelperText, FormControl } from '@mui/material';

// IMPORT PROJECT
import { Department } from 'types/department';
import { getDepartmentsAll } from 'store/slices/department';
import { useDispatch } from 'store';

interface Props {
  values: number | string | undefined;
  fullWidth: boolean;
  size: 'small' | 'medium' | undefined;
  change: (e: any) => void;
  formik: any;
  readonly?: boolean;
}

const DepartmentSelect = ({ change, values, readonly, fullWidth, size, formik }: Props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<Department[]>([]);

  useEffect(() => {
    dispatch(
      getDepartmentsAll({
        callback: (res) => {
          setData(res?.data?.success);
        }
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <span style={{ color: formik?.touched?.department_id && Boolean(formik?.errors?.department_id) ? '#f44336' : '' }}>
            <span style={{ color: '#f44336' }}>*</span> Department
          </span>
        </InputLabel>
        <Select
          id="department_id"
          name="department_id"
          size={size || 'small'}
          label={
            <span>
              <span style={{ color: '#f44336' }}>*</span> Department
            </span>
          }
          onChange={change}
          value={values}
          readOnly={readonly}
          error={formik?.touched?.department_id && Boolean(formik?.errors?.department_id)}
          MenuProps={MenuProps}
        >
          {data?.map((row: Department) => (
            <MenuItem value={row?.id} key={row?.id}>
              {row?.name}
            </MenuItem>
          ))}
        </Select>
        {formik?.touched?.department_id && formik?.errors?.department_id && (
          <FormHelperText error id="standard-weight-helper-text-rank-login">
            {formik?.errors?.department_id}
          </FormHelperText>
        )}
      </FormControl>
    </>
  );
};

export default DepartmentSelect;
