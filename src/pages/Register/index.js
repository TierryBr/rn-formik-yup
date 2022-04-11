import { Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';

import styles from './styles';

const schema = Yup.object().shape({
  user: Yup.string().min(2, 'O usuário deve ter pelo menos 2 caracteres').required('O usuário é obrigatório'),
  email: Yup.string().email('Email inválido').required('O e-mail é obrigatório'),
  phone: Yup.string().required('O telefone é obrigatório'),
  cpf: Yup.number().required('O cpf é obrigatório'),
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

  return (
    <View style={styles.container} >
      <Text style={styles.title}>Tela de Cadastro</Text>

      <Formik initialValues={registerInfo} validationSchema={schema} onSubmit={async (values, formikActions) => {
        try {
          await AsyncStorage.setItem('keyRegister', JSON.stringify(values));
          await navigation.navigate('Login');
        } catch (e) {
          alert(e)
        }
        formikActions.resetForm();
        navigation.navigate('Login');
      }}>
        {({values, errors, touched, handleChange, handleBlur, handleSubmit}) => {
          const {user, email, phone, cpf, password} = values;
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
              {errors.email && touched.email ? <Text style={styles.error}>{errors.email}</Text> : null}
              <TextInput 
                style={styles.input} 
                placeholder="Digite seu email" 
                value={email} 
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />
              {errors.phone && touched.phone ? <Text style={styles.error}>{errors.phone}</Text> : null}
              <TextInput 
                style={styles.input} 
                placeholder="Digite seu telefone" 
                value={phone} 
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
              />
              {errors.cpf && touched.cpf ? <Text style={styles.error}>{errors.cpf}</Text> : null}
              <TextInput 
                style={styles.input} 
                placeholder="Digite seu cpf" 
                value={cpf} 
                onChangeText={handleChange('cpf')}
                onBlur={handleBlur('cpf')}
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


