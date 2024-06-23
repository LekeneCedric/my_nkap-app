import {StyleSheet} from "react-native";
import {hp, wp} from "../../../Global/Percentage.ts";
import {FontSize} from "../../../Global/FontSize.ts";

const SelectCategoryFormStyle = (inputBackground: string, labelColor: string) => {
    return StyleSheet.create({
        container: {
            flexDirection: 'column',
        },
        inputLabel: {
            color: labelColor,
            width: '90%',
            alignSelf: 'center',
            fontSize: FontSize.normal
        },
        inputContainer: {
            width: '90%',
            padding: wp(1),
            height: hp(6),
            backgroundColor: inputBackground,
            borderRadius: 10,
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
        },
        info: {
            width: wp(90),
            alignSelf: 'center',
            fontSize: FontSize.normal
        },
        professionLabel: {
            flex: 9,
            fontSize: FontSize.normal,
            color: labelColor,
            width: wp(90),
            marginLeft: wp(1),
            alignSelf: 'center',
        }
    });
}
export default SelectCategoryFormStyle;