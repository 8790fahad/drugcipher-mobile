import React from 'react';
import {SafeAreaView, View, useColorScheme, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from 'react-native-splash-screen';
import {MyTabs} from './src/MyTabs';
import {NavigationContainer} from '@react-navigation/native';
import {HomeScreen} from './src/Home';
import MyComponent from './src/MyComponent';

// function HomeScreen() {
//   return (
//     <View>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }
export const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  React.useEffect(() => {
    SplashScreen.hide();
  });
  const Stack = createNativeStackNavigator();

  return (
    // <NavigationContainer initialRouteName="Home">
    //   <Stack.Screen name="Home" component={HomeScreen} />
    // </NavigationContainer>
    <MyComponent />
  );
};
