import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {Card, Text, Button, ListItem, Avatar} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import {useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';
import PropTypes from 'prop-types';

const Profile = ({navigation}) => {
  const {setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState('http://placekitten.com/640/640');
  const {getFilesByTag, postTag} = useTag();

  console.log('Profile', user);

  const fetchAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + user.user_id);
      const avatar = avatarArray.pop();
      setAvatar(uploadsUrl + avatar.filename);
    } catch (e) {
      console.error(e.message);
      // in production should return some alerts to the user
    }
  };

  // temporary testing postTag:
  // Token is hardcoded and copied from asyncStorage
  // This is not needed yet and should be called to set new avatar in remote API
  const createAvatar = async (mediaId) => {
    const data = {
      file_id: mediaId,
      tag: 'avatar_' + user.user_id,
    };
    try {
      const result = await postTag(data, 'hard-coded token here');
      console.log(result);
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    fetchAvatar();
    // createAvatar(91);
  });

  return (
    <ScrollView>
      <Card>
        <Card.Title>
          <Text h1>{user.username}</Text>
        </Card.Title>
        <Card.Image
          source={{uri: avatar}}
          style={{width: '100%', height: undefined, aspectRatio: 1}}
          resizeMode="contain"
        ></Card.Image>

        <ListItem>
          <Avatar icon={{name: 'email', color: 'darkblue'}} />
          <Text>{user.email}</Text>
        </ListItem>
        <ListItem>
          <Avatar
            icon={{name: 'user', type: 'font-awesome', color: 'darkblue'}}
          />
          <Text>{user.full_name}</Text>
        </ListItem>
        <Button
          title="Log out!"
          style={styles.button}
          onPress={async () => {
            await AsyncStorage.clear();
            setIsLoggedIn(false);
          }}
        ></Button>
        <Button
          title="Modify user"
          style={styles.button}
          onPress={() => {
            navigation.navigate('Modify user');
          }}
        ></Button>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingTop: 40,
  },
  button: {margin: 10, width: '70%', alignSelf: 'center'},
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
