import {Text, View} from "react-native";
import {FinancialGoalStatus} from "../../../../Domain/FinancialGoal/FinancialGoal.ts";
import useTheme from "../../Shared/Hooks/useTheme.ts";
import WidgetStyles from "./Widget.styles.ts";

type props = {
    backgroundColor: string,
    value: FinancialGoalStatus,
}
export const Widget = ({backgroundColor, value}: props) => {
    const {colorPalette: {light}} = useTheme();
    const styles = WidgetStyles();
    return <View style={[styles.statusContainer, {backgroundColor: backgroundColor}]}>
        <Text style={[styles.statusText, {color: light}]}>{value}</Text>
    </View>
}

type customWidProps = {
    backgroundColor: string,
    value: string,
    isSelected: boolean
}
export const CustomWidget = ({backgroundColor, value, isSelected}: customWidProps) => {
    const {colorPalette: {light, gray}} = useTheme();
    const styles = WidgetStyles();
    return <View style={[styles.statusContainer, {backgroundColor: isSelected ? backgroundColor: gray}]}>
        <Text style={[styles.statusText, {color: light}]}>{value}</Text>
    </View>
}