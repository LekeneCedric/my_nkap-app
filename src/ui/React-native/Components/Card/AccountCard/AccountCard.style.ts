import {StyleSheet} from "react-native";
import {Theme} from "../../../Global/Theme";
import {wp} from "../../../Global/Percentage";
import {FontSize} from "../../../Global/FontSize";

const AccountCardStyles = (pageColor: string, containerColor: string, textColor: string, gray: string, action1: string, action1Text: string) => {
  return StyleSheet.create({
    container: {
      borderRadius: 10,
      padding: 10,
      overflow: 'hidden',
      backgroundColor: containerColor,
      width: wp(42),
      margin: 5,
      marginTop: '2%',
      flexDirection: "column",
      shadowColor: "#171717",
      shadowOffset: {width: 5, height: 5},
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 3,
    },
    title: {
      fontWeight: "400",
      color: textColor,
      fontSize: FontSize.normal,
      overflow: "hidden",
    },
    amount: {
      color: textColor,
      fontWeight: "bold",
      fontSize: FontSize.medium,
    },
    statsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      marginTop: '8%',
    },
    statView: {
      flexDirection: 'row'
    },
    statViewText: {
      fontSize: FontSize.small,
      fontWeight: 'bold',
      color: textColor
    },
    statDesc: {
      fontSize: FontSize.small,
      color: Theme.primaryLight
    },
    statViewIconContainer: {
      marginLeft: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: textColor,
      borderRadius: 15
    },
    stateViewIcon: {
      padding: 2,
    },
    button: {
      alignItems: 'center',
      backgroundColor: action1,
      borderRadius: 5,
      marginTop: '9%'
    },
    buttonText: {
      color: action1Text,
      fontSize: FontSize.normal,
      padding: 8
    },
    iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100,
      marginRight: 5,
    },
    icon: {
      margin: 7
    }
  });
};
export default AccountCardStyles;
