import React, {useContext} from 'react';
import {StyleSheet, ScrollView, Alert} from 'react-native';
import {Button, Card, Input} from 'react-native-elements';
import {Controller, useForm} from 'react-hook-form';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMedia} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';

const ModifyMedia = ({navigation, route}) => {
  const {file} = route.params;
  console.log('modify media route', route.params);
  const {putMedia, loading} = useMedia();
  const {update, setUpdate} = useContext(MainContext);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: file.title,
      description: file.description,
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await putMedia(data, token, file.file_id);

      console.log('Modify response', response);

      // show notification of upload media completed, after the file is uploaded (with if response)
      response &&
        Alert.alert('File', 'modified', [
          {
            text: 'OK',
            onPress: () => {
              // reset(); //unnecessary as the form is reset with useFocusEffect
              setUpdate(update + 1);
              navigation.navigate('My Files');
            },
          },
        ]);
    } catch (e) {
      console.log('onSubmit modify image error');
    }
  };

  console.log('loading', loading);

  return (
    <>
      <ScrollView>
        <Card>
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
            loading={loading}
            style={styles.button}
            title="Save"
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
  button: {
    marginTop: 10,
  },
});

ModifyMedia.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default ModifyMedia;
