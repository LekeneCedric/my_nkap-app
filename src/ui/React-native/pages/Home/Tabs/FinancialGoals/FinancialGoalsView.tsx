import useTheme from "../../../../Shared/Hooks/useTheme.ts";
import FinancialGoalViewStyles from "./FinancialGoalView.styles.ts";
import {Animated, RefreshControl, SafeAreaView, ScrollView, TouchableOpacity, View} from "react-native";
import {hp} from "../../../../Global/Percentage.ts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../../../Global/Icons.ts";
import {IconSizes} from "../../../../Global/IconSizes.ts";
import useFinancialGoalsView from "./useFinancialGoalsView.ts";
import {IFinancialGoal} from "../../../../../../Domain/FinancialGoal/FinancialGoal.ts";
import FinancialGoalItem from "./Components/FinancialGoalItem/FinancialGoalItem.tsx";
import {LoadingState} from "../../../../../../Domain/Enums/LoadingState.ts";
import Loading from "../../../../Components/Loading/Loading.tsx";
import LoadingTransactionItem from "../../../../Components/TransactionItem/Loading/LoadingTransactionItem.tsx";
import {Widget} from "../../../../Components/Widget/Widget.tsx";

const FinancialGoalsView = () => {
    const {
        bounceValue,
        navigateToAddFinancialGoals,
        financialGoals,
        loadingState,
        financialGoalsIsPendingRefreshing,
        onRefresh,
        financialGoalsFilterProps,
        filterFinancialGoalByStatus,
        filteredFinancialGoals
    } = useFinancialGoalsView();

    const {colorPalette: {pageBackground, containerBackground, text, action1, action1Text}} = useTheme();
    const styles = FinancialGoalViewStyles(pageBackground, containerBackground);

    return (
        <SafeAreaView style={styles.pageContainer}>
            <View style={{marginBottom: 15}}>
                <ScrollView horizontal={true}>
                    {
                        financialGoalsFilterProps.map((filter) => {
                            return <TouchableOpacity onPress={()=>{filterFinancialGoalByStatus(filter.value)}}>
                                <Widget backgroundColor={filter.backgroundColor} value={filter.value} />
                            </TouchableOpacity>
                        })
                    }

                </ScrollView>
            </View>
            {
                loadingState === LoadingState.pending ? (
                    <LoadingTransactionItem count={10}/>
                ) : (
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={financialGoalsIsPendingRefreshing}
                                progressBackgroundColor={action1}
                                colors={[action1Text]}
                                tintColor={action1Text}
                                titleColor={action1Text}
                                onRefresh={onRefresh}/>
                        }>
                        {
                            filteredFinancialGoals.map((financialGoal: IFinancialGoal) =>
                                <FinancialGoalItem data={financialGoal}/>
                            )
                        }
                    </ScrollView>
                )
            }
            <Animated.View style={{
                translateY: bounceValue,
                position: 'absolute',
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: action1,
                justifyContent: 'center',
                alignItems: 'center',
                right: 20,
                bottom: hp(2),
                elevation: 8,
                shadowColor: text,
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.8,
                shadowRadius: 2,
            }}
            >
                <TouchableOpacity onPress={navigateToAddFinancialGoals}>
                    <Icon name={Icons.add} size={IconSizes.medium} color={action1Text}/>
                </TouchableOpacity>
            </Animated.View>
        </SafeAreaView>
    )
};
export default FinancialGoalsView;