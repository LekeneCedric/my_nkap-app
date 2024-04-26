/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from './pages/Welcome/welcomeView.tsx';
import Login from "./pages/Authentication/Login/LoginView.tsx";
import RegisterView from './pages/Authentication/Register/RegisterView.tsx';
import { routes } from './pages/routes/index.ts';

const Stack = createNativeStackNavigator();
const Root = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name={'welcome'} component={Welcome} />
      <Stack.Screen name={routes.auth.login} component={Login} />
      <Stack.Screen name={routes.auth.register} component={RegisterView} />
    </Stack.Navigator>
  );
};
export default Root;
