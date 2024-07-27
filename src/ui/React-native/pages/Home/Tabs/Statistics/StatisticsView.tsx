import {SafeAreaView, ScrollView} from "react-native";
import StatisticsViewStyle from "./StatisticsView.style.ts";
import useTheme from "../../../../Shared/Hooks/useTheme.ts";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();
const StatisticsView = () => {
    const {colorPalette: {pageBackground}} = useTheme();
    const styles = StatisticsViewStyle({
        pageContainerColor: pageBackground,
    });
    return <SafeAreaView style={[styles.pageContainer]}>
        <Tab.Navigator>
            <Tab.Screen name={'Mensuel'} component={() => <></>} />
            <Tab.Screen name={'Mensuel par catégorie'} component={() => <></>} />
        </Tab.Navigator>
    </SafeAreaView>
};
export default StatisticsView;