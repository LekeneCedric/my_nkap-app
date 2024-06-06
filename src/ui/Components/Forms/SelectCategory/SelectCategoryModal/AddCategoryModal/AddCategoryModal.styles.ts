import {StyleSheet} from "react-native";
import {hp, wp} from "../../../../../Global/Percentage.ts";
import {Theme} from "../../../../../Global/Theme.ts";
import {FontSize} from "../../../../../Global/FontSize.ts";

const styles = StyleSheet.create({
    modalContainer: {
        width: wp(100),
        height: hp(100),
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        flexDirection: "column",
        width: wp(100),
        height: hp(100),
        borderRadius: 10,
        alignSelf: "center",
        backgroundColor: Theme.light,
        shadowColor: "#171717",
        shadowOffset: {width: 5, height: 5},
        shadowOpacity: 0.2,
        shadowRadius: wp(10),
        elevation: 10,
    },
    colorSelectContainer: {
        flexDirection: 'column',
        marginTop: 10,
    },
    colorSelectTitle: {
        color: Theme.dark,
        width: '90%',
        alignSelf: 'center',
        fontSize: FontSize.normal
    },
    colorSelectIconsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '90%',
        alignSelf: 'center'
    },
    colorSelectIconsContainerItem: {
        padding: 10,
        width: 30,
        height: 30,
        margin: 5,
        borderRadius: 20
    },
    info: {
        width: wp(90),
        alignSelf: 'center',
        fontSize: FontSize.normal
    },
});
export default styles;