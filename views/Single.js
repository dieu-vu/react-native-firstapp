import PropTypes from 'prop-types';
import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, ActivityIndicator} from 'react-native';
import {Card, ListItem, Text, Avatar} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Video} from 'expo-av';
import {uploadsUrl} from '../utils/variables';
import {useTag, useUser} from '../hooks/ApiHooks';

const Single = ({navigation, route}) => {
  const {file} = route.params;
  const videoRef = useRef(null);
  const {getUserById} = useUser();
  const {getFilesByTag} = useTag();
  const [owner, setOwner] = useState({username: `fetching`});
  const [avatar, setAvatar] = useState('http://placekitten.com/640/640');

  const fetchOwner = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userData = await getUserById(file.user_id, token);
      setOwner(userData);
    } catch (e) {
      console.error('Fetch owner error', e.error);
      setOwner({username: '[not available]'});
    }
  };

  const fetchAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + file.user_id);
      if (avatarArray.length === 0) {
        return;
      }
      const avatar = avatarArray.pop();
      setAvatar(uploadsUrl + avatar);
    } catch (e) {
      console.error(e.message);
      // in production should return some alerts to the user
    }
  };

  useEffect(() => {
    fetchOwner();
    fetchAvatar();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <Card.Title h4>{file.title}</Card.Title>
        <Card.Title>{file.time_added}</Card.Title>
        <Card.Divider />
        {file.media_type === 'image' ? (
          <Card.Image
            source={{uri: uploadsUrl + file.filename}}
            style={styles.image}
            PlaceholderContent={<ActivityIndicator />}
          />
        ) : (
          <Video
            ref={videoRef}
            source={{uri: uploadsUrl + file.filename}}
            style={styles.image}
            isLooping
            useNativeControls={true}
            resizeMode="contain"
            posterSource={{uri: uploadsUrl + file.screenshot}}
            // onPlaybackStatusUpdate={(status) => setVideoRef(() => status)}
            onError={(err) => {
              console.log('Video error', err);
            }}
          ></Video>
        )}
      </Card>
      <Text>{file.description}</Text>
      <ListItem>
        <Avatar source={{avatar}} rounded={1} />
        <Text>{owner.username}</Text>
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
