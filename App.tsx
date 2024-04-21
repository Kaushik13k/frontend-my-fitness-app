import 'core-js/stable/atob';
import {jwtDecode} from 'jwt-decode';
import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LandingPage from './src/screens/LandingScreen/LandingPage';
import LoginScreen from './src/screens/ActionScreen/LoginScreen';
import SignupScreen from './src/screens/ActionScreen/SignupScreen';
import {ScreenEnum} from './src/utils/enums/ScreenEnum';
import BottomTabNavigator from './src/screens/BottomTabNavigator';
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';
import PrivacyScreen from './src/screens/PrivacyScreen/PrivacyScreen';
import ForgotPassword from './src/screens/ForgotPassword/ForgotPassword';
import BodyMeasurements from './src/screens/BodyMeasurements/BodyMeasurements';
import BMAnalytics from './src/screens/BMAnalytics/BMAnalytics';

export type RootStackParamList = {
  [ScreenEnum.LANDING]: undefined;
  [ScreenEnum.LOGIN]: undefined;
  [ScreenEnum.SIGNUP]: undefined;
  [ScreenEnum.HOME]: {userData: any};
  [ScreenEnum.PROFILE]: {userData: any};
  [ScreenEnum.PRIVACY]: undefined;
  [ScreenEnum.FORGOT]: {userData: any};
  [ScreenEnum.BMASCREEN]: {userData: any};
  [ScreenEnum.BODYMEASUREMENTS]: {userData: any};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null); // State to hold userData

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const ObjectData = JSON.parse(userData);
          const decoded = jwtDecode(ObjectData.token);
          if (decoded.exp && new Date(decoded.exp * 1000) > new Date()) {
            // * 1000 to convert to millisecond from 1970-01-01
            setIsLoggedIn(true);
            setUserData(ObjectData);
          } else {
            await AsyncStorage.removeItem('userData');
            Alert.alert(
              'Logged Out',
              'You have been logged out as the token is expired.',
            );
          }
        }

        if (userData) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isLoggedIn ? ScreenEnum.HOME : ScreenEnum.LANDING}>
          <Stack.Screen
            name={ScreenEnum.LANDING}
            component={LandingPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={ScreenEnum.LOGIN}
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={ScreenEnum.SIGNUP}
            component={SignupScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name={ScreenEnum.HOME} options={{headerShown: false}}>
            {() => <BottomTabNavigator userData={userData} />}
          </Stack.Screen>
          <Stack.Screen
            name={ScreenEnum.PROFILE}
            component={ProfileScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={ScreenEnum.PRIVACY}
            component={PrivacyScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={ScreenEnum.FORGOT}
            component={ForgotPassword}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={ScreenEnum.BMASCREEN}
            component={BMAnalytics}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={ScreenEnum.BODYMEASUREMENTS}
            component={BodyMeasurements}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default App;
