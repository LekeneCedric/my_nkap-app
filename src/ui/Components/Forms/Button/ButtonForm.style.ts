import { StyleSheet } from "react-native";
import { wp } from "../../../Global/Percentage";
import { Theme } from "../../../Global/Theme";
import { FontSize } from "../../../Global/FontSize";

const styles = StyleSheet.create({
    container: {
        padding: wp(4),
        width: wp(90),
        backgroundColor: Theme.primary,
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    text: {
        color: Theme.light,
        fontSize: FontSize.normal
    }
});

export default styles;