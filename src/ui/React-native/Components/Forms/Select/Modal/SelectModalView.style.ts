import {StyleSheet} from "react-native";
import {hp, wp} from "../../../../Global/Percentage";
import { FontSize } from "../../../../Global/FontSize";

const SelectModalViewStyle = (pageContainer: string, cardContainer: string, text: string, gray: string) => {
  return StyleSheet.create({
    modalContainer: {
      width: wp(100),
      height: hp(100),
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: cardContainer,
    },
    container: {
      flexDirection: "column",
      width: wp(100),
      height: hp(100),
      paddingTop: hp(2),
      alignSelf: "center",
      backgroundColor: cardContainer,
      shadowColor: "#171717",
      shadowOffset: {width: 5, height: 5},
      shadowOpacity: 0.2,
      shadowRadius: wp(10),
      elevation: 10,
    },
    listContainer: {
      padding: '5%'
    },
    itemContainer: {
      width: '100%',
      borderBottomWidth: 0.3,
      borderBottomColor: gray,
      padding: '4%',
      flexDirection: 'row',
      alignItems: 'center'
    },
    itemText: {
      color: text,
      fontSize: FontSize.normal,
      fontWeight: '500',
      paddingLeft: 10,
    },
  });
};
export default SelectModalViewStyle;
