import {StyleSheet} from "react-native";
import {FontSize} from "../../../../../../Global/FontSize.ts";

const AccountItemStyles = (pageBackground: string, containerBackground: string, text: string, action1: string, gray: string) => {
    return StyleSheet.create({
        container: {
            borderRadius: 8,
            backgroundColor: containerBackground,
            padding: 12,
            marginTop: 15
        },
        icon: {
            padding: 10,
            borderRadius: 100,
        },
        name: {
            fontWeight: '800',
            fontSize: FontSize.normal,
            color: text,
        },
        type: {
            fontSize: FontSize.normal,
            color: text,
        },
        amountTitle: {
            fontSize: FontSize.normal,
            color: text,
        },
        amountValue: {
            fontSize: FontSize.normal,
            fontWeight: 'bold',
            color: text,
        }
    });
};
export default AccountItemStyles;