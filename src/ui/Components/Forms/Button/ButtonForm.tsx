import {Text, TouchableOpacity} from "react-native";
import styles from "./ButtonForm.style";
import Animated, { LightSpeedInLeft, LightSpeedOutRight } from "react-native-reanimated";

type props = {
  label: string;
  handleClick: () => void;
};
const ButtonForm = ({label, handleClick}: props) => {
  return (
    <Animated.View
      entering={LightSpeedInLeft.duration(1500)}
      exiting={LightSpeedOutRight.duration(1500)}>
      <TouchableOpacity onPress={handleClick} style={styles.container}>
        <Text style={styles.text}>{label}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ButtonForm;
