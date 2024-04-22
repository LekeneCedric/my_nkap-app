import { StyleSheet } from "react-native";
import { hp, wp } from "../../../Global/Percentage.ts";
import { Theme } from "../../../Global/Theme.ts";

const styles = StyleSheet.create({
  container: {
    width: wp(90),
    padding: wp(1),
    height: hp(6),
    backgroundColor: Theme.primaryLight,
    borderRadius: 2,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  }
});
export default styles;
