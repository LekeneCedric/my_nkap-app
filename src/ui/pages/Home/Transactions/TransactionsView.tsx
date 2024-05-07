import {SafeAreaView, ScrollView, Text, View} from "react-native";
import styles from "./TransactionsView.styles";
import {pageStylesConstant} from "../../../Global/Styles/constants";
import AccountCard from "../../../Components/Card/AccountCard/AccountCard";
import TransactionItem from "../../../Components/TransactionItem/TransactionItem";

const Transactions = () => {
  return (
    <SafeAreaView
      style={[styles.pageContainer, {padding: pageStylesConstant.padding}]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.accountsContainer}>
          <Text style={styles.title}>Total Balance</Text>
          <Text style={styles.accountBalance}>XAF 25.002.250</Text>
          <View style={{width: "100%"}}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <AccountCard />
              <AccountCard />
            </ScrollView>
          </View>
        </View>
        <View style={styles.transactionContainer}>
          <View style={styles.transactionHeaderBar}>
            <Text style={styles.transationHeaderBarTitle}>
              Recent transactions
            </Text>
          </View>
          <View style={styles.transactionBodyContainer}>
            <ScrollView>
              <TransactionItem />
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Transactions;
