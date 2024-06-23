import {StyleSheet} from "react-native";
import {hp, wp} from "../../../Global/Percentage.ts";
import {FontSize} from "../../../Global/FontSize.ts";

const InputTextAreaStyles = (inputContainerColor: string, inputColor: string) => {
    return StyleSheet.create({
        container: {
            flexDirection: 'column',
        },
        inputLabel: {
            color: inputColor,
            width: '90%',
            alignSelf: 'center',
            fontSize: FontSize.normal
        },
        inputContainer: {
            width: '90%',
            padding: wp(1),
            height: hp(13),
            backgroundColor: inputContainerColor,
            borderRadius: 10,
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'flex-start',
        },
        input: {
            color: inputColor,
            textDecorationLine: 'none',
            fontSize: FontSize.normal,
            width: '100%',
        },
        info: {
            width: wp(90),
            alignSelf: 'center',
            fontSize: FontSize.normal
        }
    });
}
export default InputTextAreaStyles;