import Animated, {LightSpeedInLeft, LightSpeedOutRight} from "react-native-reanimated";
import styles from "./SelectCategoryForm.style.ts";
import {Text, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {IconSizes} from "../../../Global/IconSizes.ts";
import {Theme} from "../../../Global/Theme.ts";
import {Icons} from "../../../Global/Icons.ts";
import {useEffect, useState} from "react";
import ISelectCategoryItem from "./SelectCategoryItem.ts";
import {ControllerRenderProps} from "react-hook-form";
import SelectCategoryModalView from "./SelectCategoryModal/SelectCategoryModalView.tsx";
import useTheme from "../../../Shared/Hooks/useTheme.ts";
import SelectCategoryFormStyle from "./SelectCategoryForm.style.ts";

type SelectCategoryFormProps = {
    icon: string;
    label: string;
    errorMessage?: string;
    field: ControllerRenderProps<any, any>;
    placeholder: string;
    list: ISelectCategoryItem[],
};
const SelectCategoryForm = ({
                                icon,
                                label,
                                errorMessage,
                                field,
                                placeholder,
                                list,
                            }: SelectCategoryFormProps) => {
    useEffect(() => {
        console.warn(field.value)
        if (field.value) {
            const selectedItem = list.find(elt => elt.id == field.value);
            if (selectedItem !== undefined) {
                setSelectedCategoryItem(selectedItem);
            }
        }
    }, []);
    const [selectedCategoryItem, setSelectedCategoryItem] = useState<ISelectCategoryItem|null>(null);
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const {colorPalette: {pageBackground, containerBackground, text, action1}} = useTheme();
    const styles = SelectCategoryFormStyle(pageBackground, text);
    return <>
        <SelectCategoryModalView
            action={(item: ISelectCategoryItem) => {
                setSelectedCategoryItem(item);
                field.onChange(item.id)
                setModalIsVisible(false)
            }}
            closeModal={() => {
                setModalIsVisible(false);
            }}
            isVisible={modalIsVisible}
            list={list}
        />
        <Animated.View
            entering={LightSpeedInLeft.duration(1500)}
            exiting={LightSpeedOutRight.duration(1500)}
            style={styles.container}
        >
            <Text style={styles.inputLabel}>{label}</Text>
            <TouchableOpacity style={[styles.inputContainer]} onPress={() => {
                setModalIsVisible(true)
            }}>
                {
                    selectedCategoryItem && selectedCategoryItem.icon && selectedCategoryItem.color ? (
                        <Icon name={selectedCategoryItem.icon!} size={IconSizes.normal} color={selectedCategoryItem.color}/>
                    ) : (
                        <Icon name={icon} size={IconSizes.normal} color={action1}/>

                    )
                }
                {
                    selectedCategoryItem ?
                        <Text style={styles.professionLabel} numberOfLines={1}>{selectedCategoryItem.name}</Text>
                        :
                        <Text style={styles.professionLabel} numberOfLines={1}>{placeholder}</Text>
                }
                <Icon
                    style={{flex: 1}}
                    name={Icons.dropDown}
                    size={IconSizes.normal}
                    color={action1}
                />
            </TouchableOpacity>
            {errorMessage ? (
                <Text style={[styles.info, {color: Theme.red}]}>{errorMessage}</Text>
            ) : (
                <Text style={[styles.info, {color: Theme.gray}]}/>
            )}
        </Animated.View>
    </>
};
export default SelectCategoryForm;