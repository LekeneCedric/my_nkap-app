import {StyleSheet} from "react-native";
import {PageStyles} from "../../../../Global/Styles/page.styles";
import {FontSize} from "../../../../Global/FontSize";
import {Theme} from "../../../../Global/Theme";
import {hp, wp} from "../../../../Global/Percentage";

const styles = StyleSheet.create({
  pageContainer: PageStyles.container,
  accountsContainer: {
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  title: {
    fontSize: FontSize.medium,
    color: Theme.primary,
  },
  accountBalance: {
    fontSize: FontSize.high,
    fontWeight: "bold",
    color: Theme.primary,
  },
  transactionContainer: {
    marginTop: "8%",
    backgroundColor: Theme.light,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    margin: 5,
    shadowColor: "#171717",
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
  },
  transactionHeaderBar: {
    backgroundColor: Theme.primary,
    padding: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  transactionHeaderBarTitle: {
    fontSize: FontSize.normal,
    fontWeight: "bold",
    color: Theme.light,
  },
  transactionBodyContainer: {
    height: hp(40),
  },
  notFoundContainer: {
    flexDirection: 'column',
    width: '100%',
    height: hp(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundImage: {
    alignSelf: 'center',
  },
  notFoundText: {
    fontSize: FontSize.normal,
    alignSelf: 'center',
    textAlign: 'center'
  }
});
export default styles;
