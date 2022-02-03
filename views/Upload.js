import React, {useContext, useState} from 'react';
import {StyleSheet, ScrollView, Alert} from 'react-native';
import {Button, Card, Input, Text} from 'react-native-elements';
import {Controller, useForm} from 'react-hook-form';
import PropTypes from 'prop-types';
import * as ImagePicker from 'expo-image-picker';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const Upload = ({navigation}) => {
  const [image, setImage] = useState(
    'https://place-hold.it/300x200/006A71/FFFFDD&text=Choose'
  );
  const [type, setType] = useState('');
  const [imageSelected, setImageSelected] = useState(false);
  const {postMedia, loading} = useMedia();
  const {update, setUpdate} = useContext(MainContext);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
    mode: 'onBlur',
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.5,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setImageSelected(true);
      setType(result.type);
    }
  };

  const onSubmit = async (data) => {
    if (!imageSelected) {
      Alert.alert('Please select a file');
      return;
    }
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    const filename = image.split('/').pop();
    let fileExtension = filename.split('.').pop();
    fileExtension = fileExtension === 'jpg' ? 'jpeg' : fileExtension;
    formData.append('file', {
      uri: image,
      name: filename,
      type: type + '/' + fileExtension,
    });
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await postMedia(formData, token);
      console.log('Upload response', response);
      Alert.alert('File', 'uploaded', [
        {
          text: 'OK',
          onPress: () => {
            setUpdate(update + 1);
            navigation.navigate('Home');
          },
        },
      ]);
    } catch (e) {
      console.log('onSubmit upload image error');
    }
  };

  return (
    <>
      <ScrollView>
        <Card>
          <Card.Image
            source={{uri: image}}
            style={styles.image}
            onPress={pickImage}
          ></Card.Image>
          <Controller
            control={control}
            rules={{require: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                placeholder="Title"
              ></Input>
            )}
            name="title"
          ></Controller>
          {errors.username && <Text>This is required.</Text>}

          <Controller
            control={control}
            rules={{require: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                placeholder="Description"
              ></Input>
            )}
            name="description"
          ></Controller>
          {errors.username && <Text>This is required.</Text>}
          <Button
            title="Choose image"
            onPress={pickImage}
            style={styles.button}
          ></Button>
          <Button
            loading={loading}
            style={styles.button}
            title="Upload"
            onPress={handleSubmit(onSubmit)}
          ></Button>
        </Card>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10,
    alignSelf: 'stretch',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 15,
    resizeMode: 'contain',
  },
  button: {
    marginTop: 10,
  },
});

Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;
