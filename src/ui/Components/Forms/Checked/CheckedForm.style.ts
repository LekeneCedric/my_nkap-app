import {StyleSheet} from "react-native";
import {Theme} from "../../../Global/Theme.ts";
import {wp} from "../../../Global/Percentage.ts";
import {FontSize} from "../../../Global/FontSize.ts";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '90%',
        alignSelf: 'center',

    },
    inputLabel: {
        color: Theme.dark,
        width: wp(90),
        alignSelf: 'center',
        fontSize: FontSize.normal
    },
    info: {
        width: wp(90),
        alignSelf: 'center',
        fontSize: FontSize.normal
    },
    itemsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginTop: 5
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemLabel: {

    }
});
export default styles;