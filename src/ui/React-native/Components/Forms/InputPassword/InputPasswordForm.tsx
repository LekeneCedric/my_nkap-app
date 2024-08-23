import Animated, {
  LightSpeedInLeft,
  LightSpeedOutRight,
} from "react-native-reanimated";
import styles from "./InputPasswordForm.style";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../../Global/Icons";
import {IconSizes} from "../../../Global/IconSizes";
import {Theme} from "../../../Global/Theme";
import {FontSize} from "../../../Global/FontSize";
import {ControllerRenderProps} from "react-hook-form";
import {useState} from "react";
import InputPasswordStyles from "./InputPasswordForm.style";
import useTheme from "../../../Shared/Hooks/useTheme.ts";
import useCustomTranslation from "../../../Shared/Hooks/useCustomTranslation.ts";

type inputFormPasswordProps = {
  label: string;
  errorMessage?: string;
  field: ControllerRenderProps<any, any>;
  placeholder?: string
};
const InputPasswordForm = ({label, errorMessage, field, placeholder}: inputFormPasswordProps) => {
  const {translate} = useCustomTranslation();
  const [canSee, setCanSee] = useState<boolean>(false);
  const {colorPalette: {pageBackground, containerBackground, text, gray, action1}} = useTheme()
  const styles = InputPasswordStyles(pageBackground, containerBackground, text, gray)
  return (
    <Animated.View
      entering={LightSpeedInLeft.duration(1500)}
      exiting={LightSpeedOutRight.duration(1500)}
      style={styles.container}
    >
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputContainer}>
        <Icon name={Icons.secure} size={IconSizes.normal} color={action1} />
        <TextInput
          secureTextEntry={!canSee}
          placeholder={placeholder}
          placeholderTextColor={text}
          cursorColor={text}
          onBlur={field.onBlur}
          value={field.value}
          onChangeText={field.onChange}
          style={{
            flex: 8,
            color: text,
            textDecorationLine: "none",
            fontSize: FontSize.normal,
            width: '100%'
          }}
        />
        <TouchableOpacity
          onPress={() => {
            setCanSee(prev => !prev);
          }}
          style={{flex: 1}}
        >
          <Icon
            name={ canSee ? Icons.eyeOpen : Icons.eyeClose}
            size={IconSizes.normal}
            color={action1}
          />
        </TouchableOpacity>
      </View>
      {errorMessage ? (
        <Text style={[styles.info, {color: Theme.red}]}>{translate(errorMessage)}</Text>
      ) : (
        <Text style={[styles.info, {color: Theme.gray}]} />
      )}
    </Animated.View>
  );
};

export default InputPasswordForm;
