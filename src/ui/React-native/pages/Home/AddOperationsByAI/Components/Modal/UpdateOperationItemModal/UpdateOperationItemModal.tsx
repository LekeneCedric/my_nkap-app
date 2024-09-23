import { Modal, ScrollView, TouchableOpacity, View } from "react-native";
import { OperationProcessingByAI } from "../../../../../../../../Feature/AIOperations/Thunks/ProcessingByAI/ProcessingByAIResponse";
import useTheme from "../../../../../../Shared/Hooks/useTheme";
import UpdateOperationItemModalStyles from "./UpdateOperationItemModal.styles";
import Animated, { BounceInDown, BounceInUp } from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Icons } from "../../../../../../Global/Icons";
import { IconSizes } from "../../../../../../Global/IconSizes";
import AddOperationForm from "../../../../AddOperations/Form/AddOperationForm";
import useUpdateOperationItemModal from "./useUpdateOperationItemModal";

type props = {
    closeModal: () => void,
    isVisible: boolean,
    data: OperationProcessingByAI
}
const UpdateOperationItemModal = ({closeModal, isVisible, data}: props) => {
    const {
        addOperationFormBehaviour,
        accounts,
        categories,
        deleteOperation
    } = useUpdateOperationItemModal(data, closeModal);
    const {colorPalette: {containerBackground, text}} = useTheme();
    const styles = UpdateOperationItemModalStyles(containerBackground);
    return (
        <Modal transparent={true} style={styles.modalContainer} animationType={'slide'} visible={isVisible}>
                    <Animated.View style={{backgroundColor: containerBackground}} entering={BounceInDown.duration(1000)} exiting={BounceInUp}>
                    <View style={{width: '100%', height: IconSizes.medium}}>
                        <TouchableOpacity onPress={closeModal} style={{position: 'absolute', right: 10, top: 10}}>
                         <Icon name={Icons.close} size={IconSizes.normal} color={text} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                        <AddOperationForm
                            isUpdate={true}
                            onDeleteOperation={deleteOperation}
                            addOperationFormBehaviour={addOperationFormBehaviour}
                            accounts={accounts}
                            categories={categories}
                        />
                    </ScrollView>
                    </Animated.View>

        </Modal>
    )
};
export default UpdateOperationItemModal;