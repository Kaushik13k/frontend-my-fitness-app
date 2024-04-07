import React, {useState} from 'react';
import {Text, View, TextInput, Button} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';
import styles from './ProfileScreenStyle';

const ProfileScreen = ({route}: {route: any}) => {
  console.log('we are in profile page', route.params.userData.user);
  const {
    firstname: initialFirstname,
    lastname: initiallastname,
    username: initialUsername,
    age: initialAge,
    email: initialEmail,
    phone: initialPhone,
    dob: initialDob,
  } = route.params.userData.user;

  const [firstname, setFirstname] = useState(initialFirstname || '');
  const [lastname, setLastname] = useState(initiallastname || '');
  const [username, setUsername] = useState(initialUsername || '');
  const [email, setEmail] = useState(initialEmail || '');
  const [phone, setPhone] = useState(initialPhone || '');
  const [dob, setDob] = useState(initialDob || '');
  const [age, setAge] = useState(initialAge || '');
  const isProfileComplete = firstname && lastname && dob && phone;

  const updateProfile = () => {
    console.log('Profile updated');
  };

  const updateBodyMeasurements = () => {
    console.log('Body measurements updated');
  };

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
      <TextInput value={phone} onChangeText={setPhone} style={styles.input} />
      <Text>DOB</Text>
      <TextInput value={dob} onChangeText={setDob} style={styles.input} />
      <Text>Age:</Text>
      <TextInput value={age} onChangeText={setAge} style={styles.input} />
      <Button title="Update Profile" onPress={updateProfile} />
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
