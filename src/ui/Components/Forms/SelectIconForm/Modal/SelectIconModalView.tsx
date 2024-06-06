import {useEffect, useState} from "react";
import {FlatList, Modal, ScrollView, Text, TouchableOpacity, View} from "react-native";
import Animated, {BounceInDown, BounceInUp} from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from './SelectIconModalView.style.ts';
import {Icons} from "../../../../Global/Icons.ts";
import {IconSizes} from "../../../../Global/IconSizes.ts";
import {Theme} from "../../../../Global/Theme.ts";
import SeachInput from "../../../SeachInput/SearchInput.tsx";
import useSelectIconModalView from "./useSelectIconModalView.ts";
import {FontSize} from "../../../../Global/FontSize.ts";
import AllIcons from "../../../../../Infrastructure/Shared/Data/icons.ts";
import VerticalSeparator from "../../../Shared/VerticalSeparator/VerticalSeparator.tsx";

type SelectIconModalViewProps = {
    action: (item: string) => void,
    closeModal: () => void,
    isVisible: boolean,
    color: string|null,
}
const SelectIconModalView = ({action, closeModal, isVisible, color}: SelectIconModalViewProps) => {
    const [selectedIcon, setSelectedIcon] = useState<string|null>(null);
    const [inputSearch, setInputSearch] = useState<string>('');
    const clearSearch = () => {
        setInputSearch('');
    }
    useEffect(() => {

    },[color])
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
                        Object.keys(AllIcons).map((category: string) => (
                            <View key={category} style={{
                                alignSelf: 'center',
                                width: '95%',
                            }}>
                                <Text style={{
                                    color: Theme.gray,
                                    fontWeight: 'bold',
                                    fontSize: FontSize.medium,
                                    width: '95%',
                                    paddingBottom: 5,
                                    marginBottom: 5,
                                    marginTop: 10
                                }}>{category}</Text>
                                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                    {
                                        AllIcons[category].map((item: string) => {
                                            return (
                                                <TouchableOpacity onPress={() => {
                                                    action(item);
                                                    setSelectedIcon(item)
                                                }} style={[styles.iconItem, {backgroundColor: selectedIcon === item ? Theme.primary: Theme.light}]}>
                                                    <Icon name={item} size={IconSizes.normal} color={selectedIcon === item ? color ? color : Theme.light : color ? color : Theme.primary}/>
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