import {StyleSheet} from "react-native";
import { PageStyles } from "../../../Global/Styles/page.styles";
import { Theme } from "../../../Global/Theme";
import { hp, wp } from "../../../Global/Percentage";

const RegisterViewStyles = (pageBackground: string, containerBackground: string, text: string) => {
  return StyleSheet.create({
    pageContainer: {...PageStyles.container, backgroundColor: pageBackground},
    formHeader: {
      backgroundColor: pageBackground,
      height: hp(100),
      width: wp(100),
      // zIndex: 1,
      // position: "absolute",
    },
    titleContainer: {
      marginTop: hp(2),
      width: "100%",
    },
    formContainer: {
      borderTopLeftRadius: wp(10),
      borderTopRightRadius: wp(10),
      height: hp(100),
      width: wp(100),
      marginTop: hp(15),
      paddingTop: hp(2),
      zIndex: 2,
      position: "absolute",
      backgroundColor: containerBackground,
    },
  });
};
export default RegisterViewStyles;
