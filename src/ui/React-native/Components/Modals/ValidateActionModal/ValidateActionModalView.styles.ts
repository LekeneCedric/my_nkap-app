import {StyleSheet} from "react-native";
import {hp, wp} from "../../../Global/Percentage.ts";

const ValidateActionModalViewStyles = (pageBackground: string, containerBackground: string, text: string, action1: string, red: string) => {
    return StyleSheet.create({
        modalContainer: {
            width: wp(80),
            marginTop: hp(35),
            marginBottom: hp(35),
            height: hp(30),
            marginLeft: wp(10),
            marginRight: wp(10),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: containerBackground,
            borderRadius: 10,
        },
        container: {
            flexDirection: "column",
            width: wp(80),
            marginTop: hp(35),
            marginBottom: hp(35),
            height: hp(30),
            marginLeft: wp(10),
            marginRight: wp(10),
            paddingTop: hp(2),
            alignSelf: "center",
            backgroundColor: containerBackground,
            shadowColor: "#171717",
            shadowOffset: {width: 5, height: 5},
            shadowOpacity: 0.2,
            shadowRadius: wp(10),
            elevation: 10,
            borderRadius: 10,
        },
    });
};
export default ValidateActionModalViewStyles;