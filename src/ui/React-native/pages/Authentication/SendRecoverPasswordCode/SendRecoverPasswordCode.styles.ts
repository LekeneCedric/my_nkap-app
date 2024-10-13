import {StyleSheet} from "react-native";
import {PageStyles} from "../../../Global/Styles/page.styles";
import {hp, wp} from "../../../Global/Percentage";

const SendRecoverPasswordCodeStyles = (pageBackground: string, containerBackground: string) => {
  return StyleSheet.create({
    pageContainer: {
      ...PageStyles.container,
      backgroundColor: pageBackground,
      flex: 1,
    },
    formHeader: {
      backgroundColor: pageBackground,
      padding: 10
    },
    formContainer: {
      borderTopLeftRadius: wp(10),
      borderTopRightRadius: wp(10),
      paddingTop: hp(5),
      flexGrow: 1,
      backgroundColor: containerBackground,
    },
    titleContainer: {
      marginTop: hp(2),
      width: "100%",
    },
  });
};
export default SendRecoverPasswordCodeStyles;
