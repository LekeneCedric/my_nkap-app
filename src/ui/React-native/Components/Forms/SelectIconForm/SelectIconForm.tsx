import {ControllerRenderProps} from "react-hook-form";
import {useEffect, useState} from "react";
import Animated, {LightSpeedInLeft, LightSpeedOutRight} from "react-native-reanimated";
import {Text, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {IconSizes} from "../../../Global/IconSizes.ts";
import {Icons} from "../../../Global/Icons.ts";
import SelectIconModalView from "./Modal/SelectIconModalView.tsx";
import useTheme from "../../../Shared/Hooks/useTheme.ts";
import SelectIconFormStyle from "./SelectIconForm.style.ts";

type SelectCategoryFormProps = {
    icon: string;
    label: string;
    errorMessage?: string;
    field: ControllerRenderProps<any, any>;
    placeholder: string;
    color?: string,
};
const SelectIconForm = ({icon, label, errorMessage, field, placeholder, color}: SelectCategoryFormProps) => {
    const [selectedIcon, setSelectedIcon] = useState<string|null>(null);
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
    const {colorPalette: {pageBackground, containerBackground, text, red, action1, gray}} = useTheme();
    const styles = SelectIconFormStyle(pageBackground, containerBackground, text, action1, gray);
    useEffect(() => {}, [color]);
    useEffect(() => {
        if (field.value) {
            setSelectedIcon(field.value);
        }
    }, []);
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
                        <Icon name={selectedIcon} size={IconSizes.normal} color={ color ? color : text}/>
                    ) : (
                        <Icon name={icon} size={IconSizes.normal} color={color ? color :text}/>

                    )
                }
                {
                    selectedIcon ?
                        <Text style={styles.professionLabel} numberOfLines={1}>{selectedIcon}</Text>
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
                <Text style={[styles.info, {color: red}]}>{errorMessage}</Text>
            ) : (
                <Text style={[styles.info, {color: text}]}/>
            )}
        </Animated.View>
    </>
};
export default SelectIconForm;