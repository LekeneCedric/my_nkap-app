import {ControllerRenderProps} from "react-hook-form";
import styles from "./InputBirthDateForm.style";
import Animated, {
    LightSpeedInLeft,
    LightSpeedOutRight,
} from "react-native-reanimated";
import {Text, TouchableOpacity, View} from "react-native";
import {Icons} from "../../../Global/Icons";
import {IconSizes} from "../../../Global/IconSizes";
import {Theme} from "../../../Global/Theme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {useState} from "react";
import DatePicker from "react-native-date-picker";
import useUtils from "../../../utils/useUtils";
import useTheme from "../../../Shared/Hooks/useTheme.ts";
import InputBirthDateFormStyle from "./InputBirthDateForm.style";

type InputBirthDateFormProps = {
    mode?: 'date' | 'time' | 'datetime',
    label: string;
    errorMessage?: string;
    field: ControllerRenderProps<any, any>;
    placeholder: string;
};
const InputBirthdayForm = ({
                               mode,
                               label,
                               errorMessage,
                               field,
                               placeholder,
                           }: InputBirthDateFormProps) => {
    const [date, setDate] = useState(new Date());
    const [formattedDate, setFormattedDate] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const {formatDateToYYYYMMDD, formatDateToYYYYMMDDHIS} = useUtils();
    const {colorPalette: {pageBackground, containerBackground, text, gray, red, action1}} = useTheme();
    const styles = InputBirthDateFormStyle(pageBackground, containerBackground, text, gray, action1);
    return (
        <>
            <DatePicker
                modal
                locale={'fr'}
                open={open}
                date={date}
                mode={mode ? mode : 'date'}
                onConfirm={(date) => {
                    const formatedDate = mode && mode == 'date' ?
                        formatDateToYYYYMMDD(date) : formatDateToYYYYMMDDHIS(date);
                    field.onChange(formatedDate);
                    setFormattedDate(formatedDate);
                    setOpen(false);
                    setDate(date);
                }}
                onCancel={() => {
                    setOpen(false);
                }}
            />
            <Animated.View
                entering={LightSpeedInLeft.duration(1500)}
                exiting={LightSpeedOutRight.duration(1500)}
                style={styles.container}
            >
                <Text style={styles.inputLabel}>{label}</Text>
                <TouchableOpacity onPress={() => {
                    setOpen(true)
                }} style={styles.inputContainer}>
                    <Icon
                        name={Icons.calendar}
                        size={IconSizes.normal}
                        color={action1}
                    />
                    {
                        formattedDate &&
                        <Text style={styles.birthdate} numberOfLines={1}>
                            {formattedDate}
                        </Text>
                    }
                    {
                        formattedDate.length == 0 &&
                        <Text style={styles.placeholder} numberOfLines={1}>
                            {placeholder}
                        </Text>
                    }

                </TouchableOpacity>
                {errorMessage ? (
                    <Text style={[styles.info, {color: red}]}>{errorMessage}</Text>
                ) : (
                    <Text style={[styles.info, {color: gray}]}/>
                )}
            </Animated.View>
        </>
    );
};
export default InputBirthdayForm;
