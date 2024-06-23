import {StyleSheet} from "react-native";
import {hp, wp} from "../../../Global/Percentage.ts";

const SelectOperationTypeModalStyles = (pageBackground: string, containerBackground: string, text: string, action1: string) => {
    return StyleSheet.create({
        modalContainer: {
            width: wp(100),
            marginTop: hp(70),
            height: hp(30),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: containerBackground,
        },
        container: {
            flexDirection: "column",
            width: wp(100),
            marginTop: hp(70),
            height: hp(30),
            paddingTop: hp(2),
            alignSelf: "center",
            backgroundColor: containerBackground,
            shadowColor: "#171717",
            shadowOffset: {width: 5, height: 5},
            shadowOpacity: 0.2,
            shadowRadius: wp(10),
            elevation: 10,
        },
    });
};
export default SelectOperationTypeModalStyles;