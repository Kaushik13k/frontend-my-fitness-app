import React, {useState} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {ScrollView} from 'react-native';
import {GetAuthToken} from '../../services/Authentication';
import {postBodyMeasurements} from '../../services/postBodyMeasurements';
import styles from './BodyMeasurementsStyle';

type InputWithLabelProps = {
  label: string;
  value: string;
  units: string;
  onChangeText: (text: string) => void;
};

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  value,
  units,
  onChangeText,
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>
      {label} ({units})
    </Text>
    <View style={styles.inputWrapper}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
      <Text>{units}</Text>
    </View>
  </View>
);

const BodyMeasurements = ({route}: {route: any}) => {
  console.log(
    'the body-measurements is:',
    route.params.userData.params.userData.user.username,
  );

  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dob, setDob] = useState(new Date().toLocaleDateString());
  const [bodyWeight, setBodyWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [weist, setWeist] = useState(0);
  const [bodyFat, setBodyFat] = useState(0);
  const [neck, setNeck] = useState(0);
  const [sholder, setSholder] = useState(0);
  const [chest, setChest] = useState(0);
  const [leftBicep, setLeftBicep] = useState(0);
  const [rightBicep, setRightBicep] = useState(0);
  const [leftForearm, setLeftForearm] = useState(0);
  const [rightForearm, setRightForearm] = useState(0);
  const [abdomen, setAbdomen] = useState(0);
  const [hips, setHips] = useState(0);
  const [leftThigh, setLeftThigh] = useState(0);
  const [rightThigh, setRightThigh] = useState(0);
  const [leftCalf, setLeftCalf] = useState(0);
  const [rightCalf, setRightCalf] = useState(0);
  const [timestamp, setTimestamp] = useState(
    Math.floor(new Date().getTime() / 1000),
  );

  const showDatepicker = () => {
    setShow(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    console.log('the current date is:', currentDate);
    setShow(false);
    setDate(currentDate);
    setDob(currentDate.toLocaleDateString());

    const dateTimestamp = Math.floor(currentDate.getTime() / 1000);
    console.log('the timestamp is:', dateTimestamp);
    setTimestamp(dateTimestamp);
  };

  const HandleBodyMeasurements = async () => {
    try {
      const authToken = await GetAuthToken(
        route.params.userData.params.userData.user.username,
      );
      console.log('Token:', authToken);
      if (authToken) {
        console.log('the timestamp after setting is  is:', timestamp);
        const measurements = {
          bodyWeight: bodyWeight,
          height: height,
          weist: weist,
          bodyFat: bodyFat,
          neck: neck,
          sholder: sholder,
          chest: chest,
          leftBicep: leftBicep,
          rightBicep: rightBicep,
          leftForearm: leftForearm,
          rightForearm: rightForearm,
          abdomen: abdomen,
          hips: hips,
          leftThigh: leftThigh,
          rightThigh: rightThigh,
          leftCalf: leftCalf,
          rightCalf: rightCalf,
          timestamp: timestamp,
        };
        const userDetails = await postBodyMeasurements(
          route.params.userData.params.userData.user.username,
          timestamp,
          measurements,
          authToken,
        );
        if (userDetails) {
          Alert.alert(
            'Measurements updated',
            'Your body measurements has been recorded',
          );
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

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={undefined}>
          <Text style={styles.headerOptions}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Log Measurements</Text>
        <View style={styles.inputWrapper}>
          <TouchableOpacity onPress={HandleBodyMeasurements}>
            <Text style={styles.headerOptions}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date</Text>
        <View style={styles.inputWrapper}>
          <TouchableOpacity
            style={{padding: 10, paddingRight: 0}}
            onPress={showDatepicker}>
            <Text style={styles.label}>{dob}</Text>
          </TouchableOpacity>
          {show && (
            <RNDateTimePicker value={date} mode="date" onChange={onChange} />
          )}
        </View>
      </View>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <InputWithLabel
          label="Body Weight"
          value={bodyWeight.toString()}
          units="kg"
          onChangeText={(text: string) => setBodyWeight(Number(text))}
        />
        <InputWithLabel
          label="Height"
          value={height.toString()}
          units="Inches"
          onChangeText={(text: string) => setHeight(Number(text))}
        />
        <InputWithLabel
          label="Weist"
          value={weist.toString()}
          units="cm"
          onChangeText={(text: string) => setWeist(Number(text))}
        />
        <InputWithLabel
          label="Body Fat"
          value={bodyFat.toString()}
          units="%"
          onChangeText={(text: string) => setBodyFat(Number(text))}
        />
        <InputWithLabel
          label="Neck"
          value={neck.toString()}
          units="cm"
          onChangeText={(text: string) => setNeck(Number(text))}
        />
        <InputWithLabel
          label="Sholder"
          value={sholder.toString()}
          units="cm"
          onChangeText={(text: string) => setSholder(Number(text))}
        />
        <InputWithLabel
          label="Chest"
          value={chest.toString()}
          units="cm"
          onChangeText={(text: string) => setChest(Number(text))}
        />
        <InputWithLabel
          label="Left Bicep"
          value={leftBicep.toString()}
          units="cm"
          onChangeText={(text: string) => setLeftBicep(Number(text))}
        />
        <InputWithLabel
          label="Right Bicep"
          value={rightBicep.toString()}
          units="cm"
          onChangeText={(text: string) => setRightBicep(Number(text))}
        />
        <InputWithLabel
          label="Left Forearm"
          value={leftForearm.toString()}
          units="cm"
          onChangeText={(text: string) => setLeftForearm(Number(text))}
        />
        <InputWithLabel
          label="Right Forearm"
          value={rightForearm.toString()}
          units="cm"
          onChangeText={(text: string) => setRightForearm(Number(text))}
        />
        <InputWithLabel
          label="Abdomen"
          value={abdomen.toString()}
          units="cm"
          onChangeText={(text: string) => setAbdomen(Number(text))}
        />
        <InputWithLabel
          label="Hips"
          value={hips.toString()}
          units="cm"
          onChangeText={(text: string) => setHips(Number(text))}
        />
        <InputWithLabel
          label="Left Thigh"
          value={leftThigh.toString()}
          units="cm"
          onChangeText={(text: string) => setLeftThigh(Number(text))}
        />
        <InputWithLabel
          label="Right Thigh"
          value={rightThigh.toString()}
          units="cm"
          onChangeText={(text: string) => setRightThigh(Number(text))}
        />
        <InputWithLabel
          label="Left Calf"
          value={leftCalf.toString()}
          units="cm"
          onChangeText={(text: string) => setLeftCalf(Number(text))}
        />
        <InputWithLabel
          label="Right Calf"
          value={rightCalf.toString()}
          units="cm"
          onChangeText={(text: string) => setRightCalf(Number(text))}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BodyMeasurements;
