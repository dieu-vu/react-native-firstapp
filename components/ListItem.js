import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
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
        <Text style={styles.baseText}>
          <Text style={styles.listTitle}>{props.singleMedia.title}</Text>
          {'\n'}
          <Text style={styles.description}>
            {props.singleMedia.description}
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'rgba(250, 238, 231, 0.2)',
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
  baseText: {
    color: '#FAEEE7',
    fontFamily: 'Georgia',
    lineHeight: 20,
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 15,
  },
  description: {
    fontSize: 13,
    paddingBottom: 15,
    fontStyle: 'italic',
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
};

export default ListItem;
