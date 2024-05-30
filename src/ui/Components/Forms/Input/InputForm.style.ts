import { StyleSheet } from "react-native";
import { hp, wp } from "../../../Global/Percentage.ts";
import { Theme } from "../../../Global/Theme.ts";
import { FontSize } from "../../../Global/FontSize.ts";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  inputLabel: {
    color: Theme.dark,
    width: wp(90),
    alignSelf: 'center',
    fontSize: FontSize.normal
  },
  inputContainer: {
    width: wp(90),
    padding: wp(1),
    height: hp(6),
    backgroundColor: Theme.primaryLight,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  info: {
    width: wp(90),
    alignSelf: 'center',
    fontSize: FontSize.normal
  }
});
export default styles;
