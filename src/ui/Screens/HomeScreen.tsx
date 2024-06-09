import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Theme} from "../Global/Theme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../Global/Icons";
import OperationsView from "../pages/Home/Tabs/Operations/OperationsView.tsx";
import {Platform, View} from "react-native";
import {wp} from "../Global/Percentage";
import HomeScreenHeader from "../Components/HomeScreen/header/HomeScreenHeader";
import useHomeScreenView from "./useHomeScreenview";
import AddOperationView from "../pages/Home/Tabs/AddOperations/AddOperationView.tsx";
import useTheme from "../Shared/Hooks/useTheme.ts";

const Tab = createBottomTabNavigator();
const HomeScreen = () => {
    const {username} = useHomeScreenView();
    const {colorPalette: {pageBackground, containerBackground, text, gray, action1, action1Text}} = useTheme();
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: Theme.light,
                tabBarStyle: {backgroundColor: pageBackground, borderWidth: 0, borderColor: pageBackground},
                header: (props) => <HomeScreenHeader userName={username} props={props}/>
            }}
        >
            <Tab.Screen
                name={"transactions"}
                component={OperationsView}
                options={{
                    tabBarShowLabel: false,
                    headerShown: true,
                    tabBarLabel: "",
                    tabBarIcon: ({size, focused}) => (
                        <Icon
                            name={focused ? Icons.transactions : Icons.transactionsOutline}
                            size={size}
                            color={focused ? action1 : gray}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name={"comptes"}
                component={() => <></>}
                options={{
                    headerShown: true,
                    tabBarLabel: "",
                    tabBarIcon: ({size, focused}) => (
                        <Icon
                            name={focused ? Icons.wallet : Icons.walletOutline}
                            size={size}
                            color={focused ? action1 : gray}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name={"add-transaction"}
                component={AddOperationView}
                options={{
                    headerShown: false,
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
                                backgroundColor: focused ? action1 : gray,
                                borderColor: focused ? pageBackground: pageBackground,
                                borderWidth: 5,
                            }}
                        >
                            <Icon
                                name={Icons.add}
                                size={size}
                                color={focused ? action1Text : containerBackground}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name={'statistiques'}
                component={() => <></>}
                options={{
                    headerShown: true,
                    tabBarLabel: "",
                    tabBarIcon: ({size, focused}) => (
                        <Icon
                            name={Icons.statistics}
                            size={size}
                            color={focused ? action1 : gray}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name={'objectifs'}
                component={() => <></>}
                options={{
                    headerShown: true,
                    tabBarLabel: "",
                    tabBarIcon: ({size, focused}) => (
                        <Icon
                            name={focused ? Icons.financialGoal : Icons.financialGoalOutline}
                            size={size}
                            color={focused ? action1 : gray}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};
export default HomeScreen;
