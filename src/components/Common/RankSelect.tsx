// THIRD PARTY
import React, { useState, useEffect } from 'react';
import { Box, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchCandidates } from 'store/slices/complete';

// IMPORT PROJECT
import { Rank } from 'types/complete';

const RankSelect = (props: any) => {
  const dispatch = useDispatch();
  const { blur, change, values, required } = props;
  const [rank, setRank] = useState([
    { id: 1, rankName: 'Inter' },
    { id: 2, rankName: 'Fresher' }
  ]);

  useEffect(() => {
    // getList();
  }, []);

  const getList = () => {
    const params = {
      filter: JSON.stringify({}),
      range: JSON.stringify([0, 100]),
      sort: JSON.stringify(['rankName', 'ASC']),
      attributes: 'id,rankName'
    };
    dispatch(fetchCandidates(params));
  };

  return (
    <>
      <InputLabel id="demo-simple-select-label">
        <span>Rank</span>
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        name="rank"
        size="small"
        label={<span>Rank</span>}
        onBlur={blur}
        onChange={change}
        inputProps={{}}
        value={values?.rank}
        fullWidth
      >
        {rank?.map((row: Rank) => (
          <MenuItem value={row?.id} key={row?.id}>
            {row?.rankName}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default RankSelect;
