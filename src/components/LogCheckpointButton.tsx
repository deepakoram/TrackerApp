import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

interface LogCheckpointButtonProps {
  onLogCheckpoint: (location: { latitude: number; longitude: number }, message: string) => void;
}

const LogCheckpointButton: React.FC<LogCheckpointButtonProps> = ({ onLogCheckpoint }) => {
  const [isLogging, setIsLogging] = useState(false);

  const requestLocationPermission = async () => {
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

  const handleLogCheckpoint = async () => {
    setIsLogging(true);
    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        console.error('Location permission not granted');
        setIsLogging(false);
        return;
      }

      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const message = 'Punch In';
          onLogCheckpoint({ latitude, longitude }, message);
          setIsLogging(false);
        },
        (error) => {
          console.error('Error logging checkpoint:', error);
          setIsLogging(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } catch (error) {
      console.error('Error logging checkpoint:', error);
      setIsLogging(false);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleLogCheckpoint} disabled={isLogging}>
      <Text style={styles.buttonText}>{isLogging ? 'Logging...' : 'Log Checkpoint'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LogCheckpointButton;
