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
        width: '90%',
        alignSelf: 'center',
        fontSize: FontSize.normal
    },
    inputContainer: {
        width: '90%',
        padding: wp(1),
        height: hp(6),
        backgroundColor: Theme.primaryLight,
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
        color: Theme.dark,
        width: wp(90),
        marginLeft: wp(1),
        alignSelf: 'center',
    }
});
export default styles;