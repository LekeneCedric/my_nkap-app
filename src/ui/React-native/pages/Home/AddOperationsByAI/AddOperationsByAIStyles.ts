import {StyleSheet} from "react-native";
import { PageStyles } from "../../../Global/Styles/page.styles";
import { FontSize } from "../../../Global/FontSize";

const Styles = (pageBackground: string, textColor: string) => {
  return StyleSheet.create({
    container: {
        ...PageStyles.container,
        backgroundColor: pageBackground
    },
    modalContainer: {
      padding: 10,
      flex: 5,
      backgroundColor: pageBackground,
      borderTopLeftRadius: 20,
      borderTopEndRadius: 20,
      shadowColor: "#171717",
      shadowOffset: {width: 5, height: 5},
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 8,
    },
    input: {
        width: '90%',
        color: textColor,
        fontSize: FontSize.medium
    }
  });
};

export default Styles;
