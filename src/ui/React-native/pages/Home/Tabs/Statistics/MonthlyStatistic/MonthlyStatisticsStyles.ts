import {StyleSheet} from "react-native";

type props = {
    pageBackground: string,
    text: string,
    backgroundContainer: string,
}
export const MonthlyStatisticsStyles = ({pageBackground, text, backgroundContainer}: props) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: pageBackground,
            paddingTop: 10,
            paddingBottom: 50
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10
        },
        subjectTitle: {
            color: text
        },
        statContainer: {
        },
        info: {
            color: text,
            fontWeight: 'bold',
            marginRight: 10
        }
    });
};
export default MonthlyStatisticsStyles;