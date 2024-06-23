import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import TextStyles from "../../../Global/Styles/Text.styles.ts";
import { LoginForm } from "./Form/LoginForm.tsx";
import { Theme } from "../../../Global/Theme.ts";
import Animated, {
  BounceInDown,
  BounceInUp,
  LightSpeedInLeft,
  LightSpeedInRight
} from "react-native-reanimated";
import { UseLoginView } from "./UseLoginView.ts";
import { hp, wp } from "../../../Global/Percentage.ts";
import { FontSize } from "../../../Global/FontSize.ts";
import { routes } from "../../routes";
import useCustomNavigation from "../../../utils/useNavigation.ts";
import useTheme from "../../../Shared/Hooks/useTheme.ts";
import LoginViewStyles from "./LoginView.style.ts";

const LoginView = () => {
  const {loginFormBehaviour} = UseLoginView();
  const {navigateByPath} = useCustomNavigation();
  const {colorPalette: {pageBackground, containerBackground, primary, text, primaryLight, action1}} = useTheme();
  const styles = LoginViewStyles(pageBackground, containerBackground, text);
  return (<SafeAreaView style={[styles.pageContainer]}>

    <ScrollView>
      <Animated.View entering={BounceInUp.duration(0)} style={styles.formHeader}>
        <View style={styles.titleContainer}>
          <Animated.Text
            entering={LightSpeedInLeft.duration(1500)}
            exiting={LightSpeedInRight.duration(1500)}
            style={[TextStyles.title, {textAlign: 'center', color: action1}]}>
              Connexion
          </Animated.Text>
          <Animated.Text
            entering={LightSpeedInLeft.duration(1500)}
            exiting={LightSpeedInRight.duration(1500)}
            style={[TextStyles.description, {textAlign: 'center', color: text}]}>
              Veuillez rentrer vos informations pour continuer
          </Animated.Text>
        </View>
      </Animated.View>
      <Animated.View entering={BounceInDown.duration(1000)} exiting={BounceInUp} style={styles.formContainer}>
        <LoginForm loginFormBehaviour={loginFormBehaviour} />
        <View style={{flexDirection: 'row', width: wp(90), alignSelf: 'center', justifyContent: 'center', marginTop: hp(3)}}>
          <Text style={{color: text, fontWeight: '300', fontSize: FontSize.normal}}> Vous n'avez pas de compte ? </Text>
          <TouchableOpacity onPress={()=>{navigateByPath(routes.auth.register)}}>
          <Text style={{color: action1, fontWeight: 'bold', fontSize: FontSize.normal}}> Inscrivez vous </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ScrollView>
  </SafeAreaView>)
}
export default LoginView;
