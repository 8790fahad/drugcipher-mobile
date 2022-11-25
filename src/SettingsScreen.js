import React from 'react';
import {BackHandler, Text, View} from 'react-native';
import {Button, Card, List, Switch} from 'react-native-paper';
import styles from './ScanStyles';

export default function SettingsScreen() {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return (
    <View>
      <Text style={styles.settings}>Settings</Text>
      <Card style={{marginHorizontal: 15, marginVertical: 30}}>
        <List.Item
          title="Beep after success"
          description="After the code scan successfully enabled, there will a success tone"
          left={props => (
            <List.Icon {...props} icon="bee-flower" color="#03426e" />
          )}
          right={rops => (
            <Switch
              color="#03426e"
              value={isSwitchOn}
              onValueChange={onToggleSwitch}
            />
          )}
        />
        <List.Item
          title="Result original display"
          description="Display the results of scanning directly, no result optimization proccessing"
          left={props => (
            <List.Icon
              {...props}
              icon="book-open-page-variant-outline"
              color="#03426e"
            />
          )}
          right={rops => (
            <Switch
              color="#03426e"
              value={isSwitchOn}
              onValueChange={onToggleSwitch}
            />
          )}
        />
      </Card>
      <Card style={{marginHorizontal: 15}}>
        <List.Item
          title="Privacy policy"
          left={props => (
            <List.Icon {...props} icon="polymer" color="#03426e" />
          )}
        />
        <List.Item
          title="User agreement"
          left={props => (
            <List.Icon {...props} icon="lighthouse-on" color="#03426e" />
          )}
        />
        <List.Item
          title="Feedback"
          left={props => (
            <List.Icon {...props} icon="android-messages" color="#03426e" />
          )}
        />
        <List.Item
          title="Version"
          left={props => (
            <List.Icon {...props} icon="diversify" color="#03426e" />
          )}
          right={props => (
            <Text style={{color: 'black', marginTop: 15, marginRight: 10}}>
              0.0.1
            </Text>
          )}
        />
      </Card>
      <View style={{marginHorizontal: 15, marginVertical: 30}}>
        <Button
          icon="power"
          mode="contained"
          buttonColor="#03426e"
          onPress={() => BackHandler.exitApp()}>
          Exit
        </Button>
      </View>
    </View>
  );
}
