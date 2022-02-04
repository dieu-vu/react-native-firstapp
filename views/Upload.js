import React, {useContext, useState, useCallback} from 'react';
import {StyleSheet, ScrollView, Alert} from 'react-native';
import {Button, Card, Input} from 'react-native-elements';
import {Video} from 'expo-av';
import {Controller, useForm} from 'react-hook-form';
import PropTypes from 'prop-types';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {useMedia, useTag} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import {appID} from '../utils/variables';

const placeHolderImage =
  'https://place-hold.it/300x200/006A71/FFFFDD&text=Choose';
const Upload = ({navigation}) => {
  const [image, setImage] = useState(placeHolderImage);
  const [type, setType] = useState('image');
  const [imageSelected, setImageSelected] = useState(false);
  const {postMedia, loading} = useMedia();
  const {update, setUpdate} = useContext(MainContext);
  const {postTag} = useTag();

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
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
    console.log('selected image info ', result);
    if (!result.cancelled) {
      setImage(result.uri);
      setImageSelected(true);
      setType(result.type);
    }
  };

  const reset = () => {
    setImage(placeHolderImage);
    setImageSelected(false);
    setValue('title', '');
    setValue('description', '');
    setType('image');
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        reset();
      };
    }, []) // empty array so that this won't rerun every render
  );

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

      // add app ID to tag:
      const tagResponse = await postTag(
        {file_id: response.file_id, tag: appID},
        token
      );
      console.log('tagResponse', tagResponse);

      // show notification of upload media completed, after the file is uploaded (with if response)
      tagResponse &&
        Alert.alert('File', 'uploaded', [
          {
            text: 'OK',
            onPress: () => {
              // reset(); //unnecessary as the form is reset with useFocusEffect
              setUpdate(update + 1);
              navigation.navigate('Home');
            },
          },
        ]);
    } catch (e) {
      console.log('onSubmit upload image error');
    }
  };

  console.log('loading', loading);

  return (
    <>
      <ScrollView>
        <Card>
          {type === 'image' ? (
            <Card.Image
              source={{uri: image}}
              style={styles.image}
              onPress={pickImage}
            ></Card.Image>
          ) : (
            <Video
              source={{uri: image}}
              style={styles.image}
              useNativeControls={true}
              resizeMode="cover"
              onError={(err) => {
                console.log('Video error', err);
              }}
            ></Video>
          )}
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
                errorMessage={errors.title && 'This is required'}
              ></Input>
            )}
            name="title"
          ></Controller>

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
                errorMessage={errors.description && 'This is required'}
              ></Input>
            )}
            name="description"
          ></Controller>
          <Button
            title="Choose image"
            onPress={pickImage}
            style={styles.button}
          ></Button>
          <Button
            disabled={!imageSelected}
            loading={loading}
            style={styles.button}
            title="Upload"
            onPress={handleSubmit(onSubmit)}
          ></Button>
          <Button
            title="Reset form"
            onPress={reset}
            style={styles.button}
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
