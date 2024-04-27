import Animated, {
  LightSpeedInLeft,
  LightSpeedOutRight,
} from "react-native-reanimated";
import styles from "./InputForm.style.ts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../../Global/Icons.ts";
import {IconSizes} from "../../../Global/IconSizes.ts";
import {Theme} from "../../../Global/Theme.ts";
import {KeyboardType, Text, TextInput, View} from "react-native";
import { ControllerRenderProps } from "react-hook-form";
import { FontSize } from "../../../Global/FontSize.ts";

type inputFormProps = {
  icon: string,
  label: string,
  errorMessage?: string,
  field: ControllerRenderProps<any, any>,
  keyboardType: KeyboardType,
  placeholder: string
}
export const InputForm = ({icon, label, errorMessage, field, keyboardType, placeholder}: inputFormProps) => {
  return (
    <Animated.View
      entering={LightSpeedInLeft.duration(1500)}
      exiting={LightSpeedOutRight.duration(1500)}
      style={styles.container}
    >
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputContainer}>
        <Icon name={icon} size={IconSizes.normal} color={Theme.dark} />
        <TextInput
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={Theme.gray}
          cursorColor={Theme.primary}
          onBlur={field.onBlur}
          value={field.value}
          onChangeText={field.onChange}
          style={{color: Theme.dark, textDecorationLine: "none", fontSize: FontSize.normal,width: '100%'}}
        />
      </View>
      {errorMessage ? (
        <Text style={[styles.info, {color: Theme.red}]}>{errorMessage}</Text>
      ) : (
        <Text style={[styles.info, {color: Theme.gray}]} />
      )}
    </Animated.View>
  );
};
