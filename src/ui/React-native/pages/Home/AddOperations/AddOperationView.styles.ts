import {StyleSheet} from "react-native";
import {PageStyles} from "../../../Global/Styles/page.styles.ts";
import {Theme} from "../../../Global/Theme.ts";
import {FontSize} from "../../../Global/FontSize.ts";

const styles = StyleSheet.create({
    pageContainer: PageStyles.container,
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: 'center'
    },
    title: {
        color: Theme.primary,
        fontSize: FontSize.mediumHigh,
        textAlign: 'center'
    }
});
export default styles;