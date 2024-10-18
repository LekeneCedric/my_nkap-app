import { Animated, RegisteredStyle, TouchableOpacity, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { IconSizes } from "../../../Global/IconSizes";
import useTheme from "../../../Shared/Hooks/useTheme";
import useFloatingButtonAnimation from "./useFloatingButtonAnimation";

type props = {
    icon: string,
    extraIcon?: string,
    onPress: () => void,
    customStyles?: false | RegisteredStyle<ViewStyle> | Animated.Value | Animated.AnimatedInterpolation<string | number> | Animated.WithAnimatedObject<ViewStyle> | null | undefined,
    size?: number,
    deactivated?: boolean,
}
const FloatingButton = ({icon, extraIcon, onPress, customStyles, size, deactivated}: props) => {
    const {colorPalette: {text, action1Text, action1, gray}} = useTheme();
    const {bounceYValue} = useFloatingButtonAnimation();
    return (
        <Animated.View style={[{
            translateY: bounceYValue,
            position: 'absolute',
            width: size ?? 60,
            height: size ?? 60,
            borderRadius: 30,
            backgroundColor: deactivated ? gray : action1,
            justifyContent: 'center',
            alignItems: 'center',
            right: 20,
            elevation: 8, // Add shadow for Android
            shadowColor: text, // Add shadow for iOS
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.8,
            shadowRadius: 2,
            }, customStyles ?? {}]}>
            <TouchableOpacity disabled={deactivated} onPress={onPress}>
                {
                    extraIcon && <Icon style={{position: 'absolute', right: 0}} name={extraIcon} size={IconSizes.small} color={action1Text} />
                }
                <Icon name={icon} size={IconSizes.medium} color={action1Text}/>
            </TouchableOpacity>
        </Animated.View>
    )
};

export default FloatingButton;