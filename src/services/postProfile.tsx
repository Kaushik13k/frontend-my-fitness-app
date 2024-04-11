import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {Int32} from 'react-native/Libraries/Types/CodegenTypes';

export const postProfile = async (
  firstName: String,
  lastName: String,
  userName: string,
  email: string,
  phoneNumber: Number,
  dob: Number,
  token: String,
): Promise<Object> => {
  console.log('the user is:', phoneNumber);
  console.log(Config.API_BASE_URL);
  console.log(Config);

  const url = `http://${Config.API_BASE_URL}/api/v1/authentication`;

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Operation-Type': 'Profile',
  };
  const data = {
    query: `
    mutation ($inputProfile: InputProfile!) { profile(userInput: $inputProfile) { username } }
    `,
    variables: {
      inputProfile: {
        firstname: firstName,
        lastname: lastName,
        username: userName,
        email: email,
        phoneNumber: Math.floor(phoneNumber),
        dob: dob,
      },
    },
  };
  console.log('the data is:', data);

  try {
    console.log('Sending request...');
    const response = await axios.post(url, data, {headers});
    console.log(
      'the response of the updates profile is:',
      response.data.data.profile,
    );
    console.log('Response received:...');

    if (response && response.data.data && response.data.data.profile) {
      const userData = response.data.data.profile.username;
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
