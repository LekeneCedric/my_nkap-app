import {Image, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View, Animated} from "react-native";
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
import ISelectCategoryItem from "../../../../Components/Forms/SelectCategory/SelectCategoryItem.ts";
import SelectCategoryModalView
    from "../../../../Components/Forms/SelectCategory/SelectCategoryModal/SelectCategoryModalView.tsx";
import {useState} from "react";
import {IOperationTypeEnum} from "../../../../../Domain/Operation/Operation.ts";
import SelectOperationTypeModalView from "../../../../Components/Modals/SelectTypeModal/SelectOperationTypeModalView.tsx";

const Transactions = () => {
    const {
        accounts,
        accountLoadingState,
        operationsLoadingState,
        operations,
        refreshing,
        onRefresh,
        bounceValue,
        navigateToAddOperation,
        operationFilterParams,
        handlePreviousDay,
        handleNextDay,
        categories,
        selectCategory,
        resetFilter,
        selectOperationType
    } = useOperationsView();
    const showSelectCategoryModal = () => {
        setModalSelectCategoryIsVisible(true)
    }
    const [modalSelectCategoryIsVisible, setModalSelectCategoryIsVisible] = useState(false);
    const [modalSelectTypeIsVisible, setModalSelectTypeIsVisible] = useState(false);
    const {colorPalette: {pageBackground, containerBackground, text, gray, action1, action1Text}} = useTheme();
    const styles = OperationViewStyles(pageBackground, containerBackground, text, gray);
    return (
        <>
            <SelectCategoryModalView
                action={(item: ISelectCategoryItem) => {
                    selectCategory(item)
                    setModalSelectCategoryIsVisible(false)
                }}
                closeModal={() => {
                    setModalSelectCategoryIsVisible(false);
                }}
                isVisible={modalSelectCategoryIsVisible}
                list={categories}
            />
            <SelectOperationTypeModalView
                action={(type: IOperationTypeEnum) => {
                    selectOperationType(type);
                    setModalSelectTypeIsVisible(false);
                }}
                closeModal={() => {
                    setModalSelectTypeIsVisible(false);
                }}
                isVisible={modalSelectTypeIsVisible}
                selectedOperationTypeValue={operationFilterParams.operationType}
            />
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
                            onRefresh={onRefresh}/>}>
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
                    <View style={{margin: 10}}>
                        {
                            (operationFilterParams.categoryId || operationFilterParams.operationType) && (
                                <TouchableOpacity onPress={resetFilter} style={{
                                    marginBottom: 3,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: gray,
                                    borderRadius: 8
                                }}>
                                    <Text numberOfLines={1} style={{fontSize: FontSize.normal, color: text}}> Réinitialiser
                                        le filtre</Text>
                                    <Icon name={Icons.close} size={IconSizes.normal} color={text}/>
                                </TouchableOpacity>
                            )
                        }
                        <View style={styles.transactionFilterContainer}>
                            <ScrollView horizontal={true}>
                                <View style={styles.transactionFilterCategories}>
                                    {
                                        operationFilterParams.categoryId ? (
                                            <TouchableOpacity onPress={showSelectCategoryModal}
                                                              style={[styles.transactionFilterCategoriesItem, {
                                                                  backgroundColor: action1
                                                              }]}>
                                                <Text
                                                    style={[styles.transactionFilterCategoriesItemText, {color: action1Text}]}
                                                    numberOfLines={1}>{operationFilterParams.categoryLabel}</Text>
                                                <Icon name={operationFilterParams.categoryIcon!} size={IconSizes.normal}
                                                      color={action1Text}/>
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity onPress={showSelectCategoryModal}
                                                              style={styles.transactionFilterCategoriesItem}>
                                                <Text style={styles.transactionFilterCategoriesItemText}
                                                      numberOfLines={1}>Catégories</Text>
                                                <Icon name={Icons.dropDown} size={IconSizes.normal} color={action1}/>
                                            </TouchableOpacity>
                                        )
                                    }
                                    {
                                        operationFilterParams.operationType ? (
                                            <TouchableOpacity onPress={()=>{setModalSelectTypeIsVisible(true)}}
                                                              style={[styles.transactionFilterCategoriesItem, {
                                                                  backgroundColor: action1
                                                              }]}>
                                                <Text
                                                    style={[styles.transactionFilterCategoriesItemText, {color: action1Text}]}
                                                    numberOfLines={1}>{operationFilterParams.typeLabel}</Text>
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity onPress={()=>{setModalSelectTypeIsVisible(true)}} style={styles.transactionFilterCategoriesItem}>
                                                <Text style={styles.transactionFilterCategoriesItemText}
                                                      numberOfLines={1}>Types</Text>
                                                <Icon name={Icons.dropDown} size={IconSizes.normal} color={action1}/>
                                            </TouchableOpacity>
                                        )
                                    }

                                </View>
                            </ScrollView>

                            <TouchableOpacity style={styles.transactionFilterCalendar}>
                                <Icon name={Icons.filter} size={IconSizes.medium} color={action1}/>
                            </TouchableOpacity>
                        </View>

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
                    <TouchableOpacity onPress={() => {
                        handlePreviousDay(4)
                    }}>
                        <Icon name={Icons.chevron.doubleLeft} color={text} size={IconSizes.normMed}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        handlePreviousDay(1)
                    }}>
                        <Icon name={Icons.chevron.left} color={text} size={IconSizes.normMed}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text numberOfLines={1} style={{color: action1, fontSize: FontSize.normal, marginRight: 5}}>
                            {operationFilterParams.formattedDate}
                        </Text>
                        <Icon name={Icons.calendar} color={action1} size={IconSizes.normMed}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        handleNextDay(1)
                    }}>
                        <Icon name={Icons.chevron.right} color={text} size={IconSizes.normMed}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        handleNextDay(4)
                    }}>
                        <Icon name={Icons.chevron.doubleRight} color={text} size={IconSizes.normMed}/>
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
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                }}
                >
                    <TouchableOpacity onPress={navigateToAddOperation}>
                        <Icon name={Icons.add} size={IconSizes.medium} color={action1Text}/>
                    </TouchableOpacity>
                </Animated.View>
            </SafeAreaView>
        </>
    );
};
export default Transactions;
