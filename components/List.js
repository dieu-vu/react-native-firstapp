import React from 'react';
import {FlatList} from 'react-native';
import propTypes from 'prop-types';
import {useMedia} from '../hooks/ApiHooks';
import ListItem from './ListItem';

const List = ({navigation}) => {
  const {mediaArray} = useMedia();
  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item) => item.file_id.toString()}
      renderItem={({item}) => (
        <ListItem singleMedia={item} navigation={navigation} />
      )}
    />
  );
};

List.propTypes = {
  navigation: propTypes.object,
};

export default List;
