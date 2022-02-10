import React from 'react';
import {FlatList} from 'react-native';
import propTypes from 'prop-types';
import {useMedia} from '../hooks/ApiHooks';
import ListItem from './ListItem';

const List = ({navigation, myFilesOnly = false}) => {
  const {mediaArray, loading} = useMedia(myFilesOnly);
  console.log('List load', loading);
  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item) => item.file_id.toString()}
      renderItem={({item}) => (
        <ListItem
          singleMedia={item}
          navigation={navigation}
          myFilesOnly={myFilesOnly}
        />
      )}
    />
  );
};

List.propTypes = {
  navigation: propTypes.object,
  myFilesOnly: propTypes.bool,
};

export default List;
