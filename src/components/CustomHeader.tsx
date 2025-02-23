import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import LogCheckpointButton from './LogCheckpointButton';

type Props = {
    title: string;
    showBackButton?: boolean;
};

const CustomHeader: React.FC<Props> = ({ title, showBackButton = false }) => {
    const { userToken, userRole, setUserRole, logout } = useContext(AuthContext);
    const navigation = useNavigation();
    
    const handleLogCheckpoint = (location: any, message: string) => {
        Alert.alert(
            "Confirm Checkpoint",
            "Are you sure you want to log this checkpoint?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: () => console.log('Logging checkpoint:', { location, message }), style: "default" }
            ],
            { cancelable: true }
        );
    };

    const handleLogout = () => {
        Alert.alert(
            "Confirm Logout",
            "Are you sure you want to log out?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Logout", onPress: () => logout(), style: "destructive" }
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={{ height: 60, backgroundColor: '#6200EE', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {showBackButton && (
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
                        <Text style={{ color: 'white', fontSize: 18 }}>◀</Text>
                    </TouchableOpacity>
                )}
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
            </View>

            <Menu>
                <MenuTrigger>
                    <Text style={{ color: 'white', fontSize: 16 }}>{userRole} ▼</Text>
                </MenuTrigger>
                <MenuOptions>
                    <MenuOption>
                      <Text style={{ padding: 10, color: 'white', backgroundColor: '#4CAF50', borderRadius: 5, textAlign: 'center',fontWeight: 'bold', }}>PunchIn</Text>
                    </MenuOption>
                    <MenuOption >
                        <LogCheckpointButton onLogCheckpoint={handleLogCheckpoint} />
                    </MenuOption>
                    <MenuOption>
                      <Text style={{ padding: 10, color: 'white', backgroundColor: '#4CAF50', borderRadius: 5, textAlign: 'center',fontWeight: 'bold', }}>PunchIn</Text>
                    </MenuOption>
                    <MenuOption onSelect={handleLogout}>
                        <Text style={{ padding: 10, color: 'white', backgroundColor: 'red', borderRadius: 5, textAlign: 'center',fontWeight: 'bold' }}>Logout</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        </View>
    );
};

export default CustomHeader;

// onSelect={() => setUserRole((prev: string) => prev === "admin" ? "engineer" : 'admin')}