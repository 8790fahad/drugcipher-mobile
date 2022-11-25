import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import Scan from './src/QrCodeScanner';

export const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  });
  return <Scan />;
};
