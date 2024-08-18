import {StyleSheet} from "react-native";
import {FontSize} from "../../../../../Global/FontSize.ts";

type props = {
    pageBackground: string,
    containerBackground: string,
    text: string
}
const MonthlyByCategoryStatisticStyles = ({pageBackground, containerBackground, text}: props) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: pageBackground,
            paddingTop: 10,
            paddingBottom: 50,
        },
        title: {
            color: text,
            fontWeight: 'bold',
            marginLeft: 5
        },
        infoContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: containerBackground,
            padding: 5,
            borderRadius: 10,
            marginTop: 10,
        },
        info: {
            color: text,
            fontWeight: 'bold',
            marginRight: 10
        },
        tableRowContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 15,
            marginBottom: 15,

        },
        tableColTitle: {
            color: text,
            fontWeight: 'bold',
            fontSize: FontSize.medium,
            alignSelf: 'flex-start',
            textAlign: 'left'
        },
        tableColItem: {
            color: text,
            fontSize: FontSize.medium,
            alignSelf: 'flex-start',
            textAlign: 'left',
        },
        tableColCategory: {
            flexDirection: 'row',
            alignItems: 'center',
            overflow: 'hidden'
        }
    });
};
export default MonthlyByCategoryStatisticStyles;