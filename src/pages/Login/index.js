import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { useFormik, Form, Field, Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('O e-mail é obrigatório'),
  password: Yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
});

export default function Login() {
  const navigation = useNavigation();

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  }

  const loginInfo = {
    email: '',
    password: '',
  }

  return (
    <View style={styles.container} >
      <Text style={styles.title}>Tela de login</Text>

      <Formik initialValues={loginInfo} validationSchema={schema} onSubmit={(values, formikActions) => {
        // salvar no asyncStorage
        formikActions.resetForm();
        navigation.navigate('Profile');
      }}>
        {({values, errors, touched, handleChange, handleBlur, handleSubmit}) => {
          console.log(errors.email)
          const {email, password} = values;
          return (
            <>
              {errors.email && touched.email ? <Text style={styles.error}>{errors.email}</Text> : null}
              <TextInput 
                style={styles.input} 
                placeholder="Digite seu email" 
                value={email} 
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
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
