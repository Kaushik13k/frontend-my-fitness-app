import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, View, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScreenEnum} from '../../utils/enums/ScreenEnum';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';

const HomeScreen = ({route}) => {
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

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
