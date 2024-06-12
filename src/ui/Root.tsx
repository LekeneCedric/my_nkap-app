/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Welcome from "./pages/Welcome/welcomeView.tsx";
import Login from "./pages/Authentication/Login/LoginView.tsx";
import RegisterView from "./pages/Authentication/Register/RegisterView.tsx";
import {routes} from "./pages/routes";
import useRootView from "./useRootView.ts";
import HomeScreen from "./Screens/HomeScreen.tsx";
import SettingsView from "./pages/Home/Settings/SettingsView.tsx";
import PreferencesView from "./pages/Home/Settings/Menus/Preferences/PreferencesView.tsx";
import AddOperationView from "./pages/Home/AddOperations/AddOperationView.tsx";

const Stack = createNativeStackNavigator();
const Root = () => {
  const {isAuthenticated} = useRootView();
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: "slide_from_right"}}
    >
      {!isAuthenticated && (
        <>
          <Stack.Screen name={"welcome"} component={Welcome} />
          <Stack.Screen name={routes.auth.login} component={Login} />
          <Stack.Screen name={routes.auth.register} component={RegisterView} />
        </>
      )}
      {
        isAuthenticated && (
          <>
            <Stack.Screen name={routes.home.main} component={HomeScreen} />
            <Stack.Screen name={routes.home.settings.main} component={SettingsView} />
            <Stack.Screen name={routes.home.settings.preferences} component={PreferencesView} />
            <Stack.Screen name={routes.home.addOperation} component={AddOperationView} />
          </>
        )
      }
    </Stack.Navigator>
  );
};
export default Root;
