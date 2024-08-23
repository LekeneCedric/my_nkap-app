import useAddFinancialGoalsView from "./useAddFinancialGoalsView.ts";
import useTheme from "../../../Shared/Hooks/useTheme.ts";
import useNavigation from "../../../utils/useNavigation.ts";
import {SafeAreaView, ScrollView, TouchableOpacity, View} from "react-native";
import AddFinancialGoalsViewStyles from "./AddFinancialGoalsView.styles.ts";
import Animated, {BounceInDown, BounceInUp} from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../../Global/Icons.ts";
import {IconSizes} from "../../../Global/IconSizes.ts";
import AddFinancialGoalsForm from "./Form/AddFinancialGoalsForm.tsx";
import useCustomTranslation from "../../../Shared/Hooks/useCustomTranslation.ts";

const AddFinancialGoalsView = () => {
    const {translate} = useCustomTranslation();
    const {
        addFinancialGoalFormBehaviour,
        accounts
    } = useAddFinancialGoalsView();
    const {goBack} = useNavigation();
    const {colorPalette: {pageBackground, containerBackground, text, action1}} = useTheme();
    const styles = AddFinancialGoalsViewStyles(pageBackground, containerBackground);
    return (
        <SafeAreaView style={[styles.pageContainer, {backgroundColor: pageBackground}]}>
            <Animated.View entering={BounceInDown.duration(1000)} exiting={BounceInUp}>
                <View style={[styles.headerContainer, {backgroundColor: pageBackground, alignItems: 'center'}]}>
                    <TouchableOpacity style={{position: 'absolute', left: 15}} onPress={goBack}>
                        <Icon
                            name={Icons.back}
                            size={IconSizes.medium}
                            color={text}
                        />
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Animated.Text style={[styles.title, {color: text}]}>{translate('new_financial_goal')}</Animated.Text>
                        <Icon name={Icons.financialGoal} size={IconSizes.medium} color={action1}/>
                    </View>
                </View>
                <ScrollView>
                    <AddFinancialGoalsForm accounts={accounts} addFinancialGoalsFormBehaviour={addFinancialGoalFormBehaviour}/>
                </ScrollView>
            </Animated.View>
        </SafeAreaView>
    )
};
export default AddFinancialGoalsView;