import useTheme from "../../../../Shared/Hooks/useTheme.ts";
import FinancialGoalViewStyles from "./FinancialGoalView.styles.ts";
import {Animated as RNAnimated, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {hp} from "../../../../Global/Percentage.ts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../../../Global/Icons.ts";
import {IconSizes} from "../../../../Global/IconSizes.ts";
import useFinancialGoalsView from "./useFinancialGoalsView.ts";
import {IFinancialGoal} from "../../../../../../Domain/FinancialGoal/FinancialGoal.ts";
import FinancialGoalItem from "./Components/FinancialGoalItem/FinancialGoalItem.tsx";
import {LoadingState} from "../../../../../../Domain/Enums/LoadingState.ts";
import LoadingTransactionItem from "../../../../Components/TransactionItem/Loading/LoadingTransactionItem.tsx";
import {Widget} from "../../../../Components/Widget/Widget.tsx";
import {FontSize} from "../../../../Global/FontSize.ts";
import Animated, {LightSpeedInLeft, LightSpeedOutRight} from "react-native-reanimated";

const FinancialGoalsView = () => {
    const {
        bounceValue,
        navigateToAddFinancialGoals,
        financialGoals,
        loadingState,
        financialGoalsIsPendingRefreshing,
        onRefresh,
        financialGoalsFilterProps,
        updateSelectedStatus,
        currentSelectedStatus,
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
                            return <TouchableOpacity onPress={()=>{updateSelectedStatus(filter.value)}}>
                                <Widget isSelected={currentSelectedStatus === filter.value} backgroundColor={filter.backgroundColor} value={filter.value} />
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
                            filteredFinancialGoals.length === 0 && (
                                <View style={{flex: 1,alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: hp(2)}}>
                                    <Text style={{fontSize: FontSize.normal, color: text}}>{`Aucun objectif financier !`}</Text>
                                </View>
                            )
                        }
                        {
                            filteredFinancialGoals.map((financialGoal: IFinancialGoal) =>
                                <Animated.View entering={LightSpeedInLeft.duration(500)}
                                               exiting={LightSpeedOutRight.duration(50)}>
                                    <FinancialGoalItem data={financialGoal}/>
                                </Animated.View>
                            )
                        }
                    </ScrollView>
                )
            }
            <RNAnimated.View style={{
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
            </RNAnimated.View>
        </SafeAreaView>
    )
};
export default FinancialGoalsView;