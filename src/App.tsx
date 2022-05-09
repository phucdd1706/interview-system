// THIRD-PARTY
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// PROJECT IMPORTS
import Locales from 'ui-component/Locales';
import NavigationScroll from 'layout/NavigationScroll';
import Routes from 'routes';
import RTLLayout from 'ui-component/RTLLayout';
import ThemeCustomization from 'themes';
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
import Snackbar from 'ui-component/extended/Snackbar';
import Index from 'views/pages/history';
import { Route } from 'react-router-dom';
import { activeItem } from 'store/slices/menu';

const currentRoute = window.location.href.split('/').pop();
const App = () => {
  const dispatch = useDispatch();
  console.log('currentRoute', currentRoute);
  useEffect(() => {
    dispatch(activeItem([currentRoute]));
  }, []);
  return (
    <ThemeCustomization>
      <RTLLayout>
        <Locales>
          <NavigationScroll>
            <AuthProvider>
              <>
                <Routes />
                <Snackbar />
              </>
            </AuthProvider>
          </NavigationScroll>
        </Locales>
      </RTLLayout>
    </ThemeCustomization>
  );
};

export default App;
