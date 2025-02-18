import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';

type Props = {
    title: string;
    showBackButton?: boolean;
};

const CustomHeader: React.FC<Props> = ({ title, showBackButton = false }) => {
    const { userToken, userRole, setUserRole } = useContext(AuthContext);

    const navigation = useNavigation();

    return (
        <View style={{ height: 60, backgroundColor: '#6200EE', flexDirection: 'row', alignItems: 'center',justifyContent:'space-between', paddingHorizontal: 15 }}>
            <View style={{ height: 60, backgroundColor: '#6200EE', flexDirection: 'row', alignItems: 'center' }}>
            {showBackButton && (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
                    <Text style={{ color: 'white', fontSize: 18 }}>◀</Text>
                </TouchableOpacity>
            )}
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
            </View>
            <TouchableOpacity onPress={()=>setUserRole((prev:string) => prev==="admin" ? "engineer" : 'admin')}>
                <Text>{userRole}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CustomHeader;
