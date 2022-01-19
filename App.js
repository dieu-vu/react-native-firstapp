import React from 'react';
import {StatusBar} from 'expo-status-bar';
import Navigator from './navigators/Navigators';

const App = () => {
  return (
    <>
      <Navigator></Navigator>
      <StatusBar style="auto" />
    </>
  );
};

export default App;
