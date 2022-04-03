// THIRD-PARTY
import React from 'react';

// PROJECT IMPORTS
import Locales from 'ui-component/Locales';
import NavigationScroll from 'layout/NavigationScroll';
import RTLLayout from 'ui-component/RTLLayout';
import ThemeCustomization from 'themes';
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';

const App = () => (
  <ThemeCustomization>
    <RTLLayout>
      <Locales>
        <NavigationScroll>
          <AuthProvider></AuthProvider>
        </NavigationScroll>
      </Locales>
    </RTLLayout>
  </ThemeCustomization>
);

export default App;
