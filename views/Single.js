import propTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import {uploadsUrl} from '../utils/variables';

const Single = ({route}) => {
  const {file} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{uri: uploadsUrl + file.filename}}
        style={styles.image}
      ></Image>

      <Text>{file.title}</Text>
      <Text>{file.description}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  image: {
    width: '80%',
    height: '70%',
    resizeMode: 'contain',
  },
});

Single.propTypes = {
  route: propTypes.object,
};

export default Single;
