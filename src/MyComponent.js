import * as React from 'react';
import {BottomNavigation} from 'react-native-paper';
import BookMark from './BookMark';
import History from './History';
import Scan from './QrCodeScanner';
import SettingsScreen from './SettingsScreen';

const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'scan',
      title: 'Scan',
      focusedIcon: 'qrcode-scan',
      unfocusedIcon: 'scan-helper',
    },
    {
      key: 'history',
      title: 'History',
      focusedIcon: 'history',
      unfocusedIcon: 'history',
    },
    {
      key: 'bookmark',
      title: 'Bookmark',
      focusedIcon: 'bookmark-check',
      unfocusedIcon: 'bookmark-outline',
    },
    {
      key: 'settings',
      title: 'Settings',
      focusedIcon: 'account-settings',
      unfocusedIcon: 'account-settings-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    scan: Scan,
    history: History,
    bookmark: BookMark,
    settings: SettingsScreen,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
      activeColor="#03426e"
      shifting={false}
    />
  );
};

export default MyComponent;
