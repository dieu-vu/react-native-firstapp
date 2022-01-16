import React from 'react';
import {StatusBar, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const CustomStatusBar = ({backgroundColor, barStyle = 'light-content'}) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{height: insets.top, backgroundColor}}>
      <StatusBar
        animated={true}
        backgroundColor={{backgroundColor}}
        barStyle={barStyle}
      ></StatusBar>
    </View>
  );
};

export {CustomStatusBar};
