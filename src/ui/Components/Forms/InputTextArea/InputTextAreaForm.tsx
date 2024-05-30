import {ControllerRenderProps} from "react-hook-form";
import Animated, {LightSpeedInLeft, LightSpeedOutRight} from "react-native-reanimated";
import styles from './InputTextAreaForm.style.ts';
import {Text, TextInput, View} from "react-native";
import {Theme} from "../../../Global/Theme.ts";

type props = {
    label: string,
    errorMessage?: string,
    field: ControllerRenderProps<any, any>,
    placeholder: string
}
const InputTextAreaForm = ({label, errorMessage, field, placeholder}: props) => {
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
                    placeholderTextColor={Theme.gray}
                    cursorColor={Theme.primary}
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