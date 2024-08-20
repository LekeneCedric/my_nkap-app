import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import useTheme from "../../../../../Shared/Hooks/useTheme.ts";
import MonthlyStatisticsStyles from "./MonthlyStatisticsStyles.ts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../../../../Global/Icons.ts";
import {IconSizes} from "../../../../../Global/IconSizes.ts";
import {FontSize} from "../../../../../Global/FontSize.ts";
import {BarChart} from "react-native-chart-kit";
import {wp} from "../../../../../Global/Percentage.ts";
import useMonthlyStatistics from "./useMonthlyStatistics.ts";

const MonthlyStatisticsView = () => {
    const {
        monthlyStatistics,
        month
    } = useMonthlyStatistics();
    const {colorPalette: {pageBackground, containerBackground, gray, red, text, action1, green}} = useTheme();
    const styles = MonthlyStatisticsStyles(
        {
            pageBackground: pageBackground,
            text: text,
            backgroundContainer: containerBackground
        }
    );
    const incomesData = {
        labels: monthlyStatistics.incomes?.months ?? [],
        datasets: [
            {
                data: monthlyStatistics.incomes?.data ?? [],
            }
        ]
    };
    const expensesData = {
        labels: monthlyStatistics.expenses?.months ?? [],
        datasets: [
            {
                data: monthlyStatistics.expenses?.data ?? [],
            }
        ]
    }
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.subjectTitle}>Dépenses du mois de {month}</Text>
                    <Text style={[styles.subjectTitle, {color: action1}]}>Voir plus</Text>
                </View>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon
                            size={IconSizes.medium}
                            name={monthlyStatistics.expenses?.difference! > 0 ? Icons.chevron.down: Icons.chevron.up}
                            color={monthlyStatistics.expenses?.difference! > 0 ? red : green}
                        />
                        <Text style={{fontSize: FontSize.normal, color: monthlyStatistics.expenses?.difference! > 0 ? red : green}}>{monthlyStatistics.expenses?.difference} XAF</Text>
                    </View>
                    <Text style={{fontSize: FontSize.normal, color: text, marginLeft: 10}}>du mois passé</Text>
                </View>
                <View style={styles.statContainer}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <BarChart
                            data={expensesData}
                            width={wp(100)}
                            height={300}
                            showValuesOnTopOfBars={true}
                            withHorizontalLabels={true}
                            withInnerLines={true}
                            fromZero={true}
                            style={{
                                marginVertical: 8,
                                borderRadius: 16,
                                paddingRight: 0,
                                paddingLeft: 0,
                                paddingBottom: 0,
                                margin: 0
                            }}
                            chartConfig={{
                                backgroundGradientFrom: containerBackground,
                                backgroundGradientFromOpacity: 1,
                                backgroundGradientTo: containerBackground,
                                backgroundGradientToOpacity: 1,
                                color: (opacity = 1) => text,
                                labelColor: (opacity = 1) => text,
                                strokeWidth: 2, // optional, default 3
                                barPercentage: 1.5,
                                propsForDots: {
                                    r: "6",
                                    strokeWidth: "2",
                                    stroke: text
                                },
                                fillShadowGradient: action1, // Bar color
                                fillShadowGradientOpacity: 1,  // Full opacity for solid color
                            }}
                            verticalLabelRotation={0}
                        />
                    </ScrollView>
                </View>

                <View style={styles.header}>
                    <Text style={styles.subjectTitle}>Épargne du mois de {month}</Text>
                    <Text style={[styles.subjectTitle, {color: action1}]}>Voir plus</Text>
                </View>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon size={IconSizes.medium} name={ monthlyStatistics.incomes?.difference! < 0 ? Icons.chevron.down : Icons.chevron.up} color={monthlyStatistics.incomes?.difference! < 0 ? red : green}/>
                        <Text style={{fontSize: FontSize.normal, color: monthlyStatistics.incomes?.difference! < 0 ? red : green}}>{monthlyStatistics.incomes?.difference} XAF</Text>
                    </View>
                    <Text style={{fontSize: FontSize.normal, color: text, marginLeft: 10}}>du mois passé</Text>
                </View>
                <View style={styles.statContainer}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <BarChart
                            data={incomesData}
                            width={wp(100)}
                            height={300}
                            showValuesOnTopOfBars={true}
                            withHorizontalLabels={true}
                            withInnerLines={true}
                            fromZero={true}

                            style={{
                                marginVertical: 8,
                                borderRadius: 16,
                                paddingRight: 0,
                                paddingLeft: 0,
                                paddingBottom: 0,
                                margin: 0,
                            }}
                            chartConfig={{
                                backgroundGradientFrom: containerBackground,
                                backgroundGradientFromOpacity: 1,
                                backgroundGradientTo: containerBackground,
                                backgroundGradientToOpacity: 1,
                                color: (opacity = 1) => text,
                                labelColor: (opacity = 1) => text,
                                strokeWidth: 2, // optional, default 3
                                barPercentage: 1.5,
                                propsForDots: {
                                    r: "6",
                                    strokeWidth: "2",
                                    stroke: text
                                },
                                fillShadowGradient: action1, // Bar color
                                fillShadowGradientOpacity: 1,  // Full opacity for solid color
                            }}
                            verticalLabelRotation={0}
                        />
                    </ScrollView>
                </View>
            </ScrollView>
        </View>)
};
export default MonthlyStatisticsView;