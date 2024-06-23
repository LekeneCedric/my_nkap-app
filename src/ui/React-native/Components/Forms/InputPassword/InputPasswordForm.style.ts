import { StyleSheet } from "react-native";
import { hp, wp } from "../../../Global/Percentage.ts";
import { FontSize } from "../../../Global/FontSize.ts";

const InputPasswordStyles = (pageContainerColor: string, containerColor: string, textColor: string, grayColor: string) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'column',
    },
    inputLabel: {
      color: textColor,
      width: wp(90),
      alignSelf: 'center',
      fontSize: FontSize.normal
    },
    inputContainer: {
      width: wp(90),
      padding: wp(1),
      height: hp(6),
      backgroundColor: pageContainerColor,
      borderRadius: 10,
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center',
    },
    info: {
      width: wp(90),
      alignSelf: 'center',
      fontSize: FontSize.normal
    }
  });
}
export default InputPasswordStyles;
