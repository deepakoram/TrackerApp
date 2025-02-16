import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  userToken: string | null;
  login: (token: string) => void;
  logout: () => void;
  setUserRole: any;
  userRole:any;
};

export const AuthContext = createContext<AuthContextType>({
  userToken: null,
  login: () => {},
  logout: () => {},
  setUserRole: "",
  userRole:""
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      console.log(token,"token");
      setUserToken(token);
    };
    loadToken();
  }, []);

  const login = async (token: string) => {
    await AsyncStorage.setItem('userToken', token);
    setUserToken(token);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, login, logout,setUserRole, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};
