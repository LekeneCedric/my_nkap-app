import { StyleSheet } from "react-native";
import { PageStyles } from "../../../Global/Styles/pageStyles.ts";
import { Theme } from "../../../Global/Theme.ts";
import { hp, wp } from "../../../Global/Percentage.ts";

const styles = StyleSheet.create({
  pageContainer: PageStyles.container,
  formHeader: {
    backgroundColor: Theme.primary,
    height: hp(100),
    width: wp(100),
    zIndex: 1,
    position: 'absolute'
  },
  titleContainer: {
    marginTop: hp(10),
    width: '100%',
  },
  formContainer: {
    borderTopLeftRadius: wp(10),
    borderTopRightRadius: wp(10),
    height: hp(100),
    width: wp(100),
    marginTop: hp(20),
    paddingTop: hp(10),
    zIndex: 2,
    position: 'absolute',
    backgroundColor: Theme.light
  }
});
export default styles;
