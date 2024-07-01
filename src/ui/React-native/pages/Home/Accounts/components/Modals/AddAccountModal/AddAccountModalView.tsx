import {Modal, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import Animated, {BounceInDown, BounceInUp} from "react-native-reanimated";
import useTheme from "../../../../../../Shared/Hooks/useTheme.ts";
import AddAccountModalViewStyles from "./AddAccountModalView.styles.ts";
import useAddAccountModalView from "./useAddAccountModalView.ts";
import AddAccountForm from "../../Form/AddAccountForm.tsx";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../../../../../Global/Icons.ts";
import {IconSizes} from "../../../../../../Global/IconSizes.ts";
import {FontSize} from "../../../../../../Global/FontSize.ts";
import {wp} from "../../../../../../Global/Percentage.ts";
import IAccount from "../../../../../../../../Domain/Account/Account.ts";

type props = {
    closeModal: () => void,
    isVisible: boolean,
    isUpdate?: boolean,
    account?: IAccount,
}
const AddAccountModalView = ({closeModal, isVisible, isUpdate, account}: props) => {
    const {colorPalette: {pageBackground, containerBackground, text, action1, action1Text}} = useTheme();
    const styles = AddAccountModalViewStyles(containerBackground);
    const {
        addAccountFormBehaviour,
        onDeleteAccount,
    } = useAddAccountModalView(closeModal, isUpdate, account);
    return <>
        <Modal transparent={true} style={styles.modalContainer} animationType={'slide'} visible={isVisible}>
            <Animated.View style={styles.container} entering={BounceInDown.duration(1000)} exiting={BounceInUp}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
                    <TouchableOpacity onPress={closeModal} style={{position: 'absolute', left: wp(2)}}>
                        <Icon name={Icons.back} color={text} size={IconSizes.medium} />
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Icon name={Icons.wallet} size={IconSizes.normal} color={action1} />
                        <Text numberOfLines={1} style={{fontSize: FontSize.medium, color: text, fontWeight: 'bold'}}>
                            {!isUpdate ? 'Ajouter un nouveau compte' : 'Modification du compte'  }
                        </Text>
                    </View>
                </View>
                <ScrollView>
                    <TouchableWithoutFeedback>
                        <AddAccountForm
                            isUpdate={isUpdate}
                            account={account}
                            addAccountFormBehaviour={addAccountFormBehaviour}
                            onDeleteAccount={onDeleteAccount}
                        />
                    </TouchableWithoutFeedback>
                </ScrollView>
            </Animated.View>
        </Modal>
    </>
};
export default AddAccountModalView;