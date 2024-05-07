import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Theme} from "../Global/Theme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../Global/Icons";
import Transactions from "../pages/Home/Transactions/TransactionsView";
import {Platform, View} from "react-native";
import {wp} from "../Global/Percentage";
import {useNavigation} from "@react-navigation/native";
import HomeScreenHeader from "./components/header/HomeScreenHeader";
import useHomeScreenView from "./useHomeScreenview";

const Tab = createBottomTabNavigator();
const HomeScreen = () => {
  const {username} = useHomeScreenView();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Theme.light,
        tabBarStyle: {backgroundColor: Theme.primary},
        header: (props) => <HomeScreenHeader userName={username} props={props}/>
      }}
    >
      <Tab.Screen
        name={"Transactions"}
        component={Transactions}
        options={{
          headerShown: true,
          tabBarLabel: "Transactions",
          tabBarIcon: ({size, focused}) => (
            <Icon
              name={ focused ? Icons.transactions: Icons.transactionsOutline}
              size={size}
              color={focused ? Theme.light : Theme.primaryLight}
            />
          ),
        }}
      />
      <Tab.Screen
        name={"wallet"}
        component={() => <></>}
        options={{
          headerShown: true,
          tabBarLabel: "Comptes",
          tabBarIcon: ({size, focused}) => (
            <Icon
              name={focused ? Icons.wallet: Icons.walletOutline}
              size={size}
              color={focused ? Theme.light : Theme.primaryLight}
            />
          ),
        }}
      />
      <Tab.Screen
        name={"add-transaction"}
        component={() => {
          return <></>;
        }}
        options={{
          headerShown: true,
          tabBarLabel: "",
          tabBarIcon: ({size, focused}) => (
            <View
              style={{
                top: Platform.OS == "ios" ? -10 : -20,
                width: Platform.OS == "ios" ? wp(16) : wp(18),
                height: Platform.OS == "ios" ? wp(16) : wp(18),
                borderRadius: wp(10),
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Theme.primary,
                borderColor: Theme.light,
                borderWidth: 5,
              }}
            >
              <Icon
                name={Icons.add}
                size={size}
                color={focused ? Theme.light : Theme.light}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={'statistics'}
        component={() => <></>}
        options={{
            headerShown: true,
            tabBarLabel: "Statistiques",
            tabBarIcon: ({size, focused}) => (
              <Icon
                name={Icons.statistics}
                size={size}
                color={focused ? Theme.light : Theme.primaryLight}
              />
            ),
          }}
      />
      <Tab.Screen
        name={'financial-goals'}
        component={() => <></>}
        options={{
            headerShown: true,
            tabBarLabel: "Objectifs",
            tabBarIcon: ({size, focused}) => (
              <Icon
                name={focused ? Icons.financialGoal : Icons.financialGoalOutline}
                size={size}
                color={focused ? Theme.light : Theme.primaryLight}
              />
            ),
          }}
      />
    </Tab.Navigator>
  );
};
export default HomeScreen;
