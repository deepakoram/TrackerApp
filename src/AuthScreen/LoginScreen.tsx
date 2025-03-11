import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginApiHandle } from '../ApiCalls/ApiCall';
import { useNavigation } from "@react-navigation/native";
import { color } from '../Utils/Colors';
import Avatar from '../assets/avatar.png'
import Loader from '../components/Loader';


const LoginScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading] = useState(false)
  const [sales, setSales] = useState(true);
  const { login, setUserRole, userRole } = useContext(AuthContext);

  const handleLogin = async () => {
    setLoading(true)
    if (username && password) {
      let response = await loginApiHandle(username, password)
      if (response) {
        setLoading(false)
        await AsyncStorage.setItem('userRole', response?.roles[0]);
        setUserRole(response?.roles[0])
        login(response?.token);
      }
    } else {
      setLoading(false)
      Alert.alert('Invalid credentials');
    }
  };

  return (
    loading ? <Loader/> :
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={() => { setSales((prev) => !prev) }}>
        <Text>
          {sales ? "admin" : "Engineer"}
        </Text>
      </TouchableOpacity> */}
      <Image source={Avatar} style={{width:100, height:100, marginBottom:10}}/>
      <Text style={styles.title}>Login</Text>

      <View style={{width:'80%'}}>
        <Text style={styles.inputText}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor={'white'}
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={{width:'80%'}}>
        <Text style={styles.inputText}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor={'white'}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    padding: 15,
    borderRadius: 5,
    marginBottom: 12,
    backgroundColor: color.white_2,
    color:'white'
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: color.dark_2,
    width: 120,

  },
  btnText: {
    textAlign: 'center',
    color: 'white',
    // fontSize: 15,
    fontWeight: 'bold',
  },
  inputText:{
    fontSize: 15,
    fontWeight: '400',
    marginBottom:5
  }
});

export default LoginScreen;
