import {StyleSheet} from "react-native";
import {Theme} from "../../../Global/Theme.ts";
import {hp, wp} from "../../../Global/Percentage.ts";
import {FontSize} from "../../../Global/FontSize.ts";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    inputLabel: {
        color: Theme.dark,
        width: wp(90),
        alignSelf: 'center',
        fontSize: FontSize.normal
    },
    inputContainer: {
        width: wp(90),
        padding: wp(1),
        height: hp(13),
        backgroundColor: Theme.primaryLight,
        borderRadius: 10,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    input: {
        color: Theme.dark,
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
export default styles;