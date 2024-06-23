import {StyleSheet} from "react-native";
import {FontSize} from "../../Global/FontSize.ts";

const OperationByDateItemStyles = (pageBackground: string, containerBackground: string, text: string, action1: string, action1Text: string, gray: string, red: string, green: string) => {
    return StyleSheet.create({
        container: {
            flexDirection: 'column',
            backgroundColor: containerBackground,
            padding: 10,
            borderRadius: 10,
            marginBottom: 10,
            marginTop: 10
        },
        container1: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        day: {
            fontSize: FontSize.mediumHigh,
            color: text,
            fontWeight: 'bold',
            marginRight: 5
        },
        week: {
            fontSize: FontSize.normal,
            color: gray,
            fontWeight: 'normal',
        },
        month: {
            fontSize: FontSize.normal,
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
        }
    });
};
export default OperationByDateItemStyles;