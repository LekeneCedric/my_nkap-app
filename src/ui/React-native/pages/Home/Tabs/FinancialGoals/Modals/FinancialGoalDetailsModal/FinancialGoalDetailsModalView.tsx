import {IFinancialGoal} from "../../../../../../../../Domain/FinancialGoal/FinancialGoal.ts";
import useFinancialGoalDetailsModalView from "./useFinancialGoalDetailsModalView.ts";
import {Modal, ScrollView, Text, TouchableOpacity, View} from "react-native";
import useTheme from "../../../../../../Shared/Hooks/useTheme.ts";
import FinancialGoalDetailsModalViewStyles from "./FinancialGoalDetailsModalView.styles.ts";
import Animated, {BounceInDown, BounceInUp} from "react-native-reanimated";
import {IconSizes} from "../../../../../../Global/IconSizes.ts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../../../../../Global/Icons.ts";
import AddFinancialGoalsForm from "../../../../AddFinancialGoals/Form/AddFinancialGoalsForm.tsx";
import {FontSize} from "../../../../../../Global/FontSize.ts";
import useCustomTranslation from "../../../../../../Shared/Hooks/useCustomTranslation.ts";

type props = {
    closeModal: () => void,
    isVisible: boolean,
    data: IFinancialGoal
}
const FinancialGoalDetailsModalView = ({closeModal, isVisible, data}: props) => {
    const {
        translate
    } = useCustomTranslation();
    const {
        addFinancialGoalFormBehaviour,
        accounts,
        deleteFinancialGoal
    } = useFinancialGoalDetailsModalView(data);
    const {colorPalette: {pageBackground, containerBackground, text, action1, action1Text}} = useTheme();
    const styles = FinancialGoalDetailsModalViewStyles({
        containerBackground: containerBackground,
    });
    return (
        <Modal transparent={true} style={styles.modalContainer} animationType={'slide'} visible={isVisible}>
            <Animated.View style={{backgroundColor: containerBackground}} entering={BounceInDown.duration(1000)}
                           exiting={BounceInUp}>

                <View style={{width: '100%', height: IconSizes.medium, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: text, fontSize: FontSize.medium, fontWeight: 'bold'}}>{translate('update_financial_goal')}</Text>
                    <TouchableOpacity onPress={closeModal} style={{position: 'absolute', right: 10, top: 10}}>
                        <Icon name={Icons.close} size={IconSizes.normal} color={text}/>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <AddFinancialGoalsForm
                        isUpdate={true}
                        addFinancialGoalsFormBehaviour={addFinancialGoalFormBehaviour}
                        accounts={accounts}
                        onDeleteFinancialGoal={() => {
                            deleteFinancialGoal();
                            closeModal();
                        }}
                    />
                </ScrollView>
            </Animated.View>
        </Modal>
    )
};
export default FinancialGoalDetailsModalView;