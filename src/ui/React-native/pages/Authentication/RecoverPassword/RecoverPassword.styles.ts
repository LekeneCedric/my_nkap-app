import {StyleSheet} from "react-native";
import {PageStyles} from "../../../Global/Styles/page.styles";
import {hp, wp} from "../../../Global/Percentage";

const RecoverPasswordStyles = (containerBackground: string, pageBackground: string) => {
  return StyleSheet.create({
    pageContainer: {
      ...PageStyles.container,
      backgroundColor: pageBackground,
    },
    formHeader: {
      backgroundColor: pageBackground,
      height: hp(100),
      width: wp(100),
      padding: 10
    },
    formContainer: {
      borderTopLeftRadius: wp(10),
      borderTopRightRadius: wp(10),
      height: "100%",
      width: wp(100),
      marginTop: hp(25),
      paddingTop: hp(5),
      zIndex: 2,
      position: "absolute",
      backgroundColor: containerBackground,
    },
    titleContainer: {
      marginTop: hp(2),
      width: "100%",
    },
  });
};
export default RecoverPasswordStyles;
