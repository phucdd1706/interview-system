import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';

const CustomerRootInfo = () => {
  const { id } = useParams();
  return (
    <MainCard>
      <Typography variant="h3" component="h3">
        Customer Root Info
      </Typography>
    </MainCard>
  );
};

export default CustomerRootInfo;
