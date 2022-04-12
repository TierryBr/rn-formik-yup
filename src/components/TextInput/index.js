import React from 'react';
import { Text, TextInput } from 'react-native';

import styles from './styles';

export default function TextInputForm({placeholder, value, onChangeText, onBlur, errors, touched, secureTextEntry}) {

  return (
    <>
      {errors && touched ? <Text style={styles.error}>{errors}</Text> : null}
      <TextInput 
        style={styles.input} 
        placeholder={placeholder} 
        value={value} 
        onChangeText={onChangeText}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
      />
    </>
  );
}


