import { StyleSheet } from "react-native";
import { hp, wp } from "../../../Global/Percentage";
import { FontSize } from "../../../Global/FontSize";

const InputBirthDateFormStyle = (pageBackground: string, containerBackground: string, text: string, gray: string, action1: string,) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'column',
    },
    inputLabel: {
      color: text,
      width: wp(90),
      alignSelf: 'center',
      fontSize: FontSize.normal
    },
    inputContainer: {
      width: wp(90),
      padding: wp(1),
      height: hp(6),
      backgroundColor: pageBackground,
      borderRadius: 10,
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center'
    },
    info: {
      width: wp(90),
      alignSelf: 'center',
      fontSize: FontSize.normal
    },
    birthdate: {
      color: text,
      marginLeft: wp(1),
      fontSize: FontSize.normal,
      fontWeight: '500'
    },
    placeholder: {
      color: text,
      marginLeft: wp(1),
      fontSize: FontSize.normal,
      fontWeight: '500'
    }
  });
};
export default InputBirthDateFormStyle;