import {Modal, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import Animated, {BounceInDown, BounceInUp} from "react-native-reanimated";
import AddAccountModalViewStyles from "./AddAccountModalView.styles.ts";
import useAddAccountModalView from "./useAddAccountModalView.ts";
import AddAccountForm from "../../Form/AddAccountForm.tsx";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IAccount from "../../../../../../../../../../../Domain/Account/Account.ts";
import useCustomTranslation from "../../../../../../../../../Shared/Hooks/useCustomTranslation.ts";
import useTheme from "../../../../../../../../../Shared/Hooks/useTheme.ts";
import { IconSizes } from "../../../../../../../../../Global/IconSizes.ts";
import { Icons } from "../../../../../../../../../Global/Icons.ts";
import { FontSize } from "../../../../../../../../../Global/FontSize.ts";
import { wp } from "../../../../../../../../../Global/Percentage.ts";
import React from "react";

type props = {
    closeModal: () => void,
    isVisible: boolean,
    isUpdate?: boolean,
    account?: IAccount,
}
const AddAccountModalView = ({closeModal, isVisible, isUpdate, account}: props) => {
    const {translate} = useCustomTranslation();
    const {colorPalette: {containerBackground, text, action1}} = useTheme();
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
                            {!isUpdate ? translate('add_account') : translate('update_account')  }
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