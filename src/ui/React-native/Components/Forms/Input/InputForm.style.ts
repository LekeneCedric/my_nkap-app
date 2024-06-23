import { StyleSheet } from "react-native";
import { hp, wp } from "../../../Global/Percentage.ts";
import { FontSize } from "../../../Global/FontSize.ts";

const InputFormStyles = (pageBackgroundColor: string, containerColor: string, textColor: string, grayColor: string) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'column',
    },
    inputLabel: {
      color: textColor,
      width: '90%',
      alignSelf: 'center',
      fontSize: FontSize.normal
    },
    inputContainer: {
      width: '90%',
      padding: wp(1),
      height: hp(6),
      backgroundColor: pageBackgroundColor,
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 10,
    },
    info: {
      width: wp(90),
      alignSelf: 'center',
      fontSize: FontSize.normal
    }
  });
}
export default InputFormStyles;
