import {StyleSheet} from "react-native";
import {Theme} from "../../../Global/Theme";
import {hp, wp} from "../../../Global/Percentage";
import {FontSize} from "../../../Global/FontSize";
import {RFPercentage} from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: Theme.light,
    width: wp(42),
    margin: 5,
    marginTop: '2%',
    flexDirection: "column",
    shadowColor: "#171717",
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
  },
  title: {
    fontWeight: "400",
    color: Theme.dark,
    fontSize: FontSize.normal,
    overflow: "hidden",
  },
  amount: {
    color: Theme.dark,
    fontWeight: "bold",
    fontSize: RFPercentage(2.5),
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: '8%',
  },
  statView: {
    flexDirection: 'row'
  },
  statViewText: {
    fontSize: FontSize.small,
    fontWeight: 'bold',
    color: Theme.dark
  },
  statDesc: {
    fontSize: FontSize.small,
    color: Theme.primaryLight
  },
  statViewIconContainer: {
    marginLeft: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.light,
    borderRadius: 15
  },
  stateViewIcon: {
    padding: 2,
  },
  button: {
    alignItems: 'center',
    backgroundColor: Theme.dark,
    borderRadius: 5,
    marginTop: '9%'
  },
  buttonText: {
    color: Theme.light,
    fontSize: FontSize.normal,
    padding: 8
  }
});
export default styles;
