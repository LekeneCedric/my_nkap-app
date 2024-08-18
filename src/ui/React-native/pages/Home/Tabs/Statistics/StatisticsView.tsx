import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import StatisticsViewStyle from "./StatisticsView.style.ts";
import useTheme from "../../../../Shared/Hooks/useTheme.ts";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {Theme} from "../../../../Global/Theme.ts";
import {FontSize} from "../../../../Global/FontSize.ts";
import MonthlyStatisticsView from "./MonthlyStatistic/MonthlyStatisticsView.tsx";
import MonthlyByCategoryStatisticView from "./MonthlyByCategory/MonthlyByCategoryStatisticView.tsx";
import {wp} from "../../../../Global/Percentage.ts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../../../Global/Icons.ts";
import {IconSizes} from "../../../../Global/IconSizes.ts";
import useStatistics from "./useStatistics.ts";

const Tab = createMaterialTopTabNavigator();
const StatisticsView = () => {
    const {
        handlePreviousMonth,
        handleNextMonth,
        currentMonth
    } = useStatistics();
    const {colorPalette: {pageBackground, containerBackground, gray, red, text, action1, green}} = useTheme();
    const styles = StatisticsViewStyle({
        pageContainerColor: pageBackground,
    });
    return <SafeAreaView style={[styles.pageContainer]}>
        <Tab.Navigator
            screenOptions={({route}) => ({
                    tabBarActiveTintColor: text,
                    tabBarStyle: {
                        backgroundColor: pageBackground,
                        borderWidth: 0,
                        borderColor: pageBackground,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    tabBarLabelStyle: {
                        fontSize: FontSize.normal,
                        textTransform: 'none'
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: action1,
                    }
                }
            )}
        >
            <Tab.Screen
                name={'Bilan mensuel'}
                component={MonthlyStatisticsView}
            />
            <Tab.Screen
                name={'Bilan par catégorie'}
                component={MonthlyByCategoryStatisticView} />
        </Tab.Navigator>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            backgroundColor: pageBackground,
            padding: 10,
            position: 'absolute',
            bottom: 0,
            height: 50,
            width: wp(100),
            alignSelf: 'center'
        }}>
            <TouchableOpacity onPress={handlePreviousMonth}>
                <Icon name={Icons.chevron.left} color={text} size={IconSizes.normMed}/>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text numberOfLines={1} style={{color: action1, fontSize: FontSize.normal, marginRight: 5}}>
                    {currentMonth()}
                </Text>
                <Icon name={Icons.calendar} color={action1} size={IconSizes.normMed}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNextMonth}>
                <Icon name={Icons.chevron.right} color={text} size={IconSizes.normMed}/>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
};
export default StatisticsView;