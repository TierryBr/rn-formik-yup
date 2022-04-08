import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';

const AppStack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Login" component={Login}/>
        <AppStack.Screen name="Profile" component={Profile}/>
        <AppStack.Screen name="Register" component={Register}/>
      </AppStack.Navigator>
    </NavigationContainer>
  );
}