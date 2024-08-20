import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import MonthlyByCategoryStatisticStyles from "./MonthlyByCategoryStatisticStyles.ts";
import useTheme from "../../../../../Shared/Hooks/useTheme.ts";
import {PieChart} from "react-native-chart-kit";
import {wp} from "../../../../../Global/Percentage.ts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {IconSizes} from "../../../../../Global/IconSizes.ts";
import useMonthlyByCategoryStatisticView from "./useMonthlyByCategoryStatisticView.ts";
import {CustomWidget} from "../../../../../Components/Widget/Widget.tsx";
import useMoneyParser from "../../../../../Shared/useMoneyParser.ts";

const MonthlyByCategoryStatisticView = () => {
    const {
        incomesChartData,
        incomesStatsData,
        expensesChartData,
        expensesStatsData,
        isShowIncomes,
        switchIsShowIncomes,
    } = useMonthlyByCategoryStatisticView();
    const {
        parseThousand,
    } = useMoneyParser();
    const {colorPalette: {pageBackground, containerBackground, gray, red, text, action1, green}} = useTheme();
    const styles = MonthlyByCategoryStatisticStyles({pageBackground: pageBackground, containerBackground: containerBackground, text: text});

    return <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={()=>{switchIsShowIncomes(false)}}>
                <CustomWidget
                    backgroundColor={red}
                    value={'Dépenses'}
                    isSelected={!isShowIncomes}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{switchIsShowIncomes(true)}}>
                <CustomWidget
                    backgroundColor={green}
                    value={'Épargne'}
                    isSelected={isShowIncomes}
                />
            </TouchableOpacity>
        </View>
        <ScrollView style={{top: 10}}>
            {/*<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>*/}
            {/*    <Text style={styles.title}>{`${month} ${year}`}</Text>*/}
            {/*</View>*/}
            <ScrollView horizontal={true}>
                <PieChart
                    data={isShowIncomes ? incomesChartData : expensesChartData}
                    width={wp(100)}
                    height={200}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                        paddingRight: 0,
                        paddingLeft: 0,
                        paddingBottom: 0,
                        margin: 0
                    }}
                    chartConfig={{
                        backgroundColor: containerBackground,
                        backgroundGradientFrom: containerBackground,
                        backgroundGradientFromOpacity: 1,
                        backgroundGradientTo: containerBackground,
                        backgroundGradientToOpacity: 1,
                        color: (opacity = 1) => text,
                        strokeWidth: 2, // optional, default 3
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: text
                        },
                        fillShadowGradient: action1, // Bar color
                        fillShadowGradientOpacity: 1,  // Full opacity for solid color
                    }}
                />
            </ScrollView>


            <View style={[styles.tableRowContainer]}>
                <Text style={[styles.tableColTitle, {flex: 4, color: action1}]}>Catégorie</Text>
                {/*<Text style={[styles.tableColTitle, {flex: 1}]}>%</Text>*/}
                <Text style={[styles.tableColTitle, {flex: 2, textAlign: 'center', color: action1}]}>Montant (XAF)</Text>
            </View>
            {
                (isShowIncomes ? incomesStatsData : expensesStatsData).map((item) => {
                    return (
                        <View style={[styles.tableRowContainer,{marginTop: 4, paddingBottom: 10}]}>
                            <View style={[styles.tableColCategory, {flex: 4, padding: 10}]}>
                                <Icon name={item.icon} color={item.color} size={IconSizes.normal} />
                                <Text style={[styles.tableColItem, {paddingLeft: 2}]} numberOfLines={1}>{item.label}</Text>
                            </View>
                            {/*<Text style={[styles.tableColItem, {flex: 1}]} numberOfLines={1}>{item.percentage}</Text>*/}
                            <Text style={[styles.tableColItem, {flex: 2, textAlign: 'center', padding: 10}]} numberOfLines={1}>{parseThousand(item.amount)}</Text>
                        </View>
                    )
                })
            }


        </ScrollView>
    </View>
};
export default MonthlyByCategoryStatisticView;