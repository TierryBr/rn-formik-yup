import { Text, View, Button, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextInputForm from '../../components/TextInput/index';
import * as Yup from 'yup';

import styles from './styles';

const schema = Yup.object().shape({
  user: Yup.string().min(2, 'O usuário deve ter pelo menos 2 caracteres').required('O usuário é obrigatório'),
  email: Yup.string().email('Email inválido').required('O e-mail é obrigatório'),
  phone: Yup.number().typeError('Telefone invalido').positive('Digite um número positivo').integer().required('O telefone é obrigatório'),
  cpf: Yup.number().typeError('CPF invalido').positive('Digite um número positivo').integer().required('O cpf é obrigatório'),
  password: Yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
});

export default function Register({navigation}) {

  const registerInfo = {
    user: '',
    email: '',
    phone: '',
    cpf: '',
    password: '',
  }

  async function onSubmit(values, formikActions) {
    try {
      await AsyncStorage.setItem('keyRegister', JSON.stringify(values));
      await navigation.navigate('Login');
    } catch (e) {
      alert(e)
    }
    formikActions.resetForm();
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container} >
      <Text style={styles.title}>Tela de Cadastro</Text>

      <Formik initialValues={registerInfo} validationSchema={schema} onSubmit={onSubmit}>
        {({values, errors, touched, handleChange, handleBlur, handleSubmit}) => {
          const {user, email, phone, cpf, password} = values;
          return (
            <>
              <TextInputForm 
                placeholder={"Digite seu usuário" }
                value={user} 
                onChangeText={handleChange('user')}
                onBlur={handleBlur('user')}
                errors={errors.user}
                touched={touched.user}
              />
              <TextInputForm 
                placeholder={"Digite seu email" }
                value={email} 
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                errors={errors.email}
                touched={touched.email}
              />
              <TextInputForm 
                placeholder={"Digite seu telefone"} 
                value={phone} 
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                errors={errors.phone}
                touched={touched.phone}
              />
              <TextInputForm 
                placeholder={"Digite seu cpf"} 
                value={cpf} 
                onChangeText={handleChange('cpf')}
                onBlur={handleBlur('cpf')}
                errors={errors.cpf}
                touched={touched.cpf}
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
                <Text style={styles.buttonText}>Cadastrar</Text>
              </TouchableOpacity>
            </>
          )
        }}
      </Formik>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}


