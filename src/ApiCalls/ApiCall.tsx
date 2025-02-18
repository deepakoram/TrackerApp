import axios from 'axios';
import { Api } from '../Utils/Api';
import { Alert } from 'react-native';

const { loginApi } = Api;

export const loginApiHandle = async (email: string, password: string) => {
  let payload = {
    email,
    password
  };
  console.log(JSON.stringify(payload), 'payload');

  try {
    const response = await fetch(`${loginApi}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload), 
    });

    if (!response.ok) {
      Alert.alert("Invalid Credentials")
      // throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
