import { StyleSheet } from "react-native"
import { hp, wp } from "../../../../../../../Global/Percentage";

const UpdateCategoryModalStyles = (containerBackground: string) => {
    return StyleSheet.create({
        modalContainer: {
            width: wp(100),
            height: hp(100),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: containerBackground,
        },
        container: {
            flexDirection: "column",
            width: wp(100),
            height: hp(100),
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

export default UpdateCategoryModalStyles;