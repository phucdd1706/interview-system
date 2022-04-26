// THIRD PARTY
import React, { useState, useEffect } from 'react';
import { Select, InputLabel, MenuItem, FormControl, FormHelperText } from '@mui/material';

// IMPORT PROJECT
import { RankType } from 'types/rank';
import { getRanksAll } from 'store/slices/rank';
import { useDispatch } from 'store';

const RankSelect = (props: any) => {
  const dispatch = useDispatch();
  const { change, values, size, formik, fullWidth } = props;
  const [data, setData] = useState<RankType[]>([]);

  // const initialRankState: RankFilter = {
  //   search: '',
  //   status: '1',
  //   currentPage: 1
  // };

  useEffect(() => {
    dispatch(
      getRanksAll({
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
      <FormControl fullWidth error>
        <InputLabel id="demo-simple-select-label">
          <span>
            <span style={{ color: 'red' }}>*</span> Rank
          </span>
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="rank_id"
          size={size || 'small'}
          label={
            <span>
              <span style={{ color: 'red' }}>*</span> Rank
            </span>
          }
          onChange={change}
          value={values}
          fullWidth={fullWidth}
          error={formik && formik.touched.rank_id && Boolean(formik.errors.rank_id)}
          MenuProps={MenuProps}
        >
          {data?.map((row: RankType) => (
            <MenuItem value={row?.id} key={row?.id}>
              {row?.name}
            </MenuItem>
          ))}
        </Select>
        {formik.touched.rank_id && formik.errors.rank_id && (
          <FormHelperText error id="standard-weight-helper-text-rank-login">
            {formik.errors.rank_id}
          </FormHelperText>
        )}
      </FormControl>
    </>
  );
};

export default RankSelect;
