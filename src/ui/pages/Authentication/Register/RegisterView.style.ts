import {StyleSheet} from "react-native";
import { PageStyles } from "../../../Global/Styles/pageStyles";
import { Theme } from "../../../Global/Theme";
import { hp, wp } from "../../../Global/Percentage";

const styles = StyleSheet.create({
  pageContainer: PageStyles.container,
  formHeader: {
    backgroundColor: Theme.primary,
    height: hp(100),
    width: wp(100),
    zIndex: 1,
    position: "absolute",
  },
  titleContainer: {
    marginTop: hp(7),
    width: "100%",
  },
  formContainer: {
    borderTopLeftRadius: wp(10),
    borderTopRightRadius: wp(10),
    height: hp(100),
    width: wp(100),
    marginTop: hp(20),
    paddingTop: hp(2),
    zIndex: 2,
    position: "absolute",
    backgroundColor: Theme.light,
  },
});
export default styles;
