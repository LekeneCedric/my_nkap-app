import { StyleSheet } from "react-native";
import { PageStyles } from "../../../Global/Styles/page.styles.ts";
import { Theme } from "../../../Global/Theme.ts";
import { hp, wp } from "../../../Global/Percentage.ts";

const LoginViewStyles = (pageBackgroundColor: string, containerBackgroundColor: string, textColor: string) => {
  return StyleSheet.create({
    pageContainer: {...PageStyles.container, backgroundColor: pageBackgroundColor},
    formHeader: {
      backgroundColor: pageBackgroundColor,
      height: hp(100),
      width: wp(100),
    },
    titleContainer: {
      marginTop: hp(2),
      width: '100%',
    },
    formContainer: {
      borderTopLeftRadius: wp(10),
      borderTopRightRadius: wp(10),
      height: hp(100),
      width: wp(100),
      marginTop: hp(15),
      paddingTop: hp(5),
      zIndex: 2,
      position: 'absolute',
      backgroundColor: containerBackgroundColor
    }
  });
}
export default LoginViewStyles;
