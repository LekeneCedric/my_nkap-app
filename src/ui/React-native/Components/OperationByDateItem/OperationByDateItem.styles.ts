import {StyleSheet} from "react-native";
import {FontSize} from "../../Global/FontSize.ts";

const OperationByDateItemStyles = (pageBackground: string, containerBackground: string, text: string, action1: string, action1Text: string, gray: string, red: string, green: string) => {
    return StyleSheet.create({
        container: {
            flexDirection: 'column',
            backgroundColor: containerBackground,
            borderRadius: 10,
            marginBottom: 5,
            marginTop: 5
        },
        container1: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
        },
        day: {
            fontSize: FontSize.mediumHigh,
            color: text,
            fontWeight: 'bold',
            marginRight: 5
        },
        week: {
            fontSize: FontSize.medium,
            color: text,
            fontWeight: '100',
        },
        month: {
            fontSize: FontSize.medium,
            color: text,
            fontWeight: 'bold'
        },
        incomes: {
            fontSize: FontSize.normal,
            fontWeight: 'bold',
            color: green
        },
        expenses: {
            fontSize: FontSize.normal,
            fontWeight: 'bold',
            color: red
        },
        container2: {
            flexDirection: 'column',
            paddingRight: 10,
            paddingBottom: 10
        }
    });
};
export default OperationByDateItemStyles;