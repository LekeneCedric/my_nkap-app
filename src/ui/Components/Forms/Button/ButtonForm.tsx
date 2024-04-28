import {Text, TouchableOpacity} from "react-native";
import styles from "./ButtonForm.style";
import Animated, { LightSpeedInLeft, LightSpeedOutRight } from "react-native-reanimated";
import { LoadingState } from "../../../../Domain/Enums/LoadingState";
import Loading from "../../Loading/Loading";
import { Theme } from "../../../Global/Theme";

type props = {
  label: string;
  handleClick: () => void;
  loading: LoadingState;
  loadingLabel: string,
};
const ButtonForm = ({label, handleClick, loading, loadingLabel}: props) => {
  return (
    <Animated.View
      entering={LightSpeedInLeft.duration(1500)}
      exiting={LightSpeedOutRight.duration(1500)}>
      <TouchableOpacity onPress={handleClick} style={styles.container}>
        {
          loading === LoadingState.pending && <Loading color={Theme.light} message={loadingLabel}/>
        }
        {
          loading !== LoadingState.pending && <Text style={styles.text}>{label}</Text>
        }
        
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ButtonForm;
