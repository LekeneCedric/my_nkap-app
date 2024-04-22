/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from './pages/Welcome/welcome.tsx';
import Login from "./pages/Authentication/Login/Login.tsx";

const Stack = createNativeStackNavigator();
const Root = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name={'welcome'} component={Welcome} />
      <Stack.Screen name={'login'} component={Login} />
    </Stack.Navigator>
  );
};
export default Root;
