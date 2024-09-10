import {
    Animated,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import useTheme from "../../../Shared/Hooks/useTheme";
import AddOperationByAIStyles from "./AddOperationsByAIStyles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../../Global/Icons";
import {IconSizes} from "../../../Global/IconSizes";
import { useRef, useState } from "react";
import { Easing, ZoomIn } from "react-native-reanimated";

const AddOperationByAI = () => {
    const [isPendingRotation, setIsPendingRotation] = useState(false);
    const rotateValue = useRef(new Animated.Value(0)).current;
    const rotate2Value = useRef(new Animated.Value(0)).current;

    const startRotation = () => {
            if (!isPendingRotation) {
            Animated.loop(
                Animated.timing(rotateValue, {
                  toValue: 1000000,
                  duration: 3000, // Rotation duration
                  useNativeDriver: true,
                  easing: Easing.linear, // Ensures smooth infinite rotation
                })
              ).start();
              Animated.loop(
                Animated.timing(rotate2Value, {
                  toValue: 1000000,
                  duration: 3500, // Rotation duration
                  useNativeDriver: true,
                  easing: Easing.linear, // Ensures smooth infinite rotation
                })
              ).start();
            setIsPendingRotation(true);
            }
            if (isPendingRotation) {
                rotateValue.setValue(0); // Reset rotation value to initial position
                setIsPendingRotation(false);
            }
      };
      // Interpolation to map rotateValue to degrees
      const rotation = rotateValue.interpolate({
        inputRange: [0, 1000000],
        outputRange: ['0deg', '360deg'],
      });
      const rotation2 = rotate2Value.interpolate({
        inputRange: [0, 1000000],
        outputRange: ['0deg', '360deg'],
      });
  const {
    colorPalette: {action1, action1Container, gray, text, pageBackground, containerBackground},
  } = useTheme();
  const styles = AddOperationByAIStyles(pageBackground, text);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 4.5}}>

      </View>
      <View style={[styles.modalContainer, {flex: 1.5, shadowColor: text}]}>
        <View style={{flexDirection: "row", flex: 1,}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TextInput
              keyboardType={"default"}
              placeholder={"Allez dit moi tout"}
              placeholderTextColor={gray}
              cursorColor={text}
              style={[styles.input, {alignSelf: "flex-start", color: text}]}
              multiline={true}
            />
          </ScrollView>

          <TouchableOpacity style={{top: 10}}>
            <Icon name={Icons.resize} size={IconSizes.normal} color={text} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 60,
            flexDirection: "row",
            position: "relative",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          
          <TouchableOpacity
            onPress={startRotation}
            style={{
                zIndex: 1,
              padding: 10,
              backgroundColor: isPendingRotation?pageBackground:action1Container,
              borderRadius: 10,
              alignSelf: "center",
            }}
          >
            {
            isPendingRotation && <Animated.View
            style={{
                zIndex: 3,
                right: 0,
                left: 0,
                top: 0,
                bottom: 0,
                backgroundColor: action1,
                borderRadius: 10,
                alignSelf: "center",
                position: 'absolute',
                transform: [{rotate: rotation}]
            }}
          >
            <Icon
              name={Icons.recorder}
              size={IconSizes.normMed}
              color={action1}
            />
          </Animated.View>
          }
          {
            isPendingRotation && <Animated.View
            style={{
                zIndex: 3,
                right: 0,
                left: 0,
                top: 0,
                bottom: 0,
                backgroundColor: action1,
                borderRadius: 10,
                alignSelf: "center",
                position: 'absolute',
                transform: [{rotate: rotation2}]
            }}
          >
            <Icon
              name={Icons.recorder}
              size={IconSizes.normMed}
              color={action1}
            />
          </Animated.View>
          }
            <Icon
              style={{zIndex: 10000000}}
              name={Icons.recorder}
              size={IconSizes.normMed}
              color={isPendingRotation ? text : action1}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{position: "absolute", right: 10}}>
            <Icon name={Icons.send} size={IconSizes.normal} color={action1} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default AddOperationByAI;
