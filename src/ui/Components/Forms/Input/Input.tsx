import Animated, { LightSpeedInLeft, LightSpeedOutRight } from "react-native-reanimated";
import styles from './InputStyle.ts'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Icons } from "../../../Global/Icons.ts";
import { IconSizes } from "../../../Global/IconSizes.ts";
import { Theme } from "../../../Global/Theme.ts";
import { TextInput } from "react-native";
export const Input = () => {
  return <Animated.View
          entering={LightSpeedInLeft.duration(1500)}
          exiting={LightSpeedOutRight.duration(1500)}
          style={styles.container}
          >
    <Icon name={Icons.email} size={IconSizes.normal} color={Theme.dark} />
    <TextInput
      placeholder={'Entrez votre adresse e-mail'}
      placeholderTextColor={Theme.gray}
    />
  </Animated.View>
}
