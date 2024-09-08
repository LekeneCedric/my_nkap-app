import useTheme from "../../../../../Shared/Hooks/useTheme.ts";
import PreferencesViewStyles from "./PreferencesView.styles.ts";
import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../../../../Global/Icons.ts";
import {IconSizes} from "../../../../../Global/IconSizes.ts";
import useCustomNavigation from "../../../../../utils/useNavigation.ts";
import {FontSize} from "../../../../../Global/FontSize.ts";
import {useState} from "react";
import ThemeModalView from "./ThemeModal/ThemeModalView.tsx";
import useThemeModalView from "./ThemeModal/useThemeModalView.ts";
import useCustomTranslation from "../../../../../Shared/Hooks/useCustomTranslation.ts";
import { useAppSelector } from "../../../../../../../app/hook.ts";
import { selectCurrency } from "../../../../../../../Feature/Configuration/ConfigurationSelector.ts";
import CurrencyModalView from "./CurrencyModal/CurrencyModalView.tsx";

const PreferencesView = () => {
    const {
        translate,
        currentLanguage,
        changeLanguage
    } = useCustomTranslation();
    const switchLanguage = () => {
        changeLanguage(currentLanguage == 'en' ? 'fr' : 'en');
    }
    const {colorPalette: {pageBackground, text, gray, action1}}= useTheme();
    const styles = PreferencesViewStyles(pageBackground, text);
    const {goBack} = useCustomNavigation();
    const [showThemeModal, setShowThemeModal] = useState(false);
    const [showCurrencyModal, setShowCurrencyModal] = useState(false);
    const {currentTheme} = useThemeModalView();
    const currentCurrency = useAppSelector(selectCurrency);
    return (
        <>
            <ThemeModalView
                closeModal = {() => {setShowThemeModal(false);}}
                isVisible={showThemeModal}
                currentTheme={currentTheme}
            />
            <CurrencyModalView
                closeModal = {() => {setShowCurrencyModal(false);}}
                isVisible={showCurrencyModal}
                currentCurrency={currentCurrency}
            />
            <SafeAreaView style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={goBack}>
                        <Icon
                            name={Icons.back}
                            size={IconSizes.medium}
                            color={text}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{translate('settings')}{' > '}{translate('customizations')}</Text>
                </View>
                <View style={{padding: 10}}>
                    <ScrollView>
                        <TouchableOpacity onPress={()=>{setShowThemeModal(true)}} style={{flexDirection: 'row', alignItems: 'center', marginBottom: 15}}>
                            <Icon style={{flex: 1}} name={Icons.theme} size={IconSizes.normMed} color={gray} />
                            <View style={{flex: 9, flexDirection: 'column', marginLeft: 10}}>
                                <Text style={{color: text, fontSize: FontSize.normal}}>Theme</Text>
                                <Text style={{color: text, fontWeight: '100', fontSize: FontSize.normal}}>{translate(currentTheme)}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={switchLanguage} style={{flexDirection: 'row', alignItems: 'center', marginBottom: 15}}>
                            <Icon style={{flex: 1}} name={Icons.internationalisation} size={IconSizes.normMed} color={gray} />
                            <View style={{flex: 9, flexDirection: 'column', marginLeft: 10}}>
                                <Text style={{color: text, fontSize: FontSize.normal}}>{translate('language')}</Text>
                                <Text style={{color: text, fontWeight: '100', fontSize: FontSize.normal}}>{
                                    currentLanguage == 'en' ? translate('english') : translate('french')
                                }</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setShowCurrencyModal(true)}} style={{flexDirection: 'row', alignItems: 'center', marginBottom: 15}}>
                            <Icon style={{flex: 1}} name={Icons.wallet} size={IconSizes.normMed} color={gray} />
                            <View style={{flex: 9, flexDirection: 'column', marginLeft: 10}}>
                                <Text style={{color: text, fontSize: FontSize.normal}}>{translate('currency')}</Text>
                                <Text style={{color: text, fontWeight: '100', fontSize: FontSize.normal}}>
                                    {currentCurrency?.currency}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    )
};
export default PreferencesView;