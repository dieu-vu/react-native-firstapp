import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';

import List from './components/List';

const App = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <List />
      </SafeAreaView>
      <StatusBar style="auto" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10,
    alignSelf: 'stretch',
  },
});

export default App;
