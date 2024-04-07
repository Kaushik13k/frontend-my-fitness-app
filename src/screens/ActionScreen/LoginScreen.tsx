import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  Dimensions,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import ActionButton from '../../components/Button/ActionButton';
import styles from './CommonActionScreenStyles';
import Logo from '../../components/Logo/Logo';
import {ScreenEnum} from '../../utils/enums/ScreenEnum';
import {GetAuthToken} from '../../services/Authentication';
import {Login} from '../../services/Login';
import {RootStackParamList} from '../../../App';

const {width, height} = Dimensions.get('window');

const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [loginFormTranslateY] = useState(new Animated.Value(height));
  const [borderBoxTranslateY] = useState(new Animated.Value(0));
  const [rememberMe, setRememberMe] = useState(false);
  const [loginDisabled, setLoginDisabled] = useState(false);
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    Animated.parallel([
      Animated.timing(loginFormTranslateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(borderBoxTranslateY, {
        toValue: -height * 0.25,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
    setLoginDisabled(!rememberMe);
  };

  const HandleLogin = async () => {
    try {
      const authToken = await GetAuthToken(userName);
      console.log('Token:', authToken);
      if (authToken) {
        const userDetails = await Login(userName, password, authToken);
        if (userDetails) {
          await AsyncStorage.setItem('userData', JSON.stringify(userDetails));
          console.log('User Details:', userDetails);
          navigation.navigate(ScreenEnum.HOME, {userData: userDetails});
        }
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
      Alert.alert('Login Failed', 'Please check your username or password');
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[{transform: [{translateY: borderBoxTranslateY}]}]}>
        <Logo size="Medium" />
      </Animated.View>
      <Animated.View
        style={[
          styles.content,
          {transform: [{translateY: loginFormTranslateY}]},
        ]}>
        <View style={styles.buttonsContainer}>
          <ActionButton
            buttonText="Login"
            buttonRef={ScreenEnum.LOGIN}
            navigation={navigation}
          />
          <ActionButton
            buttonText="Signup"
            buttonRef={ScreenEnum.SIGNUP}
            navigation={navigation}
          />
        </View>
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={userName}
            placeholder="Username"
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={[styles.checkbox, rememberMe && styles.checked]}
              onPress={toggleRememberMe}
            />
            <Text style={styles.checkboxLabel}>
              Remember Me <Text style={styles.asterisk}>*</Text>
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.button, !rememberMe && styles.disabledButton]}
          disabled={!rememberMe}
          onPress={HandleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default LoginScreen;
