import React, {useState, useEffect} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';

export default function Login({navigation}) {
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

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}


