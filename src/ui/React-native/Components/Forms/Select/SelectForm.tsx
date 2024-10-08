import {ControllerRenderProps} from "react-hook-form";
import Animated, {
    LightSpeedInLeft,
    LightSpeedOutRight,
} from "react-native-reanimated";
import {Text, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {IconSizes} from "../../../Global/IconSizes";
import {Icons} from "../../../Global/Icons";
import {useEffect, useState} from "react";
import SelectModalView from "./Modal/SelectModalView";
import ISelectItem from "./SelectItem.ts";
import useTheme from "../../../Shared/Hooks/useTheme.ts";
import selectFormStyle from "./SelectForm.style";
import useCustomTranslation from "../../../Shared/Hooks/useCustomTranslation.ts";

type SelectFormProps = {
    icon: string;
    label: string;
    errorMessage?: string;
    field: ControllerRenderProps<any, any>;
    placeholder: string;
    list: ISelectItem[],
    notFoundMessage?: string,
    notFoundLinkName?: string,
    notFoundLinkAction?: () => void
};
const SelectForm = ({
                        icon,
                        label,
                        errorMessage,
                        field,
                        placeholder,
                        list,
                        notFoundMessage,
                        notFoundLinkName,
                        notFoundLinkAction,
                    }: SelectFormProps) => {
    useEffect(() => {
        if (field.value) {
            const selectedItem = list.find(elt => elt.id == field.value);
            if (selectedItem !== undefined) {
                setSelectedItem(selectedItem);
            }
        }
    }, []);
    const {translate} = useCustomTranslation();
    const [selectedItem, setSelectedItem] = useState<ISelectItem | null>(null);
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const {colorPalette: {pageBackground, containerBackground, text, red, gray, action1}} = useTheme();
    const styles = selectFormStyle(pageBackground, text)
    return (
        <>
            <SelectModalView
                action={(item: ISelectItem) => {
                    setSelectedItem(item);
                    field.onChange(item.id)
                    setModalIsVisible(false)
                }}
                closeModal={() => {
                    setModalIsVisible(false);
                }}
                isVisible={modalIsVisible}
                list={list}
                notFoundMessage={notFoundMessage}
                notFoundLinkName={notFoundLinkName}
                notFoundLinkAction={notFoundLinkAction}
            />
            <Animated.View
                entering={LightSpeedInLeft.duration(1500)}
                exiting={LightSpeedOutRight.duration(1500)}
                style={styles.container}
            >
                <Text style={styles.inputLabel} numberOfLines={1}>{label}</Text>
                <TouchableOpacity style={styles.inputContainer} onPress={() => {
                    setModalIsVisible(true)
                }}>
                    {
                        selectedItem && selectedItem.icon && selectedItem.color ? (
                            <Icon name={selectedItem.icon!} size={IconSizes.normal} color={selectedItem.color}/>
                        ) : (
                            <Icon name={icon} size={IconSizes.normal} color={action1}/>

                        )
                    }
                    {
                        selectedItem ?
                            <Text style={styles.professionLabel} numberOfLines={1}>{selectedItem.name}</Text>
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
                    <Text style={[styles.info, {color: red}]}>{translate(errorMessage)}</Text>
                ) : (
                    <Text style={[styles.info, {color: gray}]}/>
                )}
            </Animated.View>
        </>
    );
};
export default SelectForm;
