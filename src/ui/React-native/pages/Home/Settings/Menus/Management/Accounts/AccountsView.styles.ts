import {StyleSheet} from "react-native";
import { FontSize } from "../../../../../../Global/FontSize";
import { PageStyles } from "../../../../../../Global/Styles/page.styles";
import { pageStylesConstant } from "../../../../../../Global/Styles/constants";


const AccountsViewStyles = (pageContainerColor: string, cardContainerColor: string, text: string, gray: string, action1: string) => {
    return StyleSheet.create({
        headerContainer: {
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            backgroundColor: pageContainerColor,
            marginBottom: 10
        },
        headerTitle: {
            fontSize: FontSize.medium,
            fontWeight: "normal",
            color: text,
            alignItems: 'center'
        },
        pageContainer: {
            ...PageStyles.container,
            backgroundColor: pageContainerColor,
            paddingTop: pageStylesConstant.padding,
            paddingLeft: pageStylesConstant.padding,
            paddingRight: pageStylesConstant.padding,
        },
        balanceContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        balanceContainerTitle: {
            fontWeight: 'bold',
            color: text,
            fontSize: FontSize.medium
        },
        balanceContainerAmount: {
            fontWeight: 'bold',
            color: action1,
            fontSize: FontSize.high,
        },

    });
};
export default AccountsViewStyles;