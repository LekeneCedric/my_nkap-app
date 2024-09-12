import {useRef, useState} from "react";
import {Animated, Easing} from "react-native";

interface useRecordingAnimationBehaviour {
  recorderKeyboardIconScale: Animated.Value,
  recorderCogOpacity: Animated.Value,
  rotationRecorderCog1: Animated.AnimatedInterpolation<string | number>,
  rotationRecorderCog2: Animated.AnimatedInterpolation<string | number>,
  triggerRecordingAnimation: () => void,
  stopAnimation: () => void,
  startAnimation: () => void,
  isPendingRecordingAnimation: boolean,
}
const useRecordingAnimation =
  (): useRecordingAnimationBehaviour => {
    const [isPendingRecording, setIsPendingRecording] = useState(false);
    
    const recorderCogOpacityValue = useRef(new Animated.Value(0)).current;
    const rotateRecorderCog1Value = useRef(new Animated.Value(0)).current;
    const rotateRecorderCog2Value = useRef(new Animated.Value(0)).current;
    const recorderKeyboardIconScaleValue = useRef(new Animated.Value(0)).current;

    const fadeInRecorderKeyboardIcon = Animated.timing(recorderKeyboardIconScaleValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    });

    const fadeOutRecorderKeyboardIcon = Animated.timing(recorderKeyboardIconScaleValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    });

    const fadeInRecorderCog = Animated.timing(recorderCogOpacityValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    });
    const fadeOutRecorderCog = Animated.timing(recorderCogOpacityValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    });
    const rotationRecorderCog1Loop = Animated.loop(
      Animated.timing(rotateRecorderCog1Value, {
        toValue: 1,
        duration: 5000, // Rotation duration
        useNativeDriver: true,
        easing: Easing.linear, // Ensures smooth infinite rotation
      }),
    );
    const rotationRecorderCog2Loop = Animated.loop(
      Animated.timing(rotateRecorderCog2Value, {
        toValue: 1,
        duration: 5000, // Rotation duration
        useNativeDriver: true,
        easing: Easing.linear, // Ensures smooth infinite rotation
      }),
    );
    const revertRotationRecorderCogsToInitialPosition = Animated.parallel([
      Animated.timing(rotateRecorderCog1Value, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(rotateRecorderCog2Value, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ]);

    const startRecordingAnimation = () => {
      fadeInRecorderKeyboardIcon.start();
      fadeInRecorderCog.start();
      rotationRecorderCog1Loop.start();
      rotationRecorderCog2Loop.start();
      setIsPendingRecording(true);
    }

    const stopRecordingAnimation = () => {
      fadeOutRecorderKeyboardIcon.stop();
      rotationRecorderCog1Loop.stop();
      rotationRecorderCog2Loop.stop();
      revertRotationRecorderCogsToInitialPosition.start();
      fadeOutRecorderCog.start(() => setIsPendingRecording(false));
    }

    const triggerRecordingAnimation = () => {
      if (!isPendingRecording) {
        startRecordingAnimation();
      }
      if (isPendingRecording) {
        stopRecordingAnimation();
      }
    };
    
    // Interpolation to map rotateValue to degrees
    const rotationRecorderCog1 = rotateRecorderCog1Value.interpolate({
      inputRange: [0, 1],
      outputRange: ["45deg", "405deg"],
    });
    const rotationRecorderCog2 = rotateRecorderCog2Value.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });

    return {
      recorderKeyboardIconScale: recorderKeyboardIconScaleValue,
      recorderCogOpacity: recorderCogOpacityValue,
      triggerRecordingAnimation: triggerRecordingAnimation,
      startAnimation: startRecordingAnimation,
      stopAnimation: stopRecordingAnimation,
      isPendingRecordingAnimation: isPendingRecording,
      rotationRecorderCog1: rotationRecorderCog1,
      rotationRecorderCog2: rotationRecorderCog2,
    };
  };
export default useRecordingAnimation;
