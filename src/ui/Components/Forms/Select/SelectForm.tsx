import {ControllerRenderProps} from "react-hook-form";
import Animated, {
  LightSpeedInLeft,
  LightSpeedOutRight,
} from "react-native-reanimated";
import styles from "./SelectForm.style";
import {Text, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {IconSizes} from "../../../Global/IconSizes";
import {Theme} from "../../../Global/Theme";
import {Icons} from "../../../Global/Icons";
import {useState} from "react";
import SelectModalView from "./Modal/SelectModalView";

type SelectFormProps = {
  icon: string;
  label: string;
  errorMessage?: string;
  field: ControllerRenderProps<any, any>;
  placeholder: string;
  list: any[],
};
const SelectForm = ({
  icon,
  label,
  errorMessage,
  field,
  placeholder,
  list,
}: SelectFormProps) => {
  const [selectedValueName, setSelectedValueName] = useState<string>("");
  const [modalIsVisible, setModalIsVisible] = useState(false);
  return (
    <>
    <SelectModalView
      action = {(id: string, name: string) => {
        setSelectedValueName(name);
        field.onChange(id)
        setModalIsVisible(false)
      }}
      closeModal={() => {
        setModalIsVisible(false);
      }}
      isVisible={modalIsVisible}
      list={list}
    />
    <Animated.View
      entering={LightSpeedInLeft.duration(1500)}
      exiting={LightSpeedOutRight.duration(1500)}
      style={styles.container}
    >
      <Text style={styles.inputLabel}>{label}</Text>
      <TouchableOpacity style={styles.inputContainer} onPress={() => {setModalIsVisible(true)}}>
        <Icon name={icon} size={IconSizes.normal} color={Theme.dark} />
        {
            selectedValueName.length > 0 && 
            <Text style={styles.professionLabel}>{selectedValueName}</Text>
        }
        {
            selectedValueName.length == 0 &&
            <Text style={styles.professionLabel}>{placeholder}</Text>
        }
        <Icon
          style={{flex: 1}}
          name={Icons.dropDown}
          size={IconSizes.normal}
          color={Theme.dark}
        />
      </TouchableOpacity>
      {errorMessage ? (
        <Text style={[styles.info, {color: Theme.red}]}>{errorMessage}</Text>
      ) : (
        <Text style={[styles.info, {color: Theme.gray}]} />
      )}
    </Animated.View>
    </>
  );
};
export default SelectForm;
