import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React,{useContext} from 'react'
import { AuthContext } from '../context/AuthContext'

const Engineer = () => {
  const { logout } = useContext(AuthContext);
  
  return (
    <View>
      <Text>Engineer</Text>
      <TouchableOpacity onPress={()=>logout()}>
        <Text>Logout</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Engineer

const styles = StyleSheet.create({})