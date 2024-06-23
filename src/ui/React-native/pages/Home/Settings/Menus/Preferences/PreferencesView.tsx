import useTheme from "../../../../../Shared/Hooks/useTheme.ts";
import PreferencesViewStyles from "./PreferencesView.styles.ts";
import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../../../../Global/Icons.ts";
import {IconSizes} from "../../../../../Global/IconSizes.ts";
import {Theme} from "../../../../../Global/Theme.ts";
import useCustomNavigation from "../../../../../utils/useNavigation.ts";
import {FontSize} from "../../../../../Global/FontSize.ts";
import {useState} from "react";
import ThemeModalView from "./ThemeModal/ThemeModalView.tsx";
import useThemeModalView from "./ThemeModal/useThemeModalView.ts";

const PreferencesView = () => {
    const {colorPalette: {pageBackground, containerBackground, text, gray, action1}}= useTheme();
    const styles = PreferencesViewStyles(pageBackground, text);
    const {goBack} = useCustomNavigation();
    const [showThemeModal, setShowThemeModal] = useState(false);
    const {currentTheme} = useThemeModalView();
    return (
        <>
            <ThemeModalView
                closeModal = {() => {setShowThemeModal(false);}}
                isVisible={showThemeModal}
                currentTheme={currentTheme}
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
                    <Text style={styles.headerTitle}>Paramètres{' > '}Préférences</Text>
                </View>
                <View style={{padding: 10}}>
                    <ScrollView>
                        <TouchableOpacity onPress={()=>{setShowThemeModal(true)}} style={{flexDirection: 'row', alignItems: 'center', marginBottom: 15}}>
                            <Icon style={{flex: 1}} name={Icons.theme} size={IconSizes.normMed} color={gray} />
                            <View style={{flex: 9, flexDirection: 'column', marginLeft: 10}}>
                                <Text style={{color: text, fontSize: FontSize.normal}}>Theme</Text>
                                <Text style={{color: gray, fontSize: FontSize.normal}}>{currentTheme}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 15}}>
                            <Icon style={{flex: 1}} name={Icons.internationalisation} size={IconSizes.normMed} color={gray} />
                            <View style={{flex: 9, flexDirection: 'column', marginLeft: 10}}>
                                <Text style={{color: text, fontSize: FontSize.normal}}>Language</Text>
                                <Text style={{color: gray, fontSize: FontSize.normal}}>Francais</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    )
};
export default PreferencesView;