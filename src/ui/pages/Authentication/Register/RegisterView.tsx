import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./RegisterView.style";
import Animated, { BounceInDown, BounceInUp, LightSpeedInLeft, LightSpeedInRight } from "react-native-reanimated";
import TextStyles from "../../../Global/Styles/TextStyles";
import { Theme } from "../../../Global/Theme";
import { hp, wp } from "../../../Global/Percentage";
import { FontSize } from "../../../Global/FontSize";
import { routes } from "../../routes";
import useCustomNavigation from "../../../utils/useNavigation";
import { useRegisterView } from "./UseRegisterView";
import { RegisterForm } from "./Form/RegisterForm";

const RegisterView = () => {
    const registerFormBehaviour = useRegisterView();
    const {navigateByPath} = useCustomNavigation();

    return (<SafeAreaView style={[styles.pageContainer, {backgroundColor: Theme.light}]}>
        <Animated.View entering={BounceInUp.duration(0)} style={styles.formHeader}>
          <View style={styles.titleContainer}>
            <Animated.Text
              entering={LightSpeedInLeft.duration(1500)}
              exiting={LightSpeedInRight.duration(1500)}
              style={[TextStyles.title, {textAlign: 'center', color: Theme.light}]}>
                Inscription
            </Animated.Text>
            <Animated.Text
              entering={LightSpeedInLeft.duration(1500)}
              exiting={LightSpeedInRight.duration(1500)}
              style={[TextStyles.description, {textAlign: 'center', color: Theme.light}]}>
                Renseigner en quelques clics les informations nous permettant de creer votre compte
            </Animated.Text>
          </View>
        </Animated.View>
        <Animated.View entering={BounceInDown.duration(1000)} exiting={BounceInUp} style={styles.formContainer}>
          <ScrollView>
            <RegisterForm registerFormBehaviour={registerFormBehaviour} />
          <View style={{flexDirection: 'row', width: wp(90), alignSelf: 'center', justifyContent: 'center', marginTop: hp(1)}}>
            <Text style={{color: Theme.dark, fontWeight: '300', fontSize: FontSize.normal}}> Vous avez deja un compte ? </Text>
            <TouchableOpacity onPress={()=>{navigateByPath(routes.auth.login)}}>
            <Text style={{color: Theme.primary, fontWeight: 'bold', fontSize: FontSize.normal}}> Connectez vous </Text>
            </TouchableOpacity>
          </View>
          </ScrollView>
        </Animated.View>
        </SafeAreaView>)
}

export default RegisterView;