import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A2239',
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
    borderWidth: 1,
    borderColor: '#176087',
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

export default styles;
