import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

type props = {
    bounceYValue: Animated.Value
}
const useFloatingButtonAnimation = (): props => {
    const bounceYValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(bounceYValue, {
                    toValue: 4,
                    duration: 500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(bounceYValue, {
                    toValue: 0,
                    duration: 500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    })
    return {
        bounceYValue: bounceYValue,
    }
};

export default useFloatingButtonAnimation;