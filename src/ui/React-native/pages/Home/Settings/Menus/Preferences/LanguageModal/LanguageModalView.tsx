import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import useTheme from "../../../../../../Shared/Hooks/useTheme";
import LanguageModalStyles from "./LanguageModal.styles";
import Animated, { BounceInDown, BounceInUp } from "react-native-reanimated";
import { FontSize } from "../../../../../../Global/FontSize";
import { Lang, Languages } from "../../../../../../Shared/Constants/Languages";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Icons } from "../../../../../../Global/Icons";
import { IconSizes } from "../../../../../../Global/IconSizes";
import useCustomTranslation from "../../../../../../Shared/Hooks/useCustomTranslation";

type props = {
    closeModal: () => void,
    isVisible: boolean,
    currentLanguage: string,
}
const LanguageModalView = ({closeModal, isVisible, currentLanguage}: props) => {
    const {translate, changeLanguage} = useCustomTranslation();
    const {colorPalette: {containerBackground, text, action1, gray}} = useTheme();
    const styles = LanguageModalStyles(containerBackground);
    return <Modal style={styles.modalContainer} transparent={true} animationType={'slide'} visible={isVisible}>
                <Animated.View  entering={BounceInDown.duration(1000)} exiting={BounceInUp.duration(1000)}  style={styles.container}>
                <View style={{borderBottomColor: gray, borderBottomWidth: 0.3, top: 0}}>
                                <Text style={{fontWeight: 'bold', fontSize: FontSize.medium, marginLeft: 10, marginBottom: 5, color: text}}>{translate('languages')}</Text>
                        </View>
                        <View style={{padding: 10, flex: 0.8}}>
                            <ScrollView>
                                {
                                Languages.map((lang: Lang) => {
                                    return <TouchableOpacity style={{flexDirection: 'row', margin: 10}} onPress={() => {
                                        changeLanguage(lang.code);
                                        closeModal();
                                    }}>
                                        <Icon style={{flex: 1}}
                                              name={lang.code == currentLanguage ? Icons.circle.checked : Icons.circle.unChecked}
                                              size={IconSizes.normal}
                                              color={lang.code == currentLanguage ? action1: text}
                                        />
                                        <View style={{flex: 11, flexDirection: 'row', alignItems: 'center'}}>
                                            <Text style={{
                                                fontSize: FontSize.normal,
                                                color: text,
                                                marginLeft: 10
                                            }}>{translate(lang.label)}</Text>
                                        </View>
                                        
                                    </TouchableOpacity>
                                })
                            }
                            </ScrollView>
                        </View>
                        <View style={{borderTopWidth: 0.3, bottom: 0, position: 'absolute', width: '100%', borderTopColor: gray, flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <TouchableOpacity onPress={closeModal} style={{padding: 10}}>
                                <Text style={{fontWeight: 'bold', color: text, alignSelf: 'flex-end'}}>{translate('cancel')}</Text>
                            </TouchableOpacity>
                        </View>
                </Animated.View>
    </Modal>
};

export default LanguageModalView;