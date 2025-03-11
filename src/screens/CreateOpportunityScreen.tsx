import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import debounce from 'lodash.debounce';
import { ActivityIndicator } from 'react-native-paper';
import { color } from '../Utils/Colors';
import Loader from '../components/Loader';
import { useNavigation } from '@react-navigation/native';


const dummyCustomers = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Michael Johnson' },
    { id: 4, name: 'Emily Davis' }
];

const CreateOpportunityScreen = () => {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [customers, setCustomers] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [partialSaved, setPartialSaved] = useState(false);
    
    // Fetch customer list based on input
    const fetchCustomers = (query: any) => {
        if(query.length > 0){
        setLoading(true);
        const filteredCustomers = dummyCustomers.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
        console.log(filteredCustomers,'filteredCustomers');
        setCustomers(filteredCustomers);
      }else{
        setCustomers([]);

      }
        setLoading(false);
    };
    
    // Debounced function to save form data partially
    const savePartialForm = useCallback(
        debounce(async (field, value) => {
            try {
              console.log("debounce");
              
                // await fetch('https://api.example.com/partial-save', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({ [field]: value }),
                // });
                setPartialSaved(true);
            } catch (error) {
                console.error('Partial save failed', error);
            }
        }, 1000), // Debounce delay of 1s
        []
    );

    // Handle input changes
    const handleInputChange = (field: string, value: React.SetStateAction<string>) => {
        if (field === 'name') setName(value);
        if (field === 'jobDescription') setJobDescription(value);
        if (field === 'customerName') {
            setCustomerName(value);
            fetchCustomers(value);
        }
        savePartialForm(field, value);
    };

    // Submit final form
    const handleSubmit = async () => {
        if (!name || !customerName || !jobDescription) {
            setError('All fields are required!');
            return;
        }
        try {
            // await fetch('https://api.example.com/submit-form', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ name, customerName, jobDescription }),
            // });
            console.log(name, customerName, jobDescription);
            
            Alert.alert('Form submitted successfully!');
        } catch (error) {
            console.error('Form submission failed', error);
        }
    };

    return (
        <View style={styles.container}>
           <View style={{flexDirection:"row",justifyContent:'flex-end' ,padding:5}}>
            {customers.length === 0 && <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('AddCustomer')}>
              <Text style={styles.btnText}>Add Customer +</Text>
            </TouchableOpacity>}
           </View>
            <Text>Name:</Text>
            <TextInput
                placeholder='Enter name'
                placeholderTextColor={'white'}
                style={styles.input}
                value={name}
                onChangeText={(text) => handleInputChange('name', text)}
            />

            <Text>Customer Name:</Text>
            <TextInput
                style={styles.input}
                value={customerName}
                onChangeText={(text) => handleInputChange('customerName', text)}
                placeholder="Search Customer"
                placeholderTextColor={'white'}
            />
            {loading && <Loader />}
            {customers.length > 0  && (
                <FlatList
                   style = {{backgroundColor:'grey', borderRadius:10, marginBottom:5}}
                    data={customers}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => setCustomerName(item.name)}>
                            <Text style={styles.item}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            ) }

            <Text>Job Description:</Text>
            <TextInput
                style={styles.input}
                value={jobDescription}
                onChangeText={(text) => handleInputChange('jobDescription', text)}
                placeholder='Enter job description'
                placeholderTextColor={'white'}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TouchableOpacity style={[styles.button, {width:'100%'}]} onPress={handleSubmit}>
                <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, gap:10 },
    input: {
        padding: 15,
        borderRadius: 5,
        backgroundColor: color.white_2,
        color:'white'
      },
    item: { padding: 10, borderBottomWidth: 1, color:'white' },
    error: { color: 'red', marginBottom: 10 },
    button: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: color.dark_2,
      },
      btnText: {
        textAlign: 'center',
        color: 'white',
        // fontSize: 15,
        fontWeight: 'bold',
      },
});

export default CreateOpportunityScreen;