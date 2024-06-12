import { StyleSheet } from "react-native";
import { Theme } from "../../Global/Theme";
import { FontSize } from "../../Global/FontSize";

const TransactionItemStyles = (pageContainerColor: string, textColor: string) => {
    return StyleSheet.create({
        transactionContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
        },
        transactionIconContainer: {
            backgroundColor: pageContainerColor,
            borderRadius: 100,
            justifyContent: 'flex-start'
        },
        transactionIcon: {
            padding: 8,
        },
        transactionDetailContainer: {
            flexDirection: "column",
            marginLeft: 5,
            overflow: 'hidden'
        },
        transactionTitle: {
            fontWeight: 'bold',
            color: textColor,
            fontSize: FontSize.normal
        },
        transactionType: {
            fontSize: FontSize.small,
        },
        transactionTime: {
            color: textColor,
            fontSize: FontSize.small,
            alignSelf: 'flex-end'
        },
        transactionDetailAmountContainer: {
            flexDirection: "column",
        },
        transactionAmountTitle: {
            fontWeight: 'bold',
            color: textColor,
            fontSize: FontSize.normal,
            alignSelf: 'flex-end',
        }
    });
};
export default TransactionItemStyles;