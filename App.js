import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import MyComponent from './src/MyComponent';

export const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  });
  return <MyComponent />;
};
