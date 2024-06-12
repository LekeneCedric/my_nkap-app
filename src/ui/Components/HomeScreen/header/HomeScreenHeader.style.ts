import { StyleSheet } from "react-native";
import { hp, wp } from "../../../Global/Percentage";
import { Theme } from "../../../Global/Theme";
import { FontSize } from "../../../Global/FontSize";

const HomeScreenHeaderStyle = (pageContainerColor: string, cardContainerColor: string, textColor: string) => {
    return StyleSheet.create({
        container: {
            width: '100%',
            backgroundColor: pageContainerColor,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10
        },
        iconContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: cardContainerColor,
            borderRadius: 100
        },
        icon: {
            margin: 7
        },
        title: {
            fontWeight: '600',
            fontSize: FontSize.medium,
            color: textColor,
        }
    });
};
export default HomeScreenHeaderStyle;