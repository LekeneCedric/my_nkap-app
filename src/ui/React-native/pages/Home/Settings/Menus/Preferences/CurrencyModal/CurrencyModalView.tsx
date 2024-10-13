import { Modal, ScrollView, TouchableOpacity, View } from "react-native"
import ICurrencyFormat from "../../../../../../../../Domain/Shared/CurrencyFormat"
import Animated, { BounceInDown, BounceInUp } from "react-native-reanimated"
import { Text } from "react-native"
import useTheme from "../../../../../../Shared/Hooks/useTheme"
import { FontSize } from "../../../../../../Global/FontSize"
import useCustomTranslation from "../../../../../../Shared/Hooks/useCustomTranslation"
import CurrencyModalStyles from "./CurrencyModalStyles"
import CurrenciesFormat from "../../../../../../Shared/Constants/Currencies"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Icons } from "../../../../../../Global/Icons"
import { IconSizes } from "../../../../../../Global/IconSizes"
import { useAppDispatch } from "../../../../../../../../app/hook"
import { SwitchCurrency } from "../../../../../../../../Feature/Configuration/ConfigurationSlice"
import { hp } from "../../../../../../Global/Percentage"
import React from "react"

type props = {
    closeModal: () => void,
    isVisible: boolean,
    currentCurrency?: ICurrencyFormat,
}
const CurrencyModalView = ({closeModal, isVisible, currentCurrency}: props) => {
    const dispatch = useAppDispatch();
    const changeCurrency = (currency: ICurrencyFormat) => {
        dispatch(SwitchCurrency(currency));
    }
    const {translate} = useCustomTranslation();
    const {colorPalette: {containerBackground, text, action1, gray }} = useTheme();
    const styles = CurrencyModalStyles(containerBackground);
    return (
            <Modal style={styles.modalContainer} transparent={true} animationType={'slide'} visible={isVisible}>
                <Animated.View  entering={BounceInDown.duration(1000)} exiting={BounceInUp.duration(1000)}
                           style={styles.container}>
                        <View style={{borderBottomColor: gray, borderBottomWidth: 0.3, top: 0}}>
                                <Text style={{fontWeight: 'bold', fontSize: FontSize.medium, marginLeft: 10, marginBottom: 5, color: text}}>{translate('currency')}</Text>
                        </View>
                        <View style={{padding: 10, flex: 0.8}}>
                            <ScrollView>
                                {
                                [...CurrenciesFormat].sort((a, b) => ((a.currency == currentCurrency?.currency) ? 0 : 1) - ((b.currency == currentCurrency?.currency) ? 0 : 1)).map((currency: ICurrencyFormat) => {
                                    return <TouchableOpacity style={{flexDirection: 'row', margin: 10}} onPress={() => {
                                        changeCurrency(currency);
                                        closeModal();
                                    }}>
                                        <Icon style={{flex: 1}}
                                              name={currentCurrency?.currency === currency.currency ? Icons.circle.checked : Icons.circle.unChecked}
                                              size={IconSizes.normal}
                                              color={currentCurrency?.currency === currency.currency ? action1: text}
                                        />
                                        <View style={{flex: 11, flexDirection: 'row', alignItems: 'center'}}>
                                            <Text style={{
                                                fontSize: FontSize.normal,
                                                color: text,
                                                marginLeft: 10
                                            }}>{currency.currency}</Text>
                                            <Text style={{
                                                fontSize: FontSize.small,
                                                color: text,
                                                marginLeft: 10
                                            }}>(ex : {currency.example})</Text>
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
    )
};

export default CurrencyModalView;