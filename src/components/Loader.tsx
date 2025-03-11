import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';
import { color } from '../Utils/Colors';

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={color.dark_1} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
