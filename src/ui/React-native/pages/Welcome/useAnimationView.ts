import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from "react-native-reanimated";
import React, { useEffect } from "react";

interface useAnimationViewBehaviour {
  animatedStyle: any
}
export const useAnimationView = (): useAnimationViewBehaviour => {
  const duration = 2000;
  const easing = Easing.bezier(0.15, 0, 0.15, 0.25);
  const sv = useSharedValue(0);
  useEffect(() => {
    sv.value = withRepeat(withTiming(1, {duration, easing}), -0.001)
  }, []);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${sv.value * 360}deg` }],
  }));
  return {
    animatedStyle: animatedStyle,
  }
}
