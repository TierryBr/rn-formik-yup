import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFormik, Form, Field, Formik } from 'formik';
import { useIsFocused } from '@react-navigation/native';
import * as Yup from 'yup';

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


  const navigateToProfile = () => {
    navigation.navigate('Profile');
  }

  const loginInfo = {
    user: '',
    password: '',
  }

  return (
    <View style={styles.container} >
      <Text style={styles.title}>Tela de login</Text>

      <Formik initialValues={loginInfo} validationSchema={schema} onSubmit={async (values, formikActions) => {
        // salvar no asyncStorage
        if (userLogin.user === values.user && userLogin.password === values.password) {
          try {
            await AsyncStorage.setItem('keyLogin', JSON.stringify(values));
            await navigation.navigate('Profile');
          } catch (e) {
            alert(e)
          }
          formikActions.resetForm();
        } else {
          alert('user ou senha invalidos');
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
  },
  input: {
    marginTop: 10,
    width: 300,
    backgroundColor: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    padding: 10,
  },
  button: {
    width: 300,
    height: 42,
    backgroundColor: '#fff9',
    borderRadius: 4,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  error: {
    width: 300,
    fontSize: 15,
    marginTop: 15,
    color: '#e03e36',
    justifyContent: 'flex-end',
  }
});
