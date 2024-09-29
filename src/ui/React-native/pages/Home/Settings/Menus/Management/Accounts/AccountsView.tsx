import {Animated, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import useCustomTranslation from "../../../../../../Shared/Hooks/useCustomTranslation";
import useAccountView from "./useAccountView";
import useMoneyParser from "../../../../../../Shared/useMoneyParser";
import useConfiguration from "../../../../../../Shared/Hooks/useConfiguration";
import { useNavigation } from "@react-navigation/native";
import AccountsViewStyles from "./AccountsView.styles";
import { useState } from "react";
import AddAccountModalView from "./components/Modals/AddAccountModal/AddAccountModalView";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Icons } from "../../../../../../Global/Icons";
import { IconSizes } from "../../../../../../Global/IconSizes";
import AccountItem from "./components/AccountItem/AccountItem";
import { hp } from "../../../../../../Global/Percentage";
import useTheme from "../../../../../../Shared/Hooks/useTheme";


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
    return <SafeAreaView
            style={styles.pageContainer}>
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
                <Text style={styles.headerTitle}>{translate('settings')} {'>'} {translate('accounts')}</Text>
            </View>    
            <View style={styles.balanceContainer}>
                <View style={{flexDirection: 'column'}}>

                    <Text style={styles.balanceContainerTitle}>{translate('total_balance')}</Text>
                    <Text style={styles.balanceContainerAmount}>{displayAmount(`${parseThousand(totalBalance)}`)}</Text>
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
};
export default AccountsView;