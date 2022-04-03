// THIRD-PARTY
import React from 'react';

// PROJECT IMPORTS
import Locales from 'ui-component/Locales';
import RTLLayout from 'ui-component/RTLLayout';
import ThemeCustomization from 'themes';

const App = () => (
  <ThemeCustomization>
    <RTLLayout>
      <Locales></Locales>
    </RTLLayout>
  </ThemeCustomization>
);

export default App;
