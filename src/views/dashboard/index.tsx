// THIRD-PARTY
// PROJECT IMPORTS
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useDispatch } from 'store';
import { activeItem } from 'store/slices/menu';
import MainCard from 'ui-component/cards/MainCard';

const DashboardPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(activeItem(['dashboard']));
  }, [dispatch]);
  return (
    <MainCard>
      <Box sx={{ textAlign: 'center' }}>Hệ thống quản lý phỏng vấn BeetSoft chúc bạn có một ngày làm việc vui vẻ, hiệu quả !</Box>
    </MainCard>
  );
};

export default DashboardPage;
