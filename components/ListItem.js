import React from 'react';
import {Avatar, Button, ListItem as NBListItem} from 'react-native-elements';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';

const ListItem = ({navigation, singleMedia}) => {
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
};

export default ListItem;
