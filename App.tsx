import React from 'react';
import Navigation from './src/Navigation';
import { AuthProvider } from './src/context/AuthContext';
import { MenuProvider } from 'react-native-popup-menu';


const App = () => {
  return (
    <MenuProvider>
      <Navigation />
    </MenuProvider>
  );
};

export default App;
