import React, { useContext, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import Sales from './screens/Sales';
import Engineer from './screens/Engineer';
import LoginScreen from './AuthScreen/LoginScreen';
import { AuthContext, AuthProvider } from './context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Sales: undefined;
  Engineer: undefined;
  Details: { itemId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { userToken, userRole,setUserRole } = useContext(AuthContext);
  useEffect(() => {
    const loadToken = async () => {
      const role = await AsyncStorage.getItem('userRole');
     if(role)setUserRole(role)
    };
    loadToken();
  }, []);
  console.log(userRole,'userRole');
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken ? (
          userRole === 'sales' ?
            <Stack.Screen name="Sales" component={Sales} /> :
            <Stack.Screen name="Engineer" component={Engineer} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}