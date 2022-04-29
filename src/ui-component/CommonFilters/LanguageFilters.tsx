// THIRD-PARTY
import React, { useState, useEffect } from 'react';
import { Button, Typography, Menu, MenuItem, Stack } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// PROJECT IMPORTS
import { useDispatch } from 'store/index';
import { getLanguagesAll } from 'store/slices/language';
import { Languages } from 'types/language';

const LanguageFilters = (props: any) => {
  const { filters, handleLanguageClick, anchorElLanguage, handleLanguage, handleCloseLanguage } = props;
  const dispatch = useDispatch();
  const [dataLanguage, setDataLanguage] = useState<Languages[]>([]);

  const openLanguage = Boolean(anchorElLanguage);

  useEffect(() => {
    dispatch(
      getLanguagesAll({
        callback: (res) => {
          if (res?.data?.success) {
            setDataLanguage([{ id: '', name: 'All' }, ...res?.data?.success]);
          }
        }
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const languageLabel = dataLanguage?.filter((items) => items.id === filters.language_id);

  return (
    <Stack direction="row" alignItems="center" justifyContent="center" sx={{ display: { xs: 'none', sm: 'flex' } }}>
      <Typography variant="h5" style={{ width: '120px' }}>
        Sort by Language:{' '}
      </Typography>
      <Button
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={openLanguage ? 'true' : undefined}
        onClick={handleLanguage}
        sx={{ color: 'grey.500', fontWeight: 400 }}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {languageLabel?.length > 0 && languageLabel[0]?.name}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorElLanguage}
        open={openLanguage}
        onClose={handleCloseLanguage}
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
        {dataLanguage?.map((item, index) => (
          <MenuItem sx={{ p: 1.5 }} key={index} selected={item.id === filters.language_id} onClick={() => handleLanguageClick(item.id)}>
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  );
};

export default LanguageFilters;
