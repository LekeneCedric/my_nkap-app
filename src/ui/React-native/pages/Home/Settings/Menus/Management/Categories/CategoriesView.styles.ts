import {StyleSheet} from "react-native";
import {PageStyles} from "../../../../../../Global/Styles/page.styles";
import { pageStylesConstant } from "../../../../../../Global/Styles/constants";
import { FontSize } from "../../../../../../Global/FontSize";

const categoriesStyles = (pageContainerColor: string, text: string,) => {
  return StyleSheet.create({
    pageContainer: {
      ...PageStyles.container,
      backgroundColor: pageContainerColor,
      paddingTop: pageStylesConstant.padding,
      paddingLeft: pageStylesConstant.padding,
      paddingRight: pageStylesConstant.padding,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: pageContainerColor
    },
    headerTitle: {
        fontSize: FontSize.medium,
        fontWeight: "normal",
        color: text,
        alignItems: 'center'
    },
  });
};

export default categoriesStyles;
