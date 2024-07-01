import {Text, TouchableOpacity, View} from "react-native";
import useTheme from "../../../Shared/Hooks/useTheme.ts";
import SelectColorFormStyles from "./SelectColorForm.styles.ts";
import {ControllerRenderProps} from "react-hook-form";
import {useEffect} from "react";

type props = {
    colors: string[],
    errorMessages?: string,
    currentSelectedColor?: string,
    field: ControllerRenderProps<any, any>,
    setSelectedColor: (selectedColor: string) => void,
}
const SelectColorForm = ({colors, currentSelectedColor, errorMessages, field, setSelectedColor}: props) => {
    const {colorPalette: {text, red,}} = useTheme();
    const styles = SelectColorFormStyles(text);
    useEffect(() => {
        if (field.value) {
            setSelectedColor(field.value);
        }
    }, []);
    return <View style={styles.colorSelectContainer}>
        <Text style={styles.colorSelectTitle}>Choisissez une couleur</Text>
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
                <Text style={[styles.info, {color: red}]}>{errorMessages}</Text>
            ) : (
                <Text style={[styles.info, {color: text}]}/>
            )}
        </View>
    </View>
};
export default SelectColorForm;