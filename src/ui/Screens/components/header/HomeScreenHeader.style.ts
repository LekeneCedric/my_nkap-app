import { StyleSheet } from "react-native";
import { hp, wp } from "../../../Global/Percentage";
import { Theme } from "../../../Global/Theme";
import { FontSize } from "../../../Global/FontSize";

const styles = StyleSheet.create({
    container: {
        width: wp(100),
        height: hp(6),
        backgroundColor: Theme.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10
    },
    username: {
        fontSize: FontSize.normal,
        color: Theme.light,
        fontWeight: 'bold',
        paddingLeft: wp(3)
    }
});
export default styles;