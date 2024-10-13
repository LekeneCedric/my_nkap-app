import {StyleSheet} from "react-native";
import {hp, wp} from "../../../../../../Global/Percentage";

const LanguageModalStyles = (containerBackground: string) => {
  return StyleSheet.create({
    modalContainer: {
      width: wp(100),
      height: hp(100),
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
        flexDirection: "column",
        width: wp(80),
        height: hp(40),
        marginTop: hp(30),
        paddingTop: hp(2),
        alignSelf: "center",
        backgroundColor: containerBackground,
        shadowColor: "#171717",
        shadowOffset: {width: 5, height: 5},
        shadowOpacity: 0.2,
        shadowRadius: wp(10),
        elevation: 10,
        borderRadius: 10
    },
  });
};

export default LanguageModalStyles;
