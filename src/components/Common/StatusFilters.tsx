// THIRD-PARTY
import { Button, Typography, Menu, MenuItem, Stack } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// PROJECT IMPORTS
import SortStatus from './SortStatus';

const StatusFilters = (props: any) => {
  const { filters, handleSortClick, anchorElSort, handleSort, handleCloseSort } = props;
  const sortLabel = SortStatus.filter((items) => items.value === filters.status);

  const openSort = Boolean(anchorElSort);

  return (
    <Stack direction="row" alignItems="center" justifyContent="center" sx={{ display: { xs: 'none', sm: 'flex' } }}>
      <Typography variant="h5">Sort by: </Typography>
      <Button
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={openSort ? 'true' : undefined}
        onClick={handleSort}
        sx={{ color: 'grey.500', fontWeight: 400 }}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {sortLabel.length > 0 && sortLabel[0].label}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorElSort}
        open={openSort}
        onClose={handleCloseSort}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        {SortStatus.map((status, index) => (
          <MenuItem
            sx={{ p: 1.5 }}
            key={index}
            selected={status.value === filters.status}
            onClick={(event) => handleSortClick(event, status.value)}
          >
            {status.label}
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  );
};

export default StatusFilters;
