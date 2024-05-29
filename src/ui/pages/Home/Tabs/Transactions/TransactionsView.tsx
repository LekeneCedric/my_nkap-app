import {Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "./TransactionsView.styles";
import {pageStylesConstant} from "../../../../Global/Styles/constants";
import AccountCard from "../../../../Components/Card/AccountCard/AccountCard";
import TransactionItem from "../../../../Components/TransactionItem/TransactionItem";
import useTransactionView from "./useTransctionView";
import {LoadingState} from "../../../../../Domain/Enums/LoadingState";
import LoadingAccount from "../../../../Components/Card/AccountCard/Loading/LoadingAccount.tsx";
import LoadingTransactionItem from "../../../../Components/TransactionItem/Loading/LoadingTransactionItem.tsx";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../../../Global/Icons.ts";
import {IconSizes} from "../../../../Global/IconSizes.ts";
import {Theme} from "../../../../Global/Theme.ts";

const Transactions = () => {
    const {
        accounts,
        accountLoadingState,
        operationsLoadingState,
        operations,
    } = useTransactionView();
    return (
        <SafeAreaView
            style={[styles.pageContainer, {padding: pageStylesConstant.padding}]}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.accountsContainer}>
                    <Text style={styles.title}>Montant totale</Text>
                    <Text style={styles.accountBalance}>XAF 25.002.250</Text>
                    <View style={{width: "100%"}}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            {
                                accountLoadingState == LoadingState.pending && (
                                    <>
                                        <LoadingAccount />
                                        <View  style={{marginLeft: 5}}/>
                                        <LoadingAccount />
                                    </>

                                )
                            }
                            {
                                accountLoadingState == LoadingState.success && (
                                    <>
                                        {
                                            accounts.map(ac => <AccountCard type={ac.type} name={ac.name}
                                                                            amount={ac.balance}/>)
                                        }
                                    </>
                                )
                            }
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.transactionContainer}>
                    <View style={styles.transactionHeaderBar}>
                        <Text style={styles.transactionHeaderBarTitle}>
                            Opérations récentes
                        </Text>
                        <TouchableOpacity>
                            <Icon name={Icons.calendar} size={IconSizes.normal} color={Theme.light} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.transactionBodyContainer}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {
                                operationsLoadingState == LoadingState.pending && (
                                    <>
                                        <LoadingTransactionItem count={10} />
                                    </>
                                )
                            }
                            {
                                operationsLoadingState == LoadingState.success && (
                                    <>
                                        {
                                            operations.map( op =>
                                                <TransactionItem />
                                            )
                                        }
                                    </>
                                )
                            }
                            {
                                operationsLoadingState !== LoadingState.pending && operations.length === 0 && (
                                    <View style={styles.notFoundContainer}>
                                        <Image style={styles.notFoundImage} source={require('../../../../../assets/icons/Home/transactions/not-found.png')} />
                                        <Text style={styles.notFoundText}>Aucune opération éffectuée pour le moment !</Text>
                                    </View>
                                )
                            }

                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default Transactions;
