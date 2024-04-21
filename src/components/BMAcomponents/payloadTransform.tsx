import {Text, View} from 'react-native';
import customDataPoint from './dataPoint';

const customLabel = val => {
  return (
    <View style={{width: 70, marginLeft: 7}}>
      <Text style={{color: 'grey', fontWeight: 'bold'}}>{val}</Text>
    </View>
  );
};

const transformData = data => {
  return data.map(item => {
    const date = new Date(item.timestamp * 1000);
    // const day = date.getDate();
    const month = date.toLocaleString('default', {month: 'short'});
    const year = date.getFullYear().toString().slice(2);
    const formattedDate = `${month}' ${year}`;

    return {
      value: item.value,
      labelComponent: () => customLabel(formattedDate),
      customDataPoint: customDataPoint,
      dataPointLabelComponent: () => {
        return (
          <View
            style={{
              backgroundColor: 'black',
              paddingHorizontal: 8,
              paddingVertical: 5,
              borderRadius: 4,
            }}>
            <Text style={{color: 'white'}}>value : {item.value}</Text>
            <Text style={{color: 'white'}}>Month : {formattedDate}</Text>
          </View>
        );
      },
      dataPointLabelShiftY: 0,
      dataPointLabelShiftX: 40,
    };
  });
};

export default transformData;
