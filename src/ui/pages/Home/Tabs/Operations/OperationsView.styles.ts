import {StyleSheet} from "react-native";
import {PageStyles} from "../../../../Global/Styles/page.styles";
import {FontSize} from "../../../../Global/FontSize";
import {Theme} from "../../../../Global/Theme";
import {hp, wp} from "../../../../Global/Percentage";

const OperationViewStyles = (pageContainerColor: string, cardContainerColor: string, text: string, gray: string) => {
  return StyleSheet.create({
    pageContainer: {...PageStyles.container, backgroundColor: pageContainerColor},
    accountsContainer: {
      width: "100%",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    title: {
      fontSize: FontSize.medium,
      color: text,
    },
    accountBalance: {
      fontSize: FontSize.mediumHigh,
      fontWeight: "bold",
      color: text,
    },
    transactionContainer: {
      marginTop: "8%",
      backgroundColor: cardContainerColor,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      margin: 5,
      shadowColor: "#171717",
      shadowOffset: {width: 5, height: 5},
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 3,
    },
    transactionHeaderBar: {
      backgroundColor: cardContainerColor,
      padding: 8,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomWidth: 0.4,
      borderBottomColor: cardContainerColor,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    transactionHeaderBarTitle: {
      fontSize: FontSize.normal,
      fontWeight: "bold",
      color: text,
    },
    transactionBodyContainer: {
      height: hp(40),
    },
    notFoundContainer: {
      flexDirection: 'column',
      width: '100%',
      height: hp(30),
      justifyContent: 'center',
      alignItems: 'center',
    },
    notFoundImage: {
      alignSelf: 'center',
    },
    notFoundText: {
      fontSize: FontSize.normal,
      alignSelf: 'center',
      textAlign: 'center',
      color: text
    }
  });
}
export default OperationViewStyles;
