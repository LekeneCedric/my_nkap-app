import Animated, {BounceInDown, BounceInUp} from "react-native-reanimated";
import {FlatList, Modal, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Icons} from "../../../../Global/Icons.ts";
import {IconSizes} from "../../../../Global/IconSizes.ts";
import SeachInput from "../../../SeachInput/SearchInput.tsx";
import {useState} from "react";
import {useSelectCategoryModalView} from "./useSelectCategoryModalView.ts";
import ISelectCategoryItem from "../SelectCategoryItem.ts";
import AddCategoryModal from "./AddCategoryModal/AddCategoryModal.tsx";
import useTheme from "../../../../Shared/Hooks/useTheme.ts";
import SelectCategoryModalViewStyle from "./selectCategoryModalView.style.ts";

type selectCategoryModalViewProps = {
    action: (item: ISelectCategoryItem) => void,
    closeModal: () => void,
    isVisible: boolean,
    list: any[]
}
const SelectCategoryModalView = ({action, closeModal, isVisible, list}: selectCategoryModalViewProps) => {
    const {colorPalette: {pageBackground, containerBackground, action1, text }} = useTheme();
    const styles = SelectCategoryModalViewStyle(pageBackground, containerBackground, text, action1);
    const [addCategoryModalIsVisible, setAddCategoryModalIsVisible] = useState(false);
    const [inputSearch, setInputSearch] = useState<string>('');
    const {
        filterList,
        sortList,
        form,
        onSubmit,
        loading,
    } = useSelectCategoryModalView(list);
    const clearSearch = () => {
        setInputSearch('');
        sortList('')
    }
    const showAddCategoryModal = () => {
        setAddCategoryModalIsVisible(true);
    }
    const closeAddCategoryModal = () => {
        setAddCategoryModalIsVisible(false);
    }
    return <>
        <AddCategoryModal form={form} loading={loading} onClose={closeAddCategoryModal} onSubmit={onSubmit} isVisible={addCategoryModalIsVisible} />
        <Modal transparent={true} style={styles.modalContainer} animationType={'slide'} visible={isVisible}>
            <Animated.View entering={BounceInDown.duration(1000)} exiting={BounceInUp.duration(1000)}
                           style={styles.container}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={closeModal} style={{flex: 1, alignItems: 'center'}}>
                        <Icon name={Icons.back} size={IconSizes.medium} color={text}/>
                    </TouchableOpacity>
                    <SeachInput value={inputSearch} onChange={(text: string) => {
                        setInputSearch(text);
                        sortList(text)
                    }}/>
                    <TouchableOpacity onPress={clearSearch} style={{flex: 1, alignItems: 'center'}}>
                        <Icon name={Icons.close} size={IconSizes.medium} color={text}/>
                    </TouchableOpacity>
                </View>

                {
                    filterList.length > 0 && <FlatList
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
                                <Text style={styles.itemText} numberOfLines={1}>{item.name}</Text>
                            </TouchableOpacity>}
                        keyExtractor={item => item.id}
                        style={styles.listContainer}
                    />
                }
                {
                    filterList.length == 0 && <View style={styles.listAddCategoryContainer}>
                        <TouchableOpacity onPress={showAddCategoryModal} style={[styles.itemContainer,{borderBottomColor: text, borderBottomWidth: 0.3}]}>
                            <Icon name={Icons.add} size={IconSizes.normal} color={action1}/>
                            <Text style={[styles.itemText]} numberOfLines={1}>Ajouter une nouvelle catégorie</Text>
                        </TouchableOpacity>
                    </View>
                }
            </Animated.View>
        </Modal>
    </>
};
export default SelectCategoryModalView;