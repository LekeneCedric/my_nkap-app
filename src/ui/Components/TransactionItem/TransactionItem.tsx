import {Text, View} from "react-native";
import styles from "./TransactionItem.styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../Global/Icons";
import {Theme} from "../../Global/Theme";
import {IconSizes} from "../../Global/IconSizes";

const TransactionItem = () => {
  return (
    <View style={styles.transactionContainer}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.transactionIconContainer}>
          <Icon
            style={styles.transactionIcon}
            name={Icons.calendar}
            color={Theme.primary}
            size={IconSizes.normal}
          />
        </View>
        <View style={styles.transactionDetailContainer}>
          <Text numberOfLines={1} style={styles.transactionTitle}>
            Buy my parents house
          </Text>
          <Text style={styles.transactionType}>Expense</Text>
        </View>
      </View>
      <View style={styles.transactionDetailAmountContainer}>
        <Text numberOfLines={1} style={[styles.transactionAmountTitle, {color: Theme.green}]}>
          + XAF 2000.0
        </Text>
        <Text style={styles.transactionType}>Today 07:18 AM</Text>
      </View>
    </View>
  );
};
export default TransactionItem;
