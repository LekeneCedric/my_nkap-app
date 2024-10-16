import {RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import AccountCard from "../../../../Components/Card/AccountCard/AccountCard";
import TransactionItem from "../../../../Components/TransactionItem/TransactionItem";
import useOperationsView from "./useOperationView.ts";
import {LoadingState} from "../../../../../../Domain/Enums/LoadingState";
import LoadingAccount from "../../../../Components/Card/AccountCard/Loading/LoadingAccount.tsx";
import LoadingTransactionItem from "../../../../Components/TransactionItem/Loading/LoadingTransactionItem.tsx";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../../../Global/Icons.ts";
import {IconSizes} from "../../../../Global/IconSizes.ts";
import useTheme from "../../../../Shared/Hooks/useTheme.ts";
import OperationViewStyles from "./OperationsView.styles.ts";
import {hp, wp} from "../../../../Global/Percentage.ts";
import {FontSize} from "../../../../Global/FontSize.ts";
import ISelectCategoryItem from "../../../../Components/Forms/SelectCategory/SelectCategoryItem.ts";
import SelectCategoryModalView
    from "../../../../Components/Forms/SelectCategory/SelectCategoryModal/SelectCategoryModalView.tsx";
import {useState} from "react";
import {IOperationTypeEnum} from "../../../../../../Domain/Operation/Operation.ts";
import SelectOperationTypeModalView from "../../../../Components/Modals/SelectTypeModal/SelectOperationTypeModalView.tsx";
import {MonthItem} from "../../../../../../Domain/Shared/Months.ts";
import SelectMonthModalView from "../../../../Components/Modals/SelectMonthModal/SelectMonthModalView.tsx";
import OperationByDateItem from "../../../../Components/OperationByDateItem/OperationByDateItem.tsx";
import ISelectItem from "../../../../Components/Forms/Select/SelectItem.ts";
import SelectModalView from "../../../../Components/Forms/Select/Modal/SelectModalView.tsx";
import useNavigation from "../../../../utils/useNavigation.ts";
import {routes} from "../../../routes";
import useCustomTranslation from "../../../../Shared/Hooks/useCustomTranslation.ts";
import React from "react";
import FloatingButtons from "../../../../Components/Buttons/FloatingButtons/FloatingButtons.tsx";

const Transactions = () => {
    const {
        accounts,
        accountLoadingState,
        operationsLoadingState,
        operations,
        refreshing,
        onRefresh,
        navigateToAddOperation,
        navigateTOAddAIOperation: navigateToAddAIOperation,
        operationFilterParams,
        handlePreviousDay,
        handleNextDay,
        categories,
        selectCategory,
        resetFilter,
        selectOperationType,
        selectMonth,
        operationsByDate,
        selectAccount,
        accountsList,
        shouldNotGoForwardNextDay,
        shouldNoyGoForwardFourthNexDays
    } = useOperationsView();
    const {
        navigateByPath
    } = useNavigation();
    const showSelectCategoryModal = () => {
        setModalSelectCategoryIsVisible(true)
    }
    const {translate} = useCustomTranslation();
    const [modalSelectCategoryIsVisible, setModalSelectCategoryIsVisible] = useState(false);
    const [modalSelectTypeIsVisible, setModalSelectTypeIsVisible] = useState(false);
    const [modalSelectMonthIsVisible, setModalSelectMonthIsVisible] = useState(false);
    const [modalSelectAccountIsVisible, setModalSelectAccountIsVisible] = useState(false);
    const {colorPalette: {pageBackground, containerBackground, text, gray, action1, action1Text, light}} = useTheme();
    const styles = OperationViewStyles(pageBackground, containerBackground, text, gray);
    return (
        <>
            <SelectMonthModalView
                selectedMonth={operationFilterParams.month}
                action={(item: MonthItem) => {
                    selectMonth(item);
                    setModalSelectMonthIsVisible(false);
                }}
                closeModal={()=>setModalSelectMonthIsVisible(false)}
                isVisible={modalSelectMonthIsVisible}
            />
            <SelectModalView
                action={(item: ISelectItem) => {
                    selectAccount({
                        icon: item.icon!,
                        label: item.name!,
                        id: item.id!
                    });
                    setModalSelectAccountIsVisible(false)
                }}
                closeModal={() => {
                    setModalSelectAccountIsVisible(false);
                }}
                isVisible={modalSelectAccountIsVisible}
                list={accountsList}
            />
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
                style={[styles.pageContainer, !operationFilterParams.month && {paddingBottom: 50}]}>
                {/* <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    > */}
                    <View style={styles.accountsContainer}>
                        <View style={{width: "100%", alignItems: 'center'}}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}>
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
                                                accounts.map(ac => <AccountCard data={ac}/>)
                                            }
                                        </>
                                    )
                                }
                            </ScrollView>
                            <TouchableOpacity
                                onPress={() => {
                                    navigateByPath(routes.home.accounts)
                                }}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '80%',
                                    alignSelf: 'center',
                                    backgroundColor: action1,
                                    padding: 10,
                                    borderRadius: 8,
                                    marginBottom: 8,
                                    marginTop: 5
                                }}
                            >
                                <Icon name={Icons.wallet} size={IconSizes.normal} color={light} />
                                <Text style={{color: action1Text, paddingLeft: 5}}>{translate('manage_my_accounts')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{margin: 0}}>
                        {
                            (
                                operationFilterParams.categoryId ||
                                operationFilterParams.operationType ||
                                operationFilterParams.month ||
                                operationFilterParams.accountId
                            ) && (
                                <TouchableOpacity onPress={()=>{resetFilter()}} style={{
                                    marginBottom: 3,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    padding: 2,
                                    borderRadius: 8,
                                    width: '60%'
                                }}>
                                    <Text numberOfLines={1} style={{fontSize: FontSize.normal, color: text}}> {translate('clear')} </Text>
                                    <Icon name={Icons.close} size={IconSizes.normal} color={text}/>
                                </TouchableOpacity>
                            )
                        }
                        <View style={styles.transactionFilterContainer}>
                            <TouchableOpacity style={styles.transactionFilterCalendar}>
                                <Icon name={Icons.filter} size={IconSizes.medium} color={action1}/>
                            </TouchableOpacity>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={styles.transactionFilterCategories}>
                                    {
                                        operationFilterParams.accountId ? (
                                            <TouchableOpacity onPress={()=>{setModalSelectAccountIsVisible(true)}}
                                                              style={[styles.transactionFilterCategoriesItem, {
                                                                  backgroundColor: action1
                                                              }]}>
                                                <Text
                                                    style={[styles.transactionFilterCategoriesItemText, {color: action1Text}]}
                                                    numberOfLines={1}>{operationFilterParams.accountLabel}</Text>
                                                <Icon name={operationFilterParams.accountIcon!} size={IconSizes.normal} color={action1Text}/>
                                            </TouchableOpacity>
                                        ): (
                                            <TouchableOpacity onPress={()=>{setModalSelectAccountIsVisible(true)}} style={styles.transactionFilterCategoriesItem}>
                                                <Text style={styles.transactionFilterCategoriesItemText}
                                                      numberOfLines={1}>{translate('account')}</Text>
                                                <Icon name={Icons.dropDown} size={IconSizes.normal} color={action1}/>
                                            </TouchableOpacity>
                                        )
                                    }
                                    {
                                        operationFilterParams.month ? (
                                            <TouchableOpacity onPress={()=>{setModalSelectMonthIsVisible(true)}}
                                                              style={[styles.transactionFilterCategoriesItem, {
                                                                  backgroundColor: action1
                                                              }]}>
                                                <Text
                                                    style={[styles.transactionFilterCategoriesItemText, {color: action1Text}]}
                                                    numberOfLines={1}>{operationFilterParams.monthLabel}</Text>
                                                <Icon name={Icons.calendar} size={IconSizes.normal} color={action1Text}/>
                                            </TouchableOpacity>
                                        ): (
                                            <TouchableOpacity onPress={()=>{setModalSelectMonthIsVisible(true)}} style={styles.transactionFilterCategoriesItem}>
                                                <Text style={styles.transactionFilterCategoriesItemText}
                                                      numberOfLines={1}>{translate('month')}</Text>
                                                <Icon name={Icons.dropDown} size={IconSizes.normal} color={action1}/>
                                            </TouchableOpacity>
                                        )
                                    }
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
                                                      numberOfLines={1}>{translate('category')}</Text>
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
                                                      numberOfLines={1}>{translate('types')}</Text>
                                                <Icon name={Icons.dropDown} size={IconSizes.normal} color={action1}/>
                                            </TouchableOpacity>
                                        )
                                    }

                                </View>
                            </ScrollView>
                        </View>

                    </View>
                    
                    <View style={styles.transactionBodyContainer}>
                        <ScrollView
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    progressBackgroundColor={action1}
                                    colors={[action1Text]}
                                    tintColor={action1Text}
                                    titleColor={action1Text}
                                    onRefresh={onRefresh}/>}
                            style={{flex: 1}} showsVerticalScrollIndicator={false}>
                            {
                                operationsLoadingState == LoadingState.pending && (
                                    <>
                                        <LoadingTransactionItem count={10}/>
                                    </>
                                )
                            }
                            {
                                operationsLoadingState != LoadingState.pending && !operationFilterParams.month && (
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
                                operationsLoadingState != LoadingState.pending && operationFilterParams.month && (
                                    <>
                                        {
                                            operationsByDate.map(op =>
                                                <OperationByDateItem data={op} />
                                            )
                                        }
                                    </>
                                )
                            }
                            {
                                operationsLoadingState !== LoadingState.pending && operations.length === 0 && (
                                    <View style={styles.notFoundContainer}>
                                        <Text style={styles.notFoundText}>{translate('not_found_operations')}</Text>
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
                {/* </ScrollView> */}
                {
                    !operationFilterParams.month && (
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
                            <TouchableOpacity disabled={shouldNotGoForwardNextDay} onPress={() => {
                                handleNextDay(1)
                            }}>
                                <Icon name={Icons.chevron.right} color={shouldNotGoForwardNextDay ? gray : text} size={IconSizes.normMed}/>
                            </TouchableOpacity>
                            <TouchableOpacity disabled={shouldNoyGoForwardFourthNexDays} onPress={() => {
                                handleNextDay(4)
                            }}>
                                <Icon name={Icons.chevron.doubleRight} color={shouldNoyGoForwardFourthNexDays ? gray : text} size={IconSizes.normMed}/>
                            </TouchableOpacity>
                        </View>
                    )
                }
                <FloatingButtons
                    customStyles={{bottom: hp(operationFilterParams.month ? 2 : 10)}}
                    buttons={[
                        {
                            icon: Icons.recorder,
                            size: IconSizes.normal,
                            action: navigateToAddAIOperation,
                            color: action1
                        },
                        {
                            icon: Icons.keyboard,
                            size: IconSizes.normal,
                            action: navigateToAddOperation,
                            color: action1
                        }
                    ]}
                    icon={Icons.add}
                />
                
            </SafeAreaView>
        </>
    );
};
export default Transactions;
