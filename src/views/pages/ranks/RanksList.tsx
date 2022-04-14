// THIRD-PARTY
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import React from 'react';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// PROJECT IMPORTS
import { getRanksList } from 'store/slices/rank';
import { Rank } from 'types/rank';
import { useDispatch, useSelector } from 'store';

const RanksList = () => {
  const dispatch = useDispatch();

  const [data, setData] = React.useState<Rank[]>([]);
  const { ranks } = useSelector((state) => state.rank);

  React.useEffect(() => {
    setData(ranks);
  }, [ranks]);

  React.useEffect(() => {
    dispatch(getRanksList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ pl: 3 }}>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="center" sx={{ pr: 3 }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell sx={{ pl: 3 }}>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell align="center" sx={{ pr: 3 }}>
                  <IconButton color="primary" size="large">
                    <VisibilityTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                  </IconButton>
                  <IconButton color="secondary" size="large">
                    <EditTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                  </IconButton>
                  <IconButton color="error" size="large">
                    <DeleteTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RanksList;
