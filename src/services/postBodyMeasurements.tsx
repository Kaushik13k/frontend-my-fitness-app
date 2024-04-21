import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';

export const postBodyMeasurements = async (
  userName: string,
  timestamp: Number,
  measurements: {[key: string]: any},
  token: String,
): Promise<Object> => {
  console.log(Config.API_BASE_URL);
  console.log(Config);

  console.log('we are in insert body measurements.');
  console.log(measurements.timestamp);
  console.log(measurements['timestamp']);

  const url = `http://${Config.API_BASE_URL}/api/v1/authentication`;

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Operation-Type': 'insert_measurements',
  };
  const data = {
    query: `
        mutation ($bodyMeasurementsInput: BodyMeasurementsInput!) { bodyMeasurements(userInput: $bodyMeasurementsInput) { userId } }
    `,
    variables: {
      bodyMeasurementsInput: {
        username: userName,
        timestamp: measurements.timestamp,
        weight: measurements.bodyWeight,
        height: measurements.height,
        weist: measurements.weist,
        neck: measurements.neck,
        shoulders: measurements.sholder,
        chest: measurements.chest,
        leftBicep: measurements.leftBicep,
        rightBicep: measurements.rightBicep,
        leftForearm: measurements.leftForearm,
        rightForearm: measurements.rightForearm,
        abdomen: measurements.abdomen,
        hips: measurements.hips,
        leftThigh: measurements.leftThigh,
        rightThigh: measurements.rightThigh,
        leftCalf: measurements.leftCalf,
        rightCalf: measurements.rightCalf,
      },
    },
  };
  console.log('the data is:', data);

  try {
    console.log('Sending request...');
    const response = await axios.post(url, data, {headers});
    console.log(
      'the response of the updates profile is:',
      response.data.data.bodyMeasurements,
    );
    console.log('Response received:...');

    if (response && response.data.data && response.data.data.bodyMeasurements) {
      const userData = response.data.data.bodyMeasurements.userId;
      console.log(typeof userData);
      console.log('the profile update result is: ', userData);
      return userData;
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Axios error:', axiosError.message);
      throw axiosError;
    } else {
      console.error('General error:', error.message);
      throw error;
    }
  }
};
