import {Text, View} from "react-native";
import {FinancialGoalStatus} from "../../../../Domain/FinancialGoal/FinancialGoal.ts";
import useTheme from "../../Shared/Hooks/useTheme.ts";
import WidgetStyles from "./Widget.styles.ts";

type props = {
    backgroundColor: string,
    value: FinancialGoalStatus,
}
export const Widget = ({backgroundColor, value}: props) => {
    const {colorPalette: {action1, light}} = useTheme();
    const styles = WidgetStyles();
    return <View style={[styles.statusContainer, {backgroundColor: backgroundColor}]}>
        <Text style={[styles.statusText, {color: light}]}>{value}</Text>
    </View>
}