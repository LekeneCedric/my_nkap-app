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
import AddFinancialGoalsView from "./pages/Home/AddFinancialGoals/AddFinancialGoalsView.tsx";
import AddOperationByAI from "./pages/Home/AddOperationsByAI/AddOperationsByAI.tsx";
import AccountsView from "./pages/Home/Settings/Menus/Management/Accounts/AccountsView.tsx";
import CategoriesView from "./pages/Home/Settings/Menus/Management/Categories/CategoriesView.tsx";

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
            <Stack.Screen name={routes.home.accounts} component={AccountsView} />
            <Stack.Screen name={routes.home.settings.main} component={SettingsView} />
            <Stack.Screen name={routes.home.settings.preferences} component={PreferencesView} />
            <Stack.Screen name={routes.home.addOperation} component={AddOperationView} />
            <Stack.Screen name={routes.home.addFinancialGoals} component={AddFinancialGoalsView} />
            <Stack.Screen name={routes.home.addOperationByAI} component={AddOperationByAI} />
            <Stack.Screen name={routes.home.settings.categories_management} component={CategoriesView} />
          </>
        )
      }
    </Stack.Navigator>
  );
};
export default Root;
