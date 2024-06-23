import {useEffect, useState} from "react";
import {Modal, ScrollView, Text, TouchableOpacity, View} from "react-native";
import Animated, {BounceInDown, BounceInUp} from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {IconSizes} from "../../../../Global/IconSizes.ts";
import {FontSize} from "../../../../Global/FontSize.ts";
import VerticalSeparator from "../../../Shared/VerticalSeparator/VerticalSeparator.tsx";
import useTheme from "../../../../Shared/Hooks/useTheme.ts";
import SelectIconModalViewStyle from "./SelectIconModalView.style.ts";
import {wp} from "../../../../Global/Percentage.ts";

type SelectIconModalViewProps = {
    action: (item: string) => void,
    closeModal: () => void,
    isVisible: boolean,
    color: string|null,
}
const SelectIconModalView = ({action, closeModal, isVisible, color}: SelectIconModalViewProps) => {
    const [selectedIcon, setSelectedIcon] = useState<string|null>(null);
    const [iconsList,] = useState<any>({
        "Voyage": ["airplane", "car", "train", "bus", "suitcase", "map", "hotel"],
        "Sport": ["soccer", "basketball", "football", "tennis", "golf", "run", "dumbbell"],
        "Alimentation": ["food", "silverware", "pizza", "coffee", "beer", "glass-wine"],
        "Shopping": ["cart", "tag", "shopping", "cash-register", "store"],
        "Divertissement": ["movie", "music", "gamepad", "theater"],
        "Sante": ["hospital", "heart", "medical-bag", "stethoscope", "pill"],
        "Education": ["book", "school", "laptop"],
        "Utilitaires": ["lightbulb", "water", "gas-cylinder"],
        "Maison": ["home", "bed", "chair"],
        "Soins personnels": ["shower", "hair-dryer", "toothbrush"]
    });
    const {colorPalette: {pageBackground, containerBackground, text, action1}} = useTheme();
    const styles= SelectIconModalViewStyle(pageBackground, containerBackground, text, action1);
    useEffect(() => {},[color])
    return <>
        <Modal transparent={true} style={styles.modalContainer} animationType={'slide'} visible={isVisible}>
            <Animated.View entering={BounceInDown.duration(1000)} exiting={BounceInUp.duration(1000)}
                           style={styles.container}>
                {/*<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>*/}
                {/*    <TouchableOpacity onPress={closeModal} style={{flex: 1, alignItems: 'center'}}>*/}
                {/*        <Icon name={Icons.back} size={IconSizes.normal} color={Theme.primary}/>*/}
                {/*    </TouchableOpacity>*/}
                {/*    <SeachInput value={inputSearch} onChange={(text: string) => {*/}
                {/*        setInputSearch(text);*/}
                {/*    }}/>*/}
                {/*    <TouchableOpacity onPress={clearSearch} style={{flex: 1, alignItems: 'center'}}>*/}
                {/*        <Icon name={Icons.close} size={IconSizes.normal} color={Theme.primary}/>*/}
                {/*    </TouchableOpacity>*/}
                {/*</View>*/}
                <ScrollView>
                    {
                        Object.keys(iconsList).map((category: string) => (
                            <View key={category} style={{
                                alignSelf: 'center',
                                width: '95%',
                            }}>
                                <Text style={{
                                    color: text,
                                    fontWeight: '600',
                                    fontSize: FontSize.medium,
                                    width: '95%',
                                    paddingBottom: 5,
                                    marginBottom: 5,
                                    marginTop: 10
                                }}>{category}</Text>
                                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                    {
                                        iconsList[category].map((item: string) => {
                                            return (
                                                <TouchableOpacity onPress={() => {
                                                    action(item);
                                                    setSelectedIcon(item)
                                                }} style={[styles.iconItem, {
                                                    backgroundColor: selectedIcon === item ? containerBackground: pageBackground,
                                                    borderColor: selectedIcon === item ? text: pageBackground
                                                }, selectedIcon === item ? {shadowColor: "#171717",
                                                    shadowOffset: {width: 5, height: 5},
                                                    shadowOpacity: 0.2,
                                                    shadowRadius: wp(10),
                                                    elevation: 10,
                                                    borderRadius: 50,} : {}]}>
                                                    <Icon name={item} size={IconSizes.normal} color={selectedIcon === item ? color ? color : text : color ? color : text}/>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>

                            </View>
                        ))
                    }
                    <VerticalSeparator percent={10} />
                </ScrollView>
            </Animated.View>
        </Modal>
    </>
};
export default SelectIconModalView;