import {Modal, Pressable, Text, TouchableOpacity, View} from "react-native";
import Animated, {BounceInDown, BounceInUp} from "react-native-reanimated";
import useTheme from "../../../../../../Shared/Hooks/useTheme.ts";
import ThemeModalViewStyles from "./ThemeModalView.styles.ts";
import {FontSize} from "../../../../../../Global/FontSize.ts";
import {useAppDispatch} from "../../../../../../../../app/hook.ts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {IconSizes} from "../../../../../../Global/IconSizes.ts";
import {Icons} from "../../../../../../Global/Icons.ts";
import {SwitchTheme, Themes as ThemeEnum} from "../../../../../../../../Feature/Configuration/ConfigurationSlice.ts";
import useCustomTranslation from "../../../../../../Shared/Hooks/useCustomTranslation.ts";
import React from "react";

type props = {
    closeModal: () => void;
    isVisible: boolean;
    currentTheme: ThemeEnum,
}
const ThemeModalView = ({closeModal, isVisible, currentTheme}: props) => {
    const {
        translate
    } = useCustomTranslation();
    const {colorPalette: {pageBackground, containerBackground, action1, text, gray }} = useTheme();
    const styles = ThemeModalViewStyles(pageBackground, containerBackground, text, action1);
    const dispatch = useAppDispatch();
    const themes: ThemeEnum[] = [ThemeEnum.SYSTEM, ThemeEnum.LIGHT, ThemeEnum.DARK];
    const changeTheme = (theme: ThemeEnum) => {
        dispatch(SwitchTheme(theme));
        closeModal()
    }
    return (<>
        <Modal style={styles.modalContainer} transparent={true} animationType={'slide'} visible={isVisible}>
            <Pressable onPress={closeModal} />
            <Animated.View  entering={BounceInDown.duration(1000)} exiting={BounceInUp.duration(1000)}
                           style={styles.container}>
                <View style={{borderBottomColor: gray, borderBottomWidth: 0.3, top: 0}}>
                    <Text style={{fontWeight: 'bold', fontSize: FontSize.medium, marginLeft: 10, marginBottom: 5, color: text}}>Theme</Text>
                </View>
                <View style={{padding: 10}}>
                    {
                        themes.map((theme: ThemeEnum) => {
                            return <TouchableOpacity style={{flexDirection: 'row', margin: 10}} onPress={() => {
                                changeTheme(theme)
                            }}>
                                <Icon style={{flex: 1}}
                                      name={theme == currentTheme ? Icons.circle.checked : Icons.circle.unChecked}
                                      size={IconSizes.normal}
                                      color={theme == currentTheme ? action1: text}
                                />
                                <Text style={{
                                    flex: 11,
                                    fontSize: FontSize.normal,
                                    color: text,
                                    marginLeft: 10
                                }}>{translate(theme)}</Text>
                            </TouchableOpacity>
                        })
                    }
                </View>
                <View style={{borderTopWidth: 0.3, bottom: 0, position: 'absolute', width: '100%', borderTopColor: gray, flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <TouchableOpacity onPress={closeModal} style={{padding: 10}}>
                        <Text style={{fontWeight: 'bold', color: text, alignSelf: 'flex-end'}}>{translate('cancel')}</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </Modal>
        </>)
};
export default ThemeModalView;