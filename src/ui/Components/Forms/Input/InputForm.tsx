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
import {useState} from "react";
import InputFormStyles from "./InputForm.style.ts";
import useTheme from "../../../Shared/Hooks/useTheme.ts";

type inputFormProps = {
  type?: 'amount'
  icon: string,
  label: string,
  errorMessage?: string,
  field: ControllerRenderProps<any, any>,
  keyboardType: KeyboardType,
  placeholder: string
}
export const InputForm = ({type, icon, label, errorMessage, field, keyboardType, placeholder}: inputFormProps) => {
  const {colorPalette: {pageBackground, containerBackground, gray, text, red, action1}} = useTheme();
  const styles = InputFormStyles(pageBackground, containerBackground, text, gray);
  const initialValue = type === 'amount' ? '0' : '';
  const [currentValue, setCurrentValue] = useState<string>(initialValue);
  const formatNumberToMoney = (number: number) => {
    return new Intl.NumberFormat('fr-FR').format(number);
  }
  return (
    <Animated.View
      entering={LightSpeedInLeft.duration(1500)}
      exiting={LightSpeedOutRight.duration(1500)}
      style={styles.container}
    >
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputContainer}>
        <Icon name={icon} size={IconSizes.normal} color={action1} />
        <TextInput
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={text}
          numberOfLines={1}
          cursorColor={text}
          onBlur={field.onBlur}
          value={currentValue}
          onChangeText={(text: string) => {
            switch (type) {
              case 'amount': {
                setCurrentValue(formatNumberToMoney(Number(
                    text.length == 0 ? 0 : text.replace(/[^0-9]/g, '')
                )));
                break;
              }
              default : {
                setCurrentValue(text);
                break;
              }
            }
            field.onChange(text)
          }}
          style={{color: text, textDecorationLine: "none", fontSize: FontSize.normal, width: '80%', height: 100, flexWrap: 'wrap', overflow: 'hidden'}}
        />
        {
          type == 'amount' && (
              <Text style={{color: text, fontSize: FontSize.normal, position: 'absolute', right: 10, top: 10}}>
                XAF
              </Text>
            )
        }
      </View>
      {errorMessage ? (
        <Text style={[styles.info, {color: red}]}>{errorMessage}</Text>
      ) : (
        <Text style={[styles.info, {color: Theme.gray}]} />
      )}
    </Animated.View>
  );
};
