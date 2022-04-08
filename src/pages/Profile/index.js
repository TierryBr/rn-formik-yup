import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [user, setUSer] = useState(null);

  useEffect(() => {
    async function getUser() {
      const response = await AsyncStorage.getItem('keyLogin'); 
      const json = JSON.parse(response);
      setUSer(json.user);
    }
    getUser();
  }, []);


  return (
    <View style={styles.container} >
      <Text style={styles.title}>Seja bem vindo, {user}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#66fe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    padding: 15,
  }
});
