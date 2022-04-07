// THIRD-PARTY
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
// PROJECT IMPORTS

export default function FormPropsTextFields() {
  const [rankname, setValue] = React.useState('');
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' }
      }}
      noValidate
      autoComplete="off"
    >
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <TextField
          id="outlined-basic"
          value={rankname}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          label="Rank name"
        />
      </Box>
      <br />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button sx={{ m: 1, width: 80, height: 30 }} variant="outlined" size="small" startIcon={<CancelIcon />}>
          Cancel
        </Button>
        <Button sx={{ m: 1, width: 80, height: 30 }} variant="contained" size="small" startIcon={<SaveIcon />}>
          Save
        </Button>
      </Box>
    </Box>
  );
}
