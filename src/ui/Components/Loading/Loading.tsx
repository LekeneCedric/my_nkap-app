import { ActivityIndicator, Text, View } from "react-native"
import { IconSizes } from "../../Global/IconSizes";
import { Theme } from "../../Global/Theme";
import { FontSize } from "../../Global/FontSize";

type LoadingProps = {
    message: string,
    color?: string,
}
const Loading = ({message, color}: LoadingProps) => {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator color={color ? color : Theme.primary} size={IconSizes.normal} />
            <Text style={{color: color ? color : Theme.dark, fontSize: FontSize.normal}}>{message}</Text>
        </View>
    )
}
export default Loading;