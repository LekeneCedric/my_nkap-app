import { ActivityIndicator, StyleProp, Text, View, ViewStyle } from "react-native"
import { IconSizes } from "../../Global/IconSizes";
import { FontSize } from "../../Global/FontSize";

type LoadingProps = {
    message: string,
    color?: string,
    textColor?: string,
    addStyles?: StyleProp<ViewStyle>
}
const Loading = ({message, color, textColor, addStyles}: LoadingProps) => {
    return (
        <View style={[addStyles ?? {}, {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}]}>
            <ActivityIndicator color={color } size={IconSizes.normal} />
            <Text style={{color: textColor ? textColor : color, fontSize: FontSize.normal}}>{message}</Text>
        </View>
    )
}
export default Loading;