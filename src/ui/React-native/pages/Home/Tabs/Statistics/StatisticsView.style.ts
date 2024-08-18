import {StyleSheet} from "react-native";
import {PageStyles} from "../../../../Global/Styles/page.styles.ts";
import {pageStylesConstant} from "../../../../Global/Styles/constants.ts";

type props = {
    pageContainerColor: string
}
const StatisticsViewStyle = ({pageContainerColor}: props) => {
    return StyleSheet.create({
        pageContainer: {
            ...PageStyles.container,
            backgroundColor: pageContainerColor,
            paddingLeft: pageStylesConstant.padding,
            paddingRight: pageStylesConstant.padding,
        },
    });
};
export default StatisticsViewStyle;