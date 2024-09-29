import { Animated, Modal } from "react-native";
import UpdateCategoryModalStyles from "./UpdateCategoryModal.styles";
import useTheme from "../../../../../../../Shared/Hooks/useTheme";

type props = {
    closeModal: () => void,
    isVisible: boolean,
}
const UpdateCategoryModal = ({closeModal, isVisible}: props) => {
    const {colorPalette: {containerBackground}} = useTheme();
    const styles = UpdateCategoryModalStyles(containerBackground);
    return (
        <Modal style={styles.modalContainer} transparent={true}  animationType={'slide'} visible={isVisible}>
            <Animated.View style={styles.container}>
                
            </Animated.View>
        </Modal>
    );
};

export default UpdateCategoryModal;