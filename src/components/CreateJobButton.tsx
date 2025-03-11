import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { color } from '../Utils/Colors';
interface CreateJobButtonProps {
  onPress: () => void;
}

const CreateJobButton: React.FC<CreateJobButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Create Job</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: color?.dark_3,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CreateJobButton;