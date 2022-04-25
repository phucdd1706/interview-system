// THIRD-PARTY
import React, { useState, useEffect } from 'react';
import { Button, Typography, Menu, MenuItem, Stack } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// PROJECT IMPORTS
import { useDispatch } from 'store/index';
import { RankType } from 'types/rank';
import { getRanksAll } from 'store/slices/rank';

const RankFilters = (props: any) => {
  const { filters, handleRankClick, anchorElRank, handleRank, handleCloseRank } = props;
  const dispatch = useDispatch();
  const [dataRank, setDataRank] = useState<RankType[]>([]);

  const openRank = Boolean(anchorElRank);

  // const initialRankState: RankFilter = {
  //   search: '',
  //   status: '1',
  //   currentPage: 1
  // };

  useEffect(() => {
    dispatch(
      getRanksAll({
        callback: (res) => {
          setDataRank(res?.data?.success);
        }
      })
    );
  }, []);

  const rankLabel = dataRank.filter((items) => items.id === filters.rank);

  return (
    <Stack direction="row" alignItems="center" justifyContent="center" sx={{ display: { xs: 'none', sm: 'flex' } }}>
      <Typography variant="h5">Sort by rank: </Typography>
      <Button
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={openRank ? 'true' : undefined}
        onClick={handleRank}
        sx={{ color: 'grey.500', fontWeight: 400 }}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {rankLabel.length > 0 && rankLabel[0].name}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorElRank}
        open={openRank}
        onClose={handleCloseRank}
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
        {dataRank?.map((item, index) => (
          <MenuItem sx={{ p: 1.5 }} key={index} selected={item.id === filters.rank} onClick={() => handleRankClick(item.id)}>
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  );
};

export default RankFilters;
