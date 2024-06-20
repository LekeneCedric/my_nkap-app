import ISelectCategoryItem from "../../Forms/SelectCategory/SelectCategoryItem.ts";
import {Modal, ScrollView, TouchableOpacity, View} from "react-native";
import useTheme from "../../../Shared/Hooks/useTheme.ts";
import UpdateOperationModalViewStyles from "./UpdateOperationModalView.styles.ts";
import IOperationDto from "../../../../Domain/Operation/IOperationDto.ts";
import Animated, {BounceInDown, BounceInUp} from "react-native-reanimated";
import AddOperationForm from "../../../pages/Home/AddOperations/Form/AddOperationForm.tsx";
import useUpdateOperationModalView from "./useUpdateOperationModalView.ts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../../Global/Icons.ts";
import {IconSizes} from "../../../Global/IconSizes.ts";

type props = {
    closeModal: () => void,
    isVisible: boolean,
    operation: IOperationDto
}
const UpdateOperationModalView = ({closeModal, isVisible, operation}: props) => {
    const {
        addOperationFormBehaviour,
        accounts,
        categories
    } = useUpdateOperationModalView(operation);
    const {colorPalette: {pageBackground, containerBackground, text, action1, action1Text}} = useTheme();
    const styles = UpdateOperationModalViewStyles(containerBackground);
    return (
        <Modal transparent={true} style={styles.modalContainer} animationType={'slide'} visible={isVisible}>
            <Animated.View style={{backgroundColor: containerBackground}} entering={BounceInDown.duration(1000)} exiting={BounceInUp}>
                <View style={{width: '100%', height: IconSizes.medium}}>
                    <TouchableOpacity onPress={closeModal} style={{position: 'absolute', right: 10, top: 10}}>
                        <Icon name={Icons.close} size={IconSizes.normal} color={text} />
                    </TouchableOpacity>

                </View>
                <ScrollView>
                    <AddOperationForm isUpdate={true} categories={categories} accounts={accounts}
                                      addOperationFormBehaviour={addOperationFormBehaviour}/>
                </ScrollView>

            </Animated.View>
        </Modal>
    );
};

export default UpdateOperationModalView;