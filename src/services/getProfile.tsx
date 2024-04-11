import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';

export const getProfile = async (
  username: string,
  token: String,
): Promise<Object> => {
  console.log('the user is:', username);
  console.log(Config.API_BASE_URL);
  console.log(Config);

  const url = `http://${Config.API_BASE_URL}/api/v1/authentication`;

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Operation-Type': 'get_measurements',
  };
  const data = {
    query: `
    query ($userAvailable: UserAvailable!) { userBodyMeasurements(userInput: $userAvailable) { user { id firstname lastname username email phoneNumber dob} } }
    `,
    variables: {
      userAvailable: {
        username: username,
      },
    },
  };

  try {
    console.log('Sending request...');
    const response = await axios.post(url, data, {headers});
    console.log('Response received:...');

    if (
      response &&
      response.data &&
      response.data.data.userBodyMeasurements &&
      response.data.data.userBodyMeasurements.user
    ) {
      const userData = response.data.data.userBodyMeasurements;
      console.log(typeof userData);
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
