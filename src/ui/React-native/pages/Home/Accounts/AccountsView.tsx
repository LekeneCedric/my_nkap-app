import {Animated, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import useTheme from "../../../Shared/Hooks/useTheme.ts";
import AccountsViewStyles from "./AccountsView.styles.ts";
import useAccountView from "./useAccountView.ts";
import useConfiguration from "../../../Shared/Hooks/useConfiguration.ts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {IconSizes} from "../../../Global/IconSizes.ts";
import {Icons} from "../../../Global/Icons.ts";
import AccountCard from "../../../Components/Card/AccountCard/AccountCard.tsx";
import AccountItem from "./components/AccountItem/AccountItem.tsx";
import useNavigation from "../../../utils/useNavigation.ts";
import {hp} from "../../../Global/Percentage.ts";
import {useState} from "react";
import AddAccountModalView from "./components/Modals/AddAccountModal/AddAccountModalView.tsx";
import useCustomTranslation from "../../../Shared/Hooks/useCustomTranslation.ts";
import useMoneyParser from "../../../Shared/useMoneyParser.ts";

const AccountsView = () => {
    const {
        translate
    } = useCustomTranslation();
    const {
        totalBalance,
        accounts,
        bounceValue
    } = useAccountView();
    const {
        parseThousand
    } = useMoneyParser();
    const {
        displayAmount,
        canSeeAmount,
        switchCanSeeAmount
    } = useConfiguration();
    const {
        goBack
    } = useNavigation();

    const {colorPalette: {pageBackground, containerBackground, text, gray, action1, action1Text}} = useTheme();
    const styles = AccountsViewStyles(pageBackground, containerBackground, text, gray, action1);
    const [showAddAccountModalView, setShowAddAccountModalView] = useState<boolean>(false)
    return <>
        <AddAccountModalView
            closeModal = {() => setShowAddAccountModalView(false)}
            isVisible={showAddAccountModalView}
        />
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={goBack}>
                <Icon
                    name={Icons.back}
                    size={IconSizes.medium}
                    color={text}
                />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{translate('manage_my_accounts')}</Text>
        </View>
        <SafeAreaView
            style={[styles.pageContainer]}>
            <View style={styles.balanceContainer}>
                <View style={{flexDirection: 'column'}}>

                    <Text style={styles.balanceContainerTitle}>{translate('total_balance')}</Text>
                    <Text style={styles.balanceContainerAmount}>{displayAmount(`XAF ${parseThousand(totalBalance)}`)}</Text>
                </View>
                <TouchableOpacity onPress={switchCanSeeAmount}>
                    <Icon name={canSeeAmount ? Icons.eyeClose : Icons.eyeOpen} size={IconSizes.normMed} color={action1} />
                </TouchableOpacity>
            </View>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                {
                    accounts.map(ac => <AccountItem data={ac} />)
                }

            </ScrollView>
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
                bottom: hp(5),
                elevation: 8, // Add shadow for Android
                shadowColor: text, // Add shadow for iOS
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.8,
                shadowRadius: 2,
            }}
            >
                <TouchableOpacity onPress={()=>setShowAddAccountModalView(true)}>
                    <Icon name={Icons.add} size={IconSizes.medium} color={action1Text}/>
                </TouchableOpacity>
            </Animated.View>
        </SafeAreaView>
    </>
};
export default AccountsView;