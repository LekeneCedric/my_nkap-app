import Animated, {
  LightSpeedInLeft,
  LightSpeedOutRight,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {IconSizes} from "../../../Global/IconSizes.ts";
import {Theme} from "../../../Global/Theme.ts";
import {KeyboardType, Text, TextInput, View} from "react-native";
import { ControllerRenderProps } from "react-hook-form";
import { FontSize } from "../../../Global/FontSize.ts";
import {useEffect, useState} from "react";
import InputFormStyles from "./InputForm.style.ts";
import useTheme from "../../../Shared/Hooks/useTheme.ts";
import useCustomTranslation from "../../../Shared/Hooks/useCustomTranslation.ts";

type inputFormProps = {
  type?: 'amount',
  defaultValue?: string,
  icon: string,
  label: string,
  errorMessage?: string,
  field: ControllerRenderProps<any, any>,
  keyboardType: KeyboardType,
  placeholder: string
}
export const InputForm = ({defaultValue, type, icon, label, errorMessage, field, keyboardType, placeholder}: inputFormProps) => {
  const {translate} = useCustomTranslation();
  const {colorPalette: {pageBackground, containerBackground, gray, text, red, action1}} = useTheme();
  const styles = InputFormStyles(pageBackground, containerBackground, text, gray);
  const [initialValue, setInitialValue] = useState(type === 'amount' ? '0' : '')
  const [currentValue, setCurrentValue] = useState<string>(initialValue);
  const formatNumberToMoney = (number: number) => {
    return new Intl.NumberFormat('fr-FR').format(number);
  }
  useEffect(() => {
    if (field.value) {
      setInitialValue(String(field.value));
      setCurrentValue(String(field.value));
    }
    if (!field.value && type === 'amount') {
      field.onChange(0);
    }
    if (defaultValue) {
      setInitialValue(defaultValue);
      setCurrentValue(defaultValue);
      field.onChange(defaultValue);
    }
  }, []);
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
          onChangeText={(fieldText: string) => {
            switch (type) {
              case 'amount': {
                setCurrentValue(formatNumberToMoney(Number(
                    fieldText.length == 0 ? 0 : fieldText.replace(/[^0-9]/g, '')
                )));
                break;
              }
              default : {
                setCurrentValue(fieldText);
                break;
              }
            }
            field.onChange(fieldText)
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
        <Text style={[styles.info, {color: red}]}>{translate(errorMessage)}</Text>
      ) : (
        <Text style={[styles.info, {color: Theme.gray}]} />
      )}
    </Animated.View>
  );
};
