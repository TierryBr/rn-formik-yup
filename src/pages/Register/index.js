import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { useFormik, Form, Field, Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  user: Yup.string().min(2, 'O usuário deve ter pelo menos 2 caracteres').required('O usuário é obrigatório'),
  email: Yup.string().email('Email inválido').required('O e-mail é obrigatório'),
  phone: Yup.string().required('O telefone é obrigatório'),
  cpf: Yup.number().required('O cpf é obrigatório'),
  password: Yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
});

export default function Register({navigation}) {
  // const navigation = useNavigation();

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
        // salvar no asyncStorage
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
