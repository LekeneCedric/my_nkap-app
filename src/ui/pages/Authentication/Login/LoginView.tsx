import styles from "./LoginView.style.ts";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import TextStyles from "../../../Global/Styles/Text.styles.ts";
import { LoginForm } from "./Form/LoginForm.tsx";
import { Theme } from "../../../Global/Theme.ts";
import Animated, {
  BounceInDown,
  BounceInLeft,
  BounceInUp,
  FadeInDown,
  FadeInLeft,
  FadeInUp,
  LightSpeedInLeft,
  LightSpeedInRight
} from "react-native-reanimated";
import { UseLoginView } from "./UseLoginView.ts";
import { hp, wp } from "../../../Global/Percentage.ts";
import { FontSize } from "../../../Global/FontSize.ts";
import { routes } from "../../routes";
import useCustomNavigation from "../../../utils/useNavigation.ts";

const LoginView = () => {
  const {loginFormBehaviour} = UseLoginView();
  const {navigateByPath} = useCustomNavigation();
  
  return (<SafeAreaView style={[styles.pageContainer, {backgroundColor: Theme.light}]}>
    <ScrollView>
      <Animated.View entering={BounceInUp.duration(0)} style={styles.formHeader}>
        <View style={styles.titleContainer}>
          <Animated.Text
            entering={LightSpeedInLeft.duration(1500)}
            exiting={LightSpeedInRight.duration(1500)}
            style={[TextStyles.title, {textAlign: 'center', color: Theme.light}]}>
              Connexion
          </Animated.Text>
          <Animated.Text
            entering={LightSpeedInLeft.duration(1500)}
            exiting={LightSpeedInRight.duration(1500)}
            style={[TextStyles.description, {textAlign: 'center', color: Theme.light}]}>
              S'il vous plait connectez vous pour continuer
          </Animated.Text>
        </View>
      </Animated.View>
      <Animated.View entering={BounceInDown.duration(1000)} exiting={BounceInUp} style={styles.formContainer}>
        <LoginForm loginFormBehaviour={loginFormBehaviour} />
        <View style={{flexDirection: 'row', width: wp(90), alignSelf: 'center', justifyContent: 'center', marginTop: hp(3)}}>
          <Text style={{color: Theme.dark, fontWeight: '300', fontSize: FontSize.normal}}> Vous n'avez pas de compte ? </Text>
          <TouchableOpacity onPress={()=>{navigateByPath(routes.auth.register)}}>
          <Text style={{color: Theme.primary, fontWeight: 'bold', fontSize: FontSize.normal}}> Inscrivez vous </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ScrollView>
  </SafeAreaView>)
}
export default LoginView;
