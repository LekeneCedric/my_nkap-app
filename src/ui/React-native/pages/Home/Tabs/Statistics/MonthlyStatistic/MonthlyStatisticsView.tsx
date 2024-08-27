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
import useCustomTranslation from "../../../../../Shared/Hooks/useCustomTranslation.ts";
import useMoneyParser from "../../../../../Shared/useMoneyParser.ts";
import {LoadingState} from "../../../../../../../Domain/Enums/LoadingState.ts";

const MonthlyStatisticsView = () => {
  const {currentLanguage} = useCustomTranslation();
  const {translate} = useCustomTranslation();
  const {parseThousand} = useMoneyParser();
  const {monthlyStatistics, month, loadingState} =
    useMonthlyStatistics(currentLanguage);
  const {
    colorPalette: {
      pageBackground,
      containerBackground,
      gray,
      red,
      text,
      action1,
      green,
    },
  } = useTheme();
  const styles = MonthlyStatisticsStyles({
    pageBackground: pageBackground,
    text: text,
    backgroundContainer: containerBackground,
  });
  const incomesData = {
    labels: monthlyStatistics.incomes?.months ?? [],
    datasets: [
      {
        data: monthlyStatistics.incomes?.data ?? [],
      },
    ],
  };
  const expensesData = {
    labels: monthlyStatistics.expenses?.months ?? [],
    datasets: [
      {
        data: monthlyStatistics.expenses?.data ?? [],
      },
    ],
  };
  return (
    <View style={styles.container}>
      {loadingState == LoadingState.pending && (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
          <Text
            style={{
              color: text,
              fontSize: FontSize.medium,
            }}>
            {translate("any_stats_data")}
          </Text>
        </View>
      )}
      {
        loadingState == LoadingState.success && 
        ((monthlyStatistics.incomes?.data ?? []).length == 0 ||
          (monthlyStatistics.expenses?.data ?? []).length == 0) && (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                   <Text style={{
                    color: text,
                    fontSize: FontSize.medium,
                   }}>
                    {translate('any_stats_data')}
                    </Text> 
                </View>
          )
      }
      {loadingState == LoadingState.success &&
        ((monthlyStatistics.incomes?.data ?? []).length > 0 ||
          (monthlyStatistics.expenses?.data ?? []).length > 0) && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <Text numberOfLines={1} style={[styles.subjectTitle, {flex: 4}]}>
                {" "}
                {translate("expense")}s
              </Text>
              <Text
                numberOfLines={1}
                style={[
                  styles.subjectTitle,
                  {color: action1, flex: 2, textAlign: "right"},
                ]}
              >
                {translate("see_more")}
              </Text>
            </View>
            <View style={{alignItems: "center", flexDirection: "row"}}>
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <Icon
                  size={IconSizes.medium}
                  name={
                    monthlyStatistics.expenses?.difference! > 0
                      ? Icons.chevron.down
                      : Icons.chevron.up
                  }
                  color={
                    monthlyStatistics.expenses?.difference! > 0 ? red : green
                  }
                />
                <Text
                  style={{
                    fontSize: FontSize.normal,
                    color:
                      monthlyStatistics.expenses?.difference! > 0 ? red : green,
                  }}
                >
                  {parseThousand(monthlyStatistics.expenses?.difference ?? 0)}{" "}
                  XAF
                </Text>
              </View>
              <Text
                style={{fontSize: FontSize.normal, color: text, marginLeft: 10}}
              >
                {translate("from_previous_month")}
              </Text>
            </View>
            <View style={styles.statContainer}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <BarChart
                  data={expensesData}
                  width={wp(92)}
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
                    color: () => text,
                    labelColor: () => text,
                    strokeWidth: 2,
                    barPercentage: 1.5,
                    propsForLabels: {
                      fontSize: FontSize.normal,
                    },
                    propsForDots: {
                      r: "6",
                      strokeWidth: "2",
                      stroke: text,
                    },
                    fillShadowGradient: action1,
                    fillShadowGradientOpacity: 1,
                  }}
                  verticalLabelRotation={0}
                />
              </ScrollView>
            </View>

            <View style={styles.header}>
              <Text numberOfLines={1} style={[styles.subjectTitle, {flex: 4}]}>
                {translate("income")}s
              </Text>
              <Text
                numberOfLines={1}
                style={[
                  styles.subjectTitle,
                  {color: action1, flex: 2, textAlign: "right"},
                ]}
              >
                {translate("see_more")}
              </Text>
            </View>
            <View style={{alignItems: "center", flexDirection: "row"}}>
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <Icon
                  size={IconSizes.medium}
                  name={
                    monthlyStatistics.incomes?.difference! < 0
                      ? Icons.chevron.down
                      : Icons.chevron.up
                  }
                  color={
                    monthlyStatistics.incomes?.difference! < 0 ? red : green
                  }
                />
                <Text
                  style={{
                    fontSize: FontSize.normal,
                    color:
                      monthlyStatistics.incomes?.difference! < 0 ? red : green,
                  }}
                >
                  {parseThousand(monthlyStatistics.incomes?.difference ?? 0)}{" "}
                  XAF
                </Text>
              </View>
              <Text
                style={{fontSize: FontSize.normal, color: text, marginLeft: 10}}
              >
                {translate("from_previous_month")}
              </Text>
            </View>
            <View style={styles.statContainer}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <BarChart
                  data={incomesData}
                  width={wp(92)}
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
                      stroke: text,
                    },
                    propsForLabels: {
                      fontSize: FontSize.normal,
                    },
                    fillShadowGradient: action1, // Bar color
                    fillShadowGradientOpacity: 1, // Full opacity for solid color
                  }}
                  verticalLabelRotation={0}
                />
              </ScrollView>
            </View>
          </ScrollView>
        )}
    </View>
  );
};
export default MonthlyStatisticsView;
