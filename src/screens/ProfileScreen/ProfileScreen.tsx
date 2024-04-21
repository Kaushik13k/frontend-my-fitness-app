import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faTriangleExclamation,
  faCalendarDays,
  faBan,
} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';

import styles from './ProfileScreenStyle';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {GetAuthToken} from '../../services/Authentication';
import {getProfile} from '../../services/getProfile';
import {postProfile} from '../../services/postProfile';
import {ScreenEnum} from '../../utils/enums/ScreenEnum';

interface User {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phoneNumber: string;
  dob: string;
}

interface UserDetails {
  user: User;
}

const ProfileScreen = ({route}: {route: any}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  let initialFirstname = '';
  let initiallastname = '';
  let initialUsername = '';
  let initialEmail = '';
  let initialPhone = 0;

  const [firstname, setFirstname] = useState(initialFirstname);
  const [lastname, setLastname] = useState(initiallastname);
  const [username, setUsername] = useState(initialUsername);
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const [timestamp, setTimestamp] = useState(0);

  const isProfileComplete = firstname && lastname && phone;

  const HandleGetProfile = async () => {
    try {
      const authToken = await GetAuthToken(route.params.userData.user.username);
      console.log('Token:', authToken);
      if (authToken) {
        const userDetails = (await getProfile(
          route.params.userData.user.username,
          authToken,
        )) as UserDetails;
        if (userDetails) {
          setFirstname(userDetails.user.firstname || '');
          setLastname(userDetails.user.lastname || '');
          setUsername(userDetails.user.username || '');
          setEmail(userDetails.user.email || '');
          setPhone(parseInt(userDetails.user.phoneNumber) || 0);
          setDob(userDetails.user.dob || '');
          console.log('the dob is:', userDetails.user.dob);
          if (userDetails.user.dob) {
            const dobDate = new Date(Number(userDetails.user.dob) * 1000);
            const dob = dobDate.toLocaleDateString();
            setDob(dob);

            const currentYear = new Date().getFullYear();
            const birthYear = dobDate.getFullYear();
            const age = currentYear - birthYear;
            setAge(age.toString());
          }
        }
        if (!userDetails) {
          console.error('There is no value for the user!:');
          console.log('User details:', userDetails);
          Alert.alert(
            'User not found',
            'There is no user with the given username',
          );
        }
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
  };

  const HandlePostProfile = async () => {
    try {
      const authToken = await GetAuthToken(route.params.userData.user.username);
      console.log('Token:', authToken);
      if (authToken) {
        const userDetails = await postProfile(
          firstname,
          lastname,
          username,
          email,
          phone,
          timestamp,
          authToken,
        );
        if (userDetails) {
          Alert.alert('Profile updated', 'Your profile has been updated');
        }

        if (!userDetails) {
          console.error('There is no value for the user!:');
          console.log('User details:', userDetails);
          Alert.alert(
            'User not found',
            'There is no user with the given username',
          );
        }
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDob(currentDate.toLocaleDateString());

    const dateTimestamp = Math.floor(currentDate.getTime() / 1000);
    setTimestamp(dateTimestamp);

    const dobDate = new Date(dateTimestamp * 1000).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - dobDate;
    setAge(age.toString());
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const updateBodyMeasurements = () => {
    console.log('Update Body Measurements clicked...');
    navigation.navigate(ScreenEnum.BMASCREEN, {userData: route});
    // navigation.navigate(ScreenEnum.BODYMEASUREMENTS, {userData: route});
  };

  useEffect(() => {
    HandleGetProfile();
  }, []);

  return (
    <View style={styles.container}>
      {!isProfileComplete && (
        <View style={styles.warning}>
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            size={12}
            color={'red'}
          />
          <Text style={styles.warningText}>Please update your profile</Text>
        </View>
      )}
      <Text style={styles.title}>Update Profile</Text>

      <Text>First Name:</Text>
      <TextInput
        value={firstname}
        onChangeText={setFirstname}
        style={styles.input}
      />
      <Text>Last Name:</Text>
      <TextInput
        value={lastname}
        onChangeText={setLastname}
        style={styles.input}
      />
      <Text>User Name:</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} style={styles.input} />
      <Text>Phone Number:</Text>

      <TextInput
        value={phone.toString()}
        onChangeText={setPhone}
        style={styles.input}
      />
      <Text>DOB</Text>
      <View style={styles.dob}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            value={dob}
            onChangeText={setDob}
            style={styles.textInput}
          />
          <TouchableOpacity onPress={showDatepicker} style={styles.datePicker}>
            <FontAwesomeIcon icon={faCalendarDays} size={25} />
          </TouchableOpacity>
        </View>
        {show && (
          <RNDateTimePicker value={date} mode="date" onChange={onChange} />
        )}
      </View>
      <Text>Age</Text>
      <View
        style={{
          ...styles.dob,
          backgroundColor: 'lightgray',
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            value={age}
            onChangeText={setAge}
            style={styles.input}
            editable={false}
          />
          <FontAwesomeIcon icon={faBan} size={25} color="red" />
        </View>
      </View>

      <Button title="Update Profile" onPress={HandlePostProfile} />
      <View style={styles.separator}>
        <View style={styles.line} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.line} />
      </View>
      <Button
        title="Update Body Measurements"
        onPress={updateBodyMeasurements}
      />
    </View>
  );
};

export default ProfileScreen;
