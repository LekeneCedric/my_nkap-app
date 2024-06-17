import {StyleSheet} from "react-native";
import {FontSize} from "../../../../../Global/FontSize.ts";

const MenuViewStyles = (textColor: string, gray: string,) => {
    return StyleSheet.create({
        sectionContainer: {
            padding: 15,
            flexDirection: 'column',
            borderBottomWidth: 0.5,
            borderBottomColor: gray
        },
        sectionTitle: {
            fontSize: FontSize.medium,
            color: gray,
            fontWeight: '100'
        },
        itemContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 15
        },
        icon: {
            flex: 1,
        },
        itemText: {
            fontSize: FontSize.medium,
            color: textColor,
            flex: 8
        }
    });
};
export default MenuViewStyles;