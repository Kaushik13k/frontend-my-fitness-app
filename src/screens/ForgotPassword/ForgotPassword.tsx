import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {ScreenEnum} from '../../utils/enums/ScreenEnum';

import styles from './ForgotPasswordStyle';
import {GetAuthToken} from '../../services/Authentication';
import {ForgotPassword} from '../../services/ForgotPassword';

const ForgotPasswordStyle = ({route}: {route: any}) => {
  const userExtract = route.params.userData.params.userData.user;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      navigation.navigate(ScreenEnum.LOGIN);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const authToken = await GetAuthToken(userExtract.username);
      console.log('Token:', authToken);
      if (authToken) {
        const userDetails = await ForgotPassword(
          userExtract.username,
          newPassword,
          authToken,
        );
        if (userDetails) {
          console.log('password is reset successfully:', userDetails);
          Alert.alert('Password Reset', 'Password reset successfully');
          handleLogout();
        }
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
      Alert.alert('Login Failed', 'Please check your username or password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNewPassword}
        value={newPassword}
        placeholder="New Password"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        placeholder="Confirm New Password"
        secureTextEntry
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.text}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordStyle;
