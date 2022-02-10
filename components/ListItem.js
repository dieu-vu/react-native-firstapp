import React, {useContext} from 'react';
import {
  Avatar,
  Button,
  ListItem as NBListItem,
  ButtonGroup,
} from 'react-native-elements';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {uploadsUrl} from '../utils/variables';
import {Alert} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';

const ListItem = ({navigation, singleMedia, myFilesOnly}) => {
  const {update, setUpdate} = useContext(MainContext);
  const {deleteMedia} = useMedia();

  const doDelete = () => {
    Alert.alert('Delete', 'this file permanently', [
      {text: 'Cancel'},
      {
        text: 'OK',
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await deleteMedia(singleMedia.file_id, token);
            console.log('delete media ', response);
            response && setUpdate(update + 1);
          } catch (error) {
            console.error(error);
          }
        },
      },
    ]);
  };

  return (
    <NBListItem bottomDivider>
      <Avatar
        size="large"
        source={{
          uri: uploadsUrl + singleMedia.thumbnails.w160,
        }}
      />
      <NBListItem.Content>
        <NBListItem.Title numberOfLines={1} h4>
          {singleMedia.title}
        </NBListItem.Title>
        <NBListItem.Subtitle>{singleMedia.description}</NBListItem.Subtitle>
        {myFilesOnly && (
          <ButtonGroup
            onPress={(index) => {
              if (index === 0) {
                navigation.navigate('Modify Media', {file: singleMedia});
              } else {
                doDelete();
              }
            }}
            buttons={['Modify', 'Delete']}
            rounded
          ></ButtonGroup>
        )}
      </NBListItem.Content>
      <Button
        title="View"
        buttonStyle={{
          backgroundColor: 'rgba(78, 116, 289, 1)',
          borderRadius: 3,
        }}
        containerStyle={{
          width: '20%',
          marginVertical: 10,
        }}
        onPress={() => {
          navigation.navigate('Single', {file: singleMedia});
        }}
      />
    </NBListItem>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  myFilesOnly: PropTypes.bool,
};

export default ListItem;
