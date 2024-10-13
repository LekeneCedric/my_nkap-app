import { StyleSheet } from "react-native";
import { PageStyles } from "../../../Global/Styles/page.styles.ts";
import { hp, wp } from "../../../Global/Percentage.ts";

const LoginViewStyles = (pageBackgroundColor: string, containerBackgroundColor: string, textColor: string) => {
  return StyleSheet.create({
    pageContainer: {...PageStyles.container, backgroundColor: pageBackgroundColor},
    titleContainer: {
      marginTop: hp(2),
      width: '100%',
    },
    formHeader: {
      backgroundColor: pageBackgroundColor,
    },
    formContainer: {
      borderTopLeftRadius: wp(10),
      borderTopRightRadius: wp(10),
      paddingTop: hp(5),
      flexGrow: 1,
      backgroundColor: containerBackgroundColor
    }
  });
}
export default LoginViewStyles;
