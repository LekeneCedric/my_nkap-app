import {OperationDateItem} from "../../../../Domain/Operation/Operation.ts";
import {Text, TouchableOpacity, View} from "react-native";
import useTheme from "../../Shared/Hooks/useTheme.ts";
import OperationByDateItemStyles from "./OperationByDateItem.styles.ts";
import useDateParser from "../../Shared/Hooks/useDateParser.ts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../Global/Icons.ts";
import {IconSizes} from "../../Global/IconSizes.ts";
import {useState} from "react";
import Animated, {BounceInDown, BounceInUp, LightSpeedInLeft, LightSpeedOutRight} from "react-native-reanimated";
import TransactionItem from "../TransactionItem/TransactionItem.tsx";

type props = {
    data: OperationDateItem
}
const OperationByDateItem = ({data}: props) => {
    const {
        day,
        month,
        year,
        week,
    } = useDateParser(data.date);
    const {colorPalette: {pageBackground, containerBackground, text, action1, action1Text, gray, red, green}} = useTheme();
    const styles = OperationByDateItemStyles(pageBackground, containerBackground, text, action1, action1Text, gray, red, green);
    const [showDetails, setShowDetails] = useState<boolean>(false);
    return <View style={styles.container}>
        <TouchableOpacity
            onPress={()=>setShowDetails(!showDetails)}
            style={styles.container1}>
            <Text style={styles.day}>{day}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1}}>
                    <View style={{flexDirection: 'column', paddingLeft: 5}}>
                        <Text numberOfLines={1} style={styles.week}>
                            {week}
                        </Text>
                        <Text numberOfLines={1} style={styles.month}>
                            {month} {year}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'column'}}>
                        <Text numberOfLines={1} style={styles.incomes}>
                            +XAF {data.totalIncomes}
                        </Text>
                        <Text numberOfLines={1} style={styles.expenses}>
                            -XAF {data.totalExpense}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity onPress={()=>setShowDetails(!showDetails)}>
                    <Icon name={Icons.chevron.down} size={IconSizes.medium} color={action1} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
        {
            showDetails && <Animated.View
                style={styles.container2}>
                {
                    data.operations.map(op =>
                        <TransactionItem data={op} />
                    )
                }
            </Animated.View>
        }

    </View>
};
export default OperationByDateItem;