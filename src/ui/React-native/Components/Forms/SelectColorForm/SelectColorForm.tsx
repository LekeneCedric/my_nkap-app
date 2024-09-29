import {Text, TouchableOpacity, View} from "react-native";
import useTheme from "../../../Shared/Hooks/useTheme.ts";
import SelectColorFormStyles from "./SelectColorForm.styles.ts";
import {ControllerRenderProps} from "react-hook-form";
import {useEffect} from "react";
import useCustomTranslation from "../../../Shared/Hooks/useCustomTranslation.ts";

type props = {
    colors: string[],
    errorMessages?: string,
    currentSelectedColor?: string,
    field: ControllerRenderProps<any, any>,
    setSelectedColor: (selectedColor: string) => void,
    defaultValue: string|undefined,
}
const SelectColorForm = ({defaultValue, colors, currentSelectedColor, errorMessages, field, setSelectedColor}: props) => {
    const {translate} = useCustomTranslation();
    const {colorPalette: {text, red,}} = useTheme();
    const styles = SelectColorFormStyles(text);
    useEffect(() => {
        if (field.value || defaultValue) {
            const defaultColor = defaultValue ?? field.value;
            setSelectedColor(defaultColor);
            field.onChange(defaultColor);
        }
    }, []);
    return <View style={styles.colorSelectContainer}>
        <Text style={styles.colorSelectTitle}>{translate('select_a_color')}</Text>
        <View style={styles.colorSelectIconsContainer}>
            {
                colors.map((color: string) => {
                    const isSelectedColor = currentSelectedColor === color;
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                field.onChange(color);
                                setSelectedColor(color)
                            }}
                            style={[styles.colorSelectIconsContainerItem, {
                                backgroundColor: color,
                                borderWidth: isSelectedColor ? 3 : 0.3,
                                borderColor: text
                            }]}>
                        </TouchableOpacity>
                    )
                })
            }
            {errorMessages ? (
                <Text style={[styles.info, {color: red}]}>{translate(errorMessages)}</Text>
            ) : (
                <Text style={[styles.info, {color: text}]}/>
            )}
        </View>
    </View>
};
export default SelectColorForm;