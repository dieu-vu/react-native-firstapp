import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, Text, Button, Image} from 'react-native';
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
      const result = await postTag(
        data,
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyNiwidXNlcm5hbWUiOiJkaWV1diIsImVtYWlsIjoiZGlldXZAbWV0cm9wb2xpYS5maSIsImZ1bGxfbmFtZSI6IkRpZXUgVnUiLCJpc19hZG1pbiI6bnVsbCwidGltZV9jcmVhdGVkIjoiMjAyMi0wMS0xMFQxMzozOToyMC4wMDBaIiwiaWF0IjoxNjQzMTgxMzcwLCJleHAiOjE2NDMyNjc3NzB9.YdTLtaG9U_8M0nmlKESG3MMqk_GeCPF-5a3_cR2M_40'
      );
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
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <Text>{user.username}</Text>
      <Image
        source={{uri: avatar}}
        style={{width: '80%', height: '50%'}}
        resizeMode="contain"
      ></Image>
      <Text>{user.email}</Text>
      <Button
        title="Log out!"
        onPress={async () => {
          await AsyncStorage.clear();
          setIsLoggedIn(false);
        }}
      ></Button>
      <Button
        title="Modify user"
        onPress={() => {
          navigation.navigate('Modify user');
        }}
      ></Button>
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
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
