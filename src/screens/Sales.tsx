import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useContext} from 'react'
import { AuthContext } from '../context/AuthContext'

const Sales = () => {
   const { logout } = useContext(AuthContext);
  return (
    <View>
      <Text>Sales</Text>
      <TouchableOpacity onPress={()=>logout()}>
              <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Sales

const styles = StyleSheet.create({})