import IAccount from "../../../../../../../Domain/Account/Account.ts";
import {Text, TouchableOpacity, View} from "react-native";
import useTheme from "../../../../../Shared/Hooks/useTheme.ts";
import AccountItemStyles from "./AccountItem.styles.ts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../../../../Global/Icons.ts";
import {IconSizes} from "../../../../../Global/IconSizes.ts";
import useConfiguration from "../../../../../Shared/Hooks/useConfiguration.ts";
import AddAccountModalView from "../Modals/AddAccountModal/AddAccountModalView.tsx";
import {useState} from "react";
import useCustomTranslation from "../../../../../Shared/Hooks/useCustomTranslation.ts";
import useMoneyParser from "../../../../../Shared/useMoneyParser.ts";

type props = {
    data: IAccount
}
const AccountItem = ({data}: props) => {
    const {
        translate
    } = useCustomTranslation();
    const {
        parseThousand
    } = useMoneyParser();
    const {colorPalette: {
        pageBackground,
        containerBackground,
        text,
        action1,
        gray,
        light,
        red,
        green
    }} = useTheme();
    const {
        displayAmount
    } = useConfiguration();
    const [showUpdateAccountModal, setShowUpdateAccountModal] = useState<boolean>(false);
    const styles = AccountItemStyles(pageBackground, containerBackground, text, action1, gray);
    return <>
        <AddAccountModalView
            closeModal={()=>setShowUpdateAccountModal(false)}
            isVisible={showUpdateAccountModal}
            isUpdate={true}
            account={data}
        />
        <View style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                borderBottomWidth: 0.2,
                borderBottomColor: text,
                paddingBottom: 15,
            }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={[styles.icon, {backgroundColor: data.color}]}>
                        <Icon name={data.icon} size={IconSizes.medium} color={light} />
                    </View>

                    <View style={{paddingLeft: 10}}>
                        <Text style={styles.name}>{data.name}</Text>
                        <Text style={styles.type}>{data.type}</Text>
                    </View>

                </View>

                <TouchableOpacity onPress={() => setShowUpdateAccountModal(true)}>
                    <Icon name={Icons.edit} size={IconSizes.normal} color={action1} />
                </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10}}>
                <Text style={styles.amountTitle}>{translate('balance')}:</Text>
                <Text style={styles.amountValue}>{displayAmount(`${parseThousand(data.balance)}`)}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10}}>
                <Text style={styles.amountTitle}>{translate('total_incomes')}:</Text>
                <Text style={[styles.amountValue, {color: green}]}>{displayAmount(`${parseThousand(data.totalIncomes)}`)}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10}}>
                <Text style={styles.amountTitle}>{translate('total_expenses')}:</Text>
                <Text style={[styles.amountValue, {color: red}]}>{displayAmount(`${parseThousand(data.totalExpenses)}`)}</Text>
            </View>
        </View>
    </>
};
export default AccountItem;