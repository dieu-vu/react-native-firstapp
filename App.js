import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Settings} from 'react-native-feather';

import List from './components/List';
import {CustomStatusBar} from './styles/common';

const App = () => {
  return (
    <>
      <SafeAreaProvider style={styles.container}>
        <CustomStatusBar
          backgroundColor="#4FBDBA"
          barStyle="light-content"
        ></CustomStatusBar>
        <View style={styles.header}>
          <ImageBackground
            source={{uri: 'https://picsum.photos/600/400'}}
            style={styles.bgImage}
            imageStyle={{resizeMode: 'cover'}}
          />
          <Text style={styles.headerText}>Images from media API</Text>
          <Settings
            stroke="white"
            fill="none"
            width={32}
            height={32}
            style={styles.settings}
          ></Settings>
        </View>
        <List />
      </SafeAreaProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(7, 34, 39, 1)',
    justifyContent: 'center',
    padding: 10,
    alignSelf: 'stretch',
  },
  header: {
    height: '30%',
    backgroundColor: 'grey',
    margin: '2%',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    borderBottomEndRadius: 50,
  },
  settings: {
    position: 'absolute',
    top: '10%',
    right: '5%',
  },
  headerText: {
    zIndex: 3,
    position: 'absolute',
    bottom: '10%',
    left: '2%',
    color: 'white',
    backgroundColor: 'rgba(7, 34, 39, 0.4)',
    padding: '2%',
    fontWeight: 'bold',
    fontFamily: 'Georgia',
    fontSize: 18,
  },
});

export default App;
