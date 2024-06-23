import {StyleSheet} from "react-native";
import {PageStyles} from "../../../Global/Styles/page.styles";
import {FontSize} from "../../../Global/FontSize";
import {Theme} from "../../../Global/Theme";
import { hp } from "../../../Global/Percentage";

const SettingsViewStyles = (pageContainerColor: string, text: string) => {
  return StyleSheet.create({
    container: {...PageStyles.container, backgroundColor: pageContainerColor},
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      padding: 10,
    },
    headerTitle: {
      fontSize: FontSize.medium,
      fontWeight: "400",
      color: text
    },
    menuItem: {
      width: '90%',
      alignSelf: 'center',
      marginTop: 18
    },
    menuItemTitle: {
      fontSize: FontSize.medium,
      fontWeight: '100',
      color: Theme.grayLight,
      width: '100%'
    },
    itemContainer: {
      backgroundColor: Theme.light,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
      marginTop: hp(2),
      padding: 5,
      borderRadius: 5,
      shadowColor: "#171717",
      shadowOffset: {width: 5, height: 5},
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 3,
    },
    itemText: {
      fontSize: FontSize.normal,
      fontWeight: 'bold'
    }
  });
};
export default SettingsViewStyles;