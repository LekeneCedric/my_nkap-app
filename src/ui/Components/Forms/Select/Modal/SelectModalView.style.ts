import {StyleSheet} from "react-native";
import {hp, wp} from "../../../../Global/Percentage";
import {Theme} from "../../../../Global/Theme";
import { FontSize } from "../../../../Global/FontSize";

const styles = StyleSheet.create({
  modalContainer: {
    width: wp(100),
    height: hp(100),
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexDirection: "column",
    width: wp(100),
    height: hp(100),
    paddingTop: hp(2),
    alignSelf: "center",
    backgroundColor: Theme.light,
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
    borderBottomColor: Theme.gray,
    padding: '4%'
  },
  itemText: {
    color: Theme.dark,
    fontSize: FontSize.normal,
    fontWeight: '500'
  },
});
export default styles;
