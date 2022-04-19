// THIRD-PARTY
import { memo } from 'react';
import { Typography } from '@mui/material';

// PROJECT IMPORTS
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

const MenuList = () => {
  const typeOfUser = localStorage.getItem('user');
  console.log(typeOfUser);
  const navItems = menuItem.items.map((item) => {
    console.log(item);
    if (item.role === 1) {
      switch (item.type) {
        case 'group':
          return <NavGroup key={item.id} item={item} />;

        default:
          return (
            <Typography key={item.id} variant="h6" color="error" align="center">
              Menu Items Error
            </Typography>
          );
      }
    } else {
      switch (item.type) {
        case 'group':
          return <NavGroup key={item.id} item={item} />;
        default:
          return (
            <Typography key={item.id} variant="h6" color="error" align="center">
              Menu Items Error
            </Typography>
          );
      }
    }
    // switch (item.type) {
    //   case 'group':

    //       return <NavGroup key={item.id} item={item} />;

    //   default:
    //     return (
    //       <Typography key={item.id} variant="h6" color="error" align="center">
    //         Menu Items Error
    //       </Typography>
    //     );
    // }
  });

  return <>{navItems}</>;
};

export default memo(MenuList);
