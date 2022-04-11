import React, {useState, useEffect} from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import { useIsFocused } from '@react-navigation/native';
import * as Yup from 'yup';

import styles from './styles';

const schema = Yup.object().shape({
  user: Yup.string().required('O usuário é obrigatório'),
  password: Yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
});

export default function Login({navigation}) {
  const [userLogin, setUSerLogin] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function getUser() {
      if(isFocused) {
        const response = await AsyncStorage.getItem('keyRegister'); 
        const json = JSON.parse(response);
        setUSerLogin(json);
      }
    }
    getUser();
  }, [isFocused]);


  const loginInfo = {
    user: '',
    password: '',
  }

  return (
    <View style={styles.container} >
      <Text style={styles.title}>Tela de login</Text>

      <Formik initialValues={loginInfo} validationSchema={schema} onSubmit={async (values, formikActions) => {
        if (userLogin.user === values.user && userLogin.password === values.password) {
          try {
            await AsyncStorage.setItem('keyLogin', JSON.stringify(values));
            await navigation.navigate('Profile');
          } catch (e) {
            alert(e)
          }
          formikActions.resetForm();
        } else {
          alert('usuários ou senha invalidos');
        }
      }}>
        {({values, errors, touched, handleChange, handleBlur, handleSubmit}) => {
          const {user, password} = values;
          return (
            <>
              {errors.user && touched.user ? <Text style={styles.error}>{errors.user}</Text> : null}
              <TextInput 
                style={styles.input} 
                placeholder="Digite seu usuário" 
                value={user} 
                onChangeText={handleChange('user')}
                onBlur={handleBlur('user')}
              />
              {errors.password && touched.password ? <Text style={styles.error}>{errors.password}</Text> : null}
              <TextInput 
                style={styles.input} 
                placeholder="Digite sua senha" 
                value={password} 
                onChangeText={handleChange('password')} 
                onBlur={handleBlur('password')}
                secureTextEntry={true}
              />
              <TouchableOpacity style={styles.button} isSubmit onPress={handleSubmit}>
                <Text style={styles.buttonText}>Logar</Text>
              </TouchableOpacity>
            </>
          )
        }}
      </Formik>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      
    </View>
  );
}


