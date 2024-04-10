/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from './Screens/Welcome/welcome.tsx';

const Stack = createNativeStackNavigator();
const Root = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name={'welcome'} component={Welcome} />
    </Stack.Navigator>
  );
};
export default Root;
