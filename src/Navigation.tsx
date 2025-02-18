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
import { ActivityIndicator, View } from 'react-native';
import CustomHeader from './components/CustomHeader';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Sales: undefined;
  Engineer: undefined;
  Details: { itemId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { userToken, userRole, setUserRole } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRole = async () => {
      try {
        const role = await AsyncStorage.getItem('userRole');
        if (role) setUserRole(role);
      } catch (error) {
        console.error('Failed to load user role', error);
      } finally {
        setLoading(false);
      }
    };
    loadRole();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken ? (
          userRole === 'admin' ? (
            <Stack.Screen
              name="Sales"
              component={Sales}
              options={{
                header: () => <CustomHeader title="Admin Dashboard" showBackButton={true}/>,
              }}
            />
          ) : (
            <Stack.Screen
              name="Engineer"
              component={Engineer}
              options={{
                header: () => <CustomHeader title="Engineer Dashboard" showBackButton={true}/>,
              }}
            />
          )
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            header: () => <CustomHeader title="Home" />,
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            header: () => <CustomHeader title="Details" showBackButton />,
          }}
        />
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
