import {StyleSheet} from "react-native";
import {hp, wp} from "../../../../Global/Percentage.ts";
import {FontSize} from "../../../../Global/FontSize.ts";

const SelectCategoryModalViewStyle = (pageBackground: string, containerBackground: string, text: string, action1: string) => {
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
        listAddCategoryContainer: {
            paddingLeft: '5%',
            paddingRight: '5%'
        },
        listContainer: {
            padding: '5%'
        },
        itemContainer: {
            width: '100%',
            borderBottomColor: text,
            padding: '4%',
            flexDirection: 'row',
            alignItems: 'center'
        },
        itemText: {
            color: text,
            fontSize: FontSize.normal,
            fontWeight: '500',
            paddingLeft: 10,
        },
    });
};
export default SelectCategoryModalViewStyle;