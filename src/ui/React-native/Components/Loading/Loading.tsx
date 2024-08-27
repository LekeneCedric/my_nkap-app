import { ActivityIndicator, Text, View } from "react-native"
import { IconSizes } from "../../Global/IconSizes";
import { FontSize } from "../../Global/FontSize";

type LoadingProps = {
    message: string,
    color?: string,
    textColor?: string,
}
const Loading = ({message, color, textColor}: LoadingProps) => {
    return (
        <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator color={color } size={IconSizes.medium} />
            <Text style={{color: textColor ? textColor : color, fontSize: FontSize.medium}}>{message}</Text>
        </View>
    )
}
export default Loading;