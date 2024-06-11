import {StyleSheet} from "react-native";
import {Theme} from "../../../Global/Theme.ts";
import {hp, wp} from "../../../Global/Percentage.ts";
import {FontSize} from "../../../Global/FontSize.ts";

const SelectIconForm = (pageBackground: string, containerBackground: string, text: string, action1: string, gray: string) => {
    return StyleSheet.create({
        container: {
            flexDirection: 'column',
        },
        inputLabel: {
            color: text,
            width: '90%',
            alignSelf: 'center',
            fontSize: FontSize.normal,
        },
        inputContainer: {
            width: '90%',
            padding: wp(1),
            height: hp(6),
            backgroundColor: pageBackground,
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
            marginLeft: 10,
            alignSelf: 'center',
        }
    });
};
export default SelectIconForm;