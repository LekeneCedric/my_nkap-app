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
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.subjectTitle}>Dépenses du mois de mai</Text>
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
                    <ScrollView horizontal={true}>
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
                                backgroundGradientFrom: pageBackground,
                                backgroundGradientFromOpacity: 1,
                                backgroundGradientTo: pageBackground,
                                backgroundGradientToOpacity: 1,
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.info}>Comment les dépenses sont calculés ? </Text>
                    <Icon name={Icons.info} size={IconSizes.normal} color={action1}/>
                </TouchableOpacity>
                <View style={{width: '100%', padding: 3, backgroundColor: gray, borderRadius: 10, marginTop: 10}}/>

                <View style={styles.header}>
                    <Text style={styles.subjectTitle}>Épargne du mois de mai</Text>
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
                    <ScrollView horizontal={true}>
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
                                margin: 0
                            }}
                            chartConfig={{
                                backgroundGradientFrom: pageBackground,
                                backgroundGradientFromOpacity: 1,
                                backgroundGradientTo: pageBackground,
                                backgroundGradientToOpacity: 1,
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.info}>Comment mon épargne est calculé ? </Text>
                    <Icon name={Icons.info} size={IconSizes.normal} color={action1}/>
                </TouchableOpacity>
                <View style={{width: '100%', padding: 3, backgroundColor: gray, borderRadius: 10, marginTop: 10}}/>
            </ScrollView>
        </View>)
};
export default MonthlyStatisticsView;