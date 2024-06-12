import {Image, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "./OperationsView.styles.ts";
import {pageStylesConstant} from "../../../../Global/Styles/constants";
import AccountCard from "../../../../Components/Card/AccountCard/AccountCard";
import TransactionItem from "../../../../Components/TransactionItem/TransactionItem";
import useOperationsView from "./useOperationView.ts";
import {LoadingState} from "../../../../../Domain/Enums/LoadingState";
import LoadingAccount from "../../../../Components/Card/AccountCard/Loading/LoadingAccount.tsx";
import LoadingTransactionItem from "../../../../Components/TransactionItem/Loading/LoadingTransactionItem.tsx";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../../../Global/Icons.ts";
import {IconSizes} from "../../../../Global/IconSizes.ts";
import {Theme} from "../../../../Global/Theme.ts";
import useTheme from "../../../../Shared/Hooks/useTheme.ts";
import OperationViewStyles from "./OperationsView.styles.ts";

const Transactions = () => {
    const {
        accounts,
        accountLoadingState,
        operationsLoadingState,
        operations,
        refreshing,
        onRefresh
    } = useOperationsView();
    const {colorPalette: {pageBackground, containerBackground, text, gray, action1, action1Text}} = useTheme();
    const styles = OperationViewStyles(pageBackground, containerBackground, text, gray);
    return (
        <SafeAreaView
            style={[styles.pageContainer, {padding: pageStylesConstant.padding}]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        progressBackgroundColor={action1}
                        colors={[action1Text]}
                        tintColor={action1Text}
                        titleColor={action1Text}
                        onRefresh={onRefresh}/>}
            >
                <View style={styles.accountsContainer}>
                    {/*<Text style={styles.title}>Montant totale</Text>*/}
                    {/*<Text style={styles.accountBalance}>XAF 25.002.250</Text>*/}
                    <View style={{width: "100%"}}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            {
                                accountLoadingState == LoadingState.pending && (
                                    <>
                                        <LoadingAccount/>
                                        <View style={{marginLeft: 5}}/>
                                        <LoadingAccount/>
                                    </>

                                )
                            }
                            {
                                accountLoadingState != LoadingState.pending && (
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
                <View style={styles.transactionFilterContainer}>
                    <ScrollView horizontal={true}>
                        <View style={styles.transactionFilterCategories}>
                            <TouchableOpacity style={styles.transactionFilterCategoriesItem}>
                                <Text style={styles.transactionFilterCategoriesItemText}
                                      numberOfLines={1}>Catégories</Text>
                                <Icon name={Icons.dropDown} size={IconSizes.normal} color={action1}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.transactionFilterCategoriesItem}>
                                <Text style={styles.transactionFilterCategoriesItemText} numberOfLines={1}>Types</Text>
                                <Icon name={Icons.dropDown} size={IconSizes.normal} color={action1}/>
                            </TouchableOpacity>


                        </View>
                    </ScrollView>

                    <TouchableOpacity style={styles.transactionFilterCalendar}>
                        <Icon name={Icons.calendar} size={IconSizes.medium} color={action1}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.transactionBodyContainer}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            operationsLoadingState == LoadingState.pending && (
                                <>
                                    <LoadingTransactionItem count={10}/>
                                </>
                            )
                        }
                        {
                            operationsLoadingState != LoadingState.pending && (
                                <>
                                    {
                                        operations.map(op =>
                                            <TransactionItem data={op}/>
                                        )
                                    }
                                </>
                            )
                        }
                        {
                            operationsLoadingState !== LoadingState.pending && operations.length === 0 && (
                                <View style={styles.notFoundContainer}>
                                    <Text style={styles.notFoundText}>Aucune opération éffectuée pour le moment !</Text>
                                </View>
                            )
                        }

                    </ScrollView>
                </View>
                {/*<View style={styles.transactionContainer}>*/}
                {/*    <View style={styles.transactionHeaderBar}>*/}
                {/*        <Text style={styles.transactionHeaderBarTitle}>*/}
                {/*            Opérations récentes*/}
                {/*        </Text>*/}
                {/*        <TouchableOpacity>*/}
                {/*            <Icon name={Icons.calendar} size={IconSizes.normal} color={action1}/>*/}
                {/*        </TouchableOpacity>*/}
                {/*    </View>*/}
                {/*    */}
                {/*</View>*/}
            </ScrollView>
        </SafeAreaView>
    );
};
export default Transactions;
