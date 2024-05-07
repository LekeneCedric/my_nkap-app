import { StyleSheet } from "react-native";
import { hp, wp } from "../../../Global/Percentage";
import { Theme } from "../../../Global/Theme";
import { FontSize } from "../../../Global/FontSize";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: hp(8),
        backgroundColor: Theme.light,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: wp(4),
        paddingRight: wp(4)
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Theme.primary,
        borderRadius: 100
    },
    icon: {
        margin: 7
    },
    title: {
        fontWeight: '600',
        fontSize: FontSize.medium,
        color: Theme.primary,
    }
});
export default styles;