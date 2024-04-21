import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';

export const ForgotPassword = async (
  username: string,
  password: String,
  token: String,
): Promise<Object> => {
  console.log('the user, passs, token is:');
  console.log(Config.API_BASE_URL);
  console.log(Config);

  const url = `http://${Config.API_BASE_URL}/api/v1/authentication`;

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Operation-Type': 'login',
  };
  const data = {
    query: `
        mutation ($forgotPassword: ForgotPassword!) { forgotPassword(userInput: $forgotPassword) { username } }
    `,
    variables: {
      forgotPassword: {
        username: username,
        password: password,
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
      response.data.data.forgotPassword &&
      response.data.data.forgotPassword.username
    ) {
      const userData = response.data.data.forgotPassword;
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
