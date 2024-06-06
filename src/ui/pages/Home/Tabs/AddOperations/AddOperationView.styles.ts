import {StyleSheet} from "react-native";
import {PageStyles} from "../../../../Global/Styles/page.styles.ts";
import {Theme} from "../../../../Global/Theme.ts";
import {FontSize} from "../../../../Global/FontSize.ts";

const styles = StyleSheet.create({
    pageContainer: PageStyles.container,
    title: {
        color: Theme.primary,
        fontSize: FontSize.mediumHigh,
        textAlign: 'center'
    }
});
export default styles;