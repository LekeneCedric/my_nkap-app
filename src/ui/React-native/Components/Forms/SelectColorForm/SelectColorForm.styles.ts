import {StyleSheet} from "react-native";
import {FontSize} from "../../../Global/FontSize.ts";
import {wp} from "../../../Global/Percentage.ts";

export const SelectColorFormStyles = (text: string) => {
    return StyleSheet.create({
        colorSelectContainer: {
            flexDirection: 'column',
            marginTop: 10,
        },
        colorSelectTitle: {
            color: text,
            width: '90%',
            alignSelf: 'center',
            fontSize: FontSize.normal
        },
        colorSelectIconsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: '90%',
            alignSelf: 'center'
        },
        colorSelectIconsContainerItem: {
            padding: 10,
            width: 30,
            height: 30,
            margin: 5,
            borderRadius: 20
        },
        info: {
            width: wp(90),
            alignSelf: 'center',
            fontSize: FontSize.normal
        },
    });
};
export default SelectColorFormStyles;