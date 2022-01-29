import propTypes from 'prop-types';
import React from 'react';
import {StyleSheet, SafeAreaView, ActivityIndicator} from 'react-native';
import {Card, ListItem, Text, Avatar} from 'react-native-elements';
import {uploadsUrl} from '../utils/variables';

const Single = ({route}) => {
  const {file} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <Card.Title h4>{file.title}</Card.Title>
        <Card.Title>{file.time_added}</Card.Title>
        <Card.Divider />
        <Card.Image
          source={{uri: uploadsUrl + file.filename}}
          style={styles.image}
        />
      </Card>
      <Text>{file.description}</Text>
      <ListItem>
        <Avatar source={{uri: 'http://placekitten.com/180'}} rounded={1} />
        <Text>Ownername</Text>
      </ListItem>
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
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
    borderRadius: 25,
  },
  description: {
    marginBottom: 10,
  },
});

Single.propTypes = {
  route: propTypes.object,
};

export default Single;
