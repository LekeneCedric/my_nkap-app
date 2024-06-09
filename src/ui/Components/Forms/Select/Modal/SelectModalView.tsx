import {FlatList, Modal, Text, TouchableOpacity, View} from "react-native";
import Animated, {BounceIn, BounceInDown, BounceInUp, BounceOut} from "react-native-reanimated";
import styles from './SelectModalView.style';
import SeachInput from "../../../SeachInput/SearchInput";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../../../Global/Icons";
import {IconSizes} from "../../../../Global/IconSizes";
import {Theme} from "../../../../Global/Theme";
import {useSelectModalView} from "./useSelectModalView";
import {useState} from "react";
import ISelectItem from "../SelectItem.ts";
import useTheme from "../../../../Shared/Hooks/useTheme.ts";
import SelectModalViewStyle from "./SelectModalView.style";

type selectModalViewProps = {
    action: (item: ISelectItem) => void,
    closeModal: () => void,
    isVisible: boolean,
    list: any[]
}

const SelectModalView = ({
    action, closeModal, isVisible, list
}: selectModalViewProps) => {
    const [inputSearch, setInputSearch] = useState<string>('');
    const {filterList, sortList} = useSelectModalView(list);
    const clearSearch = () => {
        setInputSearch('');
        sortList('')
    }
    const {colorPalette: {pageBackground, containerBackground, text, gray}} = useTheme();
    const styles = SelectModalViewStyle(pageBackground, containerBackground, text, gray);
    return (
        <Modal transparent={true} style={styles.modalContainer} animationType={'slide'} visible={isVisible}>
            <Animated.View entering={BounceInDown.duration(1000)} exiting={BounceInUp.duration(1000)}
                           style={styles.container}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 5}}>
                    <TouchableOpacity onPress={closeModal} style={{flex: 1, alignItems: 'center'}}>
                        <Icon name={Icons.back} size={IconSizes.normal} color={text}/>
                    </TouchableOpacity>
                    <SeachInput value={inputSearch} onChange={(text: string) => {
                        setInputSearch(text);
                        sortList(text)
                    }}/>
                    <TouchableOpacity onPress={clearSearch} style={{flex: 1, alignItems: 'center'}}>
                        <Icon name={Icons.close} size={IconSizes.normal} color={text}/>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={filterList}
                    renderItem={({item}) =>
                        <TouchableOpacity onPress={() => {
                            action(item)
                        }} style={styles.itemContainer}>
                            {
                                item.icon && (
                                    <Icon name={item.icon} size={IconSizes.normal} color={item.color}/>
                                )
                            }
                            <Text style={styles.itemText}>{item.name}</Text>
                        </TouchableOpacity>}
                    keyExtractor={item => item.id}
                    style={styles.listContainer}
                />
            </Animated.View>
        </Modal>
    );
}
export default SelectModalView;