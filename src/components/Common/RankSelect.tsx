// THIRD PARTY
import React, { useState, useEffect } from 'react';
import { Select, InputLabel, MenuItem } from '@mui/material';

// IMPORT PROJECT
import { Rank } from 'types/rank';
import { getRanksList } from 'store/slices/rank';
import { useDispatch, useSelector } from 'store';

const RankSelect = (props: any) => {
  const dispatch = useDispatch();
  const { change, values, required, size, formik, sx, fullWidth } = props;
  const [data, setData] = useState<Rank[]>([]);

  const { ranks } = useSelector((state) => state.rank);

  useEffect(() => {
    dispatch(getRanksList());
  }, []);

  useEffect(() => {
    setData(ranks);
  }, [ranks]);

  return (
    <>
      <InputLabel id="demo-simple-select-label">
        <span>Rank</span>
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        name="rank"
        size={size || 'small'}
        label={<span>Rank</span>}
        onChange={change}
        value={values}
        fullWidth={fullWidth}
        error={formik && formik.touched.rank && Boolean(formik.errors.rank)}
        sx={sx}
      >
        {data?.map((row: Rank) => (
          <MenuItem value={row?.id} key={row?.id}>
            {row?.name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default RankSelect;
