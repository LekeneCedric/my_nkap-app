import {ControllerRenderProps} from "react-hook-form";
import ISelectCategoryItem from "../SelectCategory/SelectCategoryItem.ts";
import {useEffect, useState} from "react";
import Animated, {LightSpeedInLeft, LightSpeedOutRight} from "react-native-reanimated";
import styles from './SelectIconForm.style.ts';
import {Text, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {IconSizes} from "../../../Global/IconSizes.ts";
import {Theme} from "../../../Global/Theme.ts";
import {Icons} from "../../../Global/Icons.ts";
import SelectIconModalView from "./Modal/SelectIconModalView.tsx";

type SelectCategoryFormProps = {
    icon: string;
    label: string;
    errorMessage?: string;
    field: ControllerRenderProps<any, any>;
    placeholder: string;
    color: string|null,
};
const SelectIconForm = ({icon, label, errorMessage, field, placeholder, color}: SelectCategoryFormProps) => {
    const [selectedIcon, setSelectedIcon] = useState<string|null>(null);
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
    useEffect(() => {}, [color])
    return <>
        <SelectIconModalView
            color={color}
            action={(item: string) => {
                setSelectedIcon(item);
                field.onChange(item);
                setModalIsVisible(false)
            }}
            closeModal={() => {
                setModalIsVisible(false);
            }}
            isVisible={modalIsVisible}
        />
        <Animated.View
            entering={LightSpeedInLeft.duration(1500)}
            exiting={LightSpeedOutRight.duration(1500)}
            style={styles.container}
        >
            <Text style={styles.inputLabel}>{label}</Text>
            <TouchableOpacity style={styles.inputContainer} onPress={() => {
                setModalIsVisible(true)
            }}>
                {
                    selectedIcon  ? (
                        <Icon name={selectedIcon} size={IconSizes.normal} color={ color ? color :Theme.dark}/>
                    ) : (
                        <Icon name={icon} size={IconSizes.normal} color={color ? color : Theme.dark}/>

                    )
                }
                {
                    selectedIcon ?
                        <Text style={styles.professionLabel}>{selectedIcon}</Text>
                        :
                        <Text style={styles.professionLabel}>{placeholder}</Text>
                }
                <Icon
                    style={{flex: 1}}
                    name={Icons.dropDown}
                    size={IconSizes.normal}
                    color={Theme.dark}
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
export default SelectIconForm;