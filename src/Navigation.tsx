import React, { useContext, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext, AuthProvider } from './context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

// screens
import CustomHeader from './components/CustomHeader';
import RegisterScreen from './AuthScreen/RegisterScreen';
import LoginScreen from './AuthScreen/LoginScreen';
import CreateOpportunityScreen from './screens/CreateOpportunityScreen';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import Sales from './screens/Sales';
import Engineer from './screens/Engineer';
import Loader from './components/Loader';
import AddCustomerScreen from './screens/AddCustomerScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Sales: undefined;
  Engineer: undefined;
  Register: undefined;
  CreateOpportunity: undefined;
  AddCustomer: undefined;
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
        <Loader/>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken ? (
          // sales screen
          userRole === 'admin' ? (
            <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                header: () => <CustomHeader title="Home" />,
              }}
            />
            <Stack.Screen
              name="CreateOpportunity"
              component={CreateOpportunityScreen}
              options={{
                header: () => <CustomHeader title="Create Opportunity" showBackButton={true} />,
              }}
            />
            <Stack.Screen
              name="AddCustomer"
              component={AddCustomerScreen}
              options={{
                header: () => <CustomHeader title="Add Customer" showBackButton={true} />,
              }}
            />
            </>
          ) : (
            // engineer screens
            <Stack.Screen
              name="Engineer"
              component={Engineer}
              options={{
                header: () => <CustomHeader title="Engineer Dashboard" showBackButton={true} />,
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
          name="Details"
          component={DetailsScreen}
          options={{
            header: () => <CustomHeader title="Details" showBackButton />,
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          
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
