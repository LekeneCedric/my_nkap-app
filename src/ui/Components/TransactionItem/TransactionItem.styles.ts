import { StyleSheet } from "react-native";
import { Theme } from "../../Global/Theme";
import { FontSize } from "../../Global/FontSize";

const styles = StyleSheet.create({
    transactionContainer: {
        flexDirection: 'row',
        padding: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    transactionIconContainer: {
        backgroundColor: Theme.light,
        borderRadius: 100
    },
    transactionIcon: {
        padding: 8,
    },
    transactionDetailContainer: {
        flexDirection: "column",
        marginLeft: 10
    },
    transactionTitle: {
        fontWeight: 'bold',
        color: Theme.primary,
        fontSize: FontSize.normal
    },
    transactionType: {
        color: Theme.primary,
        fontSize: FontSize.small,
        
    },
    transactionDetailAmountContainer: {
        flexDirection: "column",
        marginLeft: 10
    },
    transactionAmountTitle: {
        fontWeight: 'bold',
        color: Theme.light,
        fontSize: FontSize.normal
    }
});
export default styles;