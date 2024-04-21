import {
  ScrollView,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';
import {screenWidth} from 'react-native-gifted-charts/src/utils';

import React, {useCallback, useState} from 'react';
import styles from './BMAStyles';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {ScreenEnum} from '../../utils/enums/ScreenEnum';
import BodyFigureButton from '../../components/BMAcomponents/BMButtons';
import transformData from '../../components/BMAcomponents/payloadTransform';

const BMAnalytics = ({route}: {route: any}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  console.log('the body-measurements is:', route.params.userData.params);

  const [selectedButton, setSelectedButton] = useState('Weight');

  const handleSelectButton = useCallback(title => {
    console.log(title);
    setSelectedButton(title);
  }, []);

  const data_res = [];

  const graphData = transformData(data_res);

  const navBodyMeasurements = () => {
    console.log('Navigating to Body Measurements');
    navigation.navigate(ScreenEnum.BODYMEASUREMENTS, {
      userData: route.params.userData,
    });
  };
  return (
    <SafeAreaView>
      <View style={styles.navBar}>
        <Text style={styles.navTitle}>Measurements</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={navBodyMeasurements}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={{padding: 15}}>
        <View>
          <LineChart
            onFocus={() => console.log('Focused')}
            focusEnabled
            isAnimated
            thickness={5}
            data={graphData}
            width={screenWidth - 100}
            height={220}
            showTextOnFocus={true}
            areaChart
            animateOnDataChange
            initialSpacing={35}
            spacing={90}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
          }}>
          {data_res.length > 4 && (
            <Text style={{color: 'red'}}>Scroll right to see more data</Text>
          )}
        </View>
        <View style={styles.container}>
          {[
            'Weight',
            'Height',
            'Weist',
            'Neck',
            'Shoulders',
            'Chest',
            'Left Bicep',
            'Right Bicep',
            'Left Forearm',
            'Right Forearm',
            'Abdomen',
            'Hips',
            'Left Thigh',
            'Right Thigh',
            'Left Calf',
            'Right Calf',
          ].map(title => (
            <BodyFigureButton
              key={title}
              title={title}
              selectedButton={selectedButton}
              setSelectedButton={handleSelectButton}
            />
          ))}
        </View>

        <View>
          <Text style={styles.historyText}>History</Text>
          <ScrollView style={styles.historyList}>
            {data_res && data_res.length > 0 && data_res[0].timestamp !== 0 ? (
              data_res.map((item, index) => {
                return (
                  <View style={styles.listItem} key={index}>
                    <Text style={styles.dateText}>
                      {new Date(item.timestamp * 1000).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        },
                      )}
                    </Text>
                    <Text style={styles.valueText}>{item.value}</Text>
                  </View>
                );
              })
            ) : (
              <View style={styles.noDataView}>
                <Text style={styles.noDataText}>No data available. </Text>
                <Text style={styles.noDataText}>
                  Tap '+' on top right to add data.
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BMAnalytics;
