import React, {useState, useEffect} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import { useIsFocused } from '@react-navigation/native';
import * as Yup from 'yup';
import TextInputForm from '../../components/TextInput/index';

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

  async function onSubmit(values, formikActions) {
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
  }

  return (
    <View style={styles.container} >
      <Text style={styles.title}>Tela de login</Text>

      <Formik initialValues={loginInfo} validationSchema={schema} onSubmit={onSubmit}>
        {({values, errors, touched, handleChange, handleBlur, handleSubmit}) => {
          const {user, password} = values;
          return (
            <>
              <TextInputForm 
                placeholder={"Digite seu usuário"} 
                value={user} 
                onChangeText={handleChange('user')}
                onBlur={handleBlur('user')}
                errors={errors.user}
                touched={touched.user}
              />
              <TextInputForm 
                placeholder={"Digite sua senha"} 
                value={password} 
                onChangeText={handleChange('password')} 
                onBlur={handleBlur('password')}
                errors={errors.password}
                touched={touched.password}
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


