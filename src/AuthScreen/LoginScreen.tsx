import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginApiHandle } from '../ApiCalls/ApiCall';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [sales,setSales] = useState(true);
  const { login,setUserRole, userRole } = useContext(AuthContext);

  const handleLogin = async() => {
    if (username  && password ) {
      let response = await loginApiHandle(username,password)
      if(response){
      await AsyncStorage.setItem('userRole', response?.roles[0]);
      setUserRole(response?.roles[0])
      login(response?.token);
      }
    } else {
      Alert.alert('Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>{setSales((prev)=>!prev)}}>
        <Text>
        {sales ? "admin" : "Engineer"}
        </Text>
      </TouchableOpacity>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default LoginScreen;
