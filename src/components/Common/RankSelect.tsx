// THIRD PARTY
import React, { useState, useEffect } from 'react';
import { Select, InputLabel, MenuItem, FormControl } from '@mui/material';

// IMPORT PROJECT
import { RankType, RankFilter } from 'types/rank';
import { getRanksList } from 'store/slices/rank';
import { useDispatch, useSelector } from 'store';

const RankSelect = (props: any) => {
  const dispatch = useDispatch();
  const { change, values, size, formik, fullWidth } = props;
  const [data, setData] = useState<RankType[]>([]);

  const { ranks } = useSelector((state) => state.rank);
  const initialRankState: RankFilter = {
    search: '',
    status: '1',
    currentPage: 1
  };
  useEffect(() => {
    dispatch(getRanksList(initialRankState));
  }, []);

  useEffect(() => {
    setData(ranks);
  }, [ranks]);

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
            <span style={{ color: 'red' }}>*</span> Rank
          </span>
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="rank"
          size={size || 'small'}
          label={
            <span>
              <span style={{ color: 'red' }}>*</span> Rank
            </span>
          }
          onChange={change}
          value={values}
          fullWidth={fullWidth}
          error={formik && formik.touched.rank && Boolean(formik.errors.rank)}
          MenuProps={MenuProps}
        >
          {data?.map((row: RankType) => (
            <MenuItem value={row?.id} key={row?.id}>
              {row?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default RankSelect;
