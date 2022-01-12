import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {baseUrl} from '../utils/variables';
import ListItem from './ListItem';

const List = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const loadMedia = async (start = 10, limit = 20) => {
    try {
      const res = await fetch(`${baseUrl}media?start=${start}&limit=${limit}`);
      if (!res.ok) {
        throw Error(res.statusText);
      } else {
        const json = await res.json();
        const media = await Promise.all(
          json.map(async (item) => {
            const response = await fetch(baseUrl + 'media/' + item.file_id);
            const mediaData = await response.json();
            return mediaData;
          })
        );
        setMediaArray(media);
      }
    } catch (error) {
      console.error();
    }
    console.log(mediaArray);
  };

  useEffect(() => {
    loadMedia(10, 20);
  }, []);
  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item) => item.file_id.toString()}
      renderItem={({item}) => <ListItem singleMedia={item} />}
    />
  );
};

export default List;
