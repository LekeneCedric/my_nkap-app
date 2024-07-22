import {StyleSheet} from "react-native";
import {FontSize} from "../../../../../../Global/FontSize.ts";

type styleProps = {
    backgroundColor: string,
    text: string,
    gray: string,
    action1: string
}
const FinancialGoalItemStyles = ({text, backgroundColor, gray, action1}: styleProps) => {
    return StyleSheet.create({
        container: {
            flexDirection: 'column',
            width: '100%',
            backgroundColor: backgroundColor,
            padding: 5,
            borderRadius: 10,
            marginBottom: 10
        },
        header: {
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            padding: 3,
        },
        title: {
            color: text,
            fontSize: FontSize.medium,
            fontWeight: 'bold'
        },
        daysTitle: {
            color: action1,
            fontSize: FontSize.normal,
            fontWeight: '100'
        },
        days: {
            color: gray,
            fontSize: FontSize.normal,
            fontWeight: '600'
        },
        progression: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center'
        },
        statusContainer: {
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            marginRight: 3
        },
        statusText: {
            fontSize: FontSize.normal,
            fontWeight: 'bold'
        },
        percentage: {
            fontSize: FontSize.normal,
            alignSelf: 'flex-start'
        },
        labelDesc: {
            fontSize: FontSize.normal,
            fontWeight: 'normal',
            marginRight: 10,
            color: text
        }
    });
};
export default FinancialGoalItemStyles;