import {StyleSheet} from "react-native";
import { PageStyles } from "../../../Global/Styles/page.styles";
import { Theme } from "../../../Global/Theme";
import { hp, wp } from "../../../Global/Percentage";

const RegisterViewStyles = (pageBackground: string, containerBackground: string, text: string) => {
  return StyleSheet.create({
    pageContainer: {...PageStyles.container, backgroundColor: pageBackground},
    formHeader: {
      backgroundColor: pageBackground,
    },
    titleContainer: {
      marginTop: hp(2),
      width: "100%",
    },
    formContainer: {
      borderTopLeftRadius: wp(10),
      borderTopRightRadius: wp(10),
      paddingTop: hp(5),
      flexGrow: 1,
      backgroundColor: containerBackground,
    },
  });
};
export default RegisterViewStyles;
