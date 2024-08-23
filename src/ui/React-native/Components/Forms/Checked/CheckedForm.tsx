import {Text, TouchableOpacity, View} from "react-native";
import {ControllerRenderProps} from "react-hook-form";
import ICheckedItem from "./CheckedItem.ts";
import Animated, {LightSpeedInLeft, LightSpeedOutRight} from "react-native-reanimated";
import {Theme} from "../../../Global/Theme.ts";
import {useEffect, useState} from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../../Global/Icons.ts";
import {IconSizes} from "../../../Global/IconSizes.ts";
import CheckedFormStyle from "./CheckedForm.style.ts";
import useTheme from "../../../Shared/Hooks/useTheme.ts";
import useCustomTranslation from "../../../Shared/Hooks/useCustomTranslation.ts";

type props = {
    label: string;
    field: ControllerRenderProps<any, any>;
    errorMessage?: string;
    values: ICheckedItem[];
}
const CheckedForm = ({label, field, values, errorMessage}: props) => {
    const {translate} = useCustomTranslation();
    const [selectItem, setSelectItem] = useState<ICheckedItem|null>(null)
    const checkItem = (item: ICheckedItem) => {
        setSelectItem(item);
        field.onChange(item.id);
    }
    const {colorPalette: {text}} = useTheme();
    const styles = CheckedFormStyle(text);
    useEffect(() => {
        if (field.value !== undefined) {
            const selectedItem = values.find(elt => elt.id == field.value);
            if (selectedItem !== undefined) {
                setSelectItem(selectedItem)
            }
        }
    }, []);
    return <Animated.View entering={LightSpeedInLeft.duration(1500)}
                          exiting={LightSpeedOutRight.duration(1500)}
                          style={styles.container}>
        <Text style={styles.inputLabel}>{label}</Text>
        <View style={styles.itemsContainer}>
            {values.map((item, index) => (
                <TouchableOpacity onPress={()=>{checkItem(item)}} style={styles.itemContainer}>
                    <Icon
                        name={selectItem && selectItem.id==item.id ? Icons.circle.checked: Icons.circle.unChecked}
                        size={IconSizes.normal}
                        color={item.color || Theme.primary}
                    />
                    <Text style={[styles.itemLabel, item.color && {color: item.color}]}>
                        {item.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
        {errorMessage ? (
            <Text style={[styles.info, {color: Theme.red}]}>{translate(errorMessage)}</Text>
        ) : (
            <Text style={[styles.info, {color: Theme.gray}]}/>
        )}
    </Animated.View>;
};
export default CheckedForm;