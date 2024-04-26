import {StyleSheet} from "react-native";
import { hp, wp } from "../../Global/Percentage";
import { Theme } from "../../Global/Theme";

const styles = StyleSheet.create({
  container: {
    padding: wp(1),
    height: hp(6),
    backgroundColor: Theme.primaryLight,
    borderRadius: 2,
    alignSelf: "center",
    flexDirection: "row",
    flex: 8
  },
});
export default styles;
