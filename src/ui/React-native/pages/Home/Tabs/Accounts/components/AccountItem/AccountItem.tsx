import IAccount from "../../../../../../../../Domain/Account/Account.ts";
import {Text, TouchableOpacity, View} from "react-native";
import useTheme from "../../../../../../Shared/Hooks/useTheme.ts";
import AccountItemStyles from "./AccountItem.styles.ts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../../../../../Global/Icons.ts";
import {IconSizes} from "../../../../../../Global/IconSizes.ts";
import useConfiguration from "../../../../../../Shared/Hooks/useConfiguration.ts";

type props = {
    data: IAccount
}
const AccountItem = ({data}: props) => {
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
    const styles = AccountItemStyles(pageBackground, containerBackground, text, action1, gray);
    return <View style={styles.container}>
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

            <TouchableOpacity>
                <Icon name={Icons.edit} size={IconSizes.normal} color={action1} />
            </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10}}>
            <Text style={styles.amountTitle}>Solde:</Text>
            <Text style={styles.amountValue}>{displayAmount(`XAF ${data.balance}`)}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10}}>
            <Text style={styles.amountTitle}>Revenus totale:</Text>
            <Text style={[styles.amountValue, {color: green}]}>{displayAmount(`XAF ${data.totalIncomes}`)}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10}}>
            <Text style={styles.amountTitle}>Dépenses totale:</Text>
            <Text style={[styles.amountValue, {color: red}]}>{displayAmount(`XAF ${data.totalExpenses}`)}</Text>
        </View>
    </View>
};
export default AccountItem;