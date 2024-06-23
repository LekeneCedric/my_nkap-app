import {ControllerRenderProps} from "react-hook-form";
import Animated, {LightSpeedInLeft, LightSpeedOutRight} from "react-native-reanimated";
import {Text, TextInput, View} from "react-native";
import {Theme} from "../../../Global/Theme.ts";
import useTheme from "../../../Shared/Hooks/useTheme.ts";
import InputTextAreaStyles from "./InputTextAreaForm.style.ts";

type props = {
    label: string,
    errorMessage?: string,
    field: ControllerRenderProps<any, any>,
    placeholder: string
}
const InputTextAreaForm = ({label, errorMessage, field, placeholder}: props) => {
    const {colorPalette: {pageBackground, text, action1}} = useTheme();
    const styles = InputTextAreaStyles(pageBackground, text);
    return (
        <Animated.View
            entering={LightSpeedInLeft.duration(1500)}
            exiting={LightSpeedOutRight.duration(1500)}
            style={styles.container}
        >
            <Text style={styles.inputLabel}>{label}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    keyboardType={'default'}
                    placeholder={placeholder}
                    placeholderTextColor={text}
                    cursorColor={text}
                    onBlur={field.onBlur}
                    value={field.value}
                    onChangeText={field.onChange}
                    style={styles.input}
                    multiline={true}
                />
            </View>
            {errorMessage ? (
                <Text style={[styles.info, {color: Theme.red}]}>{errorMessage}</Text>
            ) : (
                <Text style={[styles.info, {color: Theme.gray}]} />
            )}
        </Animated.View>
    )
};
export default InputTextAreaForm;