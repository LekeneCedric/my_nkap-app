import {StyleSheet} from "react-native";
import {Theme} from "../../../Global/Theme";
import {hp, wp} from "../../../Global/Percentage";
import {FontSize} from "../../../Global/FontSize";

const SelectFormStyles = (pageContainerColor: string, text: string, gray: string) => {
    return StyleSheet.create({
        container: {
            flexDirection: 'column',
        },
        inputLabel: {
            color: text,
            width: wp(90),
            alignSelf: 'center',
            fontSize: FontSize.normal
        },
        inputContainer: {
            width: wp(90),
            padding: wp(1),
            height: hp(6),
            backgroundColor: pageContainerColor,
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
            color: text,
            width: wp(90),
            marginLeft: wp(1),
            alignSelf: 'center',
        }
    });
}
export default SelectFormStyles;