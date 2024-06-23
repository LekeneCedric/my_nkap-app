import {Text, TouchableOpacity} from "react-native";
import Animated, { LightSpeedInLeft, LightSpeedOutRight } from "react-native-reanimated";
import { LoadingState } from "../../../../../Domain/Enums/LoadingState";
import Loading from "../../Loading/Loading";
import ButtonFormStyle from "./ButtonForm.style";
import useTheme from "../../../Shared/Hooks/useTheme.ts";

type props = {
  label: string;
  handleClick: () => void;
  loading: LoadingState;
  loadingLabel: string,
    color?: string,
    noAnimation?: boolean,
};
const ButtonForm = ({label, handleClick, loading, loadingLabel, color, noAnimation}: props) => {
    const {colorPalette: {pageBackground, text, action1, action1Text}} = useTheme();
  const styles = ButtonFormStyle(pageBackground, text, action1, action1Text)
  return (
    <Animated.View

      entering={LightSpeedInLeft.duration(noAnimation ? 0 :1500)}
      exiting={LightSpeedOutRight.duration(noAnimation ? 0 :1500)}>
      <TouchableOpacity onPress={handleClick} style={[styles.container, color ? {backgroundColor: color} : {}]}>
        {
          loading === LoadingState.pending && <Loading color={action1Text} textColor={action1Text} message={loadingLabel}/>
        }
        {
          loading !== LoadingState.pending && <Text style={styles.text}>{label}</Text>
        }
        
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ButtonForm;
