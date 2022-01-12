import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';

const ListItem = (props) => {
  return (
    <TouchableOpacity style={styles.row}>
      <View style={styles.imagebox}>
        <Image
          style={styles.itemImg}
          source={{
            uri: uploadsUrl + props.singleMedia.thumbnails.w160,
          }}
        />
      </View>
      <View style={styles.textbox}>
        <Text style={styles.listTitle}>{props.singleMedia.title}</Text>
        <Text>{props.singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 6,
    margin: 5,
  },
  textbox: {
    flex: 2,
    padding: 10,
  },
  imagebox: {
    flex: 1,
  },
  itemImg: {
    flex: 1,
    borderRadius: 6,
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 15,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
};

export default ListItem;
