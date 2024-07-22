import {StyleSheet} from "react-native";
import {PageStyles} from "../../../../Global/Styles/page.styles.ts";
import {pageStylesConstant} from "../../../../Global/Styles/constants.ts";

const FinancialGoalViewStyles = (pageContainerColor: string, containerBackground: string) => {
    return StyleSheet.create({
        pageContainer: {
            ...PageStyles.container,
            backgroundColor: pageContainerColor,
            paddingTop: pageStylesConstant.padding,
            paddingLeft: pageStylesConstant.padding,
            paddingRight: pageStylesConstant.padding,
        }
    });
};
export default FinancialGoalViewStyles;