// THIRD PARTY
import React, { useState, useEffect } from 'react';
import { Select, InputLabel, MenuItem, FormControl, FormHelperText } from '@mui/material';

// IMPORT PROJECT
import { Languages } from 'types/language';
import { getLanguagesAll } from 'store/slices/language';
import { useDispatch } from 'store';

interface Props {
  values: number | string | undefined;
  fullWidth: boolean;
  size: 'small' | 'medium' | undefined;
  change: (e: any) => void;
  formik: any;
  readonly?: boolean;
}

const LanguageSelect = ({ change, values, readonly, size, formik, fullWidth }: Props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<Languages[]>([]);

  useEffect(() => {
    dispatch(
      getLanguagesAll({
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
          <span style={{ color: formik?.touched?.language_id && Boolean(formik?.errors?.language_id) ? '#f44336' : '' }}>
            <span style={{ color: '#f44336' }}>*</span> Language
          </span>
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="language_id"
          size={size || 'small'}
          label={
            <span>
              <span style={{ color: '#f44336' }}>*</span> Language
            </span>
          }
          readOnly={readonly}
          onChange={change}
          value={values}
          fullWidth={fullWidth}
          error={formik?.touched?.language_id && Boolean(formik?.errors?.language_id)}
          MenuProps={MenuProps}
        >
          {data?.map((row: Languages) => (
            <MenuItem value={row?.id} key={row?.id}>
              {row?.name}
            </MenuItem>
          ))}
        </Select>
        {formik?.touched?.language_id && formik?.errors?.language_id && (
          <FormHelperText error id="standard-weight-helper-text-rank-login">
            {formik?.errors?.language_id}
          </FormHelperText>
        )}
      </FormControl>
    </>
  );
};

export default LanguageSelect;
