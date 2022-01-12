import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import ListItem from './ListItem';

const dataUrl =
  'https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json';

const List = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const loadMedia = async () => {
    try {
      const res = await fetch(dataUrl);
      if (!res.ok) {
        throw Error(res.statusText);
      } else {
        const json = await res.json();
        setMediaArray(json);
        console.log(mediaArray);
      }
    } catch (error) {
      console.error();
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);
  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item) => item.title}
      renderItem={({item}) => <ListItem singleMedia={item} />}
    />
  );
};

export default List;
