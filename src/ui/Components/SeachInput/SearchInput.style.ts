import {StyleSheet} from "react-native";
import { hp, wp } from "../../Global/Percentage";
import { Theme } from "../../Global/Theme";

const SearchInputStyle = (backgroundColor: string) => {
  return StyleSheet.create({
    container: {
      padding: wp(1),
      height: hp(6),
      backgroundColor: backgroundColor,
      borderRadius: 10,
      alignSelf: "center",
      flexDirection: "row",
      flex: 8
    },
  });
}
export default SearchInputStyle;
