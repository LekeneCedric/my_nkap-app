import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./RegisterView.style";
import Animated, { BounceInDown, BounceInUp, LightSpeedInLeft, LightSpeedInRight } from "react-native-reanimated";
import TextStyles from "../../../Global/Styles/Text.styles";
import { Theme } from "../../../Global/Theme";
import useCustomNavigation from "../../../utils/useNavigation";
import { useRegisterView } from "./UseRegisterView";
import { RegisterForm } from "./Form/RegisterForm";

const RegisterView = () => {
    const registerFormBehaviour = useRegisterView();

    return (<SafeAreaView style={[styles.pageContainer, {backgroundColor: Theme.light}]}>
          <ScrollView>
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
            </ScrollView>
          </Animated.View>
          </ScrollView>
        </SafeAreaView>)
}

export default RegisterView;