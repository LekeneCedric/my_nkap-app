import { StyleSheet } from "react-native";
import { PageStyles } from "../../../Global/Styles/page.styles";
import { FontSize } from "../../../Global/FontSize";

type styleProps = {
    backgroundColor: string,
    textColor: string,
    descriptionColor: string,
    containerBackgroundColor: string
}
const ActivateAccountStyles = (props: styleProps) => {
    return StyleSheet.create({
        pageContainer: {
            ...PageStyles.container,
            backgroundColor: props.backgroundColor,
            justifyContent: 'center',
            alignItems: 'center'
        },
        centerView: {
            alignItems: 'center',
            justifyContent: 'center'
        },
        padding: {
            padding: 10
        },
        horizontalAlignment: {
            flexDirection: 'row'
        },
        hour: {
            fontSize: FontSize.high,
            color: props.textColor
        },
        description: {
            fontSize: FontSize.normal,
            color: props.descriptionColor,
            textAlign: 'center'
        },
        textInput: {
            backgroundColor: props.containerBackgroundColor,
            padding: 5,
            borderRadius: 10,
            borderWidth: 2,
            fontSize: FontSize.medium,
            textDecorationLine: 'none',
            textDecorationColor: props.containerBackgroundColor,
            alignItems: 'center',
            textAlign: 'center',
            margin: 10,
        }
    });
};

export default ActivateAccountStyles;