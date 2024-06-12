import {Image, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View, Animated} from "react-native";
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
import {hp, wp} from "../../../../Global/Percentage.ts";
import {FontSize} from "../../../../Global/FontSize.ts";

const Transactions = () => {
    const {
        accounts,
        accountLoadingState,
        operationsLoadingState,
        operations,
        refreshing,
        onRefresh,
        bounceValue,
        navigateToAddOperation
    } = useOperationsView();
    const {colorPalette: {pageBackground, containerBackground, text, gray, action1, action1Text}} = useTheme();
    const styles = OperationViewStyles(pageBackground, containerBackground, text, gray);
    return (
        <SafeAreaView
            style={styles.pageContainer}>
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
                        <Icon name={Icons.filter} size={IconSizes.medium} color={action1}/>
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
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                backgroundColor: pageBackground,
                padding: 10,
                position: 'absolute',
                bottom: 0,
                height: 50,
                width: wp(100)
            }}>
                <TouchableOpacity>
                    <Icon name={Icons.chevron.doubleLeft} color={text} size={IconSizes.normMed} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name={Icons.chevron.left} color={text} size={IconSizes.normMed} />
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text numberOfLines={1} style={{color: action1, fontSize: FontSize.normal, marginRight: 5}}>Aujourd'hui</Text>
                    <Icon name={Icons.calendar} color={action1} size={IconSizes.normMed} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name={Icons.chevron.right} color={text} size={IconSizes.normMed} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name={Icons.chevron.doubleRight} color={text} size={IconSizes.normMed} />
                </TouchableOpacity>
            </View>
            <Animated.View style={{
                translateY: bounceValue,
                position: 'absolute',
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: action1,
                justifyContent: 'center',
                alignItems: 'center',
                right: 20,
                bottom: hp(10),
                elevation: 8, // Add shadow for Android
                shadowColor: text, // Add shadow for iOS
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
            }}
            >
                <TouchableOpacity onPress={navigateToAddOperation}>
                    <Icon name={Icons.add} size={IconSizes.medium} color={action1Text} />
                </TouchableOpacity>
            </Animated.View>
        </SafeAreaView>
    );
};
export default Transactions;
