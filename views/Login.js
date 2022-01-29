import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Card, ButtonGroup} from 'react-native-elements';

const Login = ({navigation}) => {
  // props is needed for navigation
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken} = useUser();
  const [formToggle, setFormToggle] = useState(true);

  const checkToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    if (!userToken) {
      return;
    }
    try {
      const userData = await getUserByToken(userToken);
      console.log('check token', userData);
      console.log('token in asyncStorage', userToken);
      setUser(userData);
      setIsLoggedIn(true);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <TouchableOpacity
      style={{flex: 1}}
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={styles.container}
      >
        <View style={styles.form}>
          <Card>
            <ButtonGroup
              onPress={() => setFormToggle(!formToggle)}
              selectedIndex={formToggle ? 0 : 1}
              buttons={['Login', 'Register']}
            />
          </Card>
          {formToggle ? (
            <Card>
              <Card.Title h4>Login</Card.Title>
              <Card.Divider />
              <LoginForm />
            </Card>
          ) : (
            <Card>
              <Card.Title>Registration</Card.Title>
              <Card.Divider />
              <RegisterForm setFormToggle={setFormToggle} />
            </Card>
          )}
        </View>
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  form: {
    flex: 8,
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
