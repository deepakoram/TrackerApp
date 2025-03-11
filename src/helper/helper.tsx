import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location for logging checkpoints',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true;
};

export const logCheckpoint = async (onLogCheckpoint:any, message = 'Punch In') => {
  try {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      console.error('Location permission not granted');
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onLogCheckpoint({ latitude, longitude }, message);
      },
      (error) => {
        console.error('Error logging checkpoint:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  } catch (error) {
    console.error('Error logging checkpoint:', error);
  }
};
