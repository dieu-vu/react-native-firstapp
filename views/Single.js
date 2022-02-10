import PropTypes from 'prop-types';
import React, {useRef, useState, useEffect, useContext} from 'react';
import {StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {Card, ListItem, Text, Avatar, Button} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Video} from 'expo-av';
import {uploadsUrl} from '../utils/variables';
import {useTag, useUser, useFavorites} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';

const Single = ({navigation, route}) => {
  const {file} = route.params;
  const videoRef = useRef(null);
  const {getUserById} = useUser();
  const {getFilesByTag} = useTag();
  const {postFavorites, getFavoritesByFileId, deleteFavorites} = useFavorites();
  const {user} = useContext(MainContext);

  const [owner, setOwner] = useState({username: `fetching`});
  const [avatar, setAvatar] = useState('http://placekitten.com/640/640');
  const [likes, setLikes] = useState([]);
  const [currentUserLiked, setCurrentUserLiked] = useState(false);

  const fetchOwner = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userData = await getUserById(file.user_id, token);
      setOwner(userData);
    } catch (e) {
      console.error('Fetch owner error', e);
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
      setAvatar(uploadsUrl + avatar.filename);
    } catch (e) {
      console.error(e.message);
      // in production should return some alerts to the user
    }
  };

  const fetchLike = async () => {
    try {
      const likesData = await getFavoritesByFileId(file.file_id);
      const likedUsers = likesData.map((favourite) => favourite.user_id);
      likedUsers.includes(user.user_id) && setCurrentUserLiked(true);
      setLikes(likesData.length);
      console.log('likes count ', likes);
    } catch (e) {
      console.error('Fetch owner error', e);
      setLikes('fetch likes: [not available]');
    }
  };

  const createFavorite = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const res = await postFavorites(file.file_id, token);
      res && setCurrentUserLiked(true);
      // await fetchLike(); // can use useEffect for this step
    } catch (e) {
      console.error('create Favorites error', e.error);
    }
  };

  const removeFavorite = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const res = await deleteFavorites(file.file_id, token);
      // await fetchLike(); // can use useEffect for this step
      res && setCurrentUserLiked(false);
    } catch (e) {
      console.error('delete Favorites error', e.error);
    }
  };

  useEffect(() => {
    fetchOwner();
    fetchAvatar();
  }, []);

  useEffect(() => {
    fetchLike();
  }, [currentUserLiked]);

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Title h4>{file.title}</Card.Title>
        <Card.Title>{file.time_added}</Card.Title>
        <Card.Title>{file.description}</Card.Title>

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
      <ListItem>
        <Avatar source={{uri: avatar}} rounded={1} />
        <Text>{owner.username}</Text>
      </ListItem>
      <ListItem>
        <Text>Like counts: {likes} </Text>
        <Button
          title="Like"
          onPress={() => {
            createFavorite();
          }}
          disabled={currentUserLiked}
        ></Button>
        <Button
          title="Unlike"
          onPress={() => {
            removeFavorite();
          }}
          disabled={!currentUserLiked}
        ></Button>
      </ListItem>
      <ListItem onPress={() => navigation.navigate('Map')}>
        <Avatar icon={{name: 'map-pin', type: 'feather', color: 'darkblue'}} />
        <Text>See on map</Text>
      </ListItem>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

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
