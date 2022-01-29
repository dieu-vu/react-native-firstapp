import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {Card, ListItem, Text, Avatar} from 'react-native-elements';
import {uploadsUrl} from '../utils/variables';

const Single = ({navigation, route}) => {
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
      <ListItem onPress={() => navigation.navigate('Map')}>
        <Avatar icon={{name: 'map-pin', type: 'feather', color: 'darkblue'}} />
        <Text>See on map</Text>
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
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default Single;
