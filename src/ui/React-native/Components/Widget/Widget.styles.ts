import {StyleSheet} from "react-native";
import {FontSize} from "../../Global/FontSize.ts";

const WidgetStyles = () => {
    return StyleSheet.create({
        statusContainer: {
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            marginRight: 5
        },
        statusText: {
            fontSize: FontSize.normal,
            fontWeight: 'bold'
        },
    });
};
export default WidgetStyles;