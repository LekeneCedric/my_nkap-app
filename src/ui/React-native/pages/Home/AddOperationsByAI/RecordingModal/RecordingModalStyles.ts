import {StyleSheet} from "react-native";
import {hp, wp} from "../../../../Global/Percentage";
import { FontSize } from "../../../../Global/FontSize";

type propsStyles = {
  cardContainerColor: string,
  textColor: string
};
const RecordingModalStyles = ({cardContainerColor, textColor}: propsStyles) => {
  return StyleSheet.create({
    modalContainer: {
      width: wp(100),
      height: 250,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: cardContainerColor,
    },
    container: {
      flexDirection: "column",
      width: wp(100),
      height: 200,
      padding: 10,
      alignSelf: "center",
      backgroundColor: cardContainerColor,
      borderTopLeftRadius: 20,
      borderTopEndRadius: 20,
      shadowColor: "#171717",
      shadowOffset: {width: 5, height: 5},
      shadowOpacity: 0.2,
      shadowRadius: wp(10),
      elevation: 10,
      position: 'absolute',
      bottom: 0,
    },
    input: {
        width: '90%',
        color: textColor,
        fontSize: FontSize.medium
    }
  });
};
export default RecordingModalStyles;
