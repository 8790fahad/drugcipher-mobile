import React from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
const windowsWidth = Dimensions.get('window').width;
const windowsHeight = Dimensions.get('window').height;
export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* <Text>bnbnb</Text> */}
      <View style={styles.navContainer}>
        <View style={styles.navBar}>
          <Text>jkjkjkjk</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: windowsHeight,
    width: windowsWidth,
  },
  navContainer: {
    position: 'absolute',
    height: 100,
    backgroundColor: 'white',
    left: 0,
    right: 0,
    bottom: 0,
  },
  navBar: {
    // pandingTop: 100,
    width: windowsWidth,
    height: windowsHeight / 10,
    borderRadius: 0,
  },
});
