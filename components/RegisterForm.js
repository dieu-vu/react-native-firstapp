import React from 'react';
import {Text, View, TextInput, Button, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useUser} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';

const RegisterForm = ({setFormToggle}) => {
  const {postUser, checkUserName} = useUser();

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      full_name: '',
    },
    mode: 'onBlur',
    // when user leaves the field, field is blurred. On change is on typing
  });
  const onSubmit = async (data) => {
    console.log(data);
    try {
      delete data.confirmPassword;
      const userData = await postUser(data);
      console.log('register onSubmit', userData);
      if (userData) {
        Alert.alert('Success', 'User created successfully');
        setFormToggle(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required'},
          minLength: {
            value: 3,
            message: 'Username has to be at least 3 charaters',
          },
          validate: async (value) => {
            try {
              const available = await checkUserName(value);
              if (available) {
                return true;
              } else {
                return 'Username is already taken';
              }
            } catch (error) {
              throw new Error(error.message);
            }
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={{borderWidth: 1, width: 200}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholder="Username"
            // errorMessage={errors.username & errors.username.message}
          />
        )}
        name="username"
      />
      {errors.username && <Text>{errors.username.message}</Text>}

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required'},
          minLength: {
            value: true,
            message: 'Password has to be at least 5 characters',
          },
          // pattern: {
          //   value: /(?=.*[\p{Lu}])(?=.*[0-9]).{8,}/u,
          //   message: 'Min 8, Uppercase, number',
          // },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={{borderWidth: 1}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="Password"
          />
        )}
        name="password"
      />
      {errors.password && <Text>{errors.password.message}</Text>}

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required'},
          validate: async (value) => {
            const {password} = getValues();
            if (value === password) {
              return true;
            } else {
              return 'Passwords do not match';
            }
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={{borderWidth: 1}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="Confirm password"
          />
        )}
        name="confirmPassword"
      />
      {errors.confirmPassword && <Text>{errors.confirmPassword.message}</Text>}

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required'},
          pattern: {
            value: /\S+@\S+\.\S+$/i,
            /* value: /^[a-z0-9_-]+(\.[a-z0-9_-]+)@[a-z0-9-]+(\.[a-z0-9_-]+)\.[a-z]{2,}$/i,*/
            message: 'Has to be valid email',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={{borderWidth: 1, width: 200}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholder="Email"
          />
        )}
        name="email"
      />
      {errors.email && <Text>{errors.email.message}</Text>}

      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={{borderWidth: 1, width: 200}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="words"
            placeholder="Full name"
          />
        )}
        name="full_name"
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

RegisterForm.propTypes = {
  setFormToggle: PropTypes.func,
};

export default RegisterForm;
