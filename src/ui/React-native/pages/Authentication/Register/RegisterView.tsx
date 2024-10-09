import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "./RegisterView.style";
import Animated, {BounceInDown, BounceInUp, LightSpeedInLeft, LightSpeedInRight} from "react-native-reanimated";
import TextStyles from "../../../Global/Styles/Text.styles";
import {Theme} from "../../../Global/Theme";
import useCustomNavigation from "../../../utils/useNavigation";
import {useRegisterView} from "./UseRegisterView";
import {RegisterForm} from "./Form/RegisterForm";
import useTheme from "../../../Shared/Hooks/useTheme.ts";
import RegisterViewStyle from "./RegisterView.style";
import {hp, wp} from "../../../Global/Percentage.ts";
import {FontSize} from "../../../Global/FontSize.ts";
import {routes} from "../../routes";
import useCustomTranslation from "../../../Shared/Hooks/useCustomTranslation.ts";

const RegisterView = () => {
    const {translate} = useCustomTranslation();
    const registerFormBehaviour = useRegisterView();
    const {colorPalette: {pageBackground, containerBackground, text, action1}} = useTheme();
    const styles = RegisterViewStyle(pageBackground, containerBackground, text);
    const {navigateByPath} = useCustomNavigation();
    return (<SafeAreaView style={[styles.pageContainer, {backgroundColor: pageBackground}]}>
        
        <ScrollView showsVerticalScrollIndicator={false}>
            <Animated.View entering={BounceInUp.duration(0)} style={styles.formHeader}>
                <View style={styles.titleContainer}>
                    <Animated.Text
                        entering={LightSpeedInLeft.duration(1500)}
                        exiting={LightSpeedInRight.duration(1500)}
                        style={[TextStyles.title, {textAlign: 'center', color: action1}]}>
                        {translate('register_title')}
                    </Animated.Text>

                    <Animated.Text
                        entering={LightSpeedInLeft.duration(1500)}
                        exiting={LightSpeedInRight.duration(1500)}
                        style={[TextStyles.description, {textAlign: 'center', color: text}]}>
                        {translate('register_description')}
                    </Animated.Text>
                </View>
            </Animated.View>
            <Animated.View entering={BounceInDown.duration(1000)} exiting={BounceInUp} style={styles.formContainer}>
                <ScrollView>
                    <RegisterForm registerFormBehaviour={registerFormBehaviour}/>
                    <View style={{
                        flexDirection: 'row',
                        width: wp(90),
                        alignSelf: 'center',
                        justifyContent: 'center',
                        marginTop: hp(1),
                        marginBottom: hp(5),
                        position: 'relative'
                    }}>
                        <Text style={{color: text, fontWeight: '300', fontSize: FontSize.normal}}> {translate('already_account')} </Text>
                        <TouchableOpacity onPress={() => {navigateByPath(routes.auth.login)}}>
                            <Text style={{color: action1, fontWeight: 'bold', fontSize: FontSize.normal}}> {translate('connexion_title')} </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animated.View>
        </ScrollView>
    </SafeAreaView>)
}

export default RegisterView;