import {Text, TouchableOpacity, View} from "react-native";
import Animated, {BounceInLeft} from "react-native-reanimated";
import useTheme from "../../../Shared/Hooks/useTheme.ts";
import AccountCardStyle from "./AccountCard.style";
import useConfiguration from "../../../Shared/Hooks/useConfiguration.ts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IAccount from "../../../../../Domain/Account/Account.ts";
import {IconSizes} from "../../../Global/IconSizes.ts";
import {routes} from "../../../pages/routes";
import {Icons} from "../../../Global/Icons.ts";
import useCustomTranslation from "../../../Shared/Hooks/useCustomTranslation.ts";
import useMoneyParser from "../../../Shared/useMoneyParser.ts";

type props = {
    data: IAccount,
}
const AccountCard = ({data}: props) => {
    const {
        displayAmount
    } = useConfiguration();
    const {parseThousand} = useMoneyParser();
    const {translate} = useCustomTranslation();
    const {colorPalette: {pageBackground, containerBackground, text, gray, action1, action1Text, light}} = useTheme();
    const styles = AccountCardStyle(pageBackground, containerBackground, text, gray, action1, action1Text);
    return (
        <Animated.View entering={BounceInLeft.duration(1500)} style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                <TouchableOpacity style={[styles.iconContainer, {backgroundColor: data.color}]}>
                    <Icon style={styles.icon} name={data.icon} size={IconSizes.normal} color={light}/>
                </TouchableOpacity>
                <View style={{flex: 1}}>
                    <Text numberOfLines={1} style={styles.title}>{data.name}</Text>
                    <Text numberOfLines={1} style={styles.amount}>
                        {displayAmount(`${parseThousand(data.balance)}`)}
                    </Text>
                </View>
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>{translate('details')}</Text>
            </TouchableOpacity>
        </Animated.View>
    )
};
export default AccountCard;