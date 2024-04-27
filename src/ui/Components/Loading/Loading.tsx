import { ActivityIndicator, Text, View } from "react-native"
import { IconSizes } from "../../Global/IconSizes";

type LoadingProps = {
    message: string,
}
const Loading = ({message}: LoadingProps) => {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size={IconSizes.normal} />
            <Text>{message}</Text>
        </View>
    )
}
export default Loading;