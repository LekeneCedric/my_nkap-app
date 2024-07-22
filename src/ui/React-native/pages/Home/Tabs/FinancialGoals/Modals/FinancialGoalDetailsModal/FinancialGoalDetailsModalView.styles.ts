import {StyleSheet} from "react-native";
import {hp, wp} from "../../../../../../Global/Percentage.ts";

type props = {
    containerBackground: string,
}
const FinancialGoalDetailsModalViewStyles = ({containerBackground}: props) => {
    return StyleSheet.create({
        modalContainer: {
            width: wp(90),
            height: hp(90),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: containerBackground,
        },
    });
};
export default FinancialGoalDetailsModalViewStyles;