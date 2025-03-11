import React,{useState} from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerApiHandle } from '../ApiCalls/ApiCall';
import { useNavigation } from "@react-navigation/native";
import { color } from "../Utils/Colors";
import Avatar from '../assets/avatar_2.png'
import Loader from "../components/Loader";



const RegisterScreen: React.FC = () => {
  const navigation = useNavigation();

  const[loading,setLoading] = useState(false)
    
  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async(data: any) => {
    setLoading(true)
      let muteData = {...data,roles:['admin']}
      console.log(muteData,'muteData');
    let response = await registerApiHandle(muteData)
    console.log(response,'response');
    if(response?.message === "Registration successful"){
      setLoading(false)
        navigation.navigate('Login')
    }else{
      setLoading(false)
    }
  };

  return (
    loading ? <Loader/> :
    <View style={styles.container}>
      <View style={{justifyContent:'center', alignItems:'center'}}>
      <Image source={Avatar} style={{width:100, height:100}}/>
      </View>
      <Text style={styles.title}>Register User</Text>
      
      <Controller
        control={control}
        name="full_name"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
           <Text style={styles.inputText}>Name</Text>
            <TextInput style={styles.input} placeholder="Enter name" placeholderTextColor={'white'} onBlur={onBlur} onChangeText={onChange} value={value} />
            {errors.full_name && <Text style={styles.error}>{errors.full_name.message}</Text>}
          </>
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
          <Text style={styles.inputText}>Email</Text>
            <TextInput style={styles.input} placeholder="Enter email" placeholderTextColor={'white'} keyboardType="email-address" onBlur={onBlur} onChangeText={onChange} value={value} />
            {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
          <Text style={styles.inputText}>Password</Text>
            <TextInput style={styles.input} placeholder="Enter password" placeholderTextColor={'white'} secureTextEntry onBlur={onBlur} onChangeText={onChange} value={value} />
            {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
          </>
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
          <Text style={styles.inputText}>Confirm Password</Text>
            <TextInput style={styles.input} placeholder="Confirm Password" placeholderTextColor={'white'} secureTextEntry onBlur={onBlur} onChangeText={onChange} value={value} />
            {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>}
          </>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems:'center',
    padding: 20,
    backgroundColor: "#fff",
    gap:10
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
      padding: 15,
      borderRadius: 5,
      backgroundColor: color.white_2,
      color:'white'
    },
  button: {
    backgroundColor: color.dark_2,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 5,
  },
  inputText:{
    fontSize: 15,
    fontWeight: '400',
    
  }
});

export default RegisterScreen;
