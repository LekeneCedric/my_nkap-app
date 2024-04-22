import styles from "./LoginStyles.ts";
import { SafeAreaView, Text, View } from "react-native";
import TextStyles from "../../../Global/Styles/TextStyles.ts";
import { LoginForm } from "./Form/LoginForm.tsx";
import { Theme } from "../../../Global/Theme.ts";
import Animated, {
  BounceInDown,
  BounceInLeft,
  BounceInUp,
  FadeInDown,
  FadeInLeft,
  FadeInUp
} from "react-native-reanimated";
const Login = () => {
  return (<SafeAreaView style={[styles.pageContainer, {backgroundColor: Theme.light}]}>
    <Animated.View entering={BounceInUp.duration(0)} style={styles.formHeader}>
      <View style={styles.titleContainer}>
        <Text style={[TextStyles.title, {textAlign: 'center', color: Theme.light}]}>Connexion</Text>
      </View>
    </Animated.View>
    <Animated.View entering={BounceInDown.duration(1000)} exiting={BounceInUp} style={styles.formContainer}>
      <LoginForm  />
    </Animated.View>
    </SafeAreaView>)
}
export default Login;
