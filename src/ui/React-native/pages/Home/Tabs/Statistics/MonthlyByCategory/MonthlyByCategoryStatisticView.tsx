import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import MonthlyByCategoryStatisticStyles from "./MonthlyByCategoryStatisticStyles.ts";
import useTheme from "../../../../../Shared/Hooks/useTheme.ts";
import {PieChart} from "react-native-chart-kit";
import {hp, wp} from "../../../../../Global/Percentage.ts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {IconSizes} from "../../../../../Global/IconSizes.ts";
import useMonthlyByCategoryStatisticView from "./useMonthlyByCategoryStatisticView.ts";
import {CustomWidget} from "../../../../../Components/Widget/Widget.tsx";
import useMoneyParser from "../../../../../Shared/useMoneyParser.ts";
import {FontSize} from "../../../../../Global/FontSize.ts";
import useCustomTranslation from "../../../../../Shared/Hooks/useCustomTranslation.ts";
import { LoadingState } from "../../../../../../../Domain/Enums/LoadingState.ts";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Loading from "../../../../../Components/Loading/Loading.tsx";
import { useAppSelector } from "../../../../../../../app/hook.ts";
import { selectCurrentTheme } from "../../../../../../../Feature/Configuration/ConfigurationSelector.ts";

const MonthlyByCategoryStatisticView = () => {
  const {translate} = useCustomTranslation();
  const {
    incomesChartData,
    incomesStatsData,
    expensesChartData,
    expensesStatsData,
    isShowIncomes,
    switchIsShowIncomes,
    loadingState,
  } = useMonthlyByCategoryStatisticView();
  const {parseThousand} = useMoneyParser();
  const currenTheme = useAppSelector(selectCurrentTheme);
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
  const styles = MonthlyByCategoryStatisticStyles({
    pageBackground: pageBackground,
    containerBackground: containerBackground,
    text: text,
  });

  return (
    <View style={styles.container}>
        {
            loadingState == LoadingState.pending && (
                <View style={{flex: 1,flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                   <Loading
                   color={action1}
                   textColor={text}
                   message= {translate('load_stats_data')}/> 
                </View>
            )
        }
        {
            loadingState == LoadingState.success &&
            incomesStatsData.length === 0 &&
            expensesStatsData.length === 0 &&
            (
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
      {
      loadingState == LoadingState.success &&
      (incomesStatsData.length > 0 || expensesStatsData.length > 0) &&
       (
        <>
          <View style={{alignItems: "center"}}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  switchIsShowIncomes(false);
                }}
              >
                <CustomWidget
                  backgroundColor={red}
                  value={`${translate("expense")}s`}
                  isSelected={!isShowIncomes}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  switchIsShowIncomes(true);
                }}
              >
                <CustomWidget
                  backgroundColor={green}
                  value={`${translate("income")}s`}
                  isSelected={isShowIncomes}
                />
              </TouchableOpacity>
            </View>

            <ScrollView horizontal={true}>
              <PieChart
                
                data={isShowIncomes ? incomesChartData : expensesChartData}
                width={wp(90)}
                height={hp(25)}
                accessor={"population"}
                backgroundColor={containerBackground}
                paddingLeft={"15"}
                center={[0, 0]}
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                  paddingRight: 0,
                  paddingLeft: 0,
                  paddingBottom: 0,
                  margin: 0,
                }}
                chartConfig={{
                  backgroundColor: containerBackground,
                  backgroundGradientFrom: containerBackground,
                  backgroundGradientFromOpacity: 1,
                  backgroundGradientTo: containerBackground,
                  backgroundGradientToOpacity: 1,
                  color: () => text,
                  propsForLabels: {
                    fontSize: FontSize.normal,
                  },
                  strokeWidth: 2, // optional, default 3
                  propsForDots: {
                    r: "3",
                    strokeWidth: "2",
                    stroke: text,
                  },
                  fillShadowGradient: action1, // Bar color
                  fillShadowGradientOpacity: 1, // Full opacity for solid color
                }}
              />
            </ScrollView>
            <View style={[styles.tableRowContainer]}>
              <Text style={[styles.tableColTitle, {flex: 4, color: currenTheme == 'dark' ? containerBackground : gray}]}>
                {translate("category")}
              </Text>
              {/*<Text style={[styles.tableColTitle, {flex: 1}]}>%</Text>*/}
              <Text
                style={[
                  styles.tableColTitle,
                  {flex: 2, textAlign: "center", color: currenTheme == 'dark' ? containerBackground: gray},
                ]}
              >
                {translate("amount")}(XAF)
              </Text>
            </View>
          </View>
          <View style={{paddingBottom: 60, flex: 1}}>
            <ScrollView>
              {/*<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>*/}
              {/*    <Text style={styles.title}>{`${month} ${year}`}</Text>*/}
              {/*</View>*/}

              <View>
                <ScrollView>
                  {(isShowIncomes ? incomesStatsData : expensesStatsData).map(
                    item => {
                      return (
                        <View
                          style={[
                            styles.tableRowContainer,
                            {marginTop: 4, paddingBottom: 10},
                          ]}
                        >
                          <View
                            style={[
                              styles.tableColCategory,
                              {flex: 4, padding: 10},
                            ]}
                          >
                            <Icon
                              name={item.icon}
                              color={item.color}
                              size={IconSizes.normal}
                            />
                            <Text
                              style={[styles.tableColItem, {paddingLeft: 2}]}
                              numberOfLines={1}
                            >
                              {item.label}
                            </Text>
                          </View>
                          {/*<Text style={[styles.tableColItem, {flex: 1}]} numberOfLines={1}>{item.percentage}</Text>*/}
                          <Text
                            style={[
                              styles.tableColItem,
                              {flex: 2, textAlign: "center", padding: 10, fontWeight: 'bold'},
                            ]}
                            numberOfLines={1}
                          >
                            {parseThousand(item.amount)}
                          </Text>
                        </View>
                      );
                    },
                  )}
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
};
export default MonthlyByCategoryStatisticView;
