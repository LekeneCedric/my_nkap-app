import { ActivityIndicator, Text, View } from "react-native"
import { IconSizes } from "../../Global/IconSizes";
import { Theme } from "../../Global/Theme";
import { FontSize } from "../../Global/FontSize";

type LoadingProps = {
    message: string,
    color?: string,
    textColor?: string,
}
const Loading = ({message, color, textColor}: LoadingProps) => {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator color={color } size={IconSizes.normal} />
            <Text style={{color: textColor ? textColor : color, fontSize: FontSize.normal}}>{message}</Text>
        </View>
    )
}
export default Loading;