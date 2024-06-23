import { StyleSheet } from "react-native";
import { wp } from "../../../Global/Percentage";
import { FontSize } from "../../../Global/FontSize";

const ButtonFormStyle = (containerColor: string, textColor: string, action1: string, action1Text: string,) => {
    return StyleSheet.create({
        container: {
            padding: wp(4),
            width: '90%',
            backgroundColor: action1,
            alignSelf: 'center',
            alignItems: 'center',
            borderRadius: 10,
        },
        text: {
            color: action1Text,
            fontSize: FontSize.normal
        }
    });
}

export default ButtonFormStyle;