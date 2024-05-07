import { StyleSheet } from "react-native";
import { PageStyles } from "../../../Global/Styles/page.styles";
import { FontSize } from "../../../Global/FontSize";
import { Theme } from "../../../Global/Theme";
import { hp } from "../../../Global/Percentage";

const styles = StyleSheet.create({
    pageContainer: PageStyles.container,
    accountsContainer: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: FontSize.medium,
        color: Theme.primary,
    },
    accountBalance: {
        fontSize: FontSize.high,
        fontWeight: 'bold',
        color: Theme.primary
    },
    transactionContainer: {
        marginTop: '8%',
        backgroundColor: Theme.primary,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    transactionHeaderBar: {
        backgroundColor: Theme.primaryLight,
        padding: 8,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    transationHeaderBarTitle: {
        fontSize: FontSize.normal,
        fontWeight: 'bold',
        color: Theme.light,
    },
    transactionBodyContainer: {
        height: hp(40)
    }
});
export default styles;